import React from 'react';
import es from 'elasticsearch';

const esClient = new es.Client({ host: 'localhost:9200' });

function App() {

  const html = (numRecs) => (
    <div>
      <h1>Hello, Elasticsearch!</h1>
      <div>
        <p id="dbStats">Found {numRecs} records</p>
      </div>
    </div>
  );

  return esClient.search({ index: 'bank' }).then(resp => resp.hits.total)
    .then(numRecs => html(numRecs));
}

export default App;
