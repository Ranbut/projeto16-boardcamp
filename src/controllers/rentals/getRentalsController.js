import { db } from "../../database/database.connection.js";

export async function GetRentals (req, res) {
        const {customerId, gameId,status, startDate, order, desc  } = req.query;
    try{

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        const searchCustomer = customerId ? `AND "customerId"=${customerId} `  : ""
        const searchGame = gameId ? `AND "gameId"=${gameId} ` : ""

        const setOrder = order ? `ORDER BY "${order}" ` : ""

        let setDesc;
        if(order)
            setDesc = desc === 'true' ? `DESC ` : ""
        else
            setDesc = desc === 'true' ? `ORDER BY DESC ` : ""

        let rentals;

        if(status === "open")
            if(startDate && startDate.match(dateRegex))
                rentals = await db.query(`SELECT * FROM rentals WHERE "returnDate" IS NULL AND "rentDate" >= '${startDate}' ${searchCustomer} ${searchGame};`);
            else
                rentals = await db.query(`SELECT * FROM rentals WHERE "returnDate" IS NULL ${searchCustomer} ${searchGame};`);
        else if(status === "closed")
            if(startDate && startDate.match(dateRegex))
                rentals = await db.query(`SELECT * FROM rentals WHERE "returnDate" IS NOT NULL AND "rentDate" >= '${startDate}' ${searchCustomer} ${searchGame};`);
            else
                rentals = await db.query(`SELECT * FROM rentals WHERE "returnDate" IS NOT NULL ${searchCustomer} ${searchGame};`);
        else if(status !== "open" && status !== "closed" && startDate && startDate.match(dateRegex))
            rentals = await db.query(`SELECT * FROM rentals WHERE "rentDate" >= '${startDate}' ${searchCustomer} ${searchGame};`);
        else if(customerId)
            rentals = await db.query(`SELECT * FROM rentals WHERE "customerId"=${customerId}`);
        else if(gameId)
            rentals = await db.query(`SELECT * FROM rentals WHERE "gameId"=${gameId}`);
        else
            rentals = await db.query(`SELECT * FROM rentals ${setOrder} ${setDesc}`);
            
        const customers = await db.query(`SELECT * FROM customers`);
        const games = await db.query(`SELECT * FROM games`);

        const results = rentals.rows.map(allocation => ({
            ...allocation,
            customer: {
                id: customers.rows.find(customer => customer.id === allocation.customerId).id,
                name: customers.rows.find(customer => customer.id === allocation.customerId).name,
            },
            game: {
                id: games.rows.find(game => game.id === allocation.customerId).id,
                name: games.rows.find(game => game.id === allocation.customerId).name,
            }
          }))

        res.status(200).send(results);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}