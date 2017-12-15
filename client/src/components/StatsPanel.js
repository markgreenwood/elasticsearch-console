import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

export const StatsPanelStyle = styled.div`
  background-color: #127d5e;
  color: white;
  font-family: Roboto, sans-serif;
  padding: 10px;
  line-height: normal;
  text-align: center;
`;

export function StatsPanel({ loading, numRecs, avgBal }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  return (
    <StatsPanelStyle>
      { loading ?
        <p>Loading...</p> :
        <div>
          <p id="acctCount">Found {numRecs} accounts</p>
          <p id="acctAvgBal">Avg balance {formatter.format(avgBal)}</p>
        </div>
      }
    </StatsPanelStyle>
  );
}

StatsPanel.propTypes = {
  loading: PropTypes.bool,
  numRecs: PropTypes.number,
  avgBal: PropTypes.number
};