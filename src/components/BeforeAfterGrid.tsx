import { BeforeAfter } from '../types/supabase';
import Image from 'next/image';

interface BeforeAfterGridProps {
  items: BeforeAfter[];
}

export default function BeforeAfterGrid({ items }: BeforeAfterGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map((item) => (
        <div key={item.id} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <h4 className="text-sm text-gray-500 mb-2">Antes</h4>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={item.beforeImageUrl}
                  alt="Antes"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm text-gray-500 mb-2">Depois</h4>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={item.afterImageUrl}
                  alt="Depois"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
            <div className="mt-2 flex gap-2">
              {item.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 