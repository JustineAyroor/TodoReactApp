import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as apiCalls from './api'; 

class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos: []
        }
        this.addTodo = this.addTodo.bind(this);
    }

    componentDidMount(){
        this.loadTodos();
    }

    async loadTodos(){
        let allTodos = await apiCalls.getTodos();
        this.setState({todos: allTodos})
    }

    async addTodo(val){
        // console.log("Adding Todo from TodoList Component:", val)
        let newTodo = await apiCalls.createTodo(val);
        this.setState({todos: [...this.state.todos, newTodo]});
    }

    async deleteTodo(id){
        
        await apiCalls.removeTodo(id);
        const todos = this.state.todos.filter(todo => todo._id !== id)
        this.setState({todos: todos})

    }

    async toggleTodo(todo){
        let updatedTodo = await apiCalls.updateTodo(todo);
        const todos = this.state.todos.map(todo => 
            (todo._id === updatedTodo._id)? {...todo,completed: !todo.completed}:todo
        )
        this.setState({todos: todos})
    }

    render(){
        const todos = this.state.todos.map((todo) => (
            <TodoItem 
                key={todo._id} 
                {...todo} 
                onDelete={this.deleteTodo.bind(this,todo._id)}
                onToggle={this.toggleTodo.bind(this,todo)}
            />
        ));

        return(
        <div>
            <h1>TodosList React App</h1>
            <TodoForm addTodo={this.addTodo}/>
            <ul>
                {todos}
            </ul>
        </div>
        
        );
    }
}

export default TodoList;