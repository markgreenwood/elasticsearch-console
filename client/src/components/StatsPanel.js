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

const Column = props => (<div className={`col-sm pull-${props.align}`} style={{ textAlign: props.align }}>{props.children}</div>);

Column.propTypes = {
  children: PropTypes.node,
  align: PropTypes.string
};

Column.defaultProps = {
  children: '',
  align: 'left'
};

const Row = props => (<div className="row">{props.children}</div>);

Row.propTypes = {
  children: PropTypes.node
};

Row.defaultProps = {
  children: ''
};

export function StatsItem({ label, value }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  return (
    <Row>
      <Column align="left">{label}</Column>
      <Column align="right">{formatter.format(value)}</Column>
    </Row>
  );
}

StatsItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
};

StatsItem.defaultProps = {
  label: 'label',
  value: 'value'
};

export function StatsPanel({ loading, stats }) {
  const { count, avgBalance, minBalance, maxBalance, sumBalance } = stats;

  return (
    <StatsPanelStyle>
      { loading ?
        <p>Loading...</p> :
        <div>
          <p>Found {count} accounts</p>
          <StatsItem label="Average account balance" value={`${avgBalance}`} />
          <StatsItem label="Minimum account balance" value={`${minBalance}`} />
          <StatsItem label="Maximum account balance" value={`${maxBalance}`} />
          <StatsItem label="Total balance of all accounts" value={`${sumBalance}`} />
        </div>
      }
    </StatsPanelStyle>
  );
}

StatsPanel.propTypes = {
  loading: PropTypes.bool,
  stats: PropTypes.shape({
    count: PropTypes.number,
    avgBalance: PropTypes.number,
    minBalance: PropTypes.number,
    maxBalance: PropTypes.number
  })
};