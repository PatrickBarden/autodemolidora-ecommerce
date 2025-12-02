import React, { useRef, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Upload, X, Loader2, Image as ImageIcon, GripVertical } from 'lucide-react';

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  bucket?: string;
  folder?: string;
  maxImages?: number;
  className?: string;
}

export const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  value = [],
  onChange,
  bucket = 'images',
  folder = 'products',
  maxImages = 5,
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - value.length;
    if (remainingSlots <= 0) {
      setError(`Máximo de ${maxImages} imagens permitidas.`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots) as File[];
    
    // Validar arquivos
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    for (const file of filesToUpload) {
      if (!allowedTypes.includes(file.type)) {
        setError('Formato não suportado. Use JPG, PNG, WebP ou GIF.');
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        setError('Imagem muito grande. Máximo 50MB por imagem.');
        return;
      }
    }

    setError(null);
    setUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of filesToUpload) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { data, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          if (uploadError.message.includes('Bucket not found')) {
            throw new Error('Bucket de imagens não configurado.');
          }
          if (uploadError.message.includes('row-level security') || uploadError.message.includes('policy')) {
            throw new Error('Sem permissão para upload.');
          }
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(data.path);

        uploadedUrls.push(urlData.publicUrl);
      }

      onChange([...value, ...uploadedUrls]);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Erro ao fazer upload.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index);
    onChange(newUrls);
  };

  const handleUrlAdd = () => {
    if (value.length >= maxImages) {
      setError(`Máximo de ${maxImages} imagens permitidas.`);
      return;
    }
    const url = prompt('Cole a URL da imagem:');
    if (url && url.trim()) {
      onChange([...value, url.trim()]);
    }
  };

  // Drag and drop para reordenar
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newUrls = [...value];
    const draggedUrl = newUrls[draggedIndex];
    newUrls.splice(draggedIndex, 1);
    newUrls.splice(index, 0, draggedUrl);
    onChange(newUrls);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className={className}>
      {/* Preview das imagens */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
          {value.map((url, index) => (
            <div
              key={`${url}-${index}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`relative aspect-square rounded-lg border-2 overflow-hidden group cursor-move
                ${index === 0 ? 'border-primary' : 'border-grayMedium'}
                ${draggedIndex === index ? 'opacity-50' : ''}`}
            >
              <img
                src={url}
                alt={`Imagem ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%233B3E43" width="100" height="100"/><text x="50%" y="50%" fill="%23B5B5B5" text-anchor="middle" dy=".3em" font-size="12">Erro</text></svg>';
                }}
              />
              
              {/* Badge de posição */}
              <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {index === 0 ? 'Principal' : index + 1}
              </div>

              {/* Ícone de arrastar */}
              <div className="absolute top-1 right-8 bg-black/70 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical size={14} />
              </div>

              {/* Botão remover */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remover imagem"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Área de upload */}
      {value.length < maxImages && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            className="hidden"
            multiple
          />
          
          {uploading ? (
            <div className="border-2 border-dashed border-primary rounded-lg p-6 text-center">
              <Loader2 size={28} className="mx-auto text-primary mb-2 animate-spin" />
              <p className="text-primary text-sm">Enviando imagens...</p>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-grayMedium rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
            >
              <ImageIcon size={28} className="mx-auto text-grayMedium mb-2" />
              <p className="text-grayLight text-sm">Clique para adicionar imagens</p>
              <p className="text-grayLight/50 text-xs mt-1">
                {value.length}/{maxImages} imagens • JPG, PNG, WebP ou GIF (máx. 50MB cada)
              </p>
            </div>
          )}

          {/* Botão para adicionar URL */}
          <button
            type="button"
            onClick={handleUrlAdd}
            className="mt-2 text-xs text-grayLight hover:text-primary transition-colors"
          >
            + Adicionar imagem por URL
          </button>
        </>
      )}

      {/* Mensagem de erro */}
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      {/* Dica */}
      {value.length > 1 && (
        <p className="text-grayLight/50 text-xs mt-2">
          💡 Arraste as imagens para reordenar. A primeira será a imagem principal.
        </p>
      )}
    </div>
  );
};
