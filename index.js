import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'


mongoose
    .connect('mongodb+srv://admin:qwert12345@cluster0.5lcidvw.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch(err => console.log('Db error',err));

const app = express();

app.use(express.json());  // needs for reading json post req

app.get('/', (req, res) => {

});

//We are checking authorization of user throught email in our Db
app.post('/auth/login', loginValidation, UserController.login)
//<------>
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)


app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log("Server, OK");
});