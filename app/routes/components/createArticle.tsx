import type { Route } from "../../+types/root";
import { ConduitAPI } from "~/shared/api/services/api";
import { Form, redirect } from "react-router";
import type { NewArticle } from "~/shared/api/models/models";
import { useCurrentUser } from "~/entities/user/CurrentUserContext";
export const action = async ({ request }: Route.ActionArgs) => {
    const api = new ConduitAPI();
    const formData = await request.formData();
    const {title, description, body} = Object.fromEntries(formData);
    console.log(JSON.stringify({article: {title, description, body, tagList: []}}));
    const newArticle: NewArticle = {title: title as string, description: description as string, body: body as string};
    try {
        const res = await api.createArticle({article: newArticle});
        return redirect('/');
    } catch(e) {
        console.log(e);
        return {
            error: 'Something went wrong',
        };
    }

}

const CreateArticle = () => {
    const user = useCurrentUser();
    if (user === null) return
    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                <div className="col-md-10 offset-md-1 col-xs-12">
                    {/* <ul className="error-messages">
                    <li>That title is required</li>
                    </ul> */}

                    <Form
                        
                        method='post'
                    >
                        <fieldset>
                            <fieldset className="form-group">
                                <input name='title' required type="text" className="form-control form-control-lg" placeholder="Article Title" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input name='description' required type="text" className="form-control" placeholder="What's this article about?" />
                            </fieldset>
                            <fieldset className="form-group">
                                <textarea
                                    name='body'
                                    className="form-control"
                                    rows={8}
                                    placeholder="Write your article (in markdown)"
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input type="text" className="form-control" placeholder="Enter tags" />
                                <div className="tag-list">
                                    <span className="tag-default tag-pill"> 
                                    <i className="ion-close-round"/> tag </span>
                                </div>
                            </fieldset>
                            <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
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

export default CreateArticle;