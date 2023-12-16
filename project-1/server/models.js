// models to conversations
const mongoose = require("mongoose");
const MyConversationSchema = new mongoose.Schema({
    message_id: {
        type: 'Number',
        required: true
    },
    who: {
        type: 'String',
        required: true
    },
    when: {
        type: 'Date',
        required: true
    },
    dialog: {
        type: 'String',
        required: true
    }
});

const conversations = mongoose.model("conversations", MyConversationSchema);
module.exports = conversations;