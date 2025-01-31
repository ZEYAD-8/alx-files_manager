import express from 'express';
import routing from './routes/index';

const app = express();
app.use(express.json());

routing(app);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
