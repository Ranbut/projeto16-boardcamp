import { db } from "../../database/database.connection.js";

export async function DeleteRentalsID (req, res) {

    const { id } = req.params;

    try{

        const rentals = await db.query(`SELECT * FROM rentals WHERE id = ${id}`);

        const results = rentals.rows[0];

        if(!results) return res.sendStatus(404);

        await db.query(`DELETE FROM rentals WHERE id=${id}`);

        res.sendStatus(200);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }

}