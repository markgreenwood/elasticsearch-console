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
      avgBal: 0
    };

    this.fetchRecs.bind(this);
  }

  componentDidMount() {
    this.fetchRecs();
  }

  async fetchRecs() {
    const numRecs = await axios.get('/bank/accounts/count').then(res => res.data.hits.total);
    const avgBal = await axios.get('/bank/accounts/avg-balance').then(res => res.data.aggregations.avgBalance.value);

    return this.setState({ loading: false, numRecs, avgBal });
  }

  render() {
    const { loading, numRecs, avgBal } = this.state;

    return (
      <div>
        <AppHeading>Hello, Elasticsearch!</AppHeading>
        <StatsPanel
          loading={loading}
          numRecs={numRecs}
          avgBal={avgBal}
        >
        </StatsPanel>
      </div>
    );
  }
}

export default App;
