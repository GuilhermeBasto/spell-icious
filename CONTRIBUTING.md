# 🤝 Guia de Contribuição

Obrigado pelo interesse em contribuir para o Restaurant Race! Este guia vai ajudar-te a começar.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Setup de Desenvolvimento](#setup-de-desenvolvimento)
- [Guidelines](#guidelines)
- [Pull Requests](#pull-requests)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Features](#sugerir-features)

## 📜 Código de Conduta

Este projeto segue um código de conduta simples:

- 🤝 Sê respeitoso e inclusivo
- 💬 Comunica de forma construtiva
- 🎯 Foca no problema, não na pessoa
- 🌟 Celebra as contribuições de todos

## 🚀 Como Contribuir

Há várias formas de contribuir:

### 1. 🐛 Reportar Bugs

Encontraste um bug? [Abre uma issue](https://github.com/your-username/restaurant-race/issues/new)

### 2. 💡 Sugerir Features

Tens uma ideia? Partilha connosco! Ver [ROADMAP.md](./ROADMAP.md) para features planeadas.

### 3. 📝 Melhorar Documentação

Documentação nunca é demais! Corrige typos, clarifica instruções, adiciona exemplos.

### 4. 💻 Escrever Código

Implementa features, corrige bugs, otimiza performance.

### 5. 🎨 Design

Melhora UI/UX, cria assets, sugere melhorias visuais.

## 🛠️ Setup de Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm 9+ ou yarn
- Git
- Editor de código (recomendado: VS Code)

### Instalação

1. **Fork o repositório**
   - Clica em "Fork" no GitHub

2. **Clone o teu fork**

   ```bash
   git clone https://github.com/your-username/restaurant-race.git
   cd restaurant-race
   ```

3. **Instala dependências**

   ```bash
   npm install
   ```

4. **Configura variáveis de ambiente** (opcional)

   ```bash
   cp .env.example .env
   # Edita .env e adiciona a tua Google Places API key
   ```

5. **Inicia servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

6. **Abre no browser**
   - Acede a `http://localhost:5173`

### Estrutura de Branches

```
main          - Código em produção (protegido)
develop       - Branch de desenvolvimento (usar como base)
feature/*     - Features novas
bugfix/*      - Correções de bugs
hotfix/*      - Correções urgentes para produção
docs/*        - Mudanças em documentação
```

### Criar uma Branch

```bash
# Atualiza develop
git checkout develop
git pull origin develop

# Cria nova branch
git checkout -b feature/nome-da-feature
# ou
git checkout -b bugfix/nome-do-bug
```

## 📏 Guidelines

### Code Style

#### TypeScript

- Usa TypeScript sempre que possível
- Define tipos explícitos
- Evita `any`

```typescript
// ✅ Bom
interface Restaurant {
  id: string;
  name: string;
  address: string;
}

function getRestaurant(id: string): Restaurant | null {
  // ...
}

// ❌ Evitar
function getRestaurant(id: any): any {
  // ...
}
```

#### React

- Usa componentes funcionais
- Prefere hooks aos class components
- Componentes pequenos e reutilizáveis

```tsx
// ✅ Bom
export default function RestaurantCard({ restaurant }: Props) {
  const [selected, setSelected] = useState(false);

  return <div onClick={() => setSelected(!selected)}>{restaurant.name}</div>;
}

// ❌ Evitar componentes gigantes
```

#### Tailwind CSS

- Usa classes utilitárias
- Evita CSS customizado quando possível
- Mantém consistência

```tsx
// ✅ Bom
<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
  Click me
</button>

// ❌ Evitar
<button style={{ backgroundColor: '#3b82f6', ... }}>
  Click me
</button>
```

### Naming Conventions

#### Ficheiros

- Componentes: `PascalCase.tsx`
- Utilitários: `camelCase.ts`
- Rotas: `kebab-case.tsx`

```
✅ components/RestaurantCard.tsx
✅ lib/placesApi.ts
✅ routes/select-restaurant.tsx
```

#### Variáveis e Funções

```typescript
// ✅ Bom
const restaurantList = [];
function fetchRestaurants() {}
const isLoading = false;

// ❌ Evitar
const RestaurantList = [];
function FetchRestaurants() {}
const loading = false; // pouco descritivo
```

#### Componentes

```typescript
// ✅ Bom
export default function RestaurantCard() {}

// ❌ Evitar
export default function restaurant_card() {}
```

### Commits

Usa [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

#### Types

- `feat`: Nova feature
- `fix`: Bug fix
- `docs`: Documentação
- `style`: Formatação, sem mudança de lógica
- `refactor`: Refactoring
- `test`: Adicionar/modificar tests
- `chore`: Tarefas de manutenção

#### Exemplos

```bash
git commit -m "feat(race): add countdown before race starts"
git commit -m "fix(select): resolve duplicate restaurant selection"
git commit -m "docs(readme): add setup instructions"
git commit -m "style(race): improve mobile layout"
git commit -m "refactor(places): extract API calls to separate file"
```

### Testing

#### Antes de Submeter PR

```bash
# Type check
npm run typecheck

# Build (verifica se compila)
npm run build

# Lint (se tiver configurado)
npm run lint
```

#### Testa Manualmente

- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] Mobile (iOS, Android)
- [ ] Dark mode
- [ ] Light mode
- [ ] Com e sem API key

## 🔄 Pull Requests

### Processo

1. **Cria uma branch** (ver acima)

2. **Faz as tuas mudanças**
   - Commits pequenos e focados
   - Mensagens de commit descritivas

3. **Push para o teu fork**

   ```bash
   git push origin feature/nome-da-feature
   ```

4. **Abre Pull Request**
   - Vai ao GitHub
   - Clica "New Pull Request"
   - Base: `develop` ← Compare: `feature/nome-da-feature`
   - Preenche o template

### Template de PR

```markdown
## Descrição

Breve descrição das mudanças

## Tipo de Mudança

- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Como Testar

1. Passo 1
2. Passo 2
3. Resultado esperado

## Screenshots (se aplicável)

![before](url)
![after](url)

## Checklist

- [ ] Código segue as guidelines
- [ ] Testei localmente
- [ ] Documentação atualizada
- [ ] Build passa
```

### Code Review

- Todos os PRs precisam de review
- Responde a feedback construtivamente
- Fazes as mudanças pedidas
- Mantém discussões técnicas

## 🐛 Reportar Bugs

### Template de Issue

```markdown
**Descrição do Bug**
Descrição clara do problema

**Como Reproduzir**

1. Vai para '...'
2. Clica em '...'
3. Vê erro

**Comportamento Esperado**
O que deveria acontecer

**Screenshots**
Se aplicável

**Ambiente**

- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome 120, Firefox 121]
- Versão: [e.g. 1.0.0]

**Contexto Adicional**
Qualquer outra informação relevante
```

### Prioridades

- 🔴 **Critical**: App não funciona, data loss
- 🟠 **High**: Feature principal quebrada
- 🟡 **Medium**: Feature secundária com workaround
- 🟢 **Low**: Problema cosmético

## 💡 Sugerir Features

### Template

```markdown
**Problema/Motivação**
Qual problema isto resolve?

**Solução Proposta**
Como funcionaria?

**Alternativas Consideradas**
Outras abordagens?

**Contexto Adicional**
Screenshots, mockups, links
```

### Antes de Sugerir

1. Verifica [ROADMAP.md](./ROADMAP.md)
2. Procura issues existentes
3. Considera escopo e impacto

## 🎯 Áreas que Precisam de Ajuda

Vê issues com estas labels:

- `good first issue` - Bom para começar
- `help wanted` - Precisamos de ajuda
- `bug` - Bugs para corrigir
- `enhancement` - Melhorias
- `documentation` - Docs para melhorar

## 📞 Comunicação

- **Issues**: Para bugs e features
- **Discussions**: Para perguntas e ideias
- **PR Comments**: Para discussão técnica específica

## 🙏 Reconhecimento

Todos os contribuidores serão adicionados ao README!

## 📄 Licença

Ao contribuir, concordas que as tuas contribuições serão licenciadas sob a MIT License.

---

**Obrigado por contribuir! 🎉**

Qualquer dúvida? Abre uma issue ou discussion!
