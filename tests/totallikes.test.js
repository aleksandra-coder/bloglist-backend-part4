const listHelper = require('../utils/list_helper')

// ex 4.4
const blogs = [
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

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
   
//    ex 4.4 testing all likes
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when you take all the blogs on the list', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    } )

    test('when list has no blogs', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
        console.log(result)
    })
  })

  //  ex 4.5
  describe('blog with most likes', () => {
      const mostLikesBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      }
    
      test('is the one with the biggest number of likes', () => {
          const result = listHelper.favouriteBlog(blogs)
          expect(result).toEqual(mostLikesBlog)
          console.log(result)
      })
  })

  // ex 4.6
  describe('author with most blogs', () => {
    const mostBlogs = {
      author: "Robert C. Martin",
      blogs: 3
    }

    test('is the one having the biggest number of blogs', () => {
      const result = listHelper.mostBlogs(blogs)
          expect(result).toEqual(mostBlogs)
          console.log(result)
    })
  })

// ex 4.7
  describe('author with most likes', () => {
    const mostLikes = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }

    test('is the one whos blogs have most likes', () => {
      const result = listHelper.blogLikes(blogs)
      expect(result).toEqual(mostLikes)
      console.log(result)
    })
  })

 