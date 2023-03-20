const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const userController = require('./contorllers/userController');

const URL = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(URL);
const app = new express();


(async () => {
    try {
        await client.connect();
        console.log('Соединение установлено');
        const db = client.db('myDb');
        const list = db.listCollections();
        app.locals.collection =  await db.collection('users');
        app.listen(3000);
    } catch (e) {
        console.log('Error - ', e);
    }
})();


app.use(bodyParser.urlencoded({extended: false}));

app.get('/', userController.addUser);
app.post('/', userController.postUser);
app.get('/inform', userController.getUser);