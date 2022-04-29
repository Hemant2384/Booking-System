
export const initialState=false;

export const reducer = (state,action) =>{
    if(action.type==="USER"){
        return action.payload;
    }
    else if(action.type==="EMAIL"){
        return action.payload;
    }

    return state;
}