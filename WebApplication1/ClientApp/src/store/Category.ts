import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface CategoryState {
    category:string,
};

export interface GetCategoryAction {type: 'GET_CATEGORY',category:string}; 
export interface RecieveCategoryAction {type:'RECIEVE_CATEGORY'};

type KnownAction = GetCategoryAction|RecieveCategoryAction; 

export const actionCreators = {
    getcategory : (category:string):AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({type:"GET_CATEGORY", category:category});
    },
};
export const reducer: Reducer<CategoryState> = (state: CategoryState | undefined, incomingAction: Action): CategoryState => {
    if (state === undefined) {
        return { category: 'społeczeństwo' };
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'GET_CATEGORY':
            return { category:action.category };
        case 'RECIEVE_CATEGORY':           
            return {category:state.category};
        default:
            return state;
    }
};
