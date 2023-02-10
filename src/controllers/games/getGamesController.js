import { db } from "../../database/database.connection.js";

export async function GetGames (req, res) {

    const { name, limit, offset } = req.query;

    try{
        let games;

        const setLimit = limit ? `LIMIT ${limit} `  : ""
        const setOffset = offset ? `OFFSET ${offset} ` : ""
        const setOrder = order ? `ORDER BY ${order}` : ""

        let setDesc
        if(order)
            setDesc = desc === 'true' ? `DESC` : ""
        else
            setDesc = desc === 'true' ? `ORDER BY DESC` : ""


        if (name)
            games = await db.query(`SELECT * FROM games WHERE LOWER (name) LIKE LOWER ('%${name}%') ${setLimit} ${setOffset} ${setOrder} ${setDesc}`);
        else
            games = await db.query(`SELECT * FROM games ${setLimit} ${setOffset} ${setOrder} ${setDesc}`);

        const results = games.rows;

        res.status(200).send(results);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}