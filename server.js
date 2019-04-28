import express from 'express';
// express setup
const app = express();
app.use(express.json());
// routes
import { userRoutes } from './server/routes';
app.use(userRoutes);
// listen for api requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log('Server is listening on port: ' + PORT);
});