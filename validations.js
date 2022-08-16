import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Не верный формат почты').isEmail(),
    body('password', 'Пароль должен быть миниму 5 символов').isLength({ min: 5 }),

];
export const registerValidation = [
    body('email', 'Не верный формат почты').isEmail(),
    body('password', 'Пароль должен быть миниму 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('avatarUrl', 'Не верная ссылка на аватарку').optional().isURL(),

];
export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Не верный формат тэга (укажите массив)').optional().isString(),
    body('imageUrl', 'Не верная ссылка на изображение').optional().isString(),

];