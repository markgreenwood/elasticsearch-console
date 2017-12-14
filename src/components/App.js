import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import es from 'elasticsearch';

const esClient = new es.Client({ host: 'localhost:9200' });

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      numRecs: 0
    };

    this.fetchRecs.bind(this);
  }

  componentDidMount() {
    this.fetchRecs();
  }

  async fetchRecs() {
    const recs = await esClient.search({ index: 'bank' });

    return this.setState({ loading: false, numRecs: recs });
  }

  render() {
    return (
      <div>
        <h1>Hello, Elasticsearch!</h1>
        { this.state.loading ? <p>Loading...</p> : <p id="dbStats">Found {this.state.numRecs} records</p> }
      </div>
    );
  }
}

export default App;
