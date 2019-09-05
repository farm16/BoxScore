import React from 'react';
import { R_OK } from 'constants';

function BoxScore() {
  function periods(num) {
    let th = [];
    for (let i = 0; i < num; i++) {
      th.push(
        <th className="bg-light text-dark " scope="col">
          {i + 1}
        </th>
      );
    }
    th.push(
      <>
        <th scope="col">R</th>
        <th scope="col">H</th>
        <th style={{ borderTop: 'none' }} scope="col">
          E
        </th>
      </>
    );
    return th;
  }

  return (
    <div className="d-flex h-100">
      <div className="row m-auto justify-content-center align-self-center text-center text-dark">
        {/* ========================CENTER======================== */}
        <div className="col-md-12 m-auto">
          <table className="table py-0 my-0 table-dark">
            <thead>
              <tr>
                <th style={{ borderTop: 'none' }} scope="col"></th>
                {periods(9)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">home</th>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <th scope="row">away</th>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td className="bg-white text-dark">0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-12 m-auto">
          <div className="container border text-white">
            <div className="row">
              {' '}
              <div className="col-md-5 bg-danger">
                {' '}
                <h2 className="p-4">away</h2>
              </div>
              <div className="col-md-2 bg-dark border-left border-right">
                {' '}
                <h2 className="p-4">vs</h2>
              </div>
              <div className="col-md-5  bg-success">
                {' '}
                <h2 className="p-4">away</h2>
              </div>
            </div>
          </div>
        </div>{' '}
      </div>
    </div>
  );
}
export default BoxScore;
