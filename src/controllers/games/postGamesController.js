import { db } from "../../database/database.connection.js";

export async function PostGames (req, res) {

    const { name, image, stockTotal, pricePerDay } = req.body;

    try{

        if(name && stockTotal > 0 && pricePerDay > 0){

            const games = await db.query(`SELECT name FROM games WHERE name = $1`, [name]);

            const results = games.rows[0];
    
            if(results) return res.status(409).send("Tábuleiro já existe.");

            console.log(results);

            db.query(`INSERT INTO games (name , image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay]);

            res.status(201).send("Tábuleiro adicionado com sucesso!");
        }
        else
            return res.status(400).send("Dados do HTTP body estão inválidos.");

    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}