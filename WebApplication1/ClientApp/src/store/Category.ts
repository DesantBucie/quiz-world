import {
    Action,
    Reducer
} from 'redux';
import {AppThunkAction} from '.';

export interface Category {
    category?: string;
}

interface CategoryAction extends Category, Action<string> {
};

export const categoryActionTypes = {
    GET_CATEGORY:  'GET_CATEGORY',
    RECEIVE_CATEGORY: 'RECEIVE_CATEGORY'
}

export const actionCreators = {
    getCategory: (category: string): AppThunkAction<CategoryAction> => (dispatch) => {
        dispatch({type: categoryActionTypes.GET_CATEGORY, category});
    },
};

const initState: Category = {
    category: 'spoleczenstwo'
}

export const reducer: Reducer<Category> = (state : Category = initState, action: CategoryAction): Category => {
    switch (action.type) {
        case categoryActionTypes.GET_CATEGORY:
            return {category: action.category};
        case categoryActionTypes.RECEIVE_CATEGORY:
            return {category: state.category};
        default:
            return state;
    }
};


