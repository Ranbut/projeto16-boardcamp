import { db } from "../../database/database.connection.js";
import dayjs from 'dayjs';

export async function PostRentalsIDReturn (req, res) {

    const { id } = req.params;

    try{
        const rentals = await db.query(`SELECT * FROM rentals WHERE id = ${id}`);

        const results = rentals.rows[0];

        if(!results) return res.sendStatus(404);

        if(results.returnDate !== null) return res.sendStatus(400);

        const dateFormat = 'YYYY-MM-DD'   
        const rentDate = new Date(results.rentDate);
        const daysRented = results.daysRented + 1;
        const rentPriorDate = new Date(new Date().setDate(rentDate.getDate() + daysRented));
        const newRentDate = dayjs(rentPriorDate).format(dateFormat);
 
        const today = new Date();
        const returnDate = dayjs(today).format(dateFormat);

        let delayFee;

        if(dayjs(returnDate).isAfter(newRentDate)){
            delayFee = results.originalPrice * newRentDate.diff(returnDate);
        }
        else
            delayFee = null

        await db.query(`UPDATE rentals SET "returnDate"='${returnDate}', "delayFee"=${delayFee} WHERE id = ${id};`);

        res.sendStatus(200);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}