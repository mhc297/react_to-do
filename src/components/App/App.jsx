import React     from 'react';
import Nav       from '../Nav/Nav';
import TaskForm  from '../TaskForm';
import Footer    from '../Footer/Footer';
import TaskList  from '../TaskList';

import './App.css';
import './GA_gear.png';

export default class App extends React.Component {

  constructor(props) {
    super();

    this.state = {
      tasks: [],
    };

    this.addTask = this.addTask.bind(this);
  }

  addTask(name, desc){
    fetch (`/tasks`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    method: 'POST',
    body: JSON.stringify({name: name, desc: desc})
  })
    .then(r => r.json())
    .then((newTask) => {
      const newState = {...this.state.tasks};
      newState[newTask.id] = newTask;
      this.setState({tasks: newState});
    })
    .catch((error) => {
      throw error;
    });

    // POST to the db, this name and desc
    // .then update the state
    console.log(arguments);

  }

  render() {
    return (
      <container>
        <header>
          <Nav />
        </header>
        <main className="container">
          <section className="jumbotron">
            <h1>Task Manager</h1>
            <TaskForm addTask={this.addTask} />
          </section>
          {/* to do lists */}
          <section className="row">
            <article className="col-md-4">
              <h3>Open Items</h3>
              {/* THESE ARE THE OPEN TASKS*/}
              <TaskList collection={this.state.tasks} />
            </article>

            <article className="col-md-4">
              <h3>Completed Items</h3>
            {/* THESE ARE THE COMPLETED TASKS*/}
              <TaskList collection={this.state.tasks} />
            </article>

            <article className="col-md-4">
              <h3>Deleted Items</h3>
            {/* THESE ARE THE DELETED TASKS*/}
              <TaskList collection={this.state.tasks} />
            </article>
          </section>
        </main>
        <footer>
          <Footer />
        </footer>

      </container>
    );
  }

}
