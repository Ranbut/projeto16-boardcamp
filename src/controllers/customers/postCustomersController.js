import { db } from "../../database/database.connection.js";

export async function PostCustomers (req, res) {

    const { name, phone, cpf, birthday } = req.body;

    try{
        if(name && cpf.length === 11 && phone.length >= 10 && phone.length <= 11){

        const customers = await db.query(`SELECT cpf FROM customers WHERE cpf = '${cpf}'`);

        const results = customers.rows[0];

        if(results) return res.status(409).send("CPF já existe.");

        await db.query(`INSERT INTO customers (name , phone, cpf, birthday) VALUES ('${name}', '${phone}', '${cpf}', '${birthday}')`);

        res.status(201).send("Cliente adicionado com sucesso!");
        }
        else
            return res.status(400).send("Dados do HTTP body estão inválidos.");
    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}