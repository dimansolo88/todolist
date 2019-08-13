import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoReducer} from "./todo-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    todo: todoReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));