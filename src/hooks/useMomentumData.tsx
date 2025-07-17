import { useState, useEffect } from 'react';
import { MatchData, MomentumData } from '../types/momentum.types';
import { MomentumApiService } from '../services/MomentumApiService';

export const useMomentumData = (matchId: string) => {
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [currentMomentum, setCurrentMomentum] = useState<MomentumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiService = new MomentumApiService();
    
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const data = await apiService.getMomentumData(matchId);
        setMatchData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load momentum data');
        console.error('Error loading momentum data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();

    // Subscribe to real-time updates
    const unsubscribe = apiService.subscribeMomentumUpdates(matchId, (momentum) => {
      setCurrentMomentum(momentum);
      if (matchData) {
        setMatchData(prev => prev ? { ...prev, currentMinute: momentum.minute } : null);
      }
    });

    return unsubscribe;
  }, [matchId]);

  return {
    matchData,
    currentMomentum,
    loading,
    error
  };
};