import {
    Action,
    Reducer
} from 'redux';
import { AppThunkAction } from '.';

export interface SessionState {
    session:boolean,
    username:string,
};

export interface SendSessionAction {type: 'SEND_SESSION', username:string}; 
export interface ResetSessionAction {type:'RESET_SESSION'};

type KnownAction = SendSessionAction|ResetSessionAction; 

export const actionCreators = {
    sendsession : (username:string):AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({type:"SEND_SESSION", username:username});
    },
};
export const reducer: Reducer<SessionState> = (state: SessionState | undefined, incomingAction: Action): SessionState => {
    if (state === undefined) {
        return { session: false, username:'' };
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SEND_SESSION':
            return { session:true,username:action.username };
        case 'RESET_SESSION':           
            return { session:false, username:''};
        default:
            return state;
    }
};
