const { client, testConnection, elasticIndexName } = require('./client');
const query = process.env.npm_config_query || 'Lewisham'

async function search() {
  // Check if we got a connection
  testConnection()

  try {
    const resp = await client.search({
      index: elasticIndexName,
      type: 'place',
      body: {
        sort: [
          { place_rank_num: { order: 'desc'} },
          { importance_num: { order: 'desc' } }
        ],
        query: {
          term: { name: query }
        }
      }
    });
    const { hits } = resp.hits
    console.log(hits);
  } catch (error) {
    if (error.status === 404) {
      console.log('Index not found!')
    } else {
      throw error;
    }
  }
}
search();
