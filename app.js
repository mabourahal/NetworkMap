
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

var SSH = require('simple-ssh');
var fs = require('fs');
var jsonfile = require('jsonfile');
var Sync = require('sync');
var dns = require('dns');
var ping = require('ping');
//var test = db.getAllHosts
//console.log(test)
app.post('/map', function(req, res){
	
	
    //fs.writeFile('public/graph.json', ""); 
    fs.truncate('public/tmp.json', 0, function(){console.log('done')})

    var counter=0;
	var k = 0;
    qu.getAllHosts().then(function(hosts){
	//console.log('DATA:',hosts);
	

	    var obj = {};
	    //console.log('body: ' + JSON.stringify(req.body));
	    //if(hosts.length>0)
	    {
	   
	    
	    var i;
	    var sshArr =[];
	    var h=-1;
	    var total = 0;
	    var temp = [];
	    var empty = [];
	    var cfg = {
	    	    timeout: 1,
	    	    // WARNING: -i 2 may not work in other platform like window 
	    	    //extra: ["-i 0.3"],
	    	};
        var graph = {
            	nodes:[],
            	links:[]
            }
	    hosts.forEach(function(item, index1)
	    {
	    	//for(i=0;i<hosts.length;i++)
	    	ping.sys.probe( item.ip_address, function(alive){
    	        var msg = alive ? 'alive' : 'dead';
    	        //console.log(listItem);
    	        //console.log(msg);
    	        

    	        
    	        if(msg=="dead")
    	        {
    	        	//total=total-1;

        	    	    graph.nodes.push({ 
        			        "id" : item.ip_address,
        			        "label" : item.name,
        			        "group"  : index1,
        			        "isAlive" : "?"
        			    });
        	        	//empty.push(graph);
        	        	//console.log(graph)
    	        	//jsonfile.writeFile('public/tmp.json', graph, {flag: 'a'}, function (err) {
    	        		  
                    	//}
                      //console.error(err)
                    //})	
    	        }
    	        if(msg=="alive")
    	        {
    	        	
    	        	total++
    	        //console.log(sshArr2[index]);
              
    	     

	    
	    var intID = parseInt(item.host_id);
	    
	    qu.getConnectionByHost(intID).then(function(data){
	    var connection = data;
	    //console.log('DATA:',data);
	    if(data.length==0)
	    {
	    	graph.nodes.push({ 
		        "id" : item.ip_address,
		        "label" : item.name,
		        "group"  : index1,
		        "isAlive" : "?"
		    });
	    	
	    	
	    }
	    else
	    {
	    	 
		    var ssh = new SSH({
		        host: item.ip_address,
		        user: 'root',
		        pass: '********'
		    });
		    sshArr.push(ssh);
		    
		    counter++;
	    //console.log('DATA:',connection);
	    var u;
	    ++h
	    //console.log('1st:',connection);

       
        graph.nodes.push({ 
	        "id" : item.ip_address,
	        "label" : "Unknown",
	        "group"  : index1,
	        "isAlive" : "?"
	    });
	    connection.forEach(function(con, index2)
	    {
		    temp.push(item);
		    counter++;
	    //for(u=0;u<connection.length;++u)c
	    //console.log('2nd:',con);
	    u++;
	    //console.log(connection)
	    sshArr[h].exec(con.command+' '+con.path, {
	        out: function(stdout) {
	             
	        	if(temp.length>=k)
	        	{
	            //console.log(stdout);
	            var lines = stdout.split("\n");
	            var ip ={
	            		ip:[]
	            };
	           
	            console.log(lines);
	            var graph1 = {
                    	nodes:[],
                    	links:[]
                    }
	            var e;
                var p;
               
    
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
	    		        	
	    		        //if(t[0] != '192.12.0.10')
	    		        {
	    		        	
	    		        	//console.log(t[0]);
	    		        	//console.log(hosts);
	    		        	//console.log(i);
	    		        	//console.log(hosts[m]);
	    		        	
	    		  

	    					    graph1.nodes.push({ 
	    					        "id" : t[0],
	    					        "label" : "Unknown",
	    					        "group"  : index1,
	    					        "isAlive" : "?"
	    					    });
	    					    
	    					    graph1.links.push({ 
	    					        "source" : item.ip_address,
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
	            	}
	            

                //var json = JSON.stringify(graph);

	            
              
                
	            //console.log(graph1);
	            var test=false;
                jsonfile.writeFile('public/tmp.json', graph1, {flag: 'a'}, function (err) {
                	
    	        	
                	//}
                  //console.error(err)
                });

	            //ip[i].forEach(function(host){
	            //    ping.sys.probe(host, function(isAlive){
	            //        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
	            //        console.log(msg);
	            //    });
	            //});
                
                //k++;
	        	}
                if (++k == temp.length+1)
	            {
                	
                
                	var file = 'public/tmp.json'
                    	fs.readFile(file,'utf8', function(err, data) {
                       
                              
                              
                              //console.log(graph);
                              //console.log(empty);
                              //var ipList=[];
                    		  var txt = data.replace(/(\r\n|\n|\r)/gm,"|").split("|");
                    		  var n=0;
                    		  //console.log(txt);
                    		  //console.log(data);
                    		  for(n=0;n<txt.length-1;++n)
                    		  {

                    			var ln = txt[n];
                    			//console.log(ln);
                    			var y = JSON.parse(ln);
                    			
                    			var b=0;
                    			for(b=0;b<y.nodes.length;++b)
                    				{
                    					var s = y.nodes[b];
                    					var f=0;
                    					var found = false;
                    					for(f=b;f<graph.nodes.length;++f)
                    					{
                    						
                    						//var newLab="";
                    				
                    			    	    //var ssh = new SSH({
                    			    	    //    host: s.id,
                    			    	    //    user: 'root',
                    			    	    //    pass: '********'
                    			    	    //});
                    			    	    //ssh.exec('hostname', {
                    			    	    //   out: function(stdout) {
                    			    	    //    	s.label = stdout;
                    			    	    //   }
                    			    	    //});
                    						//console.log(graph.nodes[f]);
                    						
                    						if(s.id==graph.nodes[f].id)
                    							{
                    								found=true;
                    								break;
                    							}
                    					}
                    					if(found==false)
                    					{
                    						//ipList.push(s)
                    					
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
                    		  
                    		  

                             
                                	var g=0;
                                	//console.log(ipList);
                                	//console.log(graph);
                                	var ssh;
                                	//var sshArr2=[];
                                	var c=-1;
                                	
                                	//for(var asd=0;asd<graph.nodes.length;++asd)
                                	//{
                                		
                                	//ssh = new SSH({
                                	//     host: graph.nodes[asd].id,
                                	//     user: 'root',
                                	//     pass: '********'
                                	//});
                                    //sshArr2.push(ssh);
                                    //while(asd==g)
                                	//{
                                	
                                	//}
                                	
                               	 
                                    //c++;
                                    //console.log(graph.nodes[asd])
                                	//}
                    				var counter1=0;
                                	
                                	(graph.nodes).forEach(function(listItem, index){
                                	ping.sys.probe( listItem.id, function(alive){
    	    		        	        var msg = alive ? 'alive' : 'dead';
    	    		        	        //console.log(listItem);
    	    		        	        //console.log(msg);
    	    		        	        
    	    		        	        listItem.isAlive = msg;
    	    		        	        graph.nodes[index].isAlive=msg;
    	    		        	        //console.log(graph.nodes[index])
    	    		        	        if(msg=="alive")
    	    		        	        {
    	    		        	        counter1++;
    	                                ssh = new SSH({
    	                               	     host: listItem.id,
    	                               	     user: 'root',
    	                               	     pass: '********'
    	                               	});	
    	    		        	        
    	    		        	        //console.log(sshArr2[index]);
    	                                ssh.exec('hostname', {
    	                        	        out: function(stdout) {
    	                                    	
    	                            	        //console.log(ipList[s]);
    	                		    	
    	                		    			//console.log(ipList[g]);
    	                		    			//console.log(err);
    	                						
    	                						//g=domains[0];
    	                						//console.log(domains[0]);
    	                							
    	                						//console.log(g);
    	                						//console.log(graph.nodes);
    	                            	        graph.nodes[index].label=stdout;
    	                						//console.log(graph.nodes[index]);
    	                							
    	                		    			
    	                		    			g++;
    	                						if(counter1==g)
    	                							{
    	                							  
    	                							  jsonfile.writeFile('public/graph.json', graph, {spaces: 2}, function (err) {
    	                								
    	                								  res.send('');
    	                	                            })
    	                	                            fs.unlink('public/tmp.json', function(err, result) {
	                		                            	  //next(err, list);
	                		                        	  
	                		                           });
    	                							}
    	                            	        }
    	                		    		}).start();
    	    		        	        }
    	    		        	        
    	    		        	    });
                                	
                                	
                                	});
                                	
                                	
                                
                                
                    		  //console.log(JSON.stringify(obj));
                           
                                
                    		  //console.log(graph);
              	            	//console.log(ip);
                             
                    	})

	            }
               
	        }
	        
	    }).start();
	    });
	    }
    	});
	    }
	    //h++;
	    },cfg);
	    
	    });
	    }
	    })
	    .catch(error => {
	        console.log(error)
	    });
   
    	//console.log(data);
    	
	 	
	 	
    	
});

app.post('/add', function(req, res){
	qu.createHost(req, res );
	res.render('add', { title: 'Add Host' });
})

app.post('/connection', function(req, res){
	qu.createConnection(req, res );
	res.render('connection', { title: 'Add Connection' });
	 
})
app.post('/loadSelect', function(req, res){

	qu.getAllHosts().then(function(hosts){
		//console.log(hosts);
	    res.send(hosts);
			
			
		});
	
})

app.post('/view', function(req, res){
	qu.deleteHost(req, res);

})

app.post('/view_edit', function(req, res){
	qu.updateHost(req, res);
})

app.post('/view_con', function(req, res){
	qu.deleteConnection(req, res);
	
})

app.post('/view_con_edit', function(req, res){
	qu.updateConnection(req, res);
})


app.get('/', routes.index);
app.get('/map', routes.index);
app.get('/add', routes.add)
app.get('/connection', routes.connection)
app.get('/view', routes.view)
app.get('/view_con', routes.view_con)
app.get('/users', user.list);
//app.get('/', routes.add);
//app.get('/view', routes.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
