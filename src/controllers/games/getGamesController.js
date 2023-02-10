import { db } from "../../database/database.connection.js";

export async function GetGames (req, res) {

    const { name, limit, offset } = req.query;

    try{
        let games;

        const setLimit = limit ? `LIMIT ${limit} `  : ""
        const setOffset = offset ? `OFFSET ${offset} ` : ""

        if (name)
            games = await db.query(`SELECT * FROM games WHERE LOWER (name) LIKE LOWER ('%${name}%') ${setLimit} ${setOffset}`);
        else
            games = await db.query(`SELECT * FROM games ${setLimit} ${setOffset}`);

        const results = games.rows;

        res.status(200).send(results);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}