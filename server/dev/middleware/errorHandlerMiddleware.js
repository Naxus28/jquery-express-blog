/**
 * global error handler -- place it 
 * as the last function in the index file
 * just above the server listener
 * @param  {Object} an error object generated on any layer of the server
 * @param  {Object} the request object
 * @param  {Object} the response object
 * @param  {Function} next
 * @return {Function} a function that calls app.use for this middleware
 */
const errorHandler = (err, req, res, next) => {
  const { status, name, message } = err;
  console.log('error: ', name);
  console.log('status: ', status || 500);
  
  res
    .status(status || 500)
    .json({
      name,
      message
    });
};

export default app => app.use(errorHandler);
