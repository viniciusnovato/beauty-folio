import React, { useState } from "react";
import { useProfessional } from "@/context/ProfessionalContext";
import { Service } from "@/types";
import { Button } from "@/components/ui/button";
import { ServiceForm } from "@/components/ServiceForm";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Edit, 
  Plus, 
  Trash2, 
  Image,
  X,
  Upload,
  Clock
} from "lucide-react";

interface ServiceItem {
  id: string;
  text: string;
}

export function ServicesManager() {
  const { currentProfessional, deleteService } = useProfessional();
  const [open, setOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [includedItems, setIncludedItems] = useState<ServiceItem[]>([]);
  const [newItem, setNewItem] = useState('');
  
  const handleAddService = () => {
    setCurrentService(undefined);
    setIsModalOpen(true);
  };
  
  const handleEditService = (service: Service) => {
    setCurrentService(service);
    setIsModalOpen(true);
  };
  
  const handleDeleteClick = (service: Service) => {
    setServiceToDelete(service);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (serviceToDelete) {
      deleteService(serviceToDelete.id);
    }
    setDeleteDialogOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      setIncludedItems([
        ...includedItems,
        { id: Date.now().toString(), text: newItem.trim() }
      ]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (id: string) => {
    setIncludedItems(includedItems.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de envio
    console.log({
      serviceName,
      price,
      duration,
      description,
      selectedFiles,
      includedItems
    });
  };
  
  if (!currentProfessional) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold">Seus Serviços</h2>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-sm md:text-base"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" /> Adicionar Serviço
        </Button>
      </div>
      
      {currentProfessional.services.length === 0 ? (
        <div className="border border-dashed rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">Você ainda não adicionou nenhum serviço.</p>
          <Button onClick={handleAddService}>
            <Plus className="h-4 w-4 mr-2" /> Adicionar Primeiro Serviço
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {currentProfessional.services.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <div className="aspect-video sm:aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={service.images[0]}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm md:text-base line-clamp-2">{service.name}</h3>
                  <span className="font-medium text-sm md:text-base whitespace-nowrap ml-2" style={{ color: currentProfessional.primaryColor }}>
                    R$ {service.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
                
                <div className="flex items-center text-gray-500 text-xs md:text-sm">
                  <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{service.duration} minutos</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                    size="sm"
                    className="flex-1 text-xs md:text-sm h-8 md:h-9"
                    onClick={() => {
                      setCurrentService(service);
                      setIsModalOpen(true);
                    }}
                  >
                    Editar
                </Button>
                <Button 
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700 text-xs md:text-sm h-8 md:h-9"
                    onClick={() => {
                      setServiceToDelete(service);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 md:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold">
              {currentService ? "Editar Serviço" : "Adicionar Novo Serviço"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1 md:mb-2">Nome do Serviço</label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full p-2 md:p-3 border rounded-lg text-sm md:text-base"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 md:mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 md:p-3 border rounded-lg text-sm md:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 md:mb-2">Duração (minutos)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2 md:p-3 border rounded-lg text-sm md:text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 md:mb-2">Descrição do Serviço</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 md:p-3 border rounded-lg text-sm md:text-base"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 md:mb-2">O que inclui</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    className="flex-1 p-2 md:p-3 border rounded-lg text-sm md:text-base"
                    placeholder="Ex: Consulta personalizada"
                  />
                  <Button 
                    type="button"
                    onClick={handleAddItem}
                    className="px-2 md:px-3"
                  >
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {includedItems.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg text-sm md:text-base"
                    >
                      <span>{item.text}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 md:mb-2">Imagens do Serviço</label>
                <div className="border-2 border-dashed rounded-lg p-4 md:p-6 text-center">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="service-images"
                    accept="image/*"
                  />
                  <label 
                    htmlFor="service-images"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="w-6 h-6 md:w-8 md:h-8 mb-2 text-gray-400" />
                    <span className="text-xs md:text-sm text-gray-500">
                      Clique para selecionar ou arraste as imagens aqui
                    </span>
                  </label>
                  {selectedFiles && (
                    <div className="mt-4 text-left">
                      <p className="text-xs md:text-sm font-medium mb-2">Arquivos selecionados:</p>
                      <ul className="space-y-1">
                        {Array.from(selectedFiles).map((file, index) => (
                          <li key={index} className="text-xs md:text-sm text-gray-600">
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 md:gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="text-sm md:text-base"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  className="text-sm md:text-base"
                >
                  {currentService ? "Salvar Alterações" : "Adicionar Serviço"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente o serviço
              "{serviceToDelete?.name}" do seu portfólio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Excluir Serviço
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
