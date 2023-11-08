const controllerFile = require('../controller/user.controller');
const express = require('express');

const router = express.Router();

router.post('/login', controllerFile.login);
router.post('/create-user', controllerFile.CreateUser);

router.put('/update', controllerFile.update);

router.get('/getContacts', controllerFile.getAllContacts);

router.post('/sendMessage/', controllerFile.sendEmail);

module.exports = router;
