# task-swvl
# Notifications Microservice
A microservice responsible for Send SMS messages and push notficiations to clients.

microservice supports :
* SMS notifications
* Push notifications


### SMS Notifications

The microservice supports sending SMS notifications. The supported transports are :
* [Twilio](https://www.twilio.com/) 


### Push Notifications

The microservice supports sendong push notifications. The supported transposrts are :
* [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)


### Translate Text
The microservice send a notification in Client preferred language , The supported Translate text are :

* [Google Cloud Translation API](https://cloud.google.com/translate)


## simple diagram of the architecture




## Installation And Run Service

this instructions to run this project on your local machine and can test service with postman 

open the terminal and cd to directory you want to save project then write the following commands.
```
git clone https://github.com/hussienibrahiem95/task-swvl
cd task-swvl
npm install
create .env file and Set the environment variables
    ```
    TWILIO_ACCOUNT_SID=
    TWILIO_AUTH_TOKEN=
    TWILIO_PHONE_NUMBER =
    GOOGLE_TRANSLATE_KEY = 
    FCM_API_KEY =
    ```
npm start
```

You should see the following printed in your console.
```
server is listen on port 3000
```

to run unit-test write the following command in terminal

```
npm run test 
```
it's will run tests and send message to phone number you can edit this from file test-api.js



### API endpoints:

#### /auth
Path | Method | Description
---|---|---
/notifications/getToken | GET | GetToken

#### /notification
/notifications/sendSms | POST | Send sms messages to specfic clients take an
/notifications/pushNotification | POST | publish notification to specfic clients


## TODOs

