/**
 * http://usejsdoc.org/
 */
var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};


var pgp = require('pg-promise')(options);
var db = pgp('postgres://postgres:li69nux@localhost:5432/postgres');
// add query functionss




exports.getAllHosts = function() {
	     return db.query('select * from host');
};
exports.getConnectionByHost = function(HostID){
	return db.query('select * from connection where host_id = $1',HostID);
};
	
