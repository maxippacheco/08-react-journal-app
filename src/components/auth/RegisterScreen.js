import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const {msgError} = useSelector(state => state.ui);
    

    const [formValues, handleInputChange] = useForm({

        email: 'maximo@gmail.com',
        name: 'maximo', 
        password: '123456',
        password2: '123456'
    })

    const { email, name, password, password2 } = formValues;

    const handleRegister = e => {
        e.preventDefault();

        console.log(email, name, password, password2)

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email,password,name))
        }
    }
    

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError(
                 'name is required'                
            ))
            return false;

        }else if( !validator.isEmail(email) ){
            dispatch(setError(
                'email is required'
            ))
            return false;
        }else if(password !== password2 || password.length <5){

            dispatch(setError(
                'password should be at 6 characters and be equal to the password 2'
            ))
            return false;
        }
            
        dispatch(removeError())
        return true;
    }
    

    /*
    useEffect(() => {
        console.log(email, name, password, password2)

    }, [formValues])*/

    
    return (
        <div>
            <div>
            <h3 className='auth__title'>Login</h3>

                <form onSubmit= {handleRegister}>
                
                    {
                        msgError &&
                        (
                        <div className='auth__alert-error'>
                              {msgError}
                        </div>
                        
                        )
                    
                    }

                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        autoComplete='off'
                        className='auth__input'
                        value = {email}
                        onChange={handleInputChange}
                    />


                    <input
                        type='text'
                        placeholder='name'
                        name='name'
                        autoComplete='off'
                        className='auth__input'
                        value = {name}
                        onChange={handleInputChange}
                    />

                    <input
                        type='password'
                        placeholder='password'
                        name='password'
                        className='auth__input'
                        value = {password}
                        onChange={handleInputChange}

                    />

                    <input
                        type='password'
                        placeholder='confirm password'
                        name='password2'
                        className='auth__input'
                        value = {password2}
                        onChange={handleInputChange}

                    />

                    <button
                        type='submit'
                        className='btn btn-primary btn-block pointer mb-5'
                    >
                        Register
                </button>

                    <Link
                        to='/auth/login'
                        className='link '
                    >
                        Alredy registered?
                </Link>
                </form>
            </div>
        </div>
    )
}
