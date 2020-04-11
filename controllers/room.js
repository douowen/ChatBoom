// Controller handler to handle functionality in room page
const roomGenerator = require('../util/roomIdGenerator.js');
const content = require('./content.js');
const Chatroom = content.chatroom;
const Message = content.message;

function create(req, res) {
    const newRoomId = roomGenerator.roomIdGenerator();
    const roomName = req.body.roomName.length === 0 ? newRoomId : req.body.roomName;
    console.log(roomName);
    const room = new Chatroom({
        roomid: newRoomId,
        roomName: roomName,
        nickname: '',
        messages: []
    });

    room.save((err, data) => {
        if (err) {
            console.log(err);
            res.json({status: 0, errMsg: err});
        } else {
            console.log('Successfully stored a new chatroom to the db.');
            console.log(data);
            res.json({status: 1, roomid: newRoomId});
        }
    });
}

function getRoom(req, res) {
    const roomid = req.params.roomid;
    Chatroom.findOne({roomid: roomid}, (err, room) => {
        if (err) {
            console.log(err.stack);
        } else {
            res.render('room', {roomName: room.roomName});
        }
    });
}

function getMessages(req, res) {
    const roomid = req.params.roomid;
    Chatroom.findOne({ roomid: roomid }, (err, room) => {
        if (err) {
            console.log(err.stack);
            res.json({status: 0, errMsg: err});
        } else {
            res.json({status: 1, roomid: room.roomid, messages: room.messages});
        }
    });
}

function postMsg(req, res) {
    const message = new Message({
        nickname: req.body.nickname,
        messageText: req.body.message
    });
    console.log(message.messageText);
    Chatroom.findOneAndUpdate({roomid: req.params.roomid}, {$push: {messages: message}},(err, room) => {
        if (err) {
            console.log(err);
            res.json({status: 0, errMsg: err});
        } else {
            res.json({status: 1, roomid: room.roomid});
        }
    });
}

module.exports = {
    getRoom,
    getMessages,
    postMsg,
    create
};