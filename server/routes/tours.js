import express from 'express';
import {getAllTour, createTour, deleteTour,getSingleTour, getFeaturedTour,getTourBySearch,getTourCount, updateTour } from '../controllers/tourController';

import { verifyAdmin } from '../utils/verifyToken';

const router = express.Router();

//create new tour
router.post('/', verifyAdmin, createTour);
//update new tour
router.put('/:id', verifyAdmin, updateTour);
//delete tour
router.delete('/:id', verifyAdmin, deleteTour);
//get single tour
router.get('/:id',getSingleTour);
//get all tour
router.get('/',getAllTour);
//get tour by search
router.get('/search/getTourBySearch', getTourBySearch);
//get featured tour
router.get('/search/getFeaturedTours', getFeaturedTour);
//get tour counts
router.get('/search/getTourCount', getTourCount);

export default router;
