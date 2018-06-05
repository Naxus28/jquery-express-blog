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
