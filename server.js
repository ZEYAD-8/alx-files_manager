import express from 'express';
import routes from './routes/index';

const app = express();
app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
