// ex 4.2
// separating all printing to the console to its own module
// const info = (...params) => {
//     console.log(...params)
//   }
  
//   const error = (...params) => {
//     console.error(...params)
//   }
  
//   module.exports = {
//     info, error
//   }


// function info for printing normal log messages
  const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') { 
      console.log(...params)
    }
    }
  //  function error for all error messages.  
    const error = (...params) => {
      if (process.env.NODE_ENV !== 'test') { 
        console.error(...params)
      }
    }
    
    module.exports = {
      info, error
    }
  