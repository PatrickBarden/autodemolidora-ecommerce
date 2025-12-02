-- ============================================
-- CONFIGURAÇÃO DO SUPABASE STORAGE
-- Execute este SQL no Supabase Dashboard > SQL Editor
-- ============================================

-- 1. Criar o bucket 'images' (se não existir)
-- Nota: Buckets são criados via Dashboard ou API, não via SQL
-- Vá em Storage > New Bucket > Nome: "images" > Marque "Public bucket"

-- 2. Políticas de acesso para o bucket 'images'

-- Permitir leitura pública (qualquer pessoa pode ver as imagens)
CREATE POLICY "Imagens públicas para leitura"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Permitir upload apenas para usuários autenticados
CREATE POLICY "Upload para usuários autenticados"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- Permitir que usuários deletem suas próprias imagens (ou admins deletem qualquer uma)
CREATE POLICY "Deletar imagens próprias ou admin"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'images' 
  AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  )
);

-- Política alternativa mais simples: admins podem fazer tudo
CREATE POLICY "Admins podem gerenciar imagens"
ON storage.objects FOR ALL
USING (
  bucket_id = 'images'
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- ============================================
-- INSTRUÇÕES MANUAIS:
-- ============================================
-- 
-- 1. Acesse o Supabase Dashboard
-- 2. Vá em "Storage" no menu lateral
-- 3. Clique em "New Bucket"
-- 4. Nome: images
-- 5. Marque a opção "Public bucket" (para imagens serem acessíveis publicamente)
-- 6. Clique em "Create bucket"
-- 7. Após criar, vá em "Policies" e adicione as políticas acima
--
-- Ou use a política simplificada abaixo que permite uploads autenticados:
-- ============================================

-- POLÍTICA SIMPLIFICADA (recomendada para começar):
-- Permite que qualquer usuário autenticado faça upload

-- SELECT (leitura pública)
-- INSERT (usuários autenticados)
-- DELETE (usuários autenticados)

-- No Dashboard do Supabase Storage:
-- 1. Clique no bucket "images"
-- 2. Vá em "Policies"
-- 3. Adicione:
--    - Para SELECT: "Enable read access for all users" (template)
--    - Para INSERT: "Enable insert for authenticated users only" (template)
--    - Para DELETE: "Enable delete for authenticated users only" (template)
