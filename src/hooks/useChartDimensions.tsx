import { useState, useEffect } from 'react';
import { ChartDimensions } from '../types/momentum.types';

export const useChartDimensions = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [dimensions, setDimensions] = useState<ChartDimensions>({
    width: 800,
    height: 300,
    margin: {
      top: 60,
      right: 40,
      bottom: 40,
      left: 40
    }
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = Math.max(300, containerWidth * 0.4);
        
        setDimensions({
          width: containerWidth,
          height: containerHeight,
          margin: {
            top: 60,
            right: 40,
            bottom: 40,
            left: 40
          }
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, [containerRef]);

  return dimensions;
};