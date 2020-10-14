import {
    Action,
    Reducer
} from 'redux';
import { AppThunkAction } from '.';

export interface DarkmodeState {
    icon:boolean,
};

export interface GetIconAction {type: 'GET_ICON',icon:boolean}; 
export interface RecieveIconAction {type:'RECIEVE_ICON'};

type KnownAction = GetIconAction|RecieveIconAction; 

export const actionCreators = {
    geticon : (icon:boolean):AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({type:"GET_ICON", icon:icon});
    },
};
export const reducer: Reducer<DarkmodeState> = (state: DarkmodeState | undefined, incomingAction: Action): DarkmodeState => {
    if (state === undefined) {
        return { icon:true };
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'GET_ICON':
            return { icon:action.icon };
        case 'RECIEVE_ICON':           
            return { icon:state.icon };
        default:
            return state;
    }
};
