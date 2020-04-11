const content = require('./content.js');
function getHome(req, res){
    res.render('home');
}

function getChatrooms(req, res) {
    const Chatroom = content.chatroom;
    Chatroom.find((err, rooms) => {
        if (err) {
            console.log(err.stack);
            res.json({status: 0, errMsg: err});
        } else {
            res.json({status: 1, chatrooms: rooms});
        }
    });
}

module.exports = {
    getHome,
    getChatrooms
};