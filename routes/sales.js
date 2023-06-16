const express = require('express');
const router = express.Router();
const sales_controller=require('../controller/sales');

// GET tampilkan semua sales
router.get('/all',sales_controller.get_all_sales_list);

//GET tampilkan sales berdasarkan sales_id
router.get('/by-id/:sales_id',sales_controller.get_sales_by_sales_id)

// POST tambahkan sales baru
router.post('/new',sales_controller.post_new_sales);

//PUT update sales data dengan sales detail
router.put('/update-sum/:sales_id',sales_controller.middleware_calculate_sales_subtotal
,sales_controller.middleware_calculate_sales_total_bayar
 ,sales_controller.update_sum_sales_by_id)

//DELETE sales by sales id
router.delete('/delete-by-id/:sales_id', sales_controller.delete_sales_by_id);

module.exports = router;