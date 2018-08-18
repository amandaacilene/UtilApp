import axios from 'axios'

const URL = 'http://localhost:3003/api/utils'

export const changeDescription = event => ({ 
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().util.description
        const search = description ? `&description__regex=/${description}/` : '' 
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => dispatch({type: 'UTIL_SEARCHED', payload: resp.data})) 
    }
}

export const add = (description) => {
    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
        }
}

export const markAsDone = (util) => { 
    return dispatch => {
        axios.put(`${URL}/${util._id}`, { ...util, done: true }) 
            .then(resp => dispatch(search()))
    } 
}
export const markAsPending = (util) => { 
    return dispatch => {
        axios.put(`${URL}/${util._id}`, { ...util, done: false }) 
            .then(resp => dispatch(search()))
    } 
}

export const remove = (util) => {
    return dispatch => {
        axios.delete(`${URL}/${util._id}`)
            .then(resp => dispatch(search()))
    }
}

export const clear = () => {
    return [{ type: 'UTIL_CLEAR' }, search()]
}

const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const getAllFromStorage = () => {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

const updateAllInStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const addToStorage = (description) => {
    const oldTasks = getAllFromStorage();
    const task = { description, _id: generateUUID(), done: false };
    const newTasks = [...oldTasks, task];
    updateAllInStorage(newTasks);
}

const markAsDoneInStorage = (id) => {
    const oldTasks = getAllFromStorage();
    const newTasks = oldTasks.reduce((tasks, task) => tasks.push(task._id == id ? { ...task, done: true } : task) && tasks, []);
    updateAllInStorage(newTasks);
}

const markAsPendingInStorage = (id) => {
    const oldTasks = getAllFromStorage();
    const newTasks = oldTasks.reduce((tasks, task) => tasks.push(task._id == id ? { ...task, done: false } : task) && tasks, []);
    updateAllInStorage(newTasks);
}

const removeInStorage = (id) => {
    const oldTasks = getAllFromStorage();
    const newTasks = oldTasks.filter(task => task._id != id);
    updateAllInStorage(newTasks);
}
