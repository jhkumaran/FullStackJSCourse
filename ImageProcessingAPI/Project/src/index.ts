import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000; // Default port

// Add routes
app.use(routes);

// Start server
app.listen(port, async (): Promise<void> => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;