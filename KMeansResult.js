function KMeansResult(props) {
  props = props || {};
  this._clusters = props.clusters;
  this._iterations = props.iterations;
  this._aborted = props.aborted;
}

KMeansResult.prototype.getClusters = function() {return this._clusters;};
KMeansResult.prototype.getIterations = function() {return this._iterations;};
KMeansResult.prototype.aborted = function() {return this._aborted;};

module.exports = KMeansResult;
