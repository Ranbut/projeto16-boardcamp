import { db } from "../../database/database.connection.js";

export async function GetGames (req, res) {

    try{
        const games = await db.query("SELECT * FROM games");

        const results = games.rows;

        res.status(200).send(results);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}