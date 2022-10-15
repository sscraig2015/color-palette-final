const initialState = {
    user: [],
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case "user/signin":
            return {

            }
        default:
            return state;
    }
}

export default userReducer