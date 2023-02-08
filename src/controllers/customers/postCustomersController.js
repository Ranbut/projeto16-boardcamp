import { db } from "../../database/database.connection";

export async function PostCustomers (req, res) {

    try{
        const customers = await db.query("SELECT * FROM customers");
        
        res.status(201).send();
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}