import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';

export const LoginPage = () => {

    const dispatch = useDispatch();

    const { msgError, loading } = useSelector(state => state.uiReducer)

    const [{ email, password }, handleInputChange] = useForm({
        email: 'alfred@gotham.com',
        password: '123456'
    });

    const handleLogin = (e) => {

        e.preventDefault();
        console.log(email, password);
        if (isFormValid()) {
            dispatch(
                startLoginEmailPassword(email, password)
            );
        }

    }
    const handleGoogleLogin = (e) => {

        e.preventDefault();

        dispatch(startGoogleLogin());
    }

    const isFormValid = () => {


        if (!validator.isEmail(email)) {
            dispatch(
                setError('Invalid email')
            )
            return false;
        } else if (!password || password.length < 5) {
            dispatch(
                setError('Invalid password')
            )
            return false;
        }
        dispatch(removeError());
        return true;
    }


    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form 
                onSubmit={handleLogin}
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            { msgError}
                        </div>
                    )
                }

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

                <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    disabled={ loading }
                >
                    Sign In
                </button>


                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link className="link" to="/auth/register">
                    Create new account
                </Link>
               
            </form>
        </>
    )
}
