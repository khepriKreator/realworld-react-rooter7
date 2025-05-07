import { ConduitAPI } from "~/shared/api/services/api";
import type { MultipleArticlesResponse } from "~/shared/api/models/models";
import {useLoaderData} from 'react-router';

/* export async function loader() {
    const api = new ConduitAPI();
    const res = await api.getArticlesFeed();
    return res;
} */

const feedsArticles = () => {
   /*  const {articles} = useLoaderData() as MultipleArticlesResponse;
    console.log(articles); */
    return <div>FeedsArticles</div>;
}

export default feedsArticles;