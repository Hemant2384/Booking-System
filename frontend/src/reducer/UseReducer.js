export const initialState=false;
export const wishinitialState=[];
export const emailinitialState='';
export const roleinitialState='';
export const issueinitialState=[];
export const bookinitialState=[];
export const totalwishinitialState=[];
export const totalissueinitialState=[];
export const winitialState=[];
export const iinitialState=[];

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
export const totalwishlishtreducer = (state,action) =>{
     if(action.type==="WISHLIST"){
        return action.payload;
    }
    return state;
}
export const totalissuetreducer = (state,action) =>{
     if(action.type==="ISSUES"){
        return action.payload;
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
export const wreducer = (state,action) =>{
     if(action.type==="USERW"){
        return [...state,action.payload];
    }
    return state;
}
export const ireducer = (state,action) =>{
     if(action.type==="USERI"){
        return [...state,action.payload];
    }
    return state;
}