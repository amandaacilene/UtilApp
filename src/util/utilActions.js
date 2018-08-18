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