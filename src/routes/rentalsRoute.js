import { Router } from 'express';
import { GetRentals } from '../controllers/rentals/getRentalsController.js';
import { PostRentals } from '../controllers/rentals/postRentalsController.js';
import { PostRentalsIDReturn } from '../controllers/rentals/postRentalsIDReturnController.js';
import { DeleteRentalsID } from '../controllers/rentals/deleteRentalsIDController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { rentalsSchema } from '../schemas/rentalsSchema.js';

const router = Router();

router.get('/rentals', GetRentals);
router.post('/rentals', PostRentals);
router.post('/rentals/:id/return', PostRentalsIDReturn);
router.delete('/rentals/:id', DeleteRentalsID);

export default router;