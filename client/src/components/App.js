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
      numRecs: 0,
      avgBal: 0,
      minBal: 0,
      maxBal: 0
    };

    this.fetchRecs.bind(this);
  }

  componentDidMount() {
    this.fetchRecs();
  }

  async fetchRecs() {
    const [numRecs, aggregations] = await Promise.all([
      axios.get('/bank/accounts/count').then(res => res.data.hits.total),
      axios.get('/bank/accounts/avg-balance').then(res => res.data.aggregations)
    ]);

    const avgBal = aggregations.avgBalance.value;
    const minBal = aggregations.minBalance.value;
    const maxBal = aggregations.maxBalance.value;

    return this.setState({ loading: false, numRecs, avgBal, minBal, maxBal });
  }

  render() {
    const { loading, numRecs, avgBal, minBal, maxBal } = this.state;

    return (
      <div align="center">
        <AppHeading>Hello, Elasticsearch!</AppHeading>
        <StatsPanel
          loading={loading}
          numRecs={numRecs}
          avgBal={avgBal}
          minBal={minBal}
          maxBal={maxBal}
        >
        </StatsPanel>
      </div>
    );
  }
}

export default App;
