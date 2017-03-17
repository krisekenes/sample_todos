import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
  return (
    <header>
      <h1>Dojo Todos</h1>
      <h3>Todo list</h3>
    </header>
  )
}

const FilterPanel = (props) => {
  return (
    <div>
      <button type="">All</button>
      <button type="">Completed</button>
      <button type="">Pending</button>
    </div>
  )
}


const List = (props) => {
  return (
    <ul>
      <ListItem text={"Don't be Len Bias"}/>
      <ListItem text={"Try new things"}/>
      <ListItem text={"Practice basetball"}/>
    </ul>
  )
}

const ListItem = ({text}) => {
  return (
    <div>
      <input type="checkbox" />{text} 
      <button type="">Delete</button>
    </div>
  )
}

const TodoForm = (props) => {
  return (
    <form>
      <input type="text" name=""  />
      <input type="submit" name="" value="Add" />
    </form>
  )
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      items: [
        { text: "Don't be Len Bias", completed: true },
        { text: "Try new things", completed: false },
        { text: "Practice basketball", completed: false }
      ],
      filter: 'all',
      newTodoText: ''
    }
  }
  render(){
    return (
      <div>
        <Header />
        <FilterPanel />
        <List />
        <TodoForm />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
