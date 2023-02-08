import { db } from "../../database/database.connection.js";

export async function PutCustomers (req, res) {

    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;
    try{
        if(name && cpf.length === 11 && phone.length >= 10 && phone.length <= 11){

            const customers = await db.query(`SELECT cpf FROM customers WHERE cpf = '${cpf}'`);
    
            const results = customers.rows[0];
    
            if(results) return res.status(409).send("CPF já existe.");
    
            await db.query(`UPDATE customers SET name='${name}', phone='${phone}', cpf='${cpf}', birthday='${birthday}' WHERE id = ${id};`);

            res.status(202);
            }
            else
                return res.status(400).send("Dados do HTTP body estão inválidos.");


    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}