# 🎬 NeoCine

**Sua jornada pelo universo do cinema, em um só lugar.**

O NeoCine é uma plataforma para descobrir, organizar e acompanhar filmes e séries com uma experiência moderna, rápida e personalizada.

## ✨ O que é o NeoCine

O NeoCine foi pensado para quem ama cinema e quer manter tudo organizado sem complicação:

- descubra conteúdos em alta
- explore títulos por busca
- salve na sua lista para ver depois
- marque o que já assistiu
- acompanhe seu perfil e histórico

## 🚀 Proposta de valor

- **Experiência fluida**: navegação simples entre descoberta e organização
- **Foco no usuário**: listas pessoais e status de mídia por conta
- **Visual moderno**: interface otimizada para desktop e mobile
- **Base escalável**: arquitetura separada entre frontend e backend

## 🧩 Estrutura do projeto

Este repositório está dividido em duas aplicações:

- [Frontend](frontend/README.md): experiência do usuário, interface e integração com TMDB/API
- [Backend](backend/README.md): autenticação, perfil, regras de negócio e persistência

## 📚 Documentação técnica

Toda a documentação técnica (stack, setup, variáveis de ambiente, scripts, rotas e arquitetura) está nos READMEs específicos:

- [Documentação do Frontend](frontend/README.md)
- [Documentação do Backend](backend/README.md)

## 🐳 Ambiente de desenvolvimento

Para desenvolvimento local, você pode subir rapidamente um banco PostgreSQL com Docker e testar o projeto sem instalação manual do banco:

```bash
docker compose up -d
```

Para encerrar o ambiente:

```bash
docker compose down
```

Depois de subir o banco, siga os passos dos READMEs do backend e frontend para rodar migrations, iniciar a API e validar os fluxos da aplicação.

## 👨‍💻 Autor

Marcéllo Belém

📍 Localização: Juazeiro do Norte - CE  
💻 GitHub: @MarcelloBelem  
📚 Estudando: HTML5, CSS3, JavaScript, React, Next.js  
🚀 Projetos: Desenvolvimento Full-Stack com foco em aplicações modernas

Feito com ❤️ por Marcéllo Belém usando Next.js e Supabase
