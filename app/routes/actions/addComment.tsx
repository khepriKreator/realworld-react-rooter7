import type { Route } from "../../+types/root";
import { ConduitAPI } from "~/shared/api/services/api";
import {redirect} from 'react-router';

export const action = async ({request, params}: Route.LoaderArgs) => {  
    const api = new ConduitAPI();
    const {articleId} = params;
    const formData = await request.formData();
    const comment = formData.get('comment');
    const commentData = {
        comment: {
            body: comment as string,
        }
    };
    console.log('comment: ', commentData, 'articleId: ', articleId);
    try {
        const res = await api.createArticleComment(`${articleId}`, commentData);
        console.log('response: ', res);
        return redirect(`/articles/${articleId}`);
    } catch(e) {
        console.log(e);
        return {
            error: 'Something went wrong',
        };
    }
};

const AddComment = () => <div>comment</div>;
export default AddComment;