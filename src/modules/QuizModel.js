import mongoose from 'mongoose';

const quizSchema = mongoose.Schema({
   quizId:{
    type: String
   },
    quizname: {
        type: String,
        required: true
    },
    quizdescription: {
        type: String,
        required: true
    },
    upload: {
        type: Boolean,
        default: false
    },
    owner: {
        type: String,
    },
    owneremail: {
        type: String,
    },
    questions:{
        type: Array
    }
});


const Quiz = mongoose.model("quiz",quizSchema);
export default Quiz;
