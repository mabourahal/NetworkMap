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

exports.createHost = function(req, res) {
		  req.body.type = 1;
		  db.none('insert into host(name, ip_address, type_id)' +
		      'values(${name}, ${ip}, ${type})',
		    req.body)
		    .then(function () {
		      res.status(200)
		        .json({
		          status: 'success',
		          message: 'Inserted one host'
		        });
		    })
			.catch(function (error) {
				console.log('ERROR:', error)
			})
};
exports.updateHost = function(req, res) {
	db.none('update host set name=$1, ip_address=$2 where host_id=$3',
		    [req.body.name, req.body.ip, parseInt(req.body.id)])
	    .then(function () {
	      res.status(200)
	        .json({
	          status: 'success',
	          message: 'Updated one host'
	        });
	    })
		.catch(function (error) {
			console.log('ERROR:', error)
		})
};
exports.updateConnection = function(req, res) {
	db.none('update connection set path=$1, command=$2 where connection_id=$3',
		    [req.body.path, req.body.command, parseInt(req.body.id)])
	    .then(function () {
	      res.status(200)
	        .json({
	          status: 'success',
	          message: 'Updated one host'
	        });
	    })
		.catch(function (error) {
			console.log('ERROR:', error)
		})
};

exports.deleteHost = function(req, res) {

	  //console.log(req.body);
	  db.none('Delete from host where host_id='+req.body.id,
	    req.body)
	    .then(function () {
	      res.status(200)
	        .json({
	          status: 'success',
	          message: 'Deleted one host'
	        });
	    })
		.catch(function (error) {
			console.log('ERROR:', error)
		})
};
exports.deleteConnection = function(req, res) {

	  //console.log(req.body);
	  db.none('Delete from connection where connection_id='+req.body.id,
	    req.body)
	    .then(function () {
	      res.status(200)
	        .json({
	          status: 'success',
	          message: 'Deleted one host'
	        });
	    })
		.catch(function (error) {
			console.log('ERROR:', error)
		})
};

exports.createConnection = function(req, res) {

	console.log(req.body);
	  db.none('insert into connection(path, command, host_id)' +
	      'values(${path}, ${command}, ${lab})',
	    req.body)
	    .then(function () {
	      res.status(200)
	        .json({
	          status: 'success',
	          message: 'Inserted one connection'
	        });
	    })
		.catch(function (error) {
			console.log('ERROR:', error)
		})
};

exports.getAllHosts = function() {
	return db.query('select * from host');
};

exports.getAllConnection = function() {
    return db.query('select * from connection');
};

exports.getConnectionByHost = function(HostID){
	return db.query('select * from connection where host_id = $1',HostID);
};
	
exports.getHostNameByHostID = function(HostID){
	return db.query('select name from host where host_id = $1',HostID);
};
	