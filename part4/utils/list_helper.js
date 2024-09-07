const dummy = (blogs) => {
    return 1

}

const totalLikes = (blogs) => {
    let sum = 0

    for (const blog of blogs) {
        sum += blog.likes
    }

    return sum
}

const favoriteBlog = (blogs) => {
    let maxVotes = -1
    let favBlog = {}

    for (const blog of blogs) {
        if (blog.likes > maxVotes) {
            favBlog = blog
            maxVotes = blog.likes
        }
    }

    return favBlog
}

const mostBlogs = (blogs) => {
    let maxBlogsCount = 0
    let maxBlogsAuthor = ""
    let authorBlogCounter = {}

    for (const blog of blogs) {
        if (!authorBlogCounter[blog.author]) {
            authorBlogCounter[blog.author] = 1
        } else {
            authorBlogCounter[blog.author]++
        }

        if (authorBlogCounter[blog.author] > maxBlogsCount) {
            maxBlogsAuthor = blog.author
            maxBlogsCount = authorBlogCounter[blog.author]
        }
    }


    return maxBlogsCount === 0
        ? {}
        : {
            author: maxBlogsAuthor,
            blogs: maxBlogsCount
        }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}