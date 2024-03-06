const mongoose = require('mongoose');

// Define a schema for the Student model
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
   
  }
});

// Create a Mongoose model based on the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
