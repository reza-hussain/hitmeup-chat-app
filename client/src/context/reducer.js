export const ActionTypes = {
    SET_USER : 'SET_USER',
    CREATE_CHAT: 'CREATE_CHAT',
    SET_CURRENT_CHAT: 'SET_CURRENT_CHAT'
}

const reducer = (state, action) => {
    switch(action.type){
        case ActionTypes.SET_USER :
            return{ ...state, userInfo: action.userInfo}

        case ActionTypes.CREATE_CHAT:
            return{...state, chatData: action.chatData}
        
        case ActionTypes.SET_CURRENT_CHAT:
            return{...state, currentChat: action.currentChat}
        default :
            return state
    }

}

export default reducer