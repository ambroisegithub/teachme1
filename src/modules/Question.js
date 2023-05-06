import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
    quizid: {
        type: String,
    },
    questionId: {
        type: String,
        required: true
    },
    questionText: {
        type: String, 
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        default: []
    }
});


const Question = mongoose.model("question",questionSchema);
export default Question;

