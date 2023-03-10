import { db } from "../../database/database.connection.js";
import dayjs from 'dayjs';

export async function PostRentals (req, res) {

    const { customerId, gameId, daysRented } = req.body;

    try{

        if(typeof customerId !== "number" || typeof gameId !== "number" || typeof daysRented !== "number") return res.sendStatus(400);

        const customer = await db.query(`SELECT id FROM customers WHERE id = ${customerId}`);
        const resultCustomer = customer.rows[0];

        const game = await db.query(`SELECT * FROM games WHERE id=${gameId}`);
        const resultGame = game.rows[0];

        const usedGames = await db.query(`SELECT * FROM rentals WHERE "gameId"=${gameId}`);
        const resultsUsedGames = usedGames.rows;

        if(!resultCustomer || !resultGame || daysRented < 1 || resultsUsedGames.length >= resultGame.stockTotal) return res.sendStatus(400);

        const dateFormat = 'YYYY-MM-DD'    
        const today = new Date();
        const rentDate = dayjs(today).format(dateFormat);

        const originalPrice = resultGame.pricePerDay * daysRented;

        await db.query(`INSERT INTO rentals ("customerId" , "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
        VALUES (${customerId}, ${gameId}, '${rentDate}', ${daysRented}, null, ${originalPrice}, null);`);

        res.sendStatus(201);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}