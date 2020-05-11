import {createStore} from 'redux';

export interface QuestionStorageState {
    Questions:QuestionStorage[]
}
export interface QuestionStorage {
    Question: {
        category:string,
        id:number,
        answers:{
            answer1:string,
            answer2:string,
            answer3:string
        }

    }
}