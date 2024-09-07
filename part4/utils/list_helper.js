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

const mostLikes = (blogs) => {
    let maxLikesCount = 0
    let maxLikesAuthor = ""
    let authorLikesCounter = {}

    for (const blog of blogs) {
        if (!authorLikesCounter[blog.author]) {
            authorLikesCounter[blog.author] = blog.likes
        } else {
            authorLikesCounter[blog.author] += blog.likes
        }

        if (authorLikesCounter[blog.author] > maxLikesCount) {
            maxLikesCount = authorLikesCounter[blog.author]
            maxLikesAuthor = blog.author
        }
    }

    return maxLikesCount === 0
        ? {}
        : {
            author: maxLikesAuthor,
            likes: maxLikesCount
        }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}