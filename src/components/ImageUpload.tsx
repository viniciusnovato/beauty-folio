import { ChangeEvent, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>;
  currentImageUrl?: string;
  className?: string;
}

export function ImageUpload({ onUpload, currentImageUrl, className = '' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Fazer upload
      await onUpload(file);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      setPreviewUrl(currentImageUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={handleClear}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleClick}
          disabled={isUploading}
          className={`
            w-full h-32 border-2 border-dashed rounded-lg
            flex flex-col items-center justify-center gap-2
            text-gray-500 hover:text-gray-700 hover:border-gray-400
            transition-colors
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <Upload size={24} />
          <span className="text-sm">
            {isUploading ? 'Enviando...' : 'Clique para fazer upload'}
          </span>
        </button>
      )}
    </div>
  );
} 