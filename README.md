# Momentum

## Implementation Plan

### Overview
The Momentum feature displays a real-time bar chart showing which team has better momentum at any given minute during a football match. The chart updates every minute using API data and shows incidents like goals and red cards.

### Data Models (TypeScript)

```typescript
// Core data structures
interface Team {
  id: string;
  name: string;
  logo: string;
  color: string;
}

interface Incident {
  id: string;
  type: 'goal' | 'red_card' | 'yellow_card' | 'substitution';
  minute: number;
  teamId: string;
  playerId?: string;
  playerName?: string;
}

interface MomentumData {
  minute: number;
  homeTeamValue: number; // -100 to 100 scale
  awayTeamValue: number;
  incidents: Incident[];
}

interface MatchData {
  matchId: string;
  homeTeam: Team;
  awayTeam: Team;
  momentum: MomentumData[];
  currentMinute: number;
}
```

### React Component Structure

```
MomentumChart/
├── index.tsx                 // Main component export
├── MomentumChart.tsx        // Main chart container
├── components/
│   ├── MomentumBar.tsx      // Individual momentum bar
│   ├── IncidentMarker.tsx   // Goal/card icons
│   ├── TimeAxis.tsx         // Time markers (0', HF, TF)
│   └── TeamHeader.tsx       // Team logos and names
├── hooks/
│   ├── useMomentumData.tsx  // API data fetching
│   └── useChartDimensions.tsx // Responsive sizing
└── types/
    └── momentum.types.ts    // TypeScript definitions
```

### Chart Implementation Options

**Option 1: Pure SVG (Recommended)**
- Lightweight and performant
- Full control over styling and animations
- Easy to make responsive
- Built-in React support

**Option 2: D3.js**
- More powerful for complex visualizations
- Better animation capabilities
- Steeper learning curve
- Larger bundle size

### Key Features

1. **Real-time Updates**: Chart refreshes every minute with new API data
2. **Responsive Design**: Adapts to different screen sizes
3. **Interactive Elements**: Hover states for bars and incidents
4. **Extensible**: Easy to add new incident types
5. **Smooth Animations**: Transitions between data updates

### API Integration

```typescript
// Mock API service structure
class MomentumApiService {
  async getMomentumData(matchId: string): Promise<MatchData>
  async subscribeMomentumUpdates(matchId: string, callback: (data: MomentumData) => void)
}
```

### Implementation Steps

1. Create TypeScript data models
2. Build basic React component structure
3. Implement SVG-based bar chart
4. Add incident markers and icons
5. Integrate mock API data
6. Add real-time updates
7. Style and animate components
8. Add responsive behavior
9. Test with various data scenarios
