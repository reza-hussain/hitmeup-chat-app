export const ActionTypes = {
    SET_USER : 'SET_USER',
    SET_CHATS: 'SET_CHATS',
    SET_CURRENT_CHAT: 'SET_CURRENT_CHAT'
}

const reducer = (state, action) => {
    switch(action.type){
        case ActionTypes.SET_USER :
            return{ ...state, userInfo: action.userInfo}

        case ActionTypes.SET_CHATS:
            return{...state, allRooms: action.allRooms}
        
        case ActionTypes.SET_CURRENT_CHAT:
            return{...state, currentRoom: action.currentRoom}
        default :
            return state
    }

}

export default reducer