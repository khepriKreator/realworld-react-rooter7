import { ConduitAPI } from "~/shared/api/services/api";
import type { MultipleArticlesResponse } from "~/shared/api/models/models";
import { Link,useLoaderData} from 'react-router';

export async function loader() {
    const api = new ConduitAPI();
    const res = await api.getArticles();
    return res;
}

const GlobalArticles = () => {
    const {articles} = useLoaderData() as MultipleArticlesResponse;
    
    return <div> {articles.map((article) => {
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
          <Link to={`/articles/${article.slug}`} className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
            {/* list of tags */}
            <ul className="tag-list">
              {
                article.tagList.map((tag: string) => {
                  return (
                    <li key={tag} className="tag-default tag-pill tag-outline">
                      {tag}
                    </li>
                  )
                })
              }
            </ul>
          </Link>
        </div> 
        )
        })
      }</div>;
}

export default GlobalArticles;