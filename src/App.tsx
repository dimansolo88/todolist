import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import {connect} from "react-redux";
import {
    addTask,
    addTaskThunkCreator, deleteTaskThunkCreator,
    fetchTasksThunkCreator,
    setTasks,
    updateTaskStatusThunkCreator, updateTaskTitleThunkCreator
} from "./redux/todo-reducer";
import * as axios from "axios";
import {API} from "./api/API";

interface IProps {
    fetchTasks: Function,
    addTask: Function,
    updateTaskStatus: Function,
    updateTaskTitle: Function,
    deleteTask: Function,
    status: string,
    tasks: any[]
}


class App extends React.Component<IProps> {
    widgetId = 3234;

    state = { age: 10};

    componentDidMount() {
        this.props.fetchTasks(this.widgetId);
    }

    addTask = (taskTitle: string) => {
        this.props.addTask(this.widgetId, taskTitle);
    };

    updateTaskStatus = (done: boolean, taskId: string) => {
        API.updateTaskStatus(this.widgetId, taskId, done)
            .then(res => this.props.addTask(res.data.task));
    };

    onTaskStatusChanged = (taskId: string, isDone: boolean) => {
        this.props.updateTaskStatus(this.widgetId, taskId, isDone)
    };
    onTaskTitleChanged = (taskId: string, title: boolean) => {
        this.props.updateTaskTitle(this.widgetId, taskId, title)
    };
    onTaskDeleted = (taskId: string) => {
        this.props.deleteTask(this.widgetId, taskId)
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} status={this.props.status}/>
                    <TodoListTasks tasks={this.props.tasks} updateTaskStatus={this.onTaskStatusChanged}
                                   deleteTask={this.onTaskDeleted}
                                   changeTitle={this.onTaskTitleChanged }/>
                    <TodoListFooter/>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state: any) => ({
    tasks: state.todo.tasks,
    status: state.todo.status
});

let mapDispatchToProps = (dispatch: Function) => ({
    fetchTasks: (widgetId: number) => {
        dispatch(fetchTasksThunkCreator(widgetId));
       // fetchTasksThunk(widgetId, dispatch);
    },
    updateTaskStatus: (widgetId: number, taskId: string, isDone: boolean) => {
        dispatch(updateTaskStatusThunkCreator(widgetId, taskId, isDone))
    },
    updateTaskTitle: (widgetId: number, taskId: string, title: string) => {
        dispatch(updateTaskTitleThunkCreator(widgetId, taskId, title))
    },

    addTask: (widgetId: number, taskTitle: string) => {
       dispatch(addTaskThunkCreator(widgetId, taskTitle))
    },
    deleteTask: (widgetId: number, taskId: string) => {
        dispatch(deleteTaskThunkCreator(widgetId, taskId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

