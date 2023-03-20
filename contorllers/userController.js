exports.addUser = (req, res)=>{
    res.sendFile(__dirname + '/views/mainPage.html');
}
exports.postUser = async(req, res)=>{
    if(!req.body) return res.sendStatus(400);

    const collection = req.app.locals.collection;
    try {
        await collection.insertOne({name: req.body.userName, age: req.body.userAge});
    } catch (e) {
        console.log('Error - ', e);
    }
    res.redirect('/inform');
}

exports.getUser = async (req, res) => {

    const collection = req.app.locals.collection;
    try {
        let users = await collection.find().toArray();
        let lastUser = users.at(-1);
        res.send(`${lastUser.name} - ${lastUser.age}`);
    }
    catch (e) {
        console.log('Error - ', e);
    }
}