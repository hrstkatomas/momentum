import { MatchData, MomentumData, Incident } from "../types/momentum.types";

export class MomentumApiService {
  private mockData: MatchData = {
    matchId: "liv-vs-che-2024",
    homeTeam: {
      id: "liverpool",
      name: "Liverpool FC",
      logo: "⚽",
      color: "#C8102E",
    },
    awayTeam: {
      id: "chelsea",
      name: "Chelsea FC",
      logo: "⚽",
      color: "#034694",
    },
    currentMinute: 0,
    momentum: [],
  };

  constructor() {
    this.generateMockData();
  }

  private generateMockData(): void {
    const incidents: Incident[] = [
      {
        id: "1",
        type: "goal",
        minute: 12,
        teamId: "liverpool",
        playerId: "salah",
        playerName: "M. Salah",
      },
      {
        id: "2",
        type: "goal",
        minute: 23,
        teamId: "liverpool",
        playerId: "mane",
        playerName: "S. Mané",
      },
      {
        id: "3",
        type: "red_card",
        minute: 34,
        teamId: "chelsea",
        playerId: "kante",
        playerName: "N. Kanté",
      },
      {
        id: "4",
        type: "goal",
        minute: 67,
        teamId: "chelsea",
        playerId: "mount",
        playerName: "M. Mount",
      },
      {
        id: "5",
        type: "goal",
        minute: 89,
        teamId: "liverpool",
        playerId: "firmino",
        playerName: "R. Firmino",
      },
    ];

    // Generate momentum data for 90 minutes
    for (let minute = 1; minute <= 90; minute++) {
      const minuteIncidents = incidents.filter((i) => i.minute === minute);

      // Calculate momentum based on incidents and random fluctuation
      let homeValue = Math.random() * 60 - 30; // Base random momentum
      let awayValue = -homeValue; // Opposing momentum

      // Adjust for incidents
      minuteIncidents.forEach((incident) => {
        const impact =
          incident.type === "goal"
            ? 40
            : incident.type === "red_card"
            ? -30
            : 0;
        if (incident.teamId === "liverpool") {
          homeValue += impact;
          awayValue -= impact * 0.5;
        } else {
          awayValue += impact;
          homeValue -= impact * 0.5;
        }
      });

      // Normalize values
      homeValue = Math.max(-100, Math.min(100, homeValue));
      awayValue = Math.max(-100, Math.min(100, awayValue));

      this.mockData.momentum.push({
        minute,
        homeTeamValue: homeValue,
        awayTeamValue: awayValue,
        incidents: minuteIncidents,
      });
    }
  }

  async getMomentumData(matchId: string): Promise<MatchData> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return { ...this.mockData };
  }

  subscribeMomentumUpdates(
    matchId: string,
    callback: (data: MomentumData) => void
  ): () => void {
    let currentMinute = 0;

    const interval = setInterval(() => {
      if (currentMinute < this.mockData.momentum.length) {
        callback(this.mockData.momentum[currentMinute]);
        currentMinute++;
      } else {
        clearInterval(interval);
      }
    }, 1000); // Update every second for demo purposes

    return () => clearInterval(interval);
  }
}
