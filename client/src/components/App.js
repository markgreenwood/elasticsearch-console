import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { StatsPanel } from './StatsPanel';

const AppHeading = styled.h1`
  font-family: Spectral, serif;
  text-align: center;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      stats: {
        count: 0,
        avgBalance: 0,
        minBalance: 0,
        maxBalance: 0
      }
    };

    this.fetchRecs.bind(this);
  }

  componentDidMount() {
    this.fetchRecs();
  }

  async fetchRecs() {
    const aggregations = await axios.get('/bank/accounts/stats').then(res => res.data.aggregations);

    const count = aggregations.acctStats.count;
    const avgBalance = aggregations.acctStats.avg;
    const minBalance = aggregations.acctStats.min;
    const maxBalance = aggregations.acctStats.max;
    const sumBalance = aggregations.acctStats.sum;

    return this.setState({ loading: false, stats: { count, avgBalance, minBalance, maxBalance, sumBalance } });
  }

  render() {
    const { loading, stats } = this.state;

    return (
      <div align="center">
        <AppHeading>Hello, Elasticsearch!</AppHeading>
        <StatsPanel
          loading={loading}
          stats={stats}
        >
        </StatsPanel>
      </div>
    );
  }
}

export default App;
