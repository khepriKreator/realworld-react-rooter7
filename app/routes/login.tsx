import {Form, Link, redirect} from 'react-router';
import type {Route} from '../+types/root';
import { ConduitAPI } from '~/shared/api/services/api';
import type { LoginUserRequest } from '~/shared/api/models/models';
import { AuthTokenHelper } from '~/shared/api/helpers/authTokenHelper';

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    if (!email || !password) {
        return {
            error: 'Email or password is empty',
        }
    }
    const api = new ConduitAPI();
    try {
        const res = await api.login({user: { email: email as string, password: password as string}});
        const {token} = res.user;
        const headers = AuthTokenHelper.setToHeaderAsCookie({token}, new Headers(), 'Set-Cookie');
        return redirect(`/settings`, {headers});
    } catch(e) {
        console.log(e);
        return {
        error: 'Email or password is incorrect',
        };
    }
}

const Login = () => {
    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <Link to="/users/register">Need an account?</Link>
                        </p>

                        {/* <ul className="error-messages">
                        <li>That email is already taken</li>
                        </ul> */}

                        <Form action='/users/login' method='post'>
                            <fieldset className="form-group">
                                <input name='email' required className="form-control form-control-lg" type="text" placeholder="Email" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input name='password' required className="form-control form-control-lg" type="password" placeholder="Password" />
                            </fieldset>
                            <button type="submit" className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;