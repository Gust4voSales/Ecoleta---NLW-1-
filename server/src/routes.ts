import express from 'express';
import knex from './database/connection';

const router = express.Router();


router.get('/items', async (req, res) => {
    const items = await knex('items').select('*');

    const serializedItems = items.map((item) => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http:localhost:3333/uploads/${item.image}`,
        }
    })

    return res.json(serializedItems);
});

router.post('/points', async (req, res) => {
    const { 
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items,
    } = req.body;

    const trx = await knex.transaction();           // Transaction

    const insertedIds = await trx('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
    });

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id,
        }
    })

    await trx('point_items').insert(pointItems);

    return res.json({ success: true });
});


export default router;

