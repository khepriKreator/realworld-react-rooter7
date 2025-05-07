import type { Route } from "../../+types/root";
import { ConduitAPI } from "~/shared/api/services/api";
import { Form, useLoaderData } from "react-router";

export const loader = ({request, params}: Route.LoaderArgs) => {
    const api = new ConduitAPI();
    const {articleId} = params;
    return api.getArticle(`${articleId}`);
}

const EditArticle = () => {
    const data = useLoaderData();
    const {
        articleId,
        title,
        description,
        body,
        tagList,
        createdAt,
        updatedAt,
        favorited,
        favoritesCount,
        author
    } = data;
    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                <div className="col-md-10 offset-md-1 col-xs-12">
                    <ul className="error-messages">
                    <li>That title is required</li>
                    </ul>

                    <Form
                        method="put"
                        action={`/articles/${articleId}`}
                    >
                        <fieldset>
                            <fieldset className="form-group">
                                <input name='title' type="text" className="form-control form-control-lg" placeholder="Article Title">
                                    {title}
                                </input>
                            </fieldset>
                            <fieldset className="form-group">
                                <input name='description' type="text" className="form-control" placeholder="What's this article about?"> 
                                    {description}
                                </input>
                            </fieldset>
                            <fieldset className="form-group">
                                <textarea
                                    name='body'
                                    className="form-control"
                                    rows={8}
                                    placeholder="Write your article (in markdown)"
                                >
                                    {body}
                                </textarea>
                            </fieldset>
                            <fieldset className="form-group">
                                <input type="text" className="form-control" placeholder="Enter tags" />
                                <div className="tag-list">
                                    <span className="tag-default tag-pill"> 
                                    <i className="ion-close-round"/> tag </span>
                                </div>
                            </fieldset>
                            <button type='submit' className="btn btn-lg pull-xs-right btn-primary">
                                Publish Article
                            </button>
                        </fieldset>
                    </Form>
                </div>
                </div>
            </div>
            </div>
    )
}

export default EditArticle;