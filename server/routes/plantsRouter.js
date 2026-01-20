import express from 'express';
import {getPlants} from '../controllers/getPlants.js'

const router = express.Router()

router.get('/api/plants', getPlants)

export default router