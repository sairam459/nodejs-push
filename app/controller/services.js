module.exports = {
    cfrData: function(req, res, callback) {
        console.log('cfr');
        res.send("hello");
    },

    socketConn: function(ws, req) {
        console.log('hit');
        var id = count++;
        clients.push({
            'id': id,
            'connection': ws
        });
        ws.on('message', function(msg) {
            console.log(msg);
            console.log(clients.length);
            clients.forEach(function(client, i) {
                if(client.connection!=ws)
                client.connection.send(msg);
            });
        });
        ws.on('close', function(msg) {
            console.log(msg);
            
           clients.splice(clients.indexOf(ws),1);
           ws.close();
           console.log(ws);
           console.log(clients.length);
        });

    },
    camDetails:function(req,res){
        res.send({
            "address1": "ss",
"address2":"ss",
"address3":"ss",
"addressQuestion":"N",
"businessAddress":"dd",
"correspondenceAddress":"dd",
"country":"india",
"county":"india",
"name":"sairam",
"postcode":"603103",
"town":"vja",
"date":"06-09-94"
        })
    }
}



var count = 0;
var clients = [];
// wsServer = new WebSocketServer({
//     httpServer: server,
//     path:"/details"
// }); 
// wsServer.on('request', function(r){


//     var connection = r.accept('echo-protocol', r.origin);
//     connection.origin=r.origin

//     



//     sockConn(connection,id,function(connection,id){
//         var me =this;
//         clients.push({'id':id,'conn':connection,'origin':connection.origin});

//                     clients.forEach(function(client,i){
//                        clients[i].conn.on('message',function(message){
//                            console.log(message);
//                             clients.forEach(function(client,i){
//                                 client.conn.sendUTF(message.utf8Data)
//                             })

//                     });
//                    });

// });
// });



// function sockConn(connection,id,next){
//     console.log((new Date()) + ' Connection accepted [' + id + ']');
//     next(connection,id);
// }