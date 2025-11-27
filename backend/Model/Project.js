const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
    projectname:{
        type:String,
        required:true
    },
    dos:{
        type:Date,
        required:true
    },
    studentdetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true
    }
})

const project = mongoose.model('projects',projectSchema)
module.exports = project