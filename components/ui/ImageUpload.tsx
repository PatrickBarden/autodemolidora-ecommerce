import React, { useRef, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
  className?: string;
  previewClassName?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  bucket = 'images',
  folder = 'products',
  className = '',
  previewClassName = 'h-32'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Formato não suportado. Use JPG, PNG, WebP ou GIF.');
      return;
    }

    // Validar tamanho (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('Imagem muito grande. Máximo 50MB.');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload para o Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        // Mensagem mais amigável para erros comuns
        if (uploadError.message.includes('Bucket not found')) {
          throw new Error('Bucket de imagens não configurado. Crie o bucket "images" no Supabase Storage.');
        }
        if (uploadError.message.includes('row-level security') || uploadError.message.includes('policy')) {
          throw new Error('Sem permissão para upload. Verifique as políticas do Storage no Supabase.');
        }
        throw uploadError;
      }

      // Obter URL pública
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      onChange(urlData.publicUrl);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Erro ao fazer upload. Tente novamente.');
    } finally {
      setUploading(false);
      // Limpar input para permitir upload do mesmo arquivo
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    setError(null);
  };

  return (
    <div className={className}>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-blackCarbon border border-grayMedium text-white rounded p-3 focus:border-primary outline-none"
          placeholder="https://... ou faça upload"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 bg-grayMedium hover:bg-grayLight/20 text-white rounded border border-grayMedium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          title="Fazer upload de imagem"
        >
          {uploading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Upload size={20} />
          )}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      {value && (
        <div className={`mt-3 relative inline-block ${previewClassName}`}>
          <img
            src={value}
            alt="Preview"
            className="h-full object-cover rounded border border-grayMedium"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '';
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg"
            title="Remover imagem"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {!value && !uploading && (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="mt-3 border-2 border-dashed border-grayMedium rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <ImageIcon size={32} className="mx-auto text-grayMedium mb-2" />
          <p className="text-grayLight text-sm">Clique para fazer upload</p>
          <p className="text-grayLight/50 text-xs mt-1">JPG, PNG, WebP ou GIF (máx. 50MB)</p>
        </div>
      )}

      {uploading && (
        <div className="mt-3 border-2 border-dashed border-primary rounded-lg p-8 text-center">
          <Loader2 size={32} className="mx-auto text-primary mb-2 animate-spin" />
          <p className="text-primary text-sm">Enviando imagem...</p>
        </div>
      )}
    </div>
  );
};
