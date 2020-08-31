const express = require("express");
cosnt = app = express();
const cors = require("cors"); // Allows different domain apps to communicate with each other
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'frontend')));

if(process.env.NODE_ENV === 'production') {
  app.get('/*', function (req, res) {
   	res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
  });
}

// ROUTES

// CREATE A TO-DO
app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

// GET all to-do's
app.get("/", async(req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todo");
        res.json(todos.rows);
    } catch(error) {
        console.error(error.message);
    }
})

// GET todo with specified id
app.get('/todos/:id', async(req, res) => {
    try {
        console.log(req.params.id);
        const todo = await pool.query("SELECT * from todo WHERE todo_id = $1", [req.params.id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

// Update a description with the given id
app.put('/todos/:id', async(req, res) => {
    try {
        const { description } = req.body;
        const update = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description ,req.params.id]);
        res.json("todo with was successfully updated.");
    } catch (error) {
        console.error(error.message);
    }
})

// Delete a TODO
app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteQuery = await pool.query("DELETE from todo WHERE todo_id = $1", [id]);
        res.json("Todo deleted");
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
})