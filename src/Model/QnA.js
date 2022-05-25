const mongoose =require('mongoose') 

const QnASchema = mongoose.Schema({
    question:{
        type: String,
        required: true,
    },
    keywords:[
    ],
    answer:{
        type: String,
        required: true,
    },
    by:{
        type: String,
        required: true,
    }

}, {timestamps: true})

const QnA = mongoose.model("QnA", QnASchema);
module.exports = QnA