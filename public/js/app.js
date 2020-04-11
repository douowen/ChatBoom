import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';
import CreateComponent from './components/CreateComponent.js';
import NicknameComponent from './components/NicknameComponent.js';
import SendMessageComponent from './components/SendMessageComponent.js';
import MessagesComponent from './components/MessagesComponent.js';
export const Bus = new Vue();

new Vue({
    el: '#app',
    data: {
        chatrooms: [],
        nickname: ''
    },
    components: {
        'create-component': CreateComponent,
        'nickname-component': NicknameComponent,
        'send-message-component': SendMessageComponent,
        'messages-component': MessagesComponent
    },
    created() {
        this.getRooms();
    },
    methods: {
        getRooms() {
            console.log('test');
            fetch('/chatrooms')
                .then(res => res.json())
                .then(data => {
                    if (data.status === 0) {
                        console.error('Error:', data.errMsg);
                    } else {
                        console.log('Successfully retrieve chatrooms.');
                        console.log(data.chatrooms);
                        this.chatrooms = data.chatrooms;
                    }
                })
                .catch(err => {
                    console.error('Error: ', err);
                });
        },
        create(name) {
            console.log('test');
            const json = {roomName: name.trim()};
            console.log(json);
            fetch('/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json)
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === 0) {
                        console.error('Error: ', data.errMsg);
                    } else {
                        console.log('Successfully create the chatroom:', data.roomid);
                        this.enterRoom(data.roomid);
                    }
                })
                .catch((err) => {
                    console.error('Error: ', err);
                });
        },
        enterRoom(id) {
            window.location.href = '/' + id;
        },
        setNickname(name) {
            this.nickname = name;
        },
    }
});