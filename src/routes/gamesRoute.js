import { Router } from 'express';
import { GetGames } from '../controllers/games/getGamesController.js';
import { PostGames } from '../controllers/postGamesController.js';

const router = Router();

router.get('/games', GetGames);
router.post('/games', PostGames);

export default router;