import { Form, redirect, useLoaderData, Link } from "react-router"
import type { Route } from "../+types/root"
import { AuthTokenHelper } from '~/shared/api/helpers/authTokenHelper';
import { ConduitAPI } from "~/shared/api/services/api";
import type { UserResponse } from "~/shared/api/models/models";


export const loader = async ({request}: Route.LoaderArgs) => {
    const token = AuthTokenHelper.getFromRequestServer(request.headers);
    if (!token) {
        return redirect('/users/login');
    }
    const api = new ConduitAPI();
    api.setToken(token);
    try {
        return api.getCurrentUser();
    } catch(e) {
        console.log(e)
        return redirect('/users/login');
    }
}

const Settings = () => {
    const user = useLoaderData<UserResponse>();
  return (
    <div className="settings-page">
        <div className="container page">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h1 className="text-xs-center">Your Settings</h1>

                    {/* <ul className="error-messages">
                    <li>That name is required</li>
                    </ul> */}

                    <form>
                    <fieldset>
                        <fieldset className="form-group">
                            <input className="form-control" type="text" placeholder="URL of profile picture" />
                        </fieldset>
                        <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="text" placeholder="Your Name" />
                        </fieldset>
                        <fieldset className="form-group">
                            <textarea
                                className="form-control form-control-lg"
                                rows={8}
                                placeholder="Short bio about you"
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <input className="form-control form-control-lg" type="text" placeholder="Email" />
                        </fieldset>
                        <fieldset className="form-group">
                            <input
                                className="form-control form-control-lg"
                                type="password"
                                placeholder="New Password"
                            />
                        </fieldset>
                        <button type="submit" className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                    </fieldset>
                    </form>
                    <hr />
                    <Form action='/users/logout' method='post' onSubmit={(event) => {
                        const response = confirm(
                        "Please confirm you want to logout."
                        );
                        if (!response) {
                        event.preventDefault();
                        }
                    }}>
                        <button type='submit' className="btn btn-outline-danger">Logout</button>
                    </Form>
                </div>
            </div>
        </div>
    </div>
  )   
}

export default Settings;