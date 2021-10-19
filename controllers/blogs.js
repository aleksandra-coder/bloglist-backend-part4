//  ex 4.2
//  defining route handlers (event handlers of routes) with a new router object blogsRouter
const blogsRouter = require('express').Router()
// ex 4.19 
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')


 // ex 4.8 async/await
 blogsRouter.get('/', async (request, response) => {
  // const blogs = await Blog.find({})
  // ex 4.17
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

// blogsRouter.get('/', (request, response) => {
//     Blog
//       .find({})
//       .then(blogs => {
//         response.json(blogs)
//       })
//   })

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }


// ex 4.10
blogsRouter.post('/', middleware.userExtractor,  async (request, response) => {
  // const blog = new Blog(request.body)
  const body = request.body
  const user = request.user
  const userCurr = await User.findById(user.id)
// ex 4.19
  // const token = getTokenFrom(request)
  // const token = request.token
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!request.token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)


  const blog = new Blog({
    id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: userCurr._id
  })

  const savedBlog = await blog.save()
  userCurr.blogs = userCurr.blogs.concat(savedBlog._id)
  await userCurr.save()
  response.json(savedBlog)
})

  // blogsRouter.post('/', async (request, response) => {
  //   const blog = new Blog(request.body)
  
  //   blog
  //     .save()
  //     .then(result => {
  //       response.status(201).json(result)
  //     })
  // })
  
  // ex 4.13 (deleting a blog) ex 4.21 (deleted only by the user who added the blog)
  blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    // await Blog.findByIdAndRemove(request.params.id)
    // response.status(204).end()
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }  
  else {
    request.user = decodedToken
  }

  // const user = await User.findById(decodedToken.id)

    if ( blog.user.toString() === user.id.toString() ) {
      await Blog.findByIdAndRemove(request.params.id)
     response.status(204).end()
  } else {
    return response.status(401).json({
      error: "no permission to delete this blog",
    });
  }
  })

  //  ex 4.14 (updating a blog, )
  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blog = {
      id: body.id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    // try {
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { likes: body.likes })
      response.json(updatedBlog)
    // } catch (error) {
    //   next (error)
    // }
    // Blog.findByIdAndUpdate(request.params.id, blog, { new: body.likes })
    //   .then(updatedBlog => {
    //     response.json(updatedBlog.toJSON())
    //   })
    //   .catch(error => next(error))
  })


module.exports = blogsRouter
