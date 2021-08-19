import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const signin = (formData,history) => async (dispatch) => {
    try{
        const {data} = api.signIn(formData);
        console.log(formData);
        dispatch({ type:AUTH, data});
        history.push('/');
    }
    catch(error){
        console.log(error);
    }
}

export const signup = (formData,history) => async (dispatch) => {
    try{
        const { data } = api.signUp(formData);
        dispatch({ type:AUTH, data });
        history.push('/')
    }
    catch(error){
        console.log(error);
    }
}