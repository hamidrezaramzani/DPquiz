const mongoose = require('mongoose');
const Scheam = mongoose.Schema;
const quizSchema = new Scheam({
    question: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: ""
    },
    answers: {
        type: Object
    }
});

const quizModel = mongoose.model("quiz", quizSchema);
module.exports = quizModel;