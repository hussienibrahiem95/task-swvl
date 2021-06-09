const router = require('express').Router();
const bodyParser = require('body-parser');
const notfificationsController = require('../controllers/notifications.controller');

router.post('/sendSms',bodyParser.json(),notfificationsController.sendSms);
router.post('/pushNotification',bodyParser.json(),notfificationsController.sendPushNotfication);
router.get('/getToken',notfificationsController.getToken);


module.exports = router;