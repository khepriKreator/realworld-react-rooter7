import { Form, Link, redirect } from "react-router";
import { ConduitAPI } from "~/shared/api/services/api";
import type { Route } from "../+types/root";
import type { NewUserRequest } from "~/shared/api/models/models";
import { AuthTokenHelper } from '~/shared/api/helpers/authTokenHelper';

export const action = async ({ request }: Route.ActionArgs) => {
    const api = new ConduitAPI();
    const formData = await request.formData();
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    if (!username || !email || !password) {
        return {
            error: 'Username or email or password is empty',
        }
    }
    try {
        const res = await api.register({user: { username: username as string, email: email as string, password: password as string}});
        const {token} = res.user;
        const headers = AuthTokenHelper.setToHeaderAsCookie({token}, new Headers(), 'Set-Cookie');
        return redirect(`/users/login`, {headers});
    } catch(e) {
        console.log(e);
        return {
            error: 'Email or password is incorrect',
        };
    }
}

const Register = () => {
    return(
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <Link to="/users/login">Have an account?</Link>
                        </p>

                        {/* <ul className="error-messages">
                        <li>That email is already taken</li>
                        </ul> */}

                        <Form action='/users' method="post">
                            <fieldset className="form-group">
                                <input name='username' className="form-control form-control-lg" type="text" placeholder="Username" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input name='email' className="form-control form-control-lg" type="text" placeholder="Email" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input name='password' className="form-control form-control-lg" type="password" placeholder="Password" />
                            </fieldset>
                            <button type='submit' className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Register;