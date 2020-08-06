import * as Category from './Category';
import * as Session from './Session';
//top level interface 
export interface ApplicationState {
    category: Category.CategoryState | undefined;
    session:Session.SessionState | undefined;
   // quizstorage: QuizStorage.QuizStorageState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    category: Category.reducer,
    session: Session.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
