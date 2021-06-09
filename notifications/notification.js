const twilio = require('twilio');
const translate = require('translate');
const accountSid  =process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const translateKey = process.env.GOOGLE_TRANSLATE_KEY;
const from_number = process.env.TWILIO_PHONE_NUMBER;
const client = new twilio(accountSid , authToken);
const FCM = require('fcm-node');
const fcm_server_key = process.env.FCM_API_KEY;

// send individual sms message with twilio 
function sendMsg_individual (client_number , client_message){
    console.log(client_message);
    return new Promise ( (resolve , reject) =>{
        client.messages.create ({
            to : client_number,
            from : from_number,
            body : client_message,
        }).then((message)=>{
            console.log('message id ' + client_number +' ' +message.sid);
            resolve();
        }).catch((error) => {
            console.log('Error sending message:', error);
            reject(error)
        });
    })
}


exports.sendMsg = (message_body , clients_numbers ) => {

    return new Promise ( (resolve , reject) =>{
        try { 
            // validate clients_numbers data
            validate_clients_data(clients_numbers).then(()=>{
                let errors = []
                for(let i = 0 ; i < clients_numbers.length ; i++){
                    convertToLanguage(message_body,clients_numbers[i].language).then((message_body)=>{
                        sendMsg_individual(clients_numbers[i].number,message_body).then(
                            ()=>{
                                console.log('message id ' + clients_numbers[i].number +' ' +message.sid);
                            }
                        ).catch((err)=>{
                            errors.push([err, clients_numbers[i]]);
                        })

                    }).catch((err)=>{
                        reject(err);
                    })
                }
                console.log('Done Sent To All');
                if(errors.length == 0 )
                    resolve();
                else 
                    reject(errors);
            }).catch((err)=>{
                console.log('error occuer');
                reject(err);
            }) 
        }
        catch(err){
            console('error occuer');
            reject(err);
        }
    })
};
exports.publishNotfication = (message_body , clients_tokens ) => {
    
    return new Promise ( (resolve , reject) =>{
        try{
            let fcm = new FCM(fcm_server_key);
            for(let i = 0 ; i < clients_numbers.length ; i++){
                if(!clients[i].token){
                    reject('every client should have token');
                }
                if(!clients[i].language){
                    reject('every client should have language');
                }
                convertToLanguage(message_body,clients_numbers[i].language).then((message_body)=>{
                    const message = {
                        data: {message_body : message_body},
                        token: clients_tokens[i].token
                    };
                    fcm.messaging().send(message).then((response) => {
                        console.log('Successfully publish message:', response);
                    })
                    .catch((error) => {
                        console.log('Error publish message:', error);
                    });
                }).catch((err)=>{
                    reject(err);
                })
            }   
            resolve();
        }
        catch(err){
            console('error occuer in publish ' + err);
            reject(err);
        }
        
    })
    
};

function convertToLanguage(message , language){
    return new Promise ( (resolve , reject) =>{
    translate(message, { to: language, engine: "google", key: translateKey }).then(
        (message_return)=>{
            resolve(message_return);
        }).catch((err)=>{
            console.log(err);
            reject( 'error ' + err);
        })
    });
}
function validate_clients_data(clients){
    return new Promise ( (resolve , reject) =>{
        for(let i = 0 ; i < clients.length ; i++){
            if(!clients[i].number){
                reject('every client should have number');
            }
            if(!clients[i].language){
                reject('every client should have language');
            }
        }
        resolve();
    })
    
}