# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste ficheiro.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-31

### 🎉 Lançamento Inicial

Primeira versão completa e funcional do Restaurant Race!

### ✨ Features Adicionadas

#### Core Features

- **Página Inicial** - Interface para introduzir morada e raio de pesquisa
  - Input de morada com validação
  - Slider de raio ajustável (500m - 5km)
  - Design moderno com gradientes e animações
- **Seleção de Restaurantes** - Lista e seleção de restaurantes
  - Grid responsivo de cards de restaurantes
  - Pesquisa/filtro em tempo real
  - Adição manual de restaurantes
  - Painel lateral com participantes selecionados
  - Informações detalhadas: rating, reviews, preço
- **Corrida Animada** - Corrida visual de restaurantes
  - Contagem regressiva (3, 2, 1, GO!)
  - Animações suaves e realistas
  - Emojis únicos para cada participante
  - Efeitos visuais (trails, bounce)
  - Celebração do vencedor com confetti
  - Opção de correr novamente

#### Design & UX

- Dark mode automático (segue preferência do sistema)
- Interface totalmente responsiva (mobile-first)
- Animações suaves e profissionais
- Gradientes modernos e vibrantes
- Micro-interactions em hover/click
- Loading states personalizados

#### Componentes Reutilizáveis

- `Loading` - Componente de loading animado
- `RestaurantCard` - Card de restaurante estilizado

#### Integrações

- Google Places API (opcional)
  - Geocoding de moradas
  - Pesquisa de restaurantes nearby
  - Fallback para dados mock
- Dados mock para uso sem API key

### 🛠️ Tecnologias

- **React Router v7** - Framework mode
- **Tailwind CSS v4** - Estilização
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Node.js 18+** - Runtime

### 📚 Documentação

Documentação completa incluída:

- `README.md` - Visão geral e quick start
- `USER_GUIDE.md` - Guia detalhado de uso
- `GOOGLE_PLACES_SETUP.md` - Setup da API
- `DEPLOYMENT.md` - Guia de deploy
- `ROADMAP.md` - Features futuras
- `CONTRIBUTING.md` - Guia de contribuição
- `LICENSE` - MIT License

### 🔧 Configuração

- Dockerfile incluído
- Docker Compose ready
- Configuração Vercel/Netlify
- Variáveis de ambiente (.env.example)
- .gitignore completo

### 📦 Package Scripts

```json
{
  "dev": "react-router dev",
  "build": "react-router build",
  "start": "react-router-serve ./build/server/index.js",
  "typecheck": "react-router typegen && tsc"
}
```

### 🎨 Design Highlights

- 10 cores vibrantes para participantes
- 10 emojis de comida diferentes
- Animações CSS customizadas
- Gradientes em múltiplas páginas
- Scrollbar estilizado
- Modo escuro elegante

### 🌐 Rotas

- `/` - Página inicial
- `/select` - Seleção de restaurantes
- `/race` - Corrida animada

### 🔒 Segurança

- API keys via variáveis de ambiente
- Não expõe secrets no código
- .env no .gitignore
- Validação de inputs

---

## [Unreleased]

### 🚀 Planeado para Próximas Versões

Ver [ROADMAP.md](./ROADMAP.md) para lista completa.

**Próxima Major (v2.0.0):**

- Histórico de corridas
- Sistema de autenticação
- Equipas e grupos
- Partilha de resultados

**Próxima Minor (v1.1.0):**

- PWA (Progressive Web App)
- Melhor UX mobile
- Filtros avançados
- Temas customizáveis

**Patches (v1.0.x):**

- Bug fixes
- Performance improvements
- Documentação updates

---

## Como Atualizar

### Para Utilizadores

```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm install

# Rebuild
npm run build
```

### Para Developers

```bash
# Pull latest
git pull origin develop

# Update and check
npm install
npm run typecheck
npm run build
```

---

## Suporte a Versões

| Versão | Status   | Suporte até | Notas        |
| ------ | -------- | ----------- | ------------ |
| 1.0.x  | ✅ Ativo | TBD         | Versão atual |

---

## Breaking Changes

Nenhum até agora.

---

## Deprecations

Nenhum até agora.

---

## Migration Guides

Não aplicável para v1.0.0 (versão inicial).

---

## Contributors

Obrigado a todos os contribuidores! 🎉

Lista será atualizada com contribuições futuras.

---

[1.0.0]: https://github.com/your-username/restaurant-race/releases/tag/v1.0.0
[Unreleased]: https://github.com/your-username/restaurant-race/compare/v1.0.0...HEAD
