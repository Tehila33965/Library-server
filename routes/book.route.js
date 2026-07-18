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
import { validateBody, bookSchema, validateParams, idParamSchema } from "../middlewares/validation.middleware.js";

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', validateBody(bookSchema), addBook);
router.delete('/:id', validateParams(idParamSchema), deleteBook);
router.put('/:id', validateBody(bookSchema), updateBook);
router.put('/:id/loan', loanBook);
router.put('/:id/return', returnBook);

export default router;