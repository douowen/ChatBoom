const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
    nickname: String,
    messageText: String,
    datetime: { type: Date, default: Date.now }
});
const ChatroomSchema = new mongoose.Schema({
    roomid: String,
    roomName: String,
    messages: [MessageSchema]
});

module.exports = {
    message: mongoose.model('Message', MessageSchema),
    chatroom: mongoose.model('Chatroom', ChatroomSchema)
};