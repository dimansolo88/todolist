import axios from "axios";

export const API = {
    getTasks(widgetId: number) {
        return axios.get(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}`);
    },
    addTask(widgetId: number, taskTitle: string) {
        return axios.post(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}`, {
                title: taskTitle
            })
            .then(res => {
                if (res.data.status === "error"){
                    throw new Error(res.data.message);
                }
                return res.data.task;
            });
    },
    updateTaskStatus(widgetId: number, taskId: string, done: boolean) {
        return axios.put(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}`,
            {
                taskId: taskId,
                done: done
            });
    },
    updateTaskTitle(widgetId: number, taskId: string, title: string) {
        return axios.put(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}`,
            {
                taskId: taskId,
                title: title
            });
    },
    deleteTask(widgetId: number, taskId: string) {
        return axios.delete(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}&taskId=${taskId}`);
    }

};