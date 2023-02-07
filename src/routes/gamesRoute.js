import { Router } from 'express';
import { GetGames } from '../controllers/games/getGamesController.js';
import { PostGames } from '../controllers/games/postGamesController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { gamesSchema } from '../schemas/gamesSchema.js';

const router = Router();

router.get('/games', GetGames);
router.post('/games', validateSchema(gamesSchema), PostGames);

export default router;