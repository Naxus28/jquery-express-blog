export default app => {
  app.get('*', (req, res) => {
    res
      .status(404)
      .json({ message: 'resource not found' });
  });
};