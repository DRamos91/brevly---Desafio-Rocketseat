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
