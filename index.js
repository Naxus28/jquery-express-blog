import express from 'express';

// middleware
import appMiddleware from 'middleware/appMiddleware';
import errorHandlerMiddleware from 'middleware/errorHandlerMiddleware';

// routes
import blogRoutes from 'api/blog/blogRoutes';

const app = express();
const PORT = process.env.PORT || 8080;

appMiddleware(app, express);

blogRoutes(app);

errorHandlerMiddleware(app);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`));

export default app;