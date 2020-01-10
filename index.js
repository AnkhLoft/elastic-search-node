const _ = require('highland');
const fs = require('fs');
const csv = require('csv-parser');
const { client, testConnection, elasticIndexName } = require('./client');

async function start() {
  // Check if we got a connection
  testConnection();

  try {
    await client.indices.create({ index: elasticIndexName })
    console.log(`Created ${elasticIndexName} index.`);
  } catch (error) {
    if (error.status === 400) {
      console.log(`${elasticIndexName} already exists!`)
    } else {
      throw error;
    }
  }

  // Process the file
  let currentIndex = 0;
  let numChunks = 100;
  const stream = _(
    fs.createReadStream('./planet-latest_geonames.tsv').pipe(csv({ separator: '\t' }))
  )
    .map(data => ({
      ...data,
      alternativeNames: data.alternative_names.split(','),
      lon_num: parseFloat(data.lon),
      lat_num: parseFloat(data.lat),
      place_rank_num: parseInt(data.place_rank, 10),
      importance_num: parseFloat(data.importance)
    }))
    .map(data => [{
      index: { _index: elasticIndexName, _type: 'place', _id: data.osm_id }
    },
    data
    ])
    .batch(numChunks)
    .each(async entries => {
      stream.pause();
      const body = entries.reduce((acc, val) => acc.concat(val), []);
      await client.bulk({body});
      currentIndex += numChunks;
      console.log('Created index: ', currentIndex);
      stream.resume()
    })
    .on('end', () => {
      console.log('done');
      process.exit()
    });
}

start();