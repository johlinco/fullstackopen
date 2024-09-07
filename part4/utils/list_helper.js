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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}