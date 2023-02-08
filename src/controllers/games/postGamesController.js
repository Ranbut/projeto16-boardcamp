import { db } from "../../database/database.connection.js";

export async function PostGames (req, res) {

    const { name, image, stockTotal, pricePerDay} = req.body;

    try{
        console.log(name);

        const games = await db.query(`INSERT INTO games (name ,image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay]);

        const results = games.rows;

        res.status(201).send(results);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}