import React from 'react';
import { hooks } from '../../utils';

function BoxScore() {
  const { loading, teamInfo, totals, periods, hitters } = hooks.useFetch(
    'http://127.0.0.1:5037/api/v1/boxscore/mlb'
  );
  function printPeriods(arr) {
    const th = arr.map((number, i) => (
      <th key={i} className="bg-light text-dark " scope="col">
        {i + 1}
      </th>
    ));
    th.push(
      <>
        <th key="r" scope="col">
          R
        </th>
        <th key="h" scope="col">
          H
        </th>
        <th key="e" style={{ borderTop: 'none' }} scope="col">
          E
        </th>
      </>
    );
    return th;
  }
  function printScores(arr, obj) {
    const td = arr.map((number, i) => (
      <td key={i} className="bg-light text-dark ">
        {number}
      </td>
    ));
    td.push(
      <>
        <td key="r1">{obj.runs}</td>
        <td key="h1">{obj.hits}</td>
        <td key="e1">{obj.stolen_bases}</td>
      </>
    );
    return td;
  }
  function printHitters(arr) {
    const td = [];
    td.push(
      <tr>
        <th className="name">Hitters (Away)</th>
        <th className="batting-stats-r">R</th>
        <th className="batting-stats-h">H</th>
        <th className="batting-stats-rbi">RBI</th>
        <th className="batting-stats-k">K</th>
        <th className="batting-stats-avg">AVG</th>
        <th className="batting-stats-obp">OBP</th>
        <th className="batting-stats-slg">SLG</th>
      </tr>
    );
    td.push(
      arr.map((obj, i) => (
        <tr>
          <td key={i} className="name">
            {obj.last_name}
          </td>
          <td key={i} className="batting-stats-h-ab">
            {obj.position}
          </td>
          <td key={i} className="batting-stats-ab">
            {obj.doubles}
          </td>
          <td key={i} className="batting-stats-r">
            {obj.triples}
          </td>
          <td key={i} className="batting-stats-h">
            {obj.hits}
          </td>
          <td key={i} className="batting-stats-rbi">
            {obj.ops}
          </td>
          <td key={i} className="batting-stats-bb">
            {obj.avg}
          </td>
          <td key={i} className="batting-stats-k">
            {obj.walk_rate}
          </td>
          <td key={i} className="batting-stats-p">
            {obj.walks}
          </td>
          <td key={i} className="batting-stats-avg">
            {obj.slg}
          </td>
          <td key={i} className="batting-stats-obp">
            {obj.singles}
          </td>
          <td key={i} className="batting-stats-slg">
            {obj.home_runs}
          </td>
        </tr>
      ))
    );
    return td;
  }
  return (
    <div className="d-flex h-100">
      <div className="row m-auto justify-content-center align-self-center text-center text-dark">
        {/* ========================CENTER======================== */}
        {loading ? (
          <div className="alert alert-warning" role="alert">
            Loading...
          </div>
        ) : (
          <>
            <h1></h1>
            <div className="col-md-12 m-auto">
              {' '}
              <div className="container border text-white">
                <div className="row">
                  <table className="table py-0 my-0 table-dark">
                    <thead>
                      <tr>
                        <th style={{ borderTop: 'none' }} scope="col">
                          {' '}
                        </th>
                        {printPeriods(periods.away)}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{teamInfo.home.abbreviation}</th>
                        {printScores(periods.home, totals.home)}
                      </tr>
                      <tr>
                        <th scope="row">{teamInfo.away.abbreviation}</th>
                        {printScores(periods.away, totals.away)}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-12 mx-auto mb-4 ">
              <div className="container border text-white">
                <div className="row">
                  {' '}
                  <div className="col-md-5 bg-danger">
                    {' '}
                    <h2 className="p-4">{teamInfo.home.last_name}</h2>
                  </div>
                  <div className="col-md-2 bg-dark border-left border-right">
                    {' '}
                    <h2 className="p-4">vs</h2>
                  </div>
                  <div className="col-md-5  bg-success">
                    {' '}
                    <h2 className="p-4">{teamInfo.away.last_name}</h2>
                  </div>
                </div>
              </div>
            </div>{' '}
            <div className="col-md-6 mx-auto mt-0 pt-0">
              <table className="table table-striped">
                <thead>{printHitters(hitters.home)}</thead>
              </table>
            </div>{' '}
            <div className="col-md-6 m-auto">
              <table className="table table-striped">
                <thead>{printHitters(hitters.away)}</thead>
              </table>
            </div>{' '}
          </>
        )}
      </div>
    </div>
  );
}
export default BoxScore;
