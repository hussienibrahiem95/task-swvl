const notification = require('../notifications/notification');
const queueRequests = require('../notifications/queue.requests');
const jwt = require('jsonwebtoken')
const JWT_SECRET = "this is jsonwebtoken key secret from my app";

exports.sendSms = (req, res, next) => {
    let token = req.header('Authorization'); // if add Bearer 
    try {
        let data = jwt.verify(token, JWT_SECRET); // verfiy token
        let clients_tokens = req.body.clients;
        let message = req.body.message;
        let cur_timestamp = Date.now()
        if(!clients_tokens || clients_tokens.length == 0){
            res.json({
                "error" : 'no clients',
            })
        }
        queueRequests.add_request(cur_timestamp).then( ()=>{
            notification.sendMsg(message,clients_tokens).then( ()=>{
                console.log('SMS Sent');
                res.status(200).json({
                    "status" : 'SMS Sent',
                })
                res.status(200).send('SMS Sent'); 
                // to test limits requests 
                // setTimeout(() => { queueRequests.remove_request(cur_timestamp);}, 10000);
            }).catch( err=>{
                queueRequests.remove_request(cur_timestamp);
                res.json({
                    "error" : err,
                })
            })

        }).catch(err=>{
            res.json({
                "error" : err,
            })
        })
    } catch (err) {
        res.json({
            "Error" : err,
        })
    }
};
exports.sendPushNotfication = (req, res, next) => {
    let token = req.header('Authorization');  /// get token that store in header 
    try {
        let data = jwt.verify(token, JWT_SECRET); // verfiy token
        let clients_tokens = req.body.clients;
        let message = req.body.message;
        let cur_timestamp = Date.now()
        if(!clients_tokens || clients_tokens.length == 0){
            res.json({
                "error" : 'no clients',
            })
        }
        queueRequests.add_request(cur_timestamp).then( ()=>{
            notification.publishNotfication(clients_tokens,message).then( ()=>{
                res.status(200).json({
                    "status" : 'sucessfully publish',
                })
                // to test limits requests 
                // setTimeout(() => { queueRequests.remove_request(cur_timestamp);}, 10000);
            }).catch( err=>{
                queueRequests.remove_request(cur_timestamp);
                res.json({
                    "error" : err,
                })
            })

        }).catch(err=>{
            res.json({
                "error" : err,
            })
        })
    } catch (err) {
        //console.log(err);
        res.json({
            "error" : err,
        })
    }

};
exports.getToken = (req,res,next) =>{
    // sign take ( object data that need to put on token , secret_key , options object )
    let token = jwt.sign({
        name: "swvl_task",
    }, JWT_SECRET, {
        expiresIn: "24h",
    });
    //res.status(200).send(token);
    res.status(200).json({
        token: token,
    })
}