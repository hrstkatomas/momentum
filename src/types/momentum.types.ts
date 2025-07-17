export interface Team {
  id: string;
  name: string;
  logo: string;
  color: string;
}

export interface Incident {
  id: string;
  type: 'goal' | 'red_card' | 'yellow_card' | 'substitution';
  minute: number;
  teamId: string;
  playerId?: string;
  playerName?: string;
}

export interface MomentumData {
  minute: number;
  homeTeamValue: number; // -100 to 100 scale
  awayTeamValue: number;
  incidents: Incident[];
}

export interface MatchData {
  matchId: string;
  homeTeam: Team;
  awayTeam: Team;
  momentum: MomentumData[];
  currentMinute: number;
}

export interface ChartDimensions {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}