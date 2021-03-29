import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterCustom } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
export const RegisterPage = () => {

    const dispatch = useDispatch();
    const { msgError, loading  } = useSelector(state => state.uiReducer)

    const [ formValues, handleInputChange ] = useForm({
        name: 'Alfred',
        email: 'alfred@gotham.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = ( event ) => {

        event.preventDefault();
      
        if ( isFormValid() ) {
            dispatch (
                startRegisterCustom(email, password, name) 
            );
        }
    };

    const isFormValid = () => {

        if ( name.trim().length === 0) {
            dispatch (
                setError('name is required')
            )
            return false;
        } else if ( !validator.isEmail( email ) ){
            dispatch(
                setError('Invalid email')
            )
            return false;
        } else if ( password !== password2 || password.length < 5) {
            dispatch(
                setError('Password should be at least 6 characteres and match each other')
            )
            return false;
        }
        dispatch( removeError() );
        return true;
    }


    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form 
                onSubmit={handleRegister}
                className="animate__animated animate__fadeIn animate__faster"
            >
                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }
                <input
                    type="text"
                    className="auth__input"
                    placeholder="name"
                    name="name"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}

                />
                <input
                    type="text"
                    className="auth__input"
                    placeholder="email"
                    name="email"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    className="auth__input"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    className="auth__input"
                    placeholder="confirm password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                    disabled={ loading }
                >
                    Register
                </button>




                <Link className="link" to="/auth/login">
                    Already registered?
                </Link>
            </form>
        </>
    )
}
