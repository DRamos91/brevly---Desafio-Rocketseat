# Brev.ly — Encurtador de URL (FullStack)

Projeto FullStack desenvolvido para o desafio **Brev.ly** (Rocketseat): um encurtador de URL com Front-end (React SPA) e Back-end (Fastify + Postgres) incluindo exportação de relatório CSV via CDN (Cloudflare R2).

---

## ✅ Checklist do desafio

### Front-end (web)
- [x] Deve ser possível criar um link  
  - [x] Não deve ser possível criar um link com encurtamento mal formatado  
  - [x] Não deve ser possível criar um link com encurtamento já existente  
- [x] Deve ser possível deletar um link  
- [x] Deve ser possível obter a URL original por meio do encurtamento  
- [x] Deve ser possível listar todas as URL’s cadastradas  
- [x] Deve ser possível incrementar a quantidade de acessos de um link  
- [x] Deve ser possível baixar um CSV com o relatório dos links criados  
- [x] SPA com React + Vite (TypeScript)  
- [x] Layout baseado no Figma + boa UX (empty state/loading/disabled actions)  
- [x] Responsivo (desktop e mobile)

### Back-end (server)
- [x] Deve ser possível criar um link  
  - [x] Não deve ser possível criar um link com URL encurtada mal formatada  
  - [x] Não deve ser possível criar um link com URL encurtada já existente  
- [x] Deve ser possível deletar um link  
- [x] Deve ser possível obter a URL original por meio de uma URL encurtada  
- [x] Deve ser possível listar todas as URL’s cadastradas  
- [x] Deve ser possível incrementar a quantidade de acessos de um link  
- [x] Deve ser possível exportar os links criados em um CSV  
  - [x] CSV acessível via CDN (Cloudflare R2)  
  - [x] Nome aleatório/único para o arquivo  
  - [x] Geração performática via streaming  
  - [x] CSV contém: URL original, URL encurtada, acessos, data de criação  

---

## 📁 Estrutura do repositório

- `web/` → Front-end (React + Vite + TypeScript)
- `server/` → Back-end + DevOps (Fastify + Drizzle + Postgres + Docker)

---

## 🔧 Tecnologias

### Front-end
- React + TypeScript
- Vite (SPA)
- TailwindCSS
- React Router
- React Hook Form + Zod

### Back-end
- Fastify + TypeScript
- Drizzle ORM
- Postgres
- Export CSV via `csv-stringify` + streaming
- Cloudflare R2 (S3-compatible) como CDN/Storage
- Dockerfile

---

# 🚀 Como rodar o projeto localmente

## Pré-requisitos
- Node.js (recomendado: LTS)
- npm
- Postgres (local ou via container)
- Conta Cloudflare com R2 (para exportação real de CSV)

---

## 1) Back-end (server)

### 1.1 Variáveis de ambiente
Crie `server/.env` baseado em `server/.env.example`.

Exemplo:

```env
PORT=3333
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/brevly

CLOUDFLARE_ACCOUNT_ID="..."
CLOUDFLARE_ACCESS_KEY_ID="..."
CLOUDFLARE_SECRET_ACCESS_KEY="..."
CLOUDFLARE_BUCKET="brevly-exports"
CLOUDFLARE_PUBLIC_URL="https://<seu-dominio-ou-public-url-do-r2>"

## 1.2 Instalar dependências do backend
cd server
npm install

## 1.3 Executar migrations do banco
npm run db:migrate


Esse script executa as migrations usando Drizzle ORM e requer que DATABASE_URL esteja configurada corretamente.

## 1.4 Rodar o servidor
npm run dev


O backend ficará disponível em:

http://localhost:3333

🎨 Front-end (web)
## 2.1 Variáveis de ambiente

Crie o arquivo web/.env baseado em web/.env.example.

Exemplo:

VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:3333

## 2.2 Instalar dependências do front-end
cd web
npm install

## 2.3 Rodar o front-end
npm run dev


A aplicação estará disponível em:

http://localhost:5173

🔌 Principais endpoints do Back-end

POST /links → cria um link

GET /links → lista todos os links

DELETE /links/:id → remove um link

GET /links/resolve/:shortCode → resolve a URL encurtada

POST /links/:id/access → incrementa acessos

POST /export/links → gera CSV, envia para o R2 e retorna a URL pública

🐳 Docker (Back-end)

No diretório server/:

docker build -t brevly-server .
docker run -p 3333:3333 --env-file .env brevly-server

📌 Observações importantes

A exportação do CSV utiliza Cloudflare R2, que é compatível com a API do S3.

Não é necessário ter conta na AWS para este projeto.

A SDK do S3 é usada apenas como cliente compatível.

-----------------------------------------------------------------------------

👤 Autor

Daniel Moreno Ramos Gonçalves