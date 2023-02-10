import { db } from "../../database/database.connection.js";

export async function GetGames (req, res) {

    const { name } = req.query;

    try{
        let games;
        
        if (name)
            games = await db.query(`SELECT * FROM games WHERE LOWER (name) LIKE LOWER ('%${name}%')`);
        else
            games = await db.query("SELECT * FROM games");

        const results = games.rows;

        res.status(200).send(results);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}