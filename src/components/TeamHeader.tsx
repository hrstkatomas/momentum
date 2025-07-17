import React from 'react';
import { Team } from '../types/momentum.types';

interface TeamHeaderProps {
  team: Team;
  position: 'top' | 'bottom';
  x: number;
  width: number;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({ team, position, x, width }) => {
  const y = position === 'top' ? 20 : 280;
  
  return (
    <g className="team-header">
      <rect
        x={x}
        y={y - 15}
        width={width}
        height={30}
        fill={team.color}
        fillOpacity={0.1}
        stroke={team.color}
        strokeWidth={1}
        rx={4}
      />
      <text
        x={x + 20}
        y={y + 5}
        fontSize="14"
        fontWeight="bold"
        fill={team.color}
        textAnchor="start"
      >
        {team.logo}
      </text>
      <text
        x={x + 45}
        y={y + 5}
        fontSize="12"
        fill={team.color}
        textAnchor="start"
      >
        {team.name}
      </text>
    </g>
  );
};