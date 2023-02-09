import { db } from "../../database/database.connection.js";

export async function GetCustomers (req, res) {

    try{
        const customers = await db.query("SELECT * FROM customers");

        const results = customers.rows;

        if(!results) return res.sendStatus(400);

        res.status(200).send(results);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}