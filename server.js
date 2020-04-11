// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const url = 'mongodb+srv://douowen:QWEasd123@cluster0-h4q3y.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', function() {
    console.log("Connected to DB!");
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('DB connection closed by Node process ending');
        process.exit(0);
    });
});

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set up stylesheets route

// TODO: Add server side code

// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);
app.get('/chatrooms', homeHandler.getChatrooms);
// return all messages belonging to a chatroom
app.get('/:roomid', roomHandler.getRoom);
// app.post('/:roomid', roomHandler.getRoom);
app.get('/:roomid/messages', roomHandler.getMessages);
app.post('/:roomid/message', roomHandler.postMsg);
// save a message posted in a specific chatroom
// app.post('/:roomid/messages', roomHandler.getMessages);

app.post('/create', roomHandler.create);
// app.post('/:roomid/setNickname', roomHandler.setNickName);
app.get('*', (req, res) => res.sendStatus(404));

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));