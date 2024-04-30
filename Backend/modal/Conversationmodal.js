const mongoose = require("mongoose");
const ConversationSchema=new mongoose.Schema(
    {
        participants:[
            {
                type:mongoose.Schema.Type.ObjectId,
                ref:"User",
            },

        ],
        message:[
            {
                type:mongoose.Schema.Type.objectId,
                ref:"message",
                default:[],
            }
        ],
    },
    {
        timestamps:true
    }
);
const Conversation=mongoose.model("Converstaion",ConversationSchema);
module.exports=Conversation;