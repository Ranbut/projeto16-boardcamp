import { db } from "../../database/database.connection.js";

export async function GetRentals (req, res) {

    try{
        const rentals = await db.query("SELECT * FROM rentals");
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