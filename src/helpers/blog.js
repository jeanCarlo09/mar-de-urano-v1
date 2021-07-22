
export const postsWithCategoriesActives = (posts, categories) => {
    if (categories.length >= 1 && categories) {
        return posts.filter((post) => categories.some(category => (post.categories.filter((c) => c.handle === category).length > 0)));

    } else {
        return posts;
    }
}