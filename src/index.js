import React, { Component, } from "react";
import ReactDOM from "react-dom";

// Would modularize components into different files
// Add propTypes for each component

const Header = (props) => {
    return (
    <header>
      <h1>Dojo Todos</h1>
      <h3>Todo list</h3>
    </header>
    );
};

const FilterPanel = (props) => {
    // Those buttons look duplicative; find a way to rewrite as mapping function based on passed-down props
    return (
    <div>
      <button onClick={props.handleFilter} type="" value="all">All</button>
      <button onClick={props.handleFilter} type="" value="completed">Completed</button>
      <button onClick={props.handleFilter} type="" value="pending">Pending</button>
    </div>
    );
};

const List = (props) => {
    // Never, ever use index as your key (I've made this mistake). That's actually what React is doing when it's giving you the warning. 
    // The reason is because the index can be associated with a different node if things are filtered -- there's no explicit tie to any todo object.
    // Instead, go with something unique and attached to the todo, such as the string itself (better yet, create unique id's for each)
    const listItemCollection = props.items.map((item, index) => <ListItem key={index} onChange={props.onChange} index={index} {...item} handleCheck={props.handleCheck} deleteTodo={props.deleteTodo} />);
    return (
    <ul>
      {listItemCollection}
    </ul>
    );
};

const ListItem = ({text ,completed, index, id, onChange, deleteTodo, }) => {
    // It's difficult to see that the onChange hook is sending the index up the chain. I'd favor an id instead, and be explicit about it.
    return (
      <div>
        <input type="checkbox" checked={completed} value={index} onChange={onChange} />{text} 
        <button type="" onClick={e => deleteTodo(e, id)}>Delete</button>
      </div>
    );
};

const TodoForm = ({createTodo,}) => {
    // In React, refs are sort of an anti-pattern. Instead, you want this to be a controlled component that manages its own state.
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
            // I know we decided as a group to put newTodoText here, but I like it as a piece of the form component's state...
            newTodoText: "",
        };
    }
    handleFilter = (e) => {
        this.setState({filter: e.target.value,});
    }
    onChange = (e) => {
        // A couple of things I'd change here:
        // 1. This function is all about updating a todo. I'd change the name
        // 2. Rather than accept 'e', you such accept something that allows you to uniquely identify the todo.
        let items = this.state.items;
        // You're mutating an exisiting data structure here, a no-no in React. Try map instead.
        items[e.target.value].completed = !this.state.items[e.target.value].completed;
        this.setState({ items: items, });
    }
    createTodo = (e, text) => {
        e.preventDefault();
        // Do items, id ever change? If not favor const
        let items = this.state.items;
        let id = items.length ? items[items.length-1].id : 0;
        // React is big on immutable data structures, so push is kinda a no-no. Use concat instead.
        items.push({ id:id+1 , text:text, completed:false, });
        this.setState({ items: items, });
    }
    deleteTodo = (e, id) => {
        // Why does deleteTodo accept an event?
        let items = this.state.items; // What is this line of code doing for you? Looks like items just gets reassigned in the next line...
        items = items.filter(item => item.id !== id); 
        this.setState({ items: items, });
    }
    render(){
        let items = this.state.items;
        // Any way to clean this pattern up? Not particularly easy to extend... Maybe break out into a separate function taht just delivers filtered todos?
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
