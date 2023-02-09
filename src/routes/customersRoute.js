import { Router } from 'express';
import { GetCustomers } from '../controllers/customers/getCustomersController.js';
import { GetIDCustomers } from '../controllers/customers/getCustomersIDController.js';
import { PostCustomers } from '../controllers/customers/postCustomersController.js';
import { PutCustomers } from '../controllers/customers/putCustomersController.js';

const router = Router();

router.get('/customers', GetCustomers);
router.get('/customers/:id', GetIDCustomers);
router.post('/customers', PostCustomers);
router.put('/customers/:id', PutCustomers);

export default router;