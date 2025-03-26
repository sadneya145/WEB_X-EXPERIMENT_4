const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json()); 
const PORT = 5000

mongoose.connect("mongodb+srv://sadneyasam05:root@cluster0.kjypxqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Student Schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true }
});

const Student = mongoose.model("Student", studentSchema);

// RESTful Endpoints

// 1. Retrieve all students
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// 2. Retrieve a student by ID
app.get("/students/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.json(student);
});

// 3. Add a new student
app.post("/students", async (req, res) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json({ message: "Student added successfully!" });
});

// 4. Update a student by ID
app.put("/students/:id", async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Student updated successfully!" });
});

// 5. Delete a student by ID
app.delete("/students/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully!" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
