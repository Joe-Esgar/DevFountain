const initialState = {
    userWhoPosted: null,
    content: '',
    postTime: '',
    likeCount: null
}

const USER_WHO_POSTED = "USER_WHO_POSTED"
const CONTENT = "CONTENT"
const POST_TIME = "POST_TIME"
const LIKE_COUNT = 'LIKE_COUNT'

export default function postsReducer(state = initialState, action){
    switch(action.type){
        case USER_WHO_POSTED:
            console.log('this is the user who made this post', action.payload)
            return {...state, userWhoPosted: action.payload}
        case CONTENT:
            console.log('this is the content on the post', action.payload)
            return {...state, content: action.payload}
        case POST_TIME:
            console.log('this post was made at ', action.payload)
            return {...state, postTime: action.payload}
        case LIKE_COUNT:
            console.log('This post has this many likes', action.payload)
            return {...state, likeCount: action.payload}
    }
}

export function myPost(user){
    return {
        type: USER_WHO_POSTED,
        payload: user
    }
}

export function postContent(content){
    return {
        type: CONTENT,
        payload: content
    }
}

export function postTime(time){
    return {
        type: POST_TIME,
        payload: time
    }
}

export function likeCount(count){
    return {
        type: LIKE_COUNT,
        payload: count
    }
}