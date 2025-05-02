import {
    Outlet,
    Link,
    NavLink,
    useNavigation,
} from 'react-router';
import type { Route } from "../+types/root";

export const Layout = ({ loaderData: data }: Route.ComponentProps) => {
    
    return (
        <>
            <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="/">conduit</a>
                <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    // TODO: Add "active" class when you're on that page
                    <a className="nav-link active" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/editor"> <i className="ion-compose"></i>&nbsp;New Article </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/profile/eric-simons">
                    <img src="" className="user-pic" />
                    Eric Simons
                    </a>
                </li>
                </ul>
                </div>
            </nav>
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
        </>
    )
}