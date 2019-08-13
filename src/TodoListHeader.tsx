import React from 'react';
import './App.css';
import {statuses} from "./redux/todo-reducer";

interface IProps {
    status: string,
    addTask: Function,
}

class TodoListHeader extends React.Component<IProps> {

    state = {};
    newTaskInputRef: any;

    constructor(props: IProps) {
        super(props);
        this.newTaskInputRef = React.createRef();
    }

    render = () => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input type="text" ref={this.newTaskInputRef} placeholder="New task name"/>
                    <button disabled={this.props.status === statuses.REQUEST}  onClick={() => {
                        this.props.addTask(this.newTaskInputRef.current.value);
                    }}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

