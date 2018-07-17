function Cluster(props) {
  props = props || {};
  this._id = props.id;
  this._vectors = props.vectors || [];
  this._centroid = props.centroid;
}

Cluster.prototype.getId = function() {return this._id;};
Cluster.prototype.setId = function(id) {this._id = id;};

Cluster.prototype.getVectors = function() {return this._vectors;};
Cluster.prototype.setVectors = function(vectors) {this._vectors = vectors;};
Cluster.prototype.clearVectors = function() {this._vectors = [];};
Cluster.prototype.addVector = function(vector) {this._vectors.push(vector);};

Cluster.prototype.getCentroid = function() {return this._centroid;};
Cluster.prototype.setCentroid = function(centroid) {this._centroid = centroid;};

Cluster.prototype.toString = function() {
  var str = '';
  str += 'Cluster Id : ' + this._id;
  str += '\nCentroid : ' + this._centroid.join(',');
  str += '\nVectors :\n'
  this._vectors.forEach(function(vector) {
    str += vector.join(',');
    str += '\n';
  });
  return str;
};

module.exports = Cluster;
