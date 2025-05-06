import {
    Outlet,
    NavLink,
    redirect,
    useLoaderData,
} from 'react-router';
import type { Route } from "../+types/root";
import { AuthTokenHelper } from '~/shared/api/helpers/authTokenHelper';
import { ConduitAPI } from "~/shared/api/services/api";
import type { UserResponse } from '~/shared/api/models/models';
import { CurrentUserContext, useCurrentUser } from '~/entities/user/CurrentUserContext';

export const loader = async ({request}: Route.LoaderArgs) => {
    const token = AuthTokenHelper.getFromRequestServer(request.headers);
    if (!token) {
        return {user: null};
    }
    const api = new ConduitAPI();
    api.setToken(token);
    try {
        return api.getCurrentUser();
    } catch(e) {
        console.log(e);
        return redirect('/users/login');
    }
}

const Header = () => {
    const user = useCurrentUser();
    if (user === null) {
        return (
            <nav className="navbar navbar-light">
                <div className="container">
                    <a className="navbar-brand" href="/">conduit</a>
                    <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/users/login">Sign in</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/users/register">Sign up</NavLink>
                    </li>
                    </ul>
                </div>
            </nav>
        )
    }
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <NavLink className="navbar-brand" to="/">conduit</NavLink>
                <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <NavLink className="nav-link active" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/editor"> <i className="ion-compose"></i>&nbsp;New Article </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/profile/eric-simons">
                    <img src={user.image} className="user-pic" />
                    {user.username}
                    </NavLink>
                </li>
                </ul>
            </div>
        </nav>
    )
}

const Layout = () => {
    const {user} = useLoaderData<UserResponse>();
    return (
        <CurrentUserContext.Provider value={user}>
            <Header/>
            <div>
                <Outlet/>
            </div>
            <footer>
                <div className="container">
                    <a href="/" className="logo-font">conduit</a>
                    <span className="attribution">
                    An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp;
                    design licensed under MIT.
                    </span>
                </div>
            </footer>
        </CurrentUserContext.Provider>
    )
}

export default Layout;