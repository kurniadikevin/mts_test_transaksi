const express = require('express');
const router = express.Router();
const sales_controller=require('../controller/sales');

// GET tampilkan semua sales
router.get('/all',sales_controller.get_all_sales_list);

// POST tambahkan sales baru
router.post('/new',sales_controller.post_new_sales);

module.exports = router;