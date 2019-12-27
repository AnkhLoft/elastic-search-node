const _ = require('highland');
const fs = require('fs');
const csv = require('csv-parser');
const elasticsearch = require('elasticsearch');
const elasticIndexName = 'elastic_index_name';

async function start() {
  // Connect to our elastic search cluster running on port 9200
  const client = new elasticsearch.Client({
    host: 'localhost:9200'
  });

  // Check if we got a connection
  await client.ping({ requestTimeout: 3000 }, error => {
    if (error) {
      console.trace('elasticsearch cluster is down!');
    } else {
      console.log('Elastic search is running.')
    }
  })

  
}

start();