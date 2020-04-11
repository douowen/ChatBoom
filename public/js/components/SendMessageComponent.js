import { Bus } from '../app.js';
export default {
    props: ['nickname'],
    data() {
        return {
            currMessage: ''
        };
    },
    methods: {
        sendMessage(msg) {
            if (!msg.trim().length) {
                alert('Do not send empty message!');
            } else {
                const json = {
                    nickname: this.nickname,
                    message: msg
                };
                const roomid = window.location.href.split('/').pop();
                const url = '/' + roomid + '/message';

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(json)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === 0) {
                            console.error('Error:', data.errMsg);
                        } else {
                            console.log('Succssfully sent a new message to room: ' + data.roomid);
                            this.currMessage = '';
                            Bus.$emit('new-msg-sent');
                        }
                    })
                    .catch(err => {
                        console.error('Error: ', err);
                    });
            }
        }
    },
    template: `
        <div class="message-form">
            <textarea class="form-control" row="10" maxlength="500" placeholder="char limit: 500 max" v-model="currMessage"></textarea>
            <button class="btn btn-primary ml-1" @click="sendMessage(currMessage)">Send</button>
        </div>
    `
};