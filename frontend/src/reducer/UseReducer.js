export const initialState=false;
export const wishinitialState=[];
export const emailinitialState='';
export const roleinitialState='';
export const issueinitialState=[];
export const bookinitialState=[];

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
export const rolereducer = (state,action) =>{
     if(action.type==="ROLE"){
        return action.payload;
    }
    return state;
}
export const wishlishtreducer = (state,action) =>{
     if(action.type==="WISH"){
        return [...state,action.payload];
    }
    return state;
}
export const issuereducer = (state,action) =>{
     if(action.type==="ISSUE"){
        return [...state,action.payload];
    }
    return state;
}
export const bookreducer = (state,action) =>{
     if(action.type==="Book"){
        return [...state,action.payload];
    }
    return state;
}