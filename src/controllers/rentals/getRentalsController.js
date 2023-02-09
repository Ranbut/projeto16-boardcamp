import { db } from "../../database/database.connection.js";

export async function GetRentals (req, res) {

    try{
        const rentals = await db.query("SELECT * FROM rentals");

        const results = rentals.rows;

        res.status(200).send(results);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}