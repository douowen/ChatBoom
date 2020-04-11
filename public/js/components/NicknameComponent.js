export default {
    data() {
        return {
            chatroomNickname: ''
        };
    },
    template: `
        <div class="nickname-container">
            <input type="text" class="form-control" placeholder="Set a nickname to send message." v-model="chatroomNickname" />
            <button class="btn btn-primary ml-1" v-on:click="$emit('set-nickname', chatroomNickname)">Set</button>
        </div>
    `
};