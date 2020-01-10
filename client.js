const elasticsearch = require('elasticsearch');

// Connect to our elastic search cluster running on port 9200
const client = new elasticsearch.Client({
  host: 'localhost:9200'
});

module.exports = {
  client,
  elasticIndexName: 'elastic_index',
  async testConnection () {
    await client.ping({ requestTimeout: 3000 }, error => {
      if (error) {
        console.trace('elasticsearch cluster is down!');
      } else {
        console.log('Elastic search is running.');
      }
    });
  }
}