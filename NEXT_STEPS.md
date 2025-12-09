# Próximos Passos para Autodemolidora E-commerce

O sistema foi atualizado com sucesso! Aqui está o que você precisa saber:

## 1. Acesso Administrativo
Como o sistema de cadastro cria usuários "comuns" por padrão, você precisa definir o primeiro administrador manualmente no Supabase ou via Banco de Dados.

**Como transformar um usuário em Admin:**
1. Cadastre-se normalmente no site (`/register`).
2. Acesse o painel do Supabase > Table Editor > `profiles`.
3. Encontre seu usuário e mude a coluna `role` de `user` para `admin`.
4. Faça logout e login novamente no site.
5. O botão "Admin" aparecerá no menu superior.

## 2. Gerenciamento de Produtos
- Acesse `/admin` para ver o painel.
- Você pode adicionar, editar e excluir produtos.
- As imagens devem ser URLs (recomendamos hospedar no Imgur, AWS S3 ou usar o próprio Storage do Supabase futuramente).

## 3. Configuração de Pagamento
O checkout atual simula o pedido e envia para o WhatsApp.
- O número do WhatsApp está definido em `constants.ts`. Atualize a constante `STORE_PHONE`.

## 4. Imagens
Atualizei as imagens para placeholders de alta qualidade de carros e peças.
Para usar suas próprias fotos:
1. Faça upload delas em algum lugar.
2. Use o painel administrativo para atualizar a URL da imagem dos produtos.

## 5. Rodando o Projeto
Se ainda não estiver rodando:
```bash
npm run dev
```

## Estrutura Atualizada
- **Banco de Dados**: Supabase (Tabelas: `products`, `profiles`)
- **Autenticação**: Supabase Auth
- **Estilo**: Tailwind CSS (Configurado localmente)
- **Rotas**: React Router Dom
