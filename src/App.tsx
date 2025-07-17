import React, { useState } from 'react';
import { MomentumChart } from './components';
import { useMomentumData } from './hooks/useMomentumData';
import './App.css';

const App: React.FC = () => {
  const [selectedMatch] = useState('liv-vs-che-2024');
  const { matchData, currentMomentum, loading, error } = useMomentumData(selectedMatch);

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading momentum data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error">
          <h2>Error Loading Data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!matchData) {
    return (
      <div className="app-container">
        <div className="no-data">
          <p>No match data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>⚽ Momentum Analytics</h1>
        <p>Real-time football momentum tracking</p>
      </header>

      <main className="app-main">
        <div className="match-info">
          <div className="team-info">
            <span className="team-logo">{matchData.homeTeam.logo}</span>
            <span className="team-name">{matchData.homeTeam.name}</span>
          </div>
          <div className="vs">VS</div>
          <div className="team-info">
            <span className="team-logo">{matchData.awayTeam.logo}</span>
            <span className="team-name">{matchData.awayTeam.name}</span>
          </div>
        </div>

        <div className="chart-container">
          <MomentumChart 
            matchData={matchData}
            currentMomentum={currentMomentum}
            height={400}
          />
        </div>

        <div className="stats-panel">
          <div className="stat-card">
            <h3>Current Minute</h3>
            <div className="stat-value">{matchData.currentMinute || 0}'</div>
          </div>
          
          {currentMomentum && (
            <>
              <div className="stat-card">
                <h3>Home Momentum</h3>
                <div className="stat-value" style={{ color: matchData.homeTeam.color }}>
                  {currentMomentum.homeTeamValue.toFixed(1)}
                </div>
              </div>
              
              <div className="stat-card">
                <h3>Away Momentum</h3>
                <div className="stat-value" style={{ color: matchData.awayTeam.color }}>
                  {currentMomentum.awayTeamValue.toFixed(1)}
                </div>
              </div>
              
              <div className="stat-card">
                <h3>Incidents</h3>
                <div className="stat-value">{currentMomentum.incidents.length}</div>
              </div>
            </>
          )}
        </div>

        <div className="legend">
          <h3>Legend</h3>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-icon">⚽</span>
              <span>Goal</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">🟥</span>
              <span>Red Card</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">🟨</span>
              <span>Yellow Card</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">🔄</span>
              <span>Substitution</span>
            </div>
          </div>
        </div>

        <div className="features-showcase">
          <h2>✨ Feature Showcase</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h4>📊 Real-time Updates</h4>
              <p>Chart updates every second with new momentum data and incidents</p>
            </div>
            <div className="feature-card">
              <h4>🎯 Interactive Elements</h4>
              <p>Hover over bars and incident markers for detailed information</p>
            </div>
            <div className="feature-card">
              <h4>📱 Responsive Design</h4>
              <p>Adapts to different screen sizes and device orientations</p>
            </div>
            <div className="feature-card">
              <h4>🔧 Extensible Architecture</h4>
              <p>Easy to add new incident types and team data</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;