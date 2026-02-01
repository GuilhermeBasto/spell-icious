# 🎯 Roadmap & Features Futuras

## Features para Implementar

### 🔥 Prioridade Alta

#### 1. Histórico de Corridas

- [ ] Guardar resultados de corridas anteriores
- [ ] Mostrar estatísticas (restaurante mais escolhido, mais vitorioso)
- [ ] Exportar histórico para CSV/JSON
- [ ] Página dedicada ao histórico com filtros

```typescript
interface RaceHistory {
  id: string;
  date: Date;
  participants: string[];
  winner: string;
  duration: number;
}
```

#### 2. Partilha de Resultados

- [ ] Botão "Partilhar" após corrida
- [ ] Gerar imagem com resultado (canvas/html2canvas)
- [ ] Link para partilhar via WhatsApp/Email/Slack
- [ ] QR Code para partilha rápida

```typescript
// Exemplo
const shareResult = async (winner: string) => {
  if (navigator.share) {
    await navigator.share({
      title: "Restaurant Race Winner!",
      text: `Vamos almoçar em: ${winner}! 🏆`,
      url: window.location.href,
    });
  }
};
```

#### 3. Melhor UX Mobile

- [ ] Gestos de swipe para selecionar/remover
- [ ] Bottom sheet para seleção
- [ ] Modo landscape para corrida
- [ ] Haptic feedback (vibração)
- [ ] PWA (Progressive Web App)

#### 4. Autenticação e Equipas

- [ ] Login com Google/GitHub
- [ ] Criar equipas/grupos
- [ ] Histórico por equipa
- [ ] Votação antes da corrida
- [ ] Notificações para membros da equipa

### 🌟 Prioridade Média

#### 5. Customização de Corrida

- [ ] Escolher emojis personalizados
- [ ] Upload de imagens para corredores
- [ ] Diferentes tipos de corrida (cavalos, carros, naves)
- [ ] Sons e música de fundo
- [ ] Temas (clássico, futurista, retro)

```typescript
interface RaceTheme {
  name: string;
  emojis: string[];
  colors: string[];
  trackStyle: "horses" | "cars" | "space" | "classic";
  backgroundMusic?: string;
}
```

#### 6. Filtros Avançados

- [ ] Filtrar por tipo de cozinha
- [ ] Preço (€, €€, €€€)
- [ ] Distância máxima
- [ ] Rating mínimo
- [ ] Aberto agora
- [ ] Com estacionamento
- [ ] Aceita reservas

```typescript
interface RestaurantFilters {
  cuisine?: string[];
  maxPrice?: number;
  minRating?: number;
  maxDistance?: number;
  openNow?: boolean;
  hasParking?: boolean;
  acceptsReservations?: boolean;
}
```

#### 7. Integração com Calendário

- [ ] Guardar escolha no Google Calendar
- [ ] Reminder antes da hora de almoço
- [ ] Sugestão de horário com base em disponibilidade
- [ ] Sincronizar com Outlook/Apple Calendar

#### 8. Sistema de Veto

- [ ] Cada pessoa pode vetar 1 restaurante
- [ ] Restaurante vetado não entra na corrida
- [ ] Histórico de vetos por pessoa
- [ ] Limite de vetos por semana/mês

### 💡 Prioridade Baixa / Nice to Have

#### 9. Gamificação

- [ ] Pontos por participação
- [ ] Badges e achievements
- [ ] Leaderboard (quem mais ganha corridas)
- [ ] "Streak" de dias consecutivos
- [ ] Recompensas por descobrir novos restaurantes

```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (user: User) => boolean;
}

const achievements: Achievement[] = [
  {
    id: "first_win",
    name: "Primeira Vitória",
    description: "Ganhe a sua primeira corrida",
    icon: "🏆",
    condition: (user) => user.wins > 0,
  },
  // mais...
];
```

#### 10. IA Suggestions

- [ ] Sugestões baseadas em histórico
- [ ] "Hoje parece um dia de comida italiana..." (baseado em weather/mood)
- [ ] Predição de gostos do grupo
- [ ] Recomendações personalizadas

#### 11. Reviews Integrados

- [ ] Ver reviews do Google/Yelp na app
- [ ] Sistema de reviews interno
- [ ] Fotos dos pratos
- [ ] Rating após visita

#### 12. Mapa Interativo

- [ ] Ver restaurantes no mapa
- [ ] Calcular tempo de caminhada
- [ ] Navegação para o restaurante vencedor
- [ ] Street View preview

```typescript
// Exemplo com Google Maps
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

<GoogleMap
  center={{ lat, lng }}
  zoom={15}
>
  {restaurants.map(restaurant => (
    <Marker
      key={restaurant.id}
      position={restaurant.geometry.location}
      onClick={() => setSelected(restaurant)}
    />
  ))}
</GoogleMap>
```

#### 13. Reservas Automáticas

- [ ] Integração com TheFork/OpenTable
- [ ] Fazer reserva automática após corrida
- [ ] Confirmar número de pessoas
- [ ] Horário sugerido

#### 14. Modo Torneio

- [ ] Eliminatórias (quartos, meias, final)
- [ ] Bracket visualization
- [ ] Múltiplas rondas
- [ ] Final com os 2 melhores

#### 15. Multi-idioma

- [ ] Português 🇵🇹
- [ ] Inglês 🇬🇧
- [ ] Espanhol 🇪🇸
- [ ] Francês 🇫🇷

```typescript
// i18n com react-i18next
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<h1>{t('home.title')}</h1>
```

## Melhorias Técnicas

### Performance

- [ ] Code splitting por rota
- [ ] Lazy loading de componentes
- [ ] Image optimization (next/image equivalente)
- [ ] Service Worker para offline
- [ ] Skeleton screens durante loading

### Testing

- [ ] Unit tests (Vitest)
- [ ] Integration tests (Testing Library)
- [ ] E2E tests (Playwright)
- [ ] Visual regression tests

```bash
# Adicionar testing
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
```

### Acessibilidade

- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] High contrast mode
- [ ] Reduced motion option

### Analytics

- [ ] Track user behavior
- [ ] A/B testing
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring

### SEO

- [ ] Meta tags dinâmicos
- [ ] Open Graph images
- [ ] Sitemap
- [ ] Robots.txt
- [ ] Structured data

## Integrações Externas

### Possíveis Integrações

- [ ] **Slack** - Bot para iniciar corridas
- [ ] **Discord** - Comando /lunch-race
- [ ] **Microsoft Teams** - Tab app
- [ ] **WhatsApp** - Bot
- [ ] **Uber Eats / Glovo** - Encomendar direto
- [ ] **Zomato / Yelp** - Reviews extras
- [ ] **OpenTable** - Reservas
- [ ] **Weather API** - Sugestões baseadas no clima

## UI/UX Improvements

### Design

- [ ] Dark mode toggle explícito
- [ ] Temas customizáveis
- [ ] Animations mais suaves (Framer Motion)
- [ ] Micro-interactions
- [ ] Loading states melhores

### Acessibilidade

- [ ] Font size adjustable
- [ ] Color blind mode
- [ ] Dyslexia-friendly font option

## Backend (Se necessário)

Se crescer e precisar de backend:

```typescript
// API Routes possíveis
POST   /api/teams          // Criar equipa
GET    /api/teams/:id      // Detalhes da equipa
POST   /api/races          // Guardar resultado
GET    /api/races/history  // Histórico
POST   /api/votes          // Sistema de votação
GET    /api/stats          // Estatísticas
```

### Database Schema

```sql
-- Equipas
CREATE TABLE teams (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  created_at TIMESTAMP
);

-- Membros
CREATE TABLE members (
  id UUID PRIMARY KEY,
  team_id UUID REFERENCES teams(id),
  name VARCHAR(255),
  email VARCHAR(255)
);

-- Corridas
CREATE TABLE races (
  id UUID PRIMARY KEY,
  team_id UUID REFERENCES teams(id),
  date TIMESTAMP,
  winner VARCHAR(255),
  participants TEXT[]
);

-- Vetos
CREATE TABLE vetos (
  id UUID PRIMARY KEY,
  member_id UUID REFERENCES members(id),
  restaurant_name VARCHAR(255),
  date TIMESTAMP
);
```

## Monetização (Opcional)

Se quiser monetizar no futuro:

### Premium Features

- [ ] Equipas ilimitadas (free: 1 equipa)
- [ ] Histórico ilimitado (free: 30 dias)
- [ ] Temas premium
- [ ] Sem ads
- [ ] Analytics avançados
- [ ] API access

### Pricing Sugerido

- **Free**: Uso básico
- **Pro**: €4.99/mês por equipa
- **Enterprise**: Custom pricing para empresas

## Contribuição

Gostarias de implementar alguma destas features?

1. Fork o projeto
2. Cria um branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Abre Pull Request

## Priorização

Use este critério para decidir ordem de implementação:

**Impact × Effort Matrix:**

```
High Impact, Low Effort  → Fazer AGORA
High Impact, High Effort → Planejar
Low Impact, Low Effort   → Quick wins
Low Impact, High Effort  → Evitar (a não ser que seja muito pedido)
```

## Feedback

Tem ideias? Abre uma issue no GitHub ou contacta!

---

**Nota**: Este é um roadmap vivo. Prioridades podem mudar baseado em feedback dos utilizadores!
