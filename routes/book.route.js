import { Router } from "express";
import { 
    getAllBooks, 
    getBookById, 
    addBook, 
    deleteBook, 
    updateBook, 
    loanBook, 
    returnBook 
} from "../controllers/book.controller.js";

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', addBook);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);
router.put('/:id/loan', loanBook);
router.put('/:id/return', returnBook);

export default router;