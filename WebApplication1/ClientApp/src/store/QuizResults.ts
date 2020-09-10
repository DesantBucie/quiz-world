import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import axios from 'axios';

export interface QuizResultsState {
    goodAnswers:number,
    badAnswers:number,
};

export interface GetQuizResultsAction {type: 'GET_QUIZ_RESULTS', goodAnswers:number, badAnswers:number}; 
export interface RecieveQuizResultsAction {type:'RECIEVE_QUIZ_RESULTS'};

type KnownAction = GetQuizResultsAction|RecieveQuizResultsAction; 

export const actionCreators = {
    getQuizResults : ():AppThunkAction<KnownAction> => (dispatch) => {
        axios.get(`/api/Test/summary`,{
        })
        .then (res => {
            dispatch({type:"GET_QUIZ_RESULTS", goodAnswers:res.data[0], badAnswers:res.data[1] })
        })
    },
};
export const reducer: Reducer<QuizResultsState> = (state: QuizResultsState | undefined, incomingAction: Action): QuizResultsState => {
    if (state === undefined) {
        return { goodAnswers:0,badAnswers:0 };
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'GET_QUIZ_RESULTS':
            return { goodAnswers:action.goodAnswers, badAnswers:action.badAnswers };
        case 'RECIEVE_QUIZ_RESULTS':           
            return {goodAnswers:state.goodAnswers, badAnswers:state.badAnswers};
        default:
            return state;
    }
};
