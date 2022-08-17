import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import {checkAuth, handleValidationErrors} from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';



mongoose
    .connect('mongodb+srv://admin:qwert12345@cluster0.5lcidvw.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch(err => console.log('Db error',err));

const app = express();

//which path & name use to save images
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
});
//<---->

const upload  = multer({ storage });



app.use(express.json());  // needs for reading json post req
app.use('/uploads', express.static('uploads')); //express check static files in folder

app.get('/', (req, res) => {

});

//We are checking authorization of user throught email in our Db
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
//<------>
app.post('/auth/register',  registerValidation, handleValidationErrors, UserController.register)

app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log("Server, OK");
});