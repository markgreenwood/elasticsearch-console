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
      count: 0,
      avgBalance: 0,
      minBalance: 0,
      maxBalance: 0
    };

    this.fetchRecs.bind(this);
  }

  componentDidMount() {
    this.fetchRecs();
  }

  async fetchRecs() {
    const [count, aggregations] = await Promise.all([
      axios.get('/bank/accounts/count').then(res => res.data.hits.total),
      axios.get('/bank/accounts/avg-balance').then(res => res.data.aggregations)
    ]);

    const avgBalance = aggregations.avgBalance.value;
    const minBalance = aggregations.minBalance.value;
    const maxBalance = aggregations.maxBalance.value;

    return this.setState({ loading: false, count, avgBalance, minBalance, maxBalance });
  }

  render() {
    const { loading, count, avgBalance, minBalance, maxBalance } = this.state;

    return (
      <div align="center">
        <AppHeading>Hello, Elasticsearch!</AppHeading>
        <StatsPanel
          loading={loading}
          count={count}
          avgBalance={avgBalance}
          minBalance={minBalance}
          maxBalance={maxBalance}
        >
        </StatsPanel>
      </div>
    );
  }
}

export default App;
