# NeoCine API (Backend)

Backend do NeoCine construído com **NestJS + Prisma + PostgreSQL**, responsável por autenticação, perfil de usuário e gerenciamento do status de mídias (assistido / minha lista).

## 🛠️ Tecnologias

<p align="left">
  <img src="https://skillicons.dev/icons?i=nestjs,ts,nodejs,prisma,postgres,docker" alt="Tecnologias do backend" />
</p>

![NestJS](https://img.shields.io/badge/Framework-NestJS-E0234E?style=for-the-badge&logo=nestjs)
![JWT](https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge&logo=jsonwebtokens)
![Class Validator](https://img.shields.io/badge/Validation-class--validator-3C873A?style=for-the-badge)

---

## 📌 Visão Geral

A API foi organizada por domínio funcional e segue uma estrutura modular:

- **auth**: cadastro, login e emissão/validação de JWT
- **users**: perfil do usuário autenticado
- **media**: status da mídia por usuário (assistido e watchlist)
- **prisma**: conexão com banco e acesso aos dados
- **ping**: rota pública para health check (`GET /ping`)

---

## 🧱 Stack Técnica

- **Framework**: NestJS 11
- **Linguagem**: TypeScript
- **Banco de dados**: PostgreSQL
- **ORM**: Prisma 7 (adapter `@prisma/adapter-pg`)
- **Auth**: JWT + `AuthGuard`
- **Validação de DTOs**: `class-validator` + `class-transformer`

---

## 🗂️ Estrutura de Pastas

```text
backend/
├─ src/
│  ├─ app.module.ts
│  ├─ main.ts
│  ├─ ping.controller.ts
│  ├─ auth/
│  │  ├─ auth.controller.ts
│  │  ├─ auth.service.ts
│  │  ├─ auth.guard.ts
│  │  ├─ auth.module.ts
│  │  └─ dtos/
│  ├─ users/
│  │  ├─ users.controller.ts
│  │  ├─ users.service.ts
│  │  ├─ users.module.ts
│  │  └─ dtos/
│  ├─ media/
│  │  ├─ media.controller.ts
│  │  ├─ media.service.ts
│  │  ├─ media.module.ts
│  │  └─ dtos/
│  ├─ prisma/
│  │  ├─ prisma.module.ts
│  │  └─ prisma.service.ts
│  └─ types/
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ generated/
│  └─ prisma/
└─ package.json
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` em `backend/` com:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
JWT_SECRET="sua_chave_jwt"
JWT_REFRESH_SECRET="sua_chave_jwt_refresh"
PORT=3000
```

> `PORT` é opcional (fallback para `3000`).
>
> Em produção com Supabase + Prisma Migrate, prefira:
>
> - `DATABASE_URL`: URL usada pela aplicação em runtime
> - `DIRECT_URL`: conexão direta (sem pooler), usada para migrations

---

## ▶️ Como Rodar Localmente

### 1) Instalar dependências

```bash
npm install
```

### 2) Aplicar migrations do Prisma

```bash
npx prisma migrate dev
```

### 3) Rodar em desenvolvimento

```bash
npm run start:dev
```

### 4) Build e produção

```bash
npm run build
npm run start:prod
```

---

## 🧭 Endpoints Principais

### Health Check

- `GET /ping` → retorna `{ "message": "pong" }`

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Usuário (autenticado)

- `GET /users/me`
- `PATCH /users/me/edit`
- `GET /users/me/media?isWatched=true|false&inWatchlist=true|false`

### Mídia (autenticado)

- `PATCH /media/:tmdbId`
- `GET /media/:tmdbId/status`

> Rotas autenticadas exigem header:
>
> `Authorization: Bearer <token>`

---

## 🧩 Modelo de Dados (Resumo)

O schema Prisma define 3 entidades centrais:

- **User**
  - Dados do usuário e relacionamento com mídias
- **Media**
  - Dados da mídia vinda do TMDB (`tmdbId`, `type`, `title`, `duration`, etc.)
- **UserMedia**
  - Tabela de relação User x Media com status:
    - `isWatched`
    - `inWatchlist`

Relacionamento chave:

- `User 1:N UserMedia`
- `Media 1:N UserMedia`
- Chave única composta em `UserMedia`: `@@unique([userId, mediaId])`

---

## 🔄 Fluxo Resumido

1. Usuário faz login/cadastro em `auth`
2. API retorna `accessToken` JWT
3. Front envia token no header `Authorization`
4. `AuthGuard` valida token e injeta `req.user`
5. Módulos `users` e `media` executam regras de negócio
6. Persistência feita via `PrismaService`

---

## 🧯 Keep Alive / Cronjob

Para manter a API acordada em plataformas com cold start, use um cronjob chamando:

```bash
GET /ping
```

Exemplo com `curl`:

```bash
curl -s https://sua-api.com/ping
```

---
