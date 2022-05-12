const { default: axios } = require("axios");
const express = require("express");
const app = express();
app.use(express.json());

// give success message on root path
app.get("/", (req, res) => {
    res.send("server working")
})
// get list of todos
app.get("/todos", async (req, res) => {
    const result = await axios.get("https://jsonplaceholder.typicode.com/todos");
    const todos = result.data.map(({ id, title, completed }) => ({ id, title, completed }));
    res.send(todos)
})
// get todos by user id
app.get("/user/:userid", async (req, res) => {
    const userId = req.params.userid;
    const allResult = await axios.get("https://jsonplaceholder.typicode.com/todos");
    const singleResult = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const todos = allResult.data.filter(todo => todo.userId.toString() === userId);
    const { id, name, email, phone } = singleResult.data;
    const result = { id, name, email, phone, todos }
    res.send(result);
})
// connect to the port
app.listen(3000, () => {
    console.log(`listening form http://localhost:3000`)
})