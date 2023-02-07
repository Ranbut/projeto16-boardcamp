import { Router } from 'express';
import { GetCustomers } from '../controllers/customers/getCustomersController.js';
import { GetIDCustomers } from '../controllers/customers/getCustomersIDController.js';
import { PostCustomers } from '../controllers/customers/postCustomersController.js';
import { PutCustomers } from '../controllers/customers/putCustomersController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { customersSchema } from '../schemas/customersSchema.js';

const router = Router();

router.get('/customers', GetCustomers);
router.get('/customers/:id', GetIDCustomers);
router.post('/customers', validateSchema(customersSchema), PostCustomers);
router.put('/customers', PutCustomers);

export default router;