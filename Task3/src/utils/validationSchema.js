import joi from "joi";

export const bookSchema = joi.object({
    title: joi.string().min(5).required(),
    author: joi.string().min(3).required(),
    price: joi.number().float().min(0).required()
});
