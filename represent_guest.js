// Я хочу, чтобы при открытии этой страницы, у меня генерировались случайные отзывы






const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    const db = client.db('mydb');
    db.createCollection('forms', (err, res) => {
        if (err) throw err;
        console.log('Collection created');
        client.close();
    });
});




app.post('/action', (req, res) => {
    const name = req.body.findname;
    console.log(req.body.findname);


    const foundName = StudentModel.findOne({'Name': name}).then((docs)=> {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({Name: docs.Name,
                                Number: docs.Number,
                                Address: docs.Address,
                                Text: docs.Text
    }));
    }).catch((err) => {
        res.send("Something went wrong!")
    });
})