import type { Route } from "./+types/home";
import END_POINT from '../api/endpoint';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export async function loader({request}: Route.LoaderArgs) {
    const res = await fetch(`${END_POINT}/articles`);
    if (!res) { 
        throw new Response('Failed to fetch articles', { status: 500});
    }
    return res.json();
}

export default function Home({loaderData: data}: Route.ComponentProps) {
  const articles = data.articles;
  
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
                  <a className="nav-link" href="">Your Feed</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">Global Feed</a>
                </li>
              </ul>
            </div>
            //list of articles previews
            {articles.map((article: any) => {
              return (
                <div className="article-preview">
                <div className="article-meta">
                  <a href="/profile/albert-pai"><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
                  <div className="info">
                    <a href="/profile/albert-pai" className="author">Albert Pai</a>
                    <span className="date">{article.createdAt}</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> 32
                  </button>
                </div>
                <a href="/article/the-song-you" className="preview-link">
                  <h1>{article.title}</h1>
                  <p>{article.description}</p>
                  <span>Read more...</span>
                  //list of tags
                  <ul className="tag-list">
                    {
                      article.taglist.map((tag: string) => {
                        return (
                          <li className="tag-default tag-pill tag-outline">
                            {article.tagList}
                          </li>
                        )
                      })
                    }
                  </ul>
                </a>
              </div> 
              )
              })
            }
            

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
