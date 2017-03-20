import React, { Component, } from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
    return (
    <header>
      <h1>Dojo Todos</h1>
      <h3>Todo list</h3>
    </header>
    );
};

const FilterPanel = (props) => {
    return (
    <div>
      <button onClick={props.handleFilter} type="" value="all">All</button>
      <button onClick={props.handleFilter} type="" value="completed">Completed</button>
      <button onClick={props.handleFilter} type="" value="pending">Pending</button>
    </div>
    );
};

const List = (props) => {
    const listItemCollection = props.items.map((item, index) => <ListItem key={index} onChange={props.onChange} index={index} {...item} handleCheck={props.handleCheck} deleteTodo={props.deleteTodo} />);
    return (
    <ul>
      {listItemCollection}
    </ul>
    );
};

const ListItem = ({text ,completed, index, id, onChange, deleteTodo, }) => {
    return (
      <div>
        <input type="checkbox" checked={completed} value={index} onChange={onChange} />{text} 
        <button type="" onClick={e => deleteTodo(e, id)}>Delete</button>
      </div>
    );
};

const TodoForm = ({createTodo,}) => {
    let textInput = null;
    return (
    <form onSubmit={e => createTodo(e, textInput.value)}>
      <input type="text" ref={(input) => { textInput = input; }} />
      <input type="submit" value="Add" />
    </form>
    );
};

class App extends Component {
    constructor(){
        super();
        this.state = {
            items: [
              { id: 1, text: "Learn React", completed: true, },
              { id: 2, text: "Build a todo app", completed: false, },
              { id: 3, text: "Profit!", completed: false, },
            ],
            filter: "all",
            newTodoText: "",
        };
    }
    handleFilter = (e) => {
        this.setState({filter: e.target.value,});
    }
    onChange = (e) => {
        let items = this.state.items;
        items[e.target.value].completed = !this.state.items[e.target.value].completed;
        this.setState({ items: items, });
    }
    createTodo = (e, text) => {
        e.preventDefault();
        let items = this.state.items;
        let id = items.length ? items[items.length-1].id : 0;
        items.push({ id:id+1 , text:text, completed:false, });
        this.setState({ items: items, });
    }
    deleteTodo = (e, id) => {
        let items = this.state.items;
        items = items.filter(item => item.id !== id); 
        this.setState({ items: items, });
    }
    render(){
        let items = this.state.items;
        if(this.state.filter === "completed"){
            items = items.filter(item =>
            item.completed);
        } else if(this.state.filter === "pending"){
            items = items.filter(item =>
            !item.completed);
        }
        return (
          <div>
            <Header />
            <FilterPanel handleFilter={this.handleFilter} />
            <List items={items} onChange={this.onChange} deleteTodo={this.deleteTodo} />
            <TodoForm createTodo={this.createTodo} />
          </div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
