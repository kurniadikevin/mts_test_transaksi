const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const SalesDetailSchema = new Schema({
  sales_id : { type : Schema.Types.ObjectId, ref : "t_sales" , required: true},
  barang_id : { type : Schema.Types.ObjectId, ref : "m_barang" , required: true},
  harga_bandrol : {type:Number, required: true},
  qty : {type: Number, min: [1,'angka harus positif'],required: true},
  diskon_pct : {type:Number, required: true},
  diskon_nilai : {type:Number, required: true},
  total : {type:Number, required: true}
})


module.exports= mongoose.model("t_sales_det",SalesDetailSchema)
