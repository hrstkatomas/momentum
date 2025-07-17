import React from 'react';
import { Incident } from '../types/momentum.types';

interface IncidentMarkerProps {
  incident: Incident;
  x: number;
  y: number;
  teamColor: string;
}

export const IncidentMarker: React.FC<IncidentMarkerProps> = ({ 
  incident, 
  x, 
  y, 
  teamColor 
}) => {
  const getIncidentIcon = (type: Incident['type']) => {
    switch (type) {
      case 'goal':
        return '⚽';
      case 'red_card':
        return '🟥';
      case 'yellow_card':
        return '🟨';
      case 'substitution':
        return '🔄';
      default:
        return '•';
    }
  };

  const getIncidentColor = (type: Incident['type']) => {
    switch (type) {
      case 'goal':
        return '#4CAF50';
      case 'red_card':
        return '#F44336';
      case 'yellow_card':
        return '#FFC107';
      case 'substitution':
        return '#2196F3';
      default:
        return teamColor;
    }
  };

  return (
    <g className="incident-marker">
      <circle
        cx={x}
        cy={y}
        r={12}
        fill={getIncidentColor(incident.type)}
        stroke="#fff"
        strokeWidth={2}
        className="incident-circle"
      />
      <text
        x={x}
        y={y + 1}
        fontSize="10"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
      >
        {getIncidentIcon(incident.type)}
      </text>
      
      {/* Tooltip on hover */}
      <title>
        {incident.minute}' - {incident.type.replace('_', ' ').toUpperCase()}
        {incident.playerName && ` - ${incident.playerName}`}
      </title>
    </g>
  );
};