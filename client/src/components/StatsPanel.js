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

export function StatsPanel({ loading, count, avgBalance, minBalance, maxBalance }) {
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
          <p>Found {count} accounts</p>
          <p>Avg balance {formatter.format(avgBalance)}</p>
          <p>Min balance {formatter.format(minBalance)}</p>
          <p>Max balance {formatter.format(maxBalance)}</p>
        </div>
      }
    </StatsPanelStyle>
  );
}

StatsPanel.propTypes = {
  loading: PropTypes.bool,
  count: PropTypes.number,
  avgBalance: PropTypes.number,
  minBalance: PropTypes.number,
  maxBalance: PropTypes.number,
};