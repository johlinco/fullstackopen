const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const testBlogs = [
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

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('when given list with multiple blogs, sum is correct', () => {
        assert.strictEqual(listHelper.totalLikes(testBlogs), 36)
    })

    test('empty blog list returns 0', () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })
  })

  describe('favorite blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, returns that blog', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      assert.deepStrictEqual(result, 
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
          })
    })

    test('when given list with multiple blogs, returns correct blog', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(testBlogs), 
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          }
        )
    })

    test('empty blog list returns empty object', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog([]), {})
    })
  })

  

  describe('Most blogs', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, returns that author and 1 blog', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      assert.deepStrictEqual(result, 
        {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        }
      )
    })

    test('when given list with multiple blogs, returns correct author and number', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(testBlogs), 
            {
                author: "Robert C. Martin",
                blogs: 3
            }
        )
    })

    test('empty blog list returns empty object', () => {
        assert.deepStrictEqual(listHelper.mostBlogs([]), {})
    })
  })

  describe('Most likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, returns that author correct likes', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      assert.deepStrictEqual(result, 
        {
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
      )
    })

    test('when given list with multiple blogs, returns correct author and number of likes', () => {
        assert.deepStrictEqual(listHelper.mostLikes(testBlogs), 
            {
                author: "Edsger W. Dijkstra",
                likes: 17
            }
        )
    })

    test('empty blog list returns empty object', () => {
        assert.deepStrictEqual(listHelper.mostLikes([]), {})
    })
  })

  