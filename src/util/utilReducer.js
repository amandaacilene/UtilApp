
const INITIAL_STATE = { description: '', list: [] }

export default (state = INITIAL_STATE, action) => { 
    switch(action.type) {
        case 'DESCRIPTION_CHANGED':
            return { ...state, description: action.payload }
        case 'UTIL_SEARCHED':
            return { ...state, list: action.payload }
        case 'UTIL_CLEAR':
            return { ...state, description: '' }
        default:
            return state
    }
}