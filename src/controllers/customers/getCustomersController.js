import { db } from "../../database/database.connection.js";

export async function GetCustomers (req, res) {

    const { cpf } = req.query;

    try{
        let customers;

        if (cpf)
            customers = await db.query(`SELECT * FROM customers WHERE cpf LIKE '${cpf}%'`);
        else
            customers = await db.query("SELECT * FROM customers");

        const results = customers.rows;

        res.status(200).send(results);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}