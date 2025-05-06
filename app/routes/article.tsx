import { ConduitAPI } from "~/shared/api/services/api";
import type { Route } from "../+types/root";
import { useLoaderData, useNavigate } from "react-router";
import type { SingleArticleResponse } from "~/shared/api/models/models";

export async function loader({params}: Route.LoaderArgs) {
  const api = new ConduitAPI();
  const res = await api.getArticle(`${params.articleId}`);
  return res;
}

export default function Article() {
  const {article} = useLoaderData<SingleArticleResponse>();
  const navigate = useNavigate();
    return (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                <h1>{article.title || 'How to build webapps that scale'}</h1>

                <div className="article-meta">
                    <a href="/profile/eric-simons"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                    <div className="info">
                        <a href="/profile/eric-simons" className="author">{article.author.username || 'Eric Simons'}</a>
                        <span className="date">{article.createdAt || 'January 20th'}</span>
                    </div>
                    <button className="btn btn-sm btn-outline-secondary">
                        <i className="ion-plus-round"/>
                        &nbsp; Follow {article.author.username || 'Eric Simons'} 
                        <span className="counter">({article.author.following || 0})</span>
                    </button>
                    &nbsp;&nbsp;
                    <button className="btn btn-sm btn-outline-primary">
                        <i className="ion-heart"/>
                        &nbsp; Favorite Post <span className="counter">({article.favoritesCount || 0})</span>
                    </button>
                    <button 
                        onClick={() => navigate(`/articles/${article.slug}/editor`)} 
                        className="btn btn-sm btn-outline-secondary"
                    >
                        <i className="ion-edit"/> Edit Article
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                        <i className="ion-trash-a"/> Delete Article
                    </button>
                </div>
                </div>
            </div>

            <div className="container page">
                <div className="row article-content">
                <div className="col-md-12">
                    <p>
                    {article.description || 'Web development technologies...'}
                    </p>
                    <h2 id="introducing-ionic">Introducing RealWorld.</h2>
                    <p>It's a great solution for learning how other frameworks work.</p>
                    <ul className="tag-list">
                        {article.tagList &&article.tagList.map((tag) => {
                            return <li className="tag-default tag-pill tag-outline">{tag}</li>;
                        })}
                    </ul>
                </div>
                </div>

                <hr />

                <div className="article-actions">
                <div className="article-meta">
                    <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                    <div className="info">
                        <a href="" className="author">{article.author.username || 'Eric Simons'}</a>
                        <span className="date">{article.createdAt || 'January 20th'}</span>
                    </div>

                    <button className="btn btn-sm btn-outline-secondary">
                        <i className="ion-plus-round"/>
                        &nbsp; Follow {article.author.username || 'Eric Simons'}
                    </button>
                    &nbsp;
                    <button className="btn btn-sm btn-outline-primary">
                        <i className="ion-heart"/>
                        &nbsp; Favorite Article <span className="counter">({article.favoritesCount || 0})</span>
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                        <i className="ion-edit"/> Edit Article
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                        <i className="ion-trash-a"/> Delete Article
                    </button>
                </div>
                </div>

                <div className="row">
                <div className="col-xs-12 col-md-8 offset-md-2">
                    <form className="card comment-form">
                    <div className="card-block">
                        <textarea className="form-control" placeholder="Write a comment..." rows={3}></textarea>
                    </div>
                    <div className="card-footer">
                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                        <button className="btn btn-sm btn-primary">Post Comment</button>
                    </div>
                    </form>

                    <div className="card">
                    <div className="card-block">
                        <p className="card-text">
                        With supporting text below as a natural lead-in to additional content.
                        </p>
                    </div>
                    <div className="card-footer">
                        <a href="/profile/author" className="comment-author">
                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                        </a>
                        &nbsp;
                        <a href="/profile/jacob-schmidt" className="comment-author">Jacob Schmidt</a>
                        <span className="date-posted">Dec 29th</span>
                    </div>
                    </div>

                    <div className="card">
                    <div className="card-block">
                        <p className="card-text">
                        With supporting text below as a natural lead-in to additional content.
                        </p>
                    </div>
                    <div className="card-footer">
                        <a href="/profile/author" className="comment-author">
                        <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                        </a>
                        &nbsp;
                        <a href="/profile/jacob-schmidt" className="comment-author">Jacob Schmidt</a>
                        <span className="date-posted">Dec 29th</span>
                        <span className="mod-options">
                        <i className="ion-trash-a"/>
                        </span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
    );
}