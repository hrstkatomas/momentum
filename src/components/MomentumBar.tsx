import React from "react";
import { MomentumData } from "../types/momentum.types";
import { IncidentMarker } from "./IncidentMarker";

interface MomentumBarProps {
  data: MomentumData;
  x: number;
  width: number;
  centerY: number;
  maxBarHeight: number;
  homeTeamColor: string;
  awayTeamColor: string;
  homeTeamId: string;
  awayTeamId: string;
}

export const MomentumBar: React.FC<MomentumBarProps> = ({
  data,
  x,
  width,
  centerY,
  maxBarHeight,
  homeTeamColor,
  awayTeamColor,
  homeTeamId,
  awayTeamId,
}) => {
  // Calculate bar heights based on momentum values
  const homeBarHeight = Math.abs(data.homeTeamValue) * (maxBarHeight / 100);
  const awayBarHeight = Math.abs(data.awayTeamValue) * (maxBarHeight / 100);

  // Determine if momentum is positive (above center) or negative (below center)
  const homeY = data.homeTeamValue >= 0 ? centerY - homeBarHeight : centerY;
  const awayY = data.awayTeamValue >= 0 ? centerY - awayBarHeight : centerY;

  return (
    <g className="momentum-bar">
      {/* Home team bar */}
      {data.homeTeamValue !== 0 && (
        <rect
          x={x}
          y={homeY}
          width={width}
          rx={4}
          height={homeBarHeight}
          fill={homeTeamColor}
          fillOpacity={0.8}
          stroke={homeTeamColor}
          strokeWidth={0.5}
          className="momentum-bar-rect"
        >
          <title>
            Minute {data.minute}: {Math.abs(data.homeTeamValue).toFixed(1)}{" "}
            momentum
          </title>
        </rect>
      )}

      {/* Away team bar */}
      {data.awayTeamValue !== 0 && (
        <rect
          x={x}
          y={awayY}
          width={width}
          rx={4}
          height={awayBarHeight}
          fill={awayTeamColor}
          fillOpacity={0.8}
          stroke={awayTeamColor}
          strokeWidth={0.5}
          className="momentum-bar-rect"
        >
          <title>
            Minute {data.minute}: {Math.abs(data.awayTeamValue).toFixed(1)}{" "}
            momentum
          </title>
        </rect>
      )}

      {/* Incident markers */}
      {data.incidents.map((incident, index) => {
        const isHomeTeam = incident.teamId === homeTeamId;
        const incidentY = isHomeTeam
          ? data.homeTeamValue >= 0
            ? centerY - homeBarHeight - 20
            : centerY + homeBarHeight + 20
          : data.awayTeamValue >= 0
          ? centerY - awayBarHeight - 20
          : centerY + awayBarHeight + 20;

        return (
          <IncidentMarker
            key={incident.id}
            incident={incident}
            x={x + width / 2}
            y={incidentY}
            teamColor={isHomeTeam ? homeTeamColor : awayTeamColor}
          />
        );
      })}
    </g>
  );
};
