import { db } from "../../database/database.connection.js";

export async function GetCustomers (req, res) {

    const { cpf, limit, offset } = req.query;

    try{
        let customers;

        const setLimit = limit ? `LIMIT ${limit} `  : ""
        const setOffset = offset ? `OFFSET ${offset} ` : ""

        if (cpf)
            customers = await db.query(`SELECT * FROM customers WHERE cpf LIKE '${cpf}%' ${setLimit} ${setOffset}`);
        else
            customers = await db.query(`SELECT * FROM customers ${setLimit} ${setOffset}`);

        const results = customers.rows;

        res.status(200).send(results);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}