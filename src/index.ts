import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/api', routes);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}/api`);
  console.log(
    `add filename and width and height querys fot test at http://localhost:${port}/api/images`
  );
});

export default app;
