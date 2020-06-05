import { Action, Reducer } from 'redux';
import axios from 'axios';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface QuestionsState {
    isLoading      : boolean;
    startDateIndex?: number;
    questions      : Question[];
}

export interface Question {
    allquestions?:any;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestQuestionsAction {
    type          : 'REQUEST_QUESTIONS';
    startDateIndex: number;
}

interface ReceiveQuestionsAction {
    type          : 'RECEIVE_QUESTIONS';
    startDateIndex: number;
    questions     : Question[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestQuestionsAction | ReceiveQuestionsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestQuestions: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.weatherForecasts && startDateIndex !== appState.weatherForecasts.startDateIndex) {
           /*  
           ! fetch(`https://localhost:44322/api/Test`)
                .then(response => response.json() as Promise<Question[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_QUESTIONS', startDateIndex: startDateIndex, questions: data });
                });
                */
            axios.get(`https://localhost:44322/api/Test`)
            .then(res => {
                dispatch({ 
                    type          : 'RECEIVE_QUESTIONS',
                    startDateIndex: startDateIndex,
                    questions     : res.data 
                });
            })
            dispatch({ type: 'REQUEST_QUESTIONS', startDateIndex: startDateIndex });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: QuestionsState = { questions: [], isLoading: false };

export const reducer: Reducer<QuestionsState> = (state: QuestionsState | undefined, incomingAction: Action): QuestionsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_QUESTIONS':
            return {
                startDateIndex: action.startDateIndex,
                questions     : state.questions,
                isLoading     : true
            };
        case 'RECEIVE_QUESTIONS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    questions     : action.questions,
                    isLoading     : false
                };
            }
            break;
    }

    return state;
};