const initialState = {
    fromUser: null,
    message: '',
    timeSent: ''
}

const FROM_USER = "FROM_USER"
const MESSAGE = "MESSAGE"
const TIME_SENT = "TIME_SENT"

export default function messageReducer(state = initialState, action){
    switch(action.type){
        case FROM_USER:
            console.log('this message is from, ', action.payload)
            return {...state, fromUser: action.payload}
        case MESSAGE:
            console.log('New Message: ', action.payload )
            return {...state, message: action.payload}
        case TIME_SENT: 
            console.log('This message was sent out at, ', action.payload)
    }
}

export function fromUser(user){
    return {
        type: FROM_USER,
        payload: user
    }
}

export function message(message){
    return {
        type: MESSAGE,
        payload: message
    }
}

export function timeSent(time){
    return {
        type: TIME_SENT,
        payload: time
    }
}