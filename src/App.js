import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import RecommendationsTreeView from './components/recommendationsTreeView';
import './App.css';

// const useStyles = makeStyles({
//   root: {
//     height: 216,
//     flexGrow: 1,
//     maxWidth: 400,
//   },
// });

const App = () => {

  // const classes = useStyles();
  const [recommendations, setRecommendations] = useState(null);

  useEffect(async () => {
    const response = await fetch('https://api.npoint.io/93bed93a99df4c91044e');
    const data = await response.json();
    setRecommendations(data.body.Recommendations);
  }, []);


  return (
    <div className="recommendations">
      {recommendations && <RecommendationsTreeView recommendations={recommendations} />}
    </div>
  );
}

export default App;