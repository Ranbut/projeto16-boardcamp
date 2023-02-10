import { db } from "../../database/database.connection.js";

export async function GetCustomers (req, res) {

    const { cpf, limit, offset, order, desc } = req.query;

    try{
        let customers;

        const setLimit = limit ? `LIMIT ${limit} `  : ""
        const setOffset = offset ? `OFFSET ${offset} ` : ""
        const setOrder = order ? `ORDER BY ${order}` : ""

        let setDesc;
        if(order)
            setDesc = desc === 'true' ? `DESC` : ""
        else
            setDesc = desc === 'true' ? `ORDER BY DESC` : ""

        if (cpf)
            customers = await db.query(`SELECT * FROM customers WHERE cpf LIKE '${cpf}%' ${setLimit} ${setOffset} ${setOrder} ${setDesc}`);
        else
            customers = await db.query(`SELECT * FROM customers ${setLimit} ${setOffset} ${setOrder} ${setDesc}`);

        const results = customers.rows;

        res.status(200).send(results);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}