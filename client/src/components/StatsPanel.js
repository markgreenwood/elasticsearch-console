import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

export const StatsPanelStyle = styled.div`
  background-color: #127d5e;
  color: white;
  font-family: Raleway, sans-serif;
  padding: 10px;
  line-height: normal;
  text-align: center;
  max-width: 500px;
  border-radius: 5px;
`;

export function StatsPanel({ loading, numRecs, avgBal, minBal, maxBal }) {
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
          <p>Found {numRecs} accounts</p>
          <p>Avg balance {formatter.format(avgBal)}</p>
          <p>Min balance {formatter.format(minBal)}</p>
          <p>Max balance {formatter.format(maxBal)}</p>
        </div>
      }
    </StatsPanelStyle>
  );
}

StatsPanel.propTypes = {
  loading: PropTypes.bool,
  numRecs: PropTypes.number,
  avgBal: PropTypes.number,
  minBal: PropTypes.number,
  maxBal: PropTypes.number,
};