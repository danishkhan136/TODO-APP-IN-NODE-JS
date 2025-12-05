const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
app.use(express.json());
app.use(cors());

let tasks = [];
app.get("/tasks", (req, res) => {
    res.json(tasks);
});
app.post("/tasks", (req, res) => {
    const newTask = req.body.task;      // step 1: get task
    tasks.push(newTask);                // step 2: add to array
    res.json({ message: "Task added" }); // step 3: reply
});
app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    tasks.splice(id, 1);
    res.json({ message: "Task deleted" });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})