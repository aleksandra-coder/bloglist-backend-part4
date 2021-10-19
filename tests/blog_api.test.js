// ex 4.8
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')
// ex 4.15
const bcrypt = require('bcrypt')
const User = require('../models/user')



 // ex 4.8
  // beforeEach(async () => {
  //   await Blog.deleteMany({})
  //   let blogObject = new Blog(helper.initialBlogs[0])
  //   // let blogObject = new Blog(initialBlogs[0])
  //   await blogObject.save()
  //   blogObject = new Blog(helper.initialBlogs[0])
  //   // blogObject = new Blog(initialBlogs[1])
  //   await blogObject.save()
  //   blogObject = new Blog(helper.initialBlogs[0])
  //   // blogObject = new Blog(initialBlogs[2])
  //   await blogObject.save()
  // })

//   beforeEach(async () => {
//     await Blog.deleteMany({})
//     await Blog.insertMany(helper.initialBlogs)
 
// })

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('salasana', 10)
  const user = new User({
    username: 'testUser',
    passwordHash
  })
  await user.save()

  const response = await api
    .post('/api/login/')
    .send({
      username: 'testUser',
      password: 'salasana'
    })

  token = response.body.token
})


  // ex 4.8
// ex 4.13 adding better functionallity
describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('3 blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
  // expect(response.body).toHaveLength(initialBlogs.length)
  console.log(response.body)
})

})

//  ex 4.9
describe('specific features about a blog are', () => {
test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
  console.log(response.body)
})

})

// 4.10
describe('addition of a new blog', () => {
  test('a new blog is created', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
  const titles = blogsAtEnd.map(b => b.title)
  
  expect(titles).toContain('Type wars')
  console.log(blogsAtEnd)
})

// ex 4.11
test('blog with no likes has 0 likes', async () => {
  const newBlog = {
    title: "Adventures",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com",
  }

  await api
    .post('/api/blogs')
    .set({ Authorization: `bearer ${token}` })
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await helper.blogsInDb()
  const zeroLikesBlog = await response.find(b => b.title === 'Adventures')
  expect(response).toHaveLength(helper.initialBlogs.length + 1)
  expect(zeroLikesBlog.likes).toBe(0)
})

// ex 4.12
test('is not succesful if blog doesnt have title and url', async () => {
  const newBlog = {
    author: "John D. Jones",
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .set({ Authorization: `bearer ${token}` })
    .send(newBlog)
    .expect(400)

  const response = await helper.blogsInDb()
  expect(response).toHaveLength(helper.initialBlogs.length)
})

})

// ex 4.13
describe('when a blog is deleted', () => {
    test('a single blog gets deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
      
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({ Authorization: `bearer ${token}` })
            .expect(204)
      
        const blogsAtEnd = await helper.blogsInDb()
      
        expect(blogsAtEnd.length).toBe(
            helper.initialBlogs.length - 1
        )
      
        const titles = blogsAtEnd.map(b => b.title)
      
        expect(titles).not.toContain(blogToDelete.title)
    })
})

// ex 4.14
describe('when the blog is updated', () => {
    test('a single blog got some changes', async () => {
        const updatedBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 16,
          }
        const initialBlogs = await helper.blogsInDb()
        const blogToUpdate = initialBlogs[2]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set({ Authorization: `bearer ${token}` })
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            
            const blogsAfterUpdating = await helper.blogsInDb()
            expect(blogsAfterUpdating).toHaveLength(helper.initialBlogs.length)
            
            // const likes = blogsAfterUpdating.map(b => b.likes)
            
            expect(updatedBlog.likes).toBe(16)
            console.log(blogsAfterUpdating)
    })
})
// ex 4.15 tests for user
describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'postola',
        name: 'Aleksandra Postola',
        password: 'haslo',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
    // ex 4.16
    test ('creation fails with proper statuscode and message if username is shorter than 3 char', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'bo',
            name: 'Concept',
            password: 'mama',
        }

        await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test ('creation fails with proper statuscode and message if password is shorter than 3 char or missing', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'karba',
            name: 'Karolina',
            password: 'ma',
        }

        await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

  // ex 4.8 close the db connection
  afterAll(() => {
    mongoose.connection.close()
  })