const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const e = require('express');

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

const url = "mongodb://127.0.0.1:27017/studsovetDB_2"; // Если такой нет, он её создаст

// описываем поведение при get запросе
app.get('/', (req, res) =>{
    // res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/form.html');
});

mongoose.connect(url). 
    catch(error => console.log(error)); // буду работать с mongoose, а не с mongo, так как это удобнее


// сначала мы описываем "схему", то есть общий формат объектов, которые будут храниться в коллекции
const myScheme = new mongoose.Schema({
    Name: String,
    Number: String,
    Address: String,
    Text: String,
    Rating: Number
});

// Здесь мы создаем модель коллекции
const StudentModel = new mongoose.model("claims", myScheme);


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Поведение при get запросе
app.post('/upload' ,  (req, res) =>{

    try {
        console.log(req.body);
        const {name, number, address, textarea, rating} = req.body;

        const MailsData = new StudentModel({
            Name: name,
            Number: number,
            Address: address,
            Text: textarea,
            Rating: rating
        });

        MailsData.save(); // Сохраняем полученные данные 
        res.redirect('/guestbook');

    } catch (error) {
        console.log(error);
    }
    
    // res.end();
});


app.get('/guestbook', (req, res) =>{
    // res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/guestbook.html');
});



app.post('/action', (req, res) => {
    const name = req.body.findname;
    console.log(req.body.findname);


    const foundName = StudentModel.findOne({'Name': name}).then((docs)=> {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({Name: docs.Name,
                                Number: docs.Number,
                                Address: docs.Address,
                                Text: docs.Text,
                                Rating: docs.Rating
    }));
    }).catch((err) => {
        res.send("Something went wrong!")
    });
})
