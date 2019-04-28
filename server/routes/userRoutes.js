import User from '../controllers/User';
import express from 'express';

const Router = express.Router();

Router.post('/api/v1/createUser', User.createUser);
Router.get('/api/v1/getUsers', User.getUsers);
Router.post('/api/v1/getSingleUser', User.getSingleUser);
Router.put('/api/v1/updateUser', User.updateUser);
Router.post('/api/v1/deleteUser', User.deleteUser);
Router.post('/api/v1/loginUser', User.loginUser);

export default Router;