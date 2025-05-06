import { type RouteConfig, index, layout, route, prefix } from "@react-router/dev/routes";

export default [
    layout('layouts/layout.tsx', 
        [
            layout("routes/home.tsx", [
                index('routes/globalArticles.tsx'),
                ...prefix(':username', [
                    route('feeds', 'routes/feedsArticles.tsx'),
                ])
            ]),
            route('articles/:articleId', 'routes/article.tsx'),
            route('users/login', 'routes/login.tsx'),
            route('users/register', 'routes/register.tsx'),
            route('settings', 'routes/settings.tsx'),
            ...prefix(':username', [
                route('articles/:articleId/editor', 'routes/createEditArticle.tsx'),
                route('logout', 'routes/logout.tsx'),
            ])
        ]
    ),
] satisfies RouteConfig;