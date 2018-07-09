/**
 * 404 route -- triggered if client 
 * requests a route (resource) that doesn't exist
 * Function needs to be called just above 
 * global error handler middleware in index.js so it catches requests
 * to inexistent resources
 * @param  {Object} app the express instance
 * @return {undefined}
 */
export default app => {
  app.get('*', (req, res) => {
    res
      .status(404)
      .json({ message: 'resource not found' });
  });
};