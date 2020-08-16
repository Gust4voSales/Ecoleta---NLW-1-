import express from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const pointsController = new PointsController();
const itemsController = new ItemsController();


const router = express.Router();
const upload = multer(multerConfig);

router.get('/items', itemsController.index);

router.get('/points', pointsController.index);
router.get('/points/:id', pointsController.show);

router.post(
    '/points', 
    upload.single('image'), 
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, { abortEarly: false }),
    pointsController.create
);


export default router;
