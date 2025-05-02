export type Modeles_Arcticle = {
        "slug": string,
        "title": string,
        "description": string,
        "body": string,
        "tagList": string[],
        "createdAt": string,
        "updatedAt": string,
        "favorited": boolean,
        "favoritesCount": number,
        "author": {
            "username": string,
            "bio": string,
            "image": string,
            "following": boolean,
        }
}

export type Modeles_Arcticles = Modeles_Arcticle[];

