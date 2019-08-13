import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";

interface IProps {
    tasks: any[],
    updateTaskStatus: Function,
    deleteTask: Function,
    changeTitle: Function
}

class TodoListTasks extends React.Component<IProps> {
    render = () => {
        let {tasks, updateTaskStatus, deleteTask, changeTitle} = this.props;

        let tasksElements = tasks.map( task => <TodoListTask title={task.title}
                                                                        done={task.done}
                                                                        priority={task.priority}
                                                                        taskId={task.id}
                                                             updateTaskStatus={updateTaskStatus}
                                                             deleteTask={deleteTask}
                                                             changeTitle={changeTitle}
        />);

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

