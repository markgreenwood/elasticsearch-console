import React from 'react';
// import es from 'elasticsearch';

// const esClient = new es.Client({ host: 'localhost:9200' });

function App() {
  const numRecs = 5;

  return (
    <div>
      <h1>Hello, Elasticsearch!</h1>
      <p>Found {numRecs} records</p>
    </div>
  );
}

export default App;
