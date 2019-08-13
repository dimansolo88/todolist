import React from 'react';
import './App.css';

interface IProps {
title: string,
    changeTitle: Function,
    taskId: string,
    done: boolean,
    updateTaskStatus: Function,
    deleteTask: Function,
    priority: string
}

interface IState {
    editMode: boolean,
    title: string
}

class TodoListTask extends React.Component<IProps, IState> {

    state = {
        editMode: false,
        // @ts-ignore
        title: this.props.title
    };

    titleInputRef: any = React.createRef();

    onTitleBlur = () => {
        this.setState({editMode: false});

        if (this.props.title != this.state.title) {
            this.props.changeTitle(this.props.taskId, this.state.title);
        }
    };

    onTitleDblClick = () => {
        this.setState({editMode: true}, () => {
            //this.titleInputRef.current.focus();
        });
    };

    onTitleChanged = (e: any) => {
        this.setState({title: e.currentTarget.value });
    };

    render = () => {
        return (
                <div className="todoList-task">
                    <input type="checkbox" checked={this.props.done}
                           onChange={e => {
                               this.props.updateTaskStatus(this.props.taskId, e.currentTarget.checked);
                           }}/>
                    { this.state.editMode
                        ? <input value={this.state.title} autoFocus={true}
                                 onChange={this.onTitleChanged}
                                 onBlur={this.onTitleBlur} ref={this.titleInputRef}  />
                        : <span onDoubleClick={this.onTitleDblClick}>{this.props.title}</span> }
                    <button onClick={() => { this.props.deleteTask(this.props.taskId) } }>x</button>
                </div>
        );
    }
}

export default TodoListTask;

