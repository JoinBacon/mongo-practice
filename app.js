const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');

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

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/src/mainPage.html');
})

app.post('/', async(req, res)=>{
    if(!req.body) return res.sendStatus(400);

    const collection = req.app.locals.collection;
    try {
        await collection.insertOne({name: req.body.userName, age: req.body.userAge});
    } catch (e) {
        console.log('Error - ', e);
    }
    res.redirect('/inform');
})


app.get('/inform', async(req, res) => {

    const collection = req.app.locals.collection;
    try {
        let users = await collection.find().toArray();
        let lastUser = users.at(-1);
        res.send(`${lastUser.name} - ${lastUser.age}`);
    }
    catch (e) {
        console.log('Error - ', e);
    }
})