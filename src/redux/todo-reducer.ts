import {API} from "../api/API";
import {ITask} from "../api/entities/entities";

const SET_TASKS = 'SET_TASKS';
const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE';
const CHANGE_TASK_DESCRIPTION = 'CHANGE_TASK_DESCRIPTION';
const CHANGE_STATUS = 'CHANGE_STATUS';

export const statuses = {
    SUCCESS: "success",
    NONE: "none",
    ERROR: "error",
    REQUEST: "request",
};

const initialState = {
    error: "",
    tasks: [],
    status: statuses.NONE // "success", "error", "request"
};

const changeTask = (state: any, action: any, propertyName: string) => {
    return {...state, tasks: state.tasks.map( (t: any) => {
                if (t.id === action.id) {
                    return {...t, [propertyName]: action[propertyName] };
                }
                return t;
        }) }
};

export const todoReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case SET_TASKS: {
            return {...state, tasks: action.tasks}
        }
        case CHANGE_STATUS: {
            return {...state, status: action.status}
        }
        case ADD_TASK: {
            return {...state, tasks: [...state.tasks, action.task]}
        }
        case DELETE_TASK: {
            debugger
            return {...state, tasks: state.tasks.filter( (t: any) => t.id !== action.taskId)}
        }
        case CHANGE_TASK_STATUS: {
            return changeTask(state, action, "done");
        }
        case CHANGE_TASK_TITLE: {
            return changeTask(state, action, "title");
        }
        case CHANGE_TASK_DESCRIPTION: {
            return changeTask(state, action, "description");
        }
        default: return state;
    }
};

export const setTasks = (tasks: ITask[]) => ({type: SET_TASKS, tasks});
export const changeStatus = (status: string) => ({type: CHANGE_STATUS, status});
export const addTask = (task: ITask) => ({type: ADD_TASK, task});
export const deleteTask = (taskId: string) => ({type: DELETE_TASK, taskId});
export const changeTaskStatus = (id: string, done: boolean) => ({type: CHANGE_TASK_STATUS, done, id});
export const changeTaskTitle = (id: string, title: string) => ({type: CHANGE_TASK_TITLE, title, id});

export const fetchTasksThunkCreator =  (widgetId: number) => {
    return (dispatch: Function) => {
        API.getTasks(widgetId)
            .then((res: any) => {
                dispatch(setTasks(res.data));
            });
    };
};

export const addTaskThunkCreator =  (widgetId: number, taskTitle: string) => {
    return (dispatch: Function) => {
        dispatch(changeStatus(statuses.REQUEST));
        API.addTask(widgetId, taskTitle)
            .then( (task: ITask) => {
                dispatch(changeStatus(statuses.SUCCESS));
                dispatch(addTask(task));
            })
            .catch((errorMessage) => {
                alert(errorMessage);
                dispatch(changeStatus(statuses.ERROR));
            });
    };
};

export const deleteTaskThunkCreator =  (widgetId: number, taskId: string) => {
    return (dispatch: Function) => {
        API.deleteTask(widgetId, taskId)
            .then( (res: any) => dispatch(deleteTask(taskId)));
    };
};

export const updateTaskStatusThunkCreator =  (widgetId: number, taskId: string, isDone: boolean) => {
    return (dispatch: Function) => {
        API.updateTaskStatus(widgetId, taskId, isDone)
            .then((res: any) => {
               debugger;
                 dispatch(changeTaskStatus(taskId, isDone))
            });
    };
};
export const updateTaskTitleThunkCreator =  (widgetId: number, taskId: string, title: string) => {
    return (dispatch: Function) => {
        API.updateTaskTitle(widgetId, taskId, title)
            .then( (res: any) => {
               debugger;
                 dispatch(changeTaskTitle(taskId, title))
            });
    };
};