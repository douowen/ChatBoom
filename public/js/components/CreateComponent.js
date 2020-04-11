export default {
    data() {
        return {
            chatroomName: ''
        };
    },
    template: `
        <div class="create-container mb-3">
            <input type="text" class="form-control" placeholder="Type a name for the new chatroom" v-model="chatroomName" />
            <button class="btn btn-primary ml-1" v-on:click="$emit('submit-create', chatroomName)">Create</button>
        </div>
    `
};