import React from 'react';
import { hooks } from '../../utils';

function BoxScore() {
  const { loading, teamInfo, totals, periods, hitters } = hooks.useFetch(
    '/api/v1/boxscore/mlb'
  );
  function printPeriods(arr, team) {
    const th = [];
    th.push(<th scope="col"></th>);
    th.push(
      arr.map((number, i) => (
        <th key={i + team} className="bg-light text-dark " scope="col">
          {i + 1}
        </th>
      ))
    );
    th.push(
      <>
        <th scope="col">R</th>
        <th scope="col">H</th>
        <th scope="col">E</th>
      </>
    );
    return th;
  }
  function printScores(arr, obj, team) {
    const td = arr.map((number, i) => (
      <td key={i + team} className="bg-light text-dark ">
        {number}
      </td>
    ));
    td.push(
      <>
        <td>{obj.runs}</td>
        <td>{obj.hits}</td>
        <td>{obj.stolen_bases}</td>
      </>
    );
    return td;
  }
  function printHitters(arr, color) {
    const td = [];
    td.push(
      <thead>
        <tr>
          <th style={{ backgroundColor: color }}> Hitters </th>
          <th> H </th>
          <th> AB </th>
          <th> AVG </th>
          <th> K/BB</th>
          <th> SLG </th>
          <th> S </th>
          <th> OPS </th>
          <th> HR </th>
          <th> 2B </th>
          <th> 3B </th>
        </tr>
      </thead>
    );
    td.push(
      arr.map((obj, i) => (
        <tbody key={obj.last_name + i}>
          <tr>
            <th scope="row">
              {obj.last_name}{' '}
              <p
                className="text-muted text-uppercase  p-0 m-0"
                style={{ fontSize: '.6em' }}>
                {obj.position}
              </p>
            </th>
            <td>{obj.hits}</td>
            <td>{obj.walks}</td>
            <td>{obj.avg}</td>
            <td>{obj.walk_rate}</td>
            <td>{obj.slg}</td>
            <td>{obj.singles}</td>
            <td>{obj.ops}</td>
            <td>{obj.home_runs}</td>
            <td>{obj.doubles}</td>
            <td>{obj.triples}</td>
          </tr>
        </tbody>
      ))
    );
    return td;
  }
  return (
    <div className="d-flex h-100">
      <div className="row m-auto justify-content-center align-self-center text-center text-dark w-100">
        {/* ========================CENTER======================== */}
        {loading ? (
          <div className="alert alert-warning" role="alert">
            Loading...
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h1 className="display-4">Chris's Score Box</h1>
                <p className="lead">
                  Rendering from the{' '}
                  <a href="https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json">
                    barstoolsports.com
                  </a>{' '}
                  API
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 m-auto">
                <table className="table-dark text-left border m-auto w-100 text-center ">
                  <thead>{printPeriods(periods.away, 'team')}</thead>
                  <tbody>
                    <tr>
                      <th scope="row">{teamInfo.home.abbreviation}</th>
                      {printScores(periods.home, totals.home, 'home')}
                    </tr>
                    <tr>
                      <th scope="row">{teamInfo.away.abbreviation}</th>
                      {printScores(periods.away, totals.away, 'away')}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mx-auto mb-4 ">
                <div className="container border text-white">
                  <div className="row">
                    <div className="col-md-5 col-sm-12 bg-danger">
                      <h2 className="p-2">{teamInfo.home.last_name}</h2>
                    </div>
                    <div className="col-md-2  bg-dark border-left border-right">
                      <h2 className="p-2">vs</h2>
                    </div>
                    <div className="col-md-5 col-sm-12  bg-success">
                      <h2 className="p-2">{teamInfo.away.last_name}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-sm-12 col-12">
                <h1>HITTERS</h1>
              </div>{' '}
              <div className="col-md-6 col-sm-12 col-12">
                <table className="table table-responsive table-dark text-left border">
                  {printHitters(hitters.home, 'red')}
                </table>
              </div>
              <div className="col-md-6 col-sm-12 col-12">
                <table className="table table-responsive table-dark text-left border">
                  {printHitters(hitters.away, 'green')}
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default BoxScore;
