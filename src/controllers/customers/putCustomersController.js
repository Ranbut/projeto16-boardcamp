import { db } from "../../database/database.connection";

export async function PutCustomers (req, res) {

    try{
        const customers = await db.query("SELECT * FROM customers");
        res.status(202).send();
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}