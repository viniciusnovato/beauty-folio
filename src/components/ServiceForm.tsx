
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useProfessional } from "@/context/ProfessionalContext";
import { Service } from "@/types";
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
import { Image, Plus, X } from "lucide-react";

const serviceSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  description: z.string().min(10, { message: "Descrição deve ter pelo menos 10 caracteres" }),
  price: z.coerce.number().min(0, { message: "Preço não pode ser negativo" }),
  duration: z.coerce.number().min(5, { message: "Duração mínima de 5 minutos" }),
  images: z.array(z.string().url({ message: "Deve ser uma URL válida" })),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  service?: Service;
  onClose: () => void;
}

export function ServiceForm({ service, onClose }: ServiceFormProps) {
  const { addService, updateService } = useProfessional();
  const isEditing = !!service;
  
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      price: service?.price || 0,
      duration: service?.duration || 60,
      images: service?.images || [""],
    },
  });

  function onSubmit(data: ServiceFormValues) {
    // Filter out empty image URLs
    const filteredImages = data.images.filter(url => url.trim() !== "");
    
    if (isEditing && service) {
      updateService(service.id, { ...data, images: filteredImages });
    } else {
      // Ensure all required properties are present
      const newService: Omit<Service, "id"> = {
        name: data.name,
        description: data.description,
        price: data.price,
        duration: data.duration,
        images: filteredImages,
      };
      addService(newService);
    }
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Serviço</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço (R$)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duração (minutos)</FormLabel>
                <FormControl>
                  <Input type="number" min="5" step="5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do Serviço</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <FormLabel>Imagens do Serviço</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => form.setValue("images", [...form.getValues("images"), ""])}
            >
              <Plus className="h-4 w-4 mr-1" /> Adicionar Imagem
            </Button>
          </div>
          
          {form.watch("images").map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`images.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} placeholder="URL da imagem" />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="shrink-0 w-10"
                        onClick={() => alert("Funcionalidade de upload ainda não implementada")}
                      >
                        <Image className="h-4 w-4" />
                      </Button>
                      {index > 0 && (
                        <Button 
                          type="button" 
                          variant="destructive" 
                          className="shrink-0 w-10"
                          onClick={() => {
                            const currentImages = form.getValues("images");
                            form.setValue(
                              "images", 
                              currentImages.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {isEditing ? "Atualizar" : "Adicionar"} Serviço
          </Button>
        </div>
      </form>
    </Form>
  );
}
