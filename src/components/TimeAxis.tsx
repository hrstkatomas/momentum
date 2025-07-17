import React from 'react';

interface TimeAxisProps {
  width: number;
  height: number;
  totalMinutes: number;
  currentMinute: number;
}

export const TimeAxis: React.FC<TimeAxisProps> = ({ 
  width, 
  height, 
  totalMinutes, 
  currentMinute 
}) => {
  const centerY = height / 2;
  const timeMarkers = [
    { minute: 0, label: "0'" },
    { minute: 45, label: "HT" },
    { minute: 90, label: "FT" }
  ];

  return (
    <g className="time-axis">
      {/* Center line */}
      <line
        x1={0}
        y1={centerY}
        x2={width}
        y2={centerY}
        stroke="#e0e0e0"
        strokeWidth={2}
      />
      
      {/* Time markers */}
      {timeMarkers.map((marker) => {
        const x = (marker.minute / totalMinutes) * width;
        return (
          <g key={marker.minute}>
            <line
              x1={x}
              y1={centerY - 10}
              x2={x}
              y2={centerY + 10}
              stroke="#666"
              strokeWidth={1}
            />
            <text
              x={x}
              y={centerY + 25}
              fontSize="12"
              fill="#666"
              textAnchor="middle"
            >
              {marker.label}
            </text>
          </g>
        );
      })}
      
      {/* Current time indicator */}
      {currentMinute > 0 && (
        <g className="current-time">
          <line
            x1={(currentMinute / totalMinutes) * width}
            y1={50}
            x2={(currentMinute / totalMinutes) * width}
            y2={height - 50}
            stroke="#ff6b35"
            strokeWidth={2}
            strokeDasharray="4,4"
          />
          <text
            x={(currentMinute / totalMinutes) * width}
            y={40}
            fontSize="12"
            fill="#ff6b35"
            textAnchor="middle"
            fontWeight="bold"
          >
            {currentMinute}'
          </text>
        </g>
      )}
    </g>
  );
};