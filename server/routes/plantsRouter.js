import express from 'express';
import { getPlants } from '../controllers/getPlants.js';
import { getPlantDetails } from '../controllers/getPlantDetails.js';

const router = express.Router();

router.get('/api/plants', getPlants);
router.get('/api/plants/:id/details', getPlantDetails);

export default router;