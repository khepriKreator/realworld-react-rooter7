import { NavLink, Outlet } from "react-router";
import {useCurrentUser} from "~/entities/user/CurrentUserContext";

export default function Home() {
  const user = useCurrentUser();
  const setNavLinkActiveClassName = (isActive: boolean) => {
    return isActive ? "nav-link active" : "nav-link";
  }

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink 
                    to={user !== null ? `/${user.username}/feeds` : `/users/login`} 
                    className={({isActive}) => setNavLinkActiveClassName(isActive)}
                  >
                    Your Feed
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/" className={({isActive}) => setNavLinkActiveClassName(isActive)}>Global Feed</NavLink>
                </li>
              </ul>
            </div>
            {/* list of articles previews */}
            <Outlet/>
            {/* <ul className="pagination">
              <li className="page-item active">
                <a className="page-link" href="">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="">2</a>
              </li>
            </ul> */}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                <a href="" className="tag-pill tag-default">programming</a>
                <a href="" className="tag-pill tag-default">javascript</a>
                <a href="" className="tag-pill tag-default">emberjs</a>
                <a href="" className="tag-pill tag-default">angularjs</a>
                <a href="" className="tag-pill tag-default">react</a>
                <a href="" className="tag-pill tag-default">mean</a>
                <a href="" className="tag-pill tag-default">node</a>
                <a href="" className="tag-pill tag-default">rails</a>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
  );
}
