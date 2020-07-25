import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return res.status(404).json({ error: "Point not found" });
        }

        // Get all items and join each one that matches point_items' item_id 
        // where the point_items' point is equal to the one passed in the parameter
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');


        return res.json({ point, items });
    }

    async create(req: Request, res: Response) {
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
    
        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            }
        })
    
        await trx('point_items').insert(pointItems);

        await trx.commit();
    
        return res.json({ 
            point_id,
            ...point,
        });
    }
}

export default PointsController;