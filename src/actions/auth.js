import Swal from 'sweetalert2';
import {types} from '../types/types'
import {firebase, googleAuthProvider} from '../firebase/firebase-config'
import {startLoading, finishLoading} from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    //hace el return del dispatch
    //asi podemos hacer tareas asincronas/fetch, etc
    return (dispatch) => {
        
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword( email , password )
        .then(({user}) =>{


            dispatch(
                login(
                    user.uid, user.displayName
                ))

            dispatch(finishLoading());

        })
        .catch(e =>{
            console.log(e);
            dispatch(finishLoading());
            Swal.fire('Error', e.message, 'error')
        })

            // dispatch( login(123, 'Pepe') );

    }
    
}

export const startRegisterWithEmailPasswordName = (email,password,name) => {
    
    return (dispatch)=>{
        
        firebase.auth().createUserWithEmailAndPassword( email , password )
           .then(async({user}) =>{

               await user.updateProfile({displayName: name});

               dispatch(
                   login(
                       user.uid, user.displayName
                   )
               )
           })
           .catch(e =>{
               console.log(e);
               Swal.fire('Error', e.message, 'error')

           })

    }
}


export const startGoogleLogin = () => {
    return (dispatch) =>{

        firebase.auth().signInWithPopup( googleAuthProvider )
            .then(({user}) => {
                dispatch(
                    login(
                        user.uid, user.displayName
                ));
            })

    }
}



export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload:{
            uid,
            displayName
        }
    }    
}


export const startLogout = () => {
    return async( dispatch ) =>{
        //todo lo que diga firebase.auth() tiene que ver con autenticacion
        await firebase.auth().signOut();

        dispatch(logout());
        dispatch(noteLogout())
    }

}

export const logout = () =>({
    type: types.logout
})