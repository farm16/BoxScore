import React from 'react';
import axios from 'axios';

export const hooks = {
  useFetch: url => {
    const [teamInfo, setTeamInfo] = React.useState(null);
    const [periods, setPeriods] = React.useState(null);
    const [totals, setTotals] = React.useState(null);
    const [hitters, setHitters] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const fetchData = () => {
      axios(url)
        .then(res => {
          console.log(res.data);
          setTeamInfo({
            home: res.data.home_team,
            away: res.data.away_team
          });
          setTotals({
            home: res.data.home_batter_totals,
            away: res.data.away_batter_totals
          });
          setPeriods({
            home: res.data.home_period_scores,
            away: res.data.away_period_scores
          });
          setHitters({
            home: res.data.away_batters,
            away: res.data.home_batters
          });
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    };

    React.useEffect(() => {
      fetchData();
      const interval = setInterval(() => {
        console.log('calling every 5 secs');
        fetchData();
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return { loading, hitters, teamInfo, totals, periods };
  }
};
