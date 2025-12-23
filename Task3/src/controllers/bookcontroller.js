import {bookSchema} from "../utils/validationSchema.js";
import {books} from "../utils/books.js";

// Get Requests
export const getAllBooks = (req,res) => {
    res.status(200).json(books);
}

export const getSearch = (req,res) => {
    res.status(200).json({
        message: "You are on the Search Page"
    });
}

export const getBookById = (req,res) => {
  const book=  books.find((book) => book.id ==req.params.id);
  if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
  res.status(200).json(book);
}

//Post Requests
export const createBook = (req,res) => {
    const uid= books.length +1;
    const {error} = bookSchema.validate(req.body);

    if(error){
        return res.status(400).json({
            message: "Validation Invalidity",
            error: error.message
        })
    }
    else{
        books.push({id:uid, ...req.body});
        res.status(201).json({
            message: "Successfully Created"
        });
    }
}

//Delete Requests

export const deleteById = (req, res) => {
  const id = parseInt(req.params.id, 10); 
  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  books.splice(index, 1); 

  res.status(200).json({
    message: "Successfully Deleted",
    books: books 
  });
};


