const _ = require('lodash');

// ex 4.3
const dummy = (blogs) => {
    
    return 1
  }

//   ex 4.4
  const totalLikes = (blogs) => {
      const sum = (total, blog) => {
          return total + blog.likes
      }
      return blogs.length === 0
      ? 0
      : blogs.reduce(sum, 0)

  }

//   ex 4.5 select blog with blog likes
const favouriteBlog = (blogs) => blogs
  .reduce(({blog}, {author, likes, title}) => {
    if (likes > blog.likes) 
    blog = {author, title, likes};
    return {blog};
  }, { blog: {likes:0} })
  .blog;

  console.log( favouriteBlog )


// ex 4.6 find author with most blogs
const mostBlogs = (blogs) => {
  const allAuthors = _.map(blogs,'author')
  // const blogsAuthors = _.countBy(allAuthors)
  // // _.chain(allAuthors).countBy()
  // // .toPairs().max().head().value()
  // const blogsArray = _.toPairs(blogsAuthors)
  // const mostAuthor = _.max(blogsArray)
  // const mostBlogsAuthor = _.head(mostAuthor)
  // const howMany = _.findLast(blogsAuthors)
  const mostBlogsAuthor = _.chain(allAuthors).countBy().toPairs().max().head().value()
  const howMany = _.chain(allAuthors).countBy().findLast().value()
  
  const Author = {
    author: mostBlogsAuthor,
    blogs: howMany
  }
  return Author
}
console.log( mostBlogs )


// ex 4.7 author with most likes all together
const blogLikes = (blogs) => blogs
.reduce (({sum, blog}, {likes, author}) => {
  sum[author] = likes = (sum[author] || 0) + likes;
  if (likes > blog.likes) 
  blog = {author, likes};
  return {sum, blog};
}, {sum: {}, blog: {likes:0} })
.blog;


  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    blogLikes
  }
