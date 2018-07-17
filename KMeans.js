var Cluster = require('./Cluster');
var KMeansResult = require('./KMeansResult');


/**
* @param props
* @param props.k
* @param props.distanceFunction
*/
function KMeans(props) {
  this._k = props.k;
  this._distanceFunction = props.distanceFunction || KMeans.calculateDistance;
  this._equalityFunction = props.equalityFunction || KMeans.equals;
  this._midpointFunction = props.midpointFunction || KMeans.calculateMidpoint;
  this._randomFunction = props.randomFunction || Math.random;
  this._maxIterations = props.maxIterations || Number.MAX_SAFE_INTEGER;
}

KMeans.prototype.cluster = function(vectors) {
  var changed = true;
  var iterations = 0;
  var aborted = false;
  var clusters = this._getInitialClusters(vectors);

  while (changed) {
    var i;
    for (i = 0 ; i < clusters.length; i++) {
      clusters[i].clearVectors();
    }
    for (i = 0; i < vectors.length; i++) {
      this._assignVectorToCluster(vectors[i], clusters);
    }
    changed = this._updateCentroids(clusters);
    iterations++;

    if (iterations < this._maxIterations) continue;
    aborted = true;
    break;
  }
  return new KMeansResult({aborted:aborted, clusters:clusters, iterations:iterations});
};

KMeans.prototype._getInitialClusters = function(vectors) {
  var indices = [];
  var clusters = [];
  for (var i = 0; i < this._k; i++) {
    var idx;
    do {
      idx = Math.floor(this._randomFunction() * vectors.length);
    } while (indices.indexOf(idx) > -1);
    indices.push(idx);
    var centroid = vectors[idx];
    var cluster = new Cluster({centroid:centroid});
    clusters.push(cluster);
  }
  return clusters;
};

KMeans.prototype._updateCentroids = function(clusters) {
  var changed = false;
  clusters.forEach(function(cluster) {
    var midpoint = this._midpointFunction(cluster.getVectors());
    if (this._equalityFunction(cluster.getCentroid(), midpoint)) return;
    changed = true;
    cluster.setCentroid(midpoint);
  }, this);
  return changed;
};

KMeans.prototype._assignVectorToCluster = function(vector, clusters) {
  var minDist = Number.MAX_SAFE_INTEGER;
  var bestCluster = null;
  clusters.forEach(function(cluster) {
    var dist = this._distanceFunction(vector, cluster.getCentroid());
    if (!(dist < minDist)) return;
    minDist = dist;
    bestCluster = cluster;
  }, this);
  bestCluster.addVector(vector);
};

KMeans.calculateDistance = function(vector1, vector2) {
  var dist = 0;
  for (var i = 0; i < vector1.length; i++) {
    dist += Math.pow(vector1[i] - vector2[i], 2);
  }
  return Math.sqrt(dist);
};

KMeans.equals = function(vector1, vector2) {
  for (var i = 0; i < vector1.length; i++) {
    if (vector1[i] !== vector2[i]) return false;
  }
  return true;
};

KMeans.calculateMidpoint = function(vectors) {
  var midpoint = [];
  for (var x = 0; x < vectors[0].length; x++) {
    var point = 0;
    for (var y = 0; y < vectors.length; y++) {
      point += vectors[y][x];
    }
    point /= vectors.length;
    midpoint.push(point);
  }
  return midpoint;
};

module.exports = KMeans;
