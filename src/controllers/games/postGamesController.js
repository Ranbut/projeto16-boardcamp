import { db } from "../../database/database.connection.js";

export async function PostGames (req, res) {

    const { name, image, stockTotal, pricePerDay } = req.body;

    try{

        if(name && stockTotal > 0 && pricePerDay > 0){

            const games = await db.query(`SELECT name FROM games WHERE name='${name}'`);

            const results = games.rows[0];
    
            if(results) return res.status(409).send("Tábuleiro já existe.");

            await db.query(`INSERT INTO games (name , image, "stockTotal", "pricePerDay") VALUES ('${name}', '${image}', ${stockTotal}, ${pricePerDay});`);

            res.sendStatus(201);
        }
        else
            return res.sendStatus(400);

    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}