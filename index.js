var KMeans = require('./KMeans');

var vectors = require('./testVectors');

var kmeans = new KMeans({
  k:3
});

var result = kmeans.cluster(vectors);

result.getClusters().forEach(function(cluster) {
  console.log(cluster.toString());
});
