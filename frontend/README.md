# NeoCine Frontend

Aplicação web do NeoCine construída com Next.js, consumindo:

- API própria do projeto (autenticação, perfil e status das mídias)
- API do TMDB (catálogo, busca e detalhes de filmes/séries)

## 🛠️ Tecnologias

<p align="left">
	<img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,nodejs" alt="Tecnologias do frontend" />
</p>

![Next.js](https://img.shields.io/badge/Framework-Next.js-000000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/UI-React-61DAFB?style=for-the-badge&logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/Linguagem-TypeScript-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Estilo-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=fff)

---

## 🧱 Stack Técnica

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **UI**: React 19
- **Estilização**: Tailwind CSS 4
- **Formulários**: React Hook Form + Zod
- **Ícones**: Lucide React
- **Integrações**: TMDB API + API NeoCine (backend)

## Funcionalidades atuais

- Cadastro e login de usuário
- Logout e proteção de rotas privadas
- Home com conteúdos em tendência (TMDB)
- Busca de filmes e séries
- Página de detalhes da mídia
- Marcar como assistido
- Adicionar/remover da lista (watchlist)
- Página de perfil com edição de dados
- Listas privadas: `Minha Lista` e `Assistidos`
- Navegação mobile com barra inferior

## Requisitos

- Node.js 20+
- npm 10+
- Backend do NeoCine em execução
- Token válido do TMDB

## Variáveis de ambiente

Crie o arquivo `.env.local` na pasta `frontend`.

Exemplo:

```env
TMDB_TOKEN=seu_token_tmdb
API_BASE_URL=http://localhost:3001/
```

### Descrição das variáveis

- `TMDB_TOKEN`: token Bearer da API do TMDB
- `API_BASE_URL`: URL base da API do backend (inclua a barra final `/`)

> O arquivo `env.example` contém apenas o `TMDB_TOKEN`. Para rodar a aplicação completa, inclua também `API_BASE_URL` no `.env.local`.

## Como rodar

No diretório `frontend`:

```bash
npm install
npm run dev
```

Aplicação disponível em `http://localhost:3000`.

## Scripts

- `npm run dev`: inicia ambiente de desenvolvimento
- `npm run build`: gera build de produção
- `npm run start`: executa build em modo produção

## Rotas principais

### Públicas

- `/`
- `/explorar`
- `/explorar/[query]`
- `/media/[media_type]/[id]`
- `/login`
- `/cadastro`

### Privadas

- `/perfil`
- `/minhaLista`
- `/assistidos`

As rotas privadas são protegidas via `proxy.ts` com base nos cookies de sessão (`auth_token` e `refresh_token`).

## Estrutura resumida

```text
src/
	app/
		(Public)/
		(private)/
		actions/
	components/
	service/
		api/
		tmdb/
	types/
```

### Convenções

- `app/actions/api`: Server Actions para autenticação, usuário e mídia
- `service/api`: integração com o backend (inclui refresh automático de token)
- `service/tmdb`: integração com TMDB (trending, busca, detalhes)
- `components`: componentes reutilizáveis de UI
