import { db } from "../../database/database.connection";

export async function GetIDCustomers (req, res) {

    const { id } = req.params;

    try{
        console.log("Funcionando");
        const customers = await db.query(`SELECT * FROM customers WHERE id = ${id}`);

        const results = customers.rows[0];

        res.status(200).send(results);
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}