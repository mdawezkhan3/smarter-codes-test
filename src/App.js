import React, { useState, useEffect } from 'react';
import RecommendationsTreeView from './components/recommendationsTreeView';
import './App.css';

const App = () => {

  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('https://api.npoint.io/93bed93a99df4c91044e');
      response = await response.json();
      setRecommendations(response.body.Recommendations);
    }
    fetchMyAPI();
  }, [])


  return (
    <div className="recommendations">
      {recommendations && <RecommendationsTreeView recommendations={recommendations} />}
    </div>
  );
}

export default App;