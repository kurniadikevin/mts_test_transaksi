const express = require('express');
const router = express.Router();
const sales_detail_controller =require('../controller/sales_detail');

// GET tampilkan semua sales_detail
router.get('/all',sales_detail_controller.get_all_sales_detail_list);

// GET tampilkan sales_detail by id
router.get('/by-id/:sales_detail_id',sales_detail_controller.get_sales_detail_by_id);

// GET tampilkan sales_detail by id
router.get('/by-sales-id/:sales_id',sales_detail_controller.get_sales_detail_by_sales_id);

//POST input sales detail baru
router.post('/new',sales_detail_controller.middleware_calculate_for_sales_detail, sales_detail_controller.post_new_sales_detail);

//DELETE sales detail by sales detail id
router.delete('/delete-by-id/:sales_det_id', sales_detail_controller.delete_sales_det_by_id);

module.exports = router;
