import { type RouteConfig, index, layout, route, prefix } from "@react-router/dev/routes";

export default [
    layout('layouts/layout.tsx', 
        [
            layout("layouts/home.tsx", [
                index('routes/components/globalArticles.tsx'),
                ...prefix(':username', [
                    route('feeds', 'routes/components/feedsArticles.tsx'),
                ])
            ]),
            route('articles/:articleId', 'routes/components/article.tsx'),
                route('articles/:articleId/comments/addComment', 'routes/actions/addComment.tsx'),
                    route('/articles/:articleId/edit', 'routes/components/editArticle.tsx'),
            route('users/login', 'routes/components/login.tsx'),
            route('users/register', 'routes/components/register.tsx'),
            route('settings', 'routes/components/settings.tsx'),
            ...prefix(':username', [
                route('/articles/new', 'routes/components/createArticle.tsx'),
                route('logout', 'routes/actions/logout.tsx'),
            ]),

        ]
    ),
] satisfies RouteConfig;