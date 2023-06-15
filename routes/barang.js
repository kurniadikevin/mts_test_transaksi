const express = require('express');
const router = express.Router();
const barang_controller= require('../controller/barang')

// GET tampilkan semua list barang
router.get('/all',barang_controller.get_barang_list);

// GET tampilkan barang berdasarkan id barang
router.get('/by-id/:barang_id',barang_controller.get_barang_by_id)

//POST tambahkan barang baru
router.post('/add-new', barang_controller.post_add_new_barang);

//DELETE hapus barang berdasarkan _id barang
router.delete('/delete-by-id/:barang_id', barang_controller.delete_barang_by_id);

//DELETE hapus barang berdasarkan kode barang
router.delete('/delete-by-kode/:barang_kode', barang_controller.delete_barang_by_kode);

//UPDATE perbaharui data barang berdasarkan _id barang
router.put('/update-by-id/:barang_id', barang_controller.update_barang_by_id);

module.exports = router;
