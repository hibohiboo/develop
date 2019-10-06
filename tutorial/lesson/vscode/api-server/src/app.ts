import * as Express from 'express';
import * as bodyParser from 'body-parser';


const app = Express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, VS Code!!!');
});

interface Task {
  category: string;
  title: string;
  done: boolean;
}

const tasks: Task[] = [
  {
    category: "Private",
    title: "買い物",
    done: false
  }
]

app.get('/tasks', (req, res) => {
  res.json(tasks);
})

app.post('/tasks', (req, res) => {
  const received = req.body;
  if ("category" in received && "title" in received && "done" in received) {
    const newTask: Task = {
      category: received.category,
      title: received.title,
      done: received.done

    }
    tasks.push(newTask);
    console.log('Add', newTask);
    res.send('An item has been added');
  } else {
    res.status(400).send('Parameter are invalid')
  }
})
export { app };