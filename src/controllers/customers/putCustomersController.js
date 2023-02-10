import { db } from "../../database/database.connection.js";

export async function PutCustomers (req, res) {

    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;
    try{
        const cpfRegex = "([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})";
        const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;

        if(name && cpf.match(cpfRegex) && cpf.length === 11 && phone.length >= 10 && phone.length <= 11 && birthday.match(birthdayRegex)){

            const customers = await db.query(`SELECT cpf FROM customers WHERE cpf='${cpf}' AND id <> ${id}`);
    
            const results = customers.rows[0];
    
            if(results) return res.status(409).send("CPF já existe.");
    
            await db.query(`UPDATE customers SET name='${name}', phone='${phone}', cpf='${cpf}', birthday='${birthday}' WHERE id = ${id};`);

            res.sendStatus(200);
            }
            else
                return res.sendStatus(400);


    }
    
    catch(err){
        res.status(500).send(`Erro no servidor: ${err.message}`);
    }
}