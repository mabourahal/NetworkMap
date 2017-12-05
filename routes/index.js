
/*
 * GET home page.
 */

var qu = require('../queries');



exports.index = function(req, res){
  
  	  res.render('index', { title: 'Network App Map' });
};

exports.view = function(req, res){
	qu.getAllHosts().then(function(hosts){
		//console.log(hosts);
		res.render('view', { title: 'View Hosts',data:hosts });
			
		});
	  
};

exports.connection = function(req, res){
	 res.render('connection', { title: 'Add Connection' });
};

exports.add = function(req, res){
	 res.render('add', { title: 'Add Host' });
};


exports.view_con = function(req, res){
	var p=0;
	var arr=[];
	qu.getAllConnection().then(function(hosts){
		var hostArr = hosts;
		for(var i=0;i<hosts.length;++i)
		{
			qu.getHostNameByHostID(hosts[i].host_id).then(function(name){
				p++;
				console.log(name);
				arr.push(name);
				if(i==p){
					//console.log(hosts);
					for(var e=0;e<hostArr.length;++e)
					{
						//console.log(hostArr[e]);
						//console.log(arr[e][0].name);
						hostArr[e].name=arr[e][0].name;
						console.log(hostArr[e]);
					}
					
					res.render('view_con', { title: 'View Connection',data:hostArr });
				}
				
			});
		}
		
	});
};