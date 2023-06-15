const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const BarangSchema = new Schema({
    kode : {type: String, required: true, maxlength : 10, minlength : 4  },
    nama : {type: String, required: true, maxlength : 100, minlength : 4  },
    harga : {type:Number, required: true, min: [1, 'angka harus positif'] }
});


module.exports= mongoose.model("m_barang",BarangSchema)
