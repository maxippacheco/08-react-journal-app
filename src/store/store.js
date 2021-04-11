import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';

//import { authReducer } from '../reducers/authReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


//Route Reducer
const reducers = combineReducers({
    //añadimos asi varios reducers
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer

})


//creando el store y aplicando el middleware para trabajar con tareas sincronas
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);


