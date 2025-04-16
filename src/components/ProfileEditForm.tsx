
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useProfessional } from "@/context/ProfessionalContext";
import { Palette, Image, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  bio: z.string().min(10, { message: "Bio deve ter pelo menos 10 caracteres" }),
  logo: z.string(),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Cor deve estar em formato hexadecimal: #RRGGBB",
  }),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Cor deve estar em formato hexadecimal: #RRGGBB",
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileEditForm() {
  const { currentProfessional, updateProfessionalProfile } = useProfessional();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentProfessional?.name || "",
      bio: currentProfessional?.bio || "",
      logo: currentProfessional?.logo || "",
      primaryColor: currentProfessional?.primaryColor || "#FF4785",
      secondaryColor: currentProfessional?.secondaryColor || "#F8F9FC",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real application, we would upload the file to a server here
    // For now, we'll just use the preview URL if available
    const updatedData = {
      ...data,
      logo: previewUrl || data.logo,
    };
    updateProfessionalProfile(updatedData);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        // Update the form value
        form.setValue('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Available colors for color picker
  const colorPalette = [
    "#FF4785", "#F472B6", "#EC4899", "#DB2777", "#BE185D", // Pinks
    "#9061F9", "#8B5CF6", "#7C3AED", "#6D28D9", "#5B21B6", // Purples
    "#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF", "#1E3A8A", // Blues
    "#10B981", "#059669", "#047857", "#065F46", "#064E3B", // Greens
    "#F59E0B", "#D97706", "#B45309", "#92400E", "#78350F", // Ambers
    "#EF4444", "#DC2626", "#B91C1C", "#991B1B", "#7F1D1D", // Reds
    "#000000", "#1F2937", "#374151", "#4B5563", "#6B7280", // Grays
    "#9CA3AF", "#D1D5DB", "#E5E7EB", "#F3F4F6", "#FFFFFF", // Light grays/white
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Profissional</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografia</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    {previewUrl && (
                      <div className="w-16 h-16 rounded-full overflow-hidden border">
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <label 
                        htmlFor="logo-upload" 
                        className="flex items-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="h-4 w-4" />
                        <span className="text-sm text-gray-600">
                          {selectedFile ? selectedFile.name : "Selecionar imagem..."}
                        </span>
                      </label>
                      <input 
                        id="logo-upload"
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="primaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor Primária</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input 
                      {...field} 
                      className="flex-1"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-10 p-0"
                          style={{ backgroundColor: field.value }}
                        >
                          <span className="sr-only">Escolher cor primária</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-2">
                        <div className="grid grid-cols-5 gap-2">
                          {colorPalette.map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => form.setValue('primaryColor', color)}
                              className="w-8 h-8 rounded-md border border-gray-200 cursor-pointer"
                              style={{ backgroundColor: color }}
                              title={color}
                              aria-label={`Selecionar cor ${color}`}
                            />
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="secondaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor Secundária</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input 
                      {...field} 
                      className="flex-1"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-10 p-0"
                          style={{ backgroundColor: field.value }}
                        >
                          <span className="sr-only">Escolher cor secundária</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-2">
                        <div className="grid grid-cols-5 gap-2">
                          {colorPalette.map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => form.setValue('secondaryColor', color)}
                              className="w-8 h-8 rounded-md border border-gray-200 cursor-pointer"
                              style={{ backgroundColor: color }}
                              title={color}
                              aria-label={`Selecionar cor ${color}`}
                            />
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full rounded-full">Salvar Alterações</Button>
      </form>
    </Form>
  );
}
