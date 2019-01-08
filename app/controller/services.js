webPush = require('web-push');

webPush.setVapidDetails(
    '',
    "", // process.env.VAPID_PUBLIC_KEY,
    "" // process.env.VAPID_PRIVATE_KEY
);


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
                if (client.connection != ws) {
                    client.connection.send(msg);
                    
                }
             
                subscriptions.forEach(function(subscription) {
                      
                        pushMessage(subscription.subscription, 'Details have been received successfully');
                     
                        
                    })
            });
        });
        ws.on('close', function(msg) {
            console.log(msg);

            clients.splice(clients.indexOf(ws), 1);
            ws.close();

            console.log(clients.length);
            subscriptions.forEach(function(subscription) {

                pushMessage(subscription, 'Connection have been closed');

            })

        });

    },
    camDetails: function(req, res) {
        res.send({
            "hello":"world"
        })
    },

    pushSubscribe: function(req, res) {
        var sid = sub++;

        subscriptions.push({
            id: sid,
            subscription: {
                endpoint: req.body.endpoint,
                keys: {
                    p256dh: req.body.keys.p256dh,
                    auth: req.body.keys.auth
                }
            }
        })
        res.send('success')




    },
    pushUnsubscribe: function(req, res) {

        // remove from database
        Push.findOneAndRemove({
            endpoint: endpoint
        }, function(err, data) {
            if (err) {
                console.error('error with unsubscribe', error);
                res.status(500).send('unsubscription not possible');
            }
            console.log('unsubscribed');
            res.status(200).send('unsubscribe');
        });

    }
}



var count = 0;
var sub = 0;
var clients = [];
var subscriptions = [];

function pushMessage(subscription, body) {
    webPush.sendNotification(
        subscription,
        JSON.stringify({
            title: 'PUSH',
            body: body,

        }),
        3600
    ).then(function() {
        console.log("Send welcome push notification");

        return;
    }).catch(err => {
        console.error("Unable to send welcome push notification", err);

        return;
    });
}


