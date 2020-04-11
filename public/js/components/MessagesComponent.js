import { Bus } from '../app.js';

export default {
    data() {
        return {
            messages: []
        };
    },
    created() {
        this.getRoomMessages();
        Bus.$on('new-msg-sent', () => {
            this.getRoomMessages();
        });
        setInterval(this.getRoomMessages, 3000);
    },
    mounted() {
        this.scrollToEnd();
    },
    methods: {
        getRoomMessages() {
            const roomid = window.location.href.split('/').pop();
            const url = '/' + roomid + '/messages';
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 0) {
                        console.error('Error:', data.errMsg);
                    } else {
                        console.log('Succssfully get room messages');
                        this.messages = data.messages;
                        this.scrollToEnd();
                    }
                })
                .catch(err => {
                    console.error('Error: ', err);
                });
        },
        getFormattedDateTime(date) {
            return moment(date).format('LLLL');
        },
        scrollToEnd: function() {
            const container = this.$refs.messageDisplay;
            container.scrollTop = container.scrollHeight;
        },
    },
    template: `
        <div id="chatroom-messages" class="chatroom-content mb-2" ref="messageDisplay">
            <ul class="pl-0">
                <li class="message-row" v-for="msg in messages" :key="msg._id">
                    <p>
                        <strong>\{{msg.nickname}}</strong>
                        <span class="message-datetime">\{{ getFormattedDateTime(msg.datetime) }}</span>
                    </p>
                    <p>\{{msg.messageText}}</p>
                </li>
            </ul>
        </div>
    `
};