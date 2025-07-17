import React, { useRef, useEffect, useState } from 'react';
import { MatchData, MomentumData } from '../types/momentum.types';
import { useChartDimensions } from '../hooks/useChartDimensions';
import { MomentumBar } from './MomentumBar';
import { TeamHeader } from './TeamHeader';
import { TimeAxis } from './TimeAxis';

interface MomentumChartProps {
  matchData: MatchData;
  currentMomentum?: MomentumData | null;
  height?: number;
}

export const MomentumChart: React.FC<MomentumChartProps> = ({ 
  matchData, 
  currentMomentum,
  height = 400 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useChartDimensions(containerRef);
  const [animatedMomentum, setAnimatedMomentum] = useState<MomentumData[]>([]);

  const chartWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  const chartHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
  const centerY = chartHeight / 2;
  const maxBarHeight = chartHeight / 3;

  // Animate momentum data updates
  useEffect(() => {
    if (currentMomentum) {
      setAnimatedMomentum(prev => {
        const newData = [...prev];
        const existingIndex = newData.findIndex(m => m.minute === currentMomentum.minute);
        
        if (existingIndex >= 0) {
          newData[existingIndex] = currentMomentum;
        } else {
          newData.push(currentMomentum);
        }
        
        return newData.sort((a, b) => a.minute - b.minute);
      });
    }
  }, [currentMomentum]);

  // Use either animated data or full match data
  const displayData = animatedMomentum.length > 0 ? animatedMomentum : matchData.momentum;
  const totalMinutes = 90;
  const barWidth = chartWidth / totalMinutes;

  return (
    <div 
      ref={containerRef} 
      className="momentum-chart-container"
      style={{ width: '100%', height: `${height}px` }}
    >
      <svg 
        width={dimensions.width} 
        height={dimensions.height}
        style={{ background: '#fafafa', borderRadius: '8px' }}
      >
        <g transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}>
          {/* Team Headers */}
          <TeamHeader
            team={matchData.homeTeam}
            position="top"
            x={0}
            width={chartWidth / 2 - 10}
          />
          <TeamHeader
            team={matchData.awayTeam}
            position="bottom"
            x={chartWidth / 2 + 10}
            width={chartWidth / 2 - 10}
          />
          
          {/* Time Axis */}
          <TimeAxis
            width={chartWidth}
            height={chartHeight}
            totalMinutes={totalMinutes}
            currentMinute={matchData.currentMinute}
          />
          
          {/* Momentum Bars */}
          {displayData.map((momentum, index) => {
            const x = (momentum.minute - 1) * barWidth;
            
            return (
              <MomentumBar
                key={momentum.minute}
                data={momentum}
                x={x}
                width={barWidth - 1}
                centerY={centerY}
                maxBarHeight={maxBarHeight}
                homeTeamColor={matchData.homeTeam.color}
                awayTeamColor={matchData.awayTeam.color}
                homeTeamId={matchData.homeTeam.id}
                awayTeamId={matchData.awayTeam.id}
              />
            );
          })}
          
          {/* Chart Title */}
          <text
            x={chartWidth / 2}
            y={-20}
            fontSize="16"
            fontWeight="bold"
            fill="#333"
            textAnchor="middle"
          >
            Live Momentum Chart
          </text>
        </g>
      </svg>
    </div>
  );
};