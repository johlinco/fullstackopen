const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const Blog = require('../models/blog')
const { notesInDb } = require('../../part3/tests/test_helper')

const api = supertest(app)

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are correct number of notes', async () => {
    const response = await api.get(('/api/blogs'))
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('id property does not have underscore', async() => {
    const response = await api.get(('/api/blogs'))
    assert(response.body[0].id && !response.body[0]._id)

})

test('post request creates new blog post', async () => {
    const newBlog = {
      _id: "5a422a851b54b676234d17f7",
      title: "Type wars",
      author: "Lincoln Hoey Moore",
      url: "https://www.google.com",
      likes: 2,
      __v: 0
    }

    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await blogsInDb()

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length+1)

    const authors = blogsAtEnd.map(b => b.author)
    assert(authors.includes("Lincoln Hoey Moore"))
})

test('blogs added without likes property go into db with 0 likes', async () => {
    const newBlog = {
        _id: "5a422a851b54b676234d17f7",
        title: "Type wars",
        author: "Lincoln Hoey Moore",
        url: "https://www.google.com",
        __v: 0
    }

    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()

    assert.strictEqual(0, blogsAtEnd[blogsAtEnd.length-1].likes)
})

test('can not add blog without title', async () => {
    const newBlog = {
        _id: "5a422a851b54b676234d17f7",
        author: "Lincoln Hoey Moore",
        url: "https://www.google.com",
        likes: 2,
        __v: 0
      }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsAtEnd = await blogsInDb()

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)

})

test('can not add blog without url', async () => {
    const newBlog = {
        _id: "5a422a851b54b676234d17f7",
        title: "Type wars",
        author: "Lincoln Hoey Moore",
        likes: 2,
        __v: 0
      }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsAtEnd = await blogsInDb()

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
})

test('can delete blog with correct id', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDeleteId = blogsAtStart[0].id

    await api.delete(`/api/blogs/${blogToDeleteId}`).expect(204)

    const blogsAtEnd = await blogsInDb()
    const endingIds = blogsAtEnd.map(b => b.id)
    assert(!endingIds.includes(blogToDeleteId))
    assert(blogsAtStart.length - blogsAtEnd.length === 1)
    
})

test('can update existing blog post author', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
        ...blogToUpdate,
        author: "J.R.R. Tolkien"
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog, { new: true }).expect(201)
    const blogsAtEnd = await blogsInDb()

    const filteredBlogs = blogsAtEnd.filter(b => b.id === blogToUpdate.id)
    assert.strictEqual(updatedBlog.author, filteredBlogs[0].author)
})

after(async () => {
  await mongoose.connection.close()
})