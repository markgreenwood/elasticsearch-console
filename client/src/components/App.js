import React, { Component } from 'react';
import axios from 'axios';

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
    const recs = await axios.get('/bank/accounts').then(res => res.data.hits.total);

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
