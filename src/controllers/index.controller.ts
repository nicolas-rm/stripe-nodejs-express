import { Request, Response } from 'express';
import pool from '../database/conexion.database';
import Stripe from 'stripe';
const stripe = new Stripe('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', { apiVersion: '2020-08-27' });
class IndexController {

    // public pay: Stripe;

    constructor() {

    }



    public async paymethod(req: Request, res: Response): Promise<void> {

        const { id, amount } = req.body;

        console.log(id);
        console.log(amount);
        try {
            const paymenthod = await stripe.paymentIntents.create({
                amount,
                currency: 'USD',
                description: 'Compútador Portatil',
                payment_method: id,
                confirm: true
            });
            res.status(200).json({
                OK: true,
                POST: `Las Credenciales Son Correctas.`,
                paymenthod
            });
        } catch (error) {
            res.status(400).json({
                OK: false,
                POST: `Las Credenciales No Son Correctas.`,
                error
            });
        }

    }
}

const indexController = new IndexController();
export default indexController;