export const initialState=false;

export const userreducer = (state,action) =>{
    if(action.type==="USER"){
        return action.payload;
    }
    return state;
}

export const emailreducer = (state,action) =>{
     if(action.type==="EMAIL"){
        return action.payload;
    }
    return state;
}