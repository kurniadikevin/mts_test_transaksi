const express = require('express');
const router = express.Router();
const customer_controller= require('../controller/customer');

// GET tampilkan semua list customer
router.get('/all',customer_controller.get_customer_list);

// GET tampilkan customer berdasarkan id customer
router.get('/by-id/:customer_id',customer_controller.get_customer_by_id);

//POST tambahkan customer baru
router.post('/add-new', customer_controller.post_add_new_customer);

//DELETE hapus customer berdasarkan _id customer
router.delete('/delete-by-id/:customer_id', customer_controller.delete_customer_by_id);

//UPDATE perbaharui data customer berdasarkan _id customer
router.put('/update-by-id/:customer_id', customer_controller.update_customer_by_id);

module.exports = router;
