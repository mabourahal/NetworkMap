
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , qu = require('./queries');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



//var test = db.getAllHosts
//console.log(test)
app.post('/domaintest', function(req, res){
	
    
    var fs = require('fs');
	var jsonfile = require('jsonfile')
    //fs.writeFile('public/graph.json', ""); 
    fs.truncate('public/tmp.json', 0, function(){console.log('done')})

      
    qu.getAllHosts().then(function(hosts){
	console.log('DATA:',hosts);
	

	    var obj = {};
	    console.log('body: ' + JSON.stringify(req.body));
	    if(hosts.length>0)
	    {
	    var SSH = require('simple-ssh');
	    
	    var k = -1;
	    var i;
	    var sshArr =[];
	    var h=-1;
	    for(i=0;i<hosts.length;i++)
	    {

	    var ssh = new SSH({
	        host: hosts[i].ip_address,
	        user: 'root',
	        pass: 'li69nux'
	    });
	    sshArr.push(ssh);
	    var intID = parseInt(hosts[i].host_id)
	    qu.getConnectionByHost(intID).then(function(data){
	    var connection = data;
	    console.log('DATA:',sshArr);
	    
	    console.log('DATA:',connection);
	    var u;
	    ++h
	    for(u=0;u<connection.length;++u)
	    {
	    sshArr[h].exec(connection[u].command+' '+connection[u].path, {
	        out: function(stdout) {
	        	k++;
	        	m=k;

	        	if(m<hosts.length)
	        	{
	            console.log(stdout);
	            var lines = stdout.split("\n");
	            var ip ={
	            		ip:[]
	            };
	            var ping = require('ping');
	            console.log(m);
	            ip.ip.push({ 
			        "host" : hosts[m].ip_address,
			        "node"  : hosts[m].ip_address,
			        "isAlive" : ""
			    });
	            
	            var e;
                var p;
                var graph = {
                	nodes:[],
                	links:[]
                }
	    	    graph.nodes.push({ 
			        "id" : hosts[m].ip_address,
			        "group"  : m
			    });
			    
	            //ping.sys.probe(hosts[k].ip_address, function(isAlive){
        	    //    var msg = isAlive ? 'alive' : 'dead';
        	    //    console.log(msg);
        	    //    ip.ip.push({
        	    //    	"alive":msg
        	    //    })
        	    //});

	            for (e=0; e < lines.length; e++)
	            	{
	    		        var r = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
	    		        var t = lines[e].match(r);
	    		        
	    		        if(t != null && t != "127.0.0.1"){
	    		        	console.log(t[0]);
	    		        	//console.log(hosts);
	    		        	//console.log(i);
	    		        	console.log(hosts[m]);
	    		        	
	    		        	  ip.ip.push({ 
	    					        "host" : hosts[m].ip_address,
	    					        "node"  : t[0],
	    					        "isAlive"  : ""
	    					    });
	    		        	  

	    					    graph.nodes.push({ 
	    					        "id" : t[0],
	    					        "group"  : m
	    					    });
	    					    
	    					    graph.links.push({ 
	    					        "source" : hosts[m].ip_address,
	    					        "target"  : t[0],
	    					        "value": 2
	    					    });
	    		                
	    		        	    //ping.sys.probe( t[0], function(isAlive){
	    		        	    //    var msg = isAlive ? 'alive' : 'dead';
	    		        	    //    console.log(msg);
	    		        	    //    ip.ip.push({
	    		        	    //    	"alive":msg
	    		        	    //    })
	    		        	    //});
	    		        	//ip.push(hosts[i]);
	    		        	//ip[i].push(t[0]);
	    		        }
	            	}
	            

                //var json = JSON.stringify(graph);

	            
              
                
                 
                jsonfile.writeFile('public/tmp.json', graph, {flag: 'a'}, function (err) {
                  //console.error(err)
                })

	            //ip[i].forEach(function(host){
	            //    ping.sys.probe(host, function(isAlive){
	            //        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
	            //        console.log(msg);
	            //    });
	            //});

	        	}
                if(m==hosts.length-1)
	            {

                	var file = 'public/tmp.json'
                	fs.readFile(file,'utf8', function(err, data) {
                          var graph = {
                            	nodes:[],
                            	links:[]
                          }
                		  var txt = data.replace(/(\r\n|\n|\r)/gm,"|").split("|");
                		  var n=0;
                		  console.log(txt);
                		  console.log(data);
                		  for(n=0;n<txt.length-1;++n)
                		  {

                			var ln = txt[n];
                			console.log(ln);
                			var y = JSON.parse(ln);
                			
                			var b=0;
                			for(b=0;b<y.nodes.length;++b)
                				{
                					var s = y.nodes[b];
                					var f=0;
                					var found = false;
                					for(f=0;f<graph.nodes.length;++f)
                					{
                						console.log(graph.nodes[f]);
                						if(s.id==graph.nodes[f].id)
                							{
                								found=true;
                								break;
                							}
                					}
                					if(found==false)
                					{
                						graph.nodes.push(s);
                					}

                					}
                			var b=0;
                			for(b=0;b<y.links.length;++b)
                				{
                					var s = y.links[b];
                					graph.links.push(s);
                				}
                			
                		  }
                		  
                		  

                          jsonfile.writeFile('public/graph.json', graph, {spaces: 2}, function (err) {
                              //console.error(err)
                            })
                		  //console.log(JSON.stringify(obj));
                          fs.unlink('public/tmp.json', function(err, result) {
                            	  //next(err, list);
                           });

                		  console.log(graph);
          	            	//console.log(ip);
                          res.send(ip);
                	})
	            }
	        }
	        
	    }).start();
	    
	    }
	    //h++;
	    })
	    .catch(error => {
	        console.log(error)
	    });
	    
	    }
	    }
	    });
	
	
});



app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
