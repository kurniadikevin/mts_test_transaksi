const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const SalesSchema = new Schema({
    kode : {type: String, required: true, maxlength : 10, minlength : 4  },
    tgl : {type:Date, required: true},
    cust_id :  { type : Schema.Types.ObjectId, ref : "m_customer" , required: true},
    subtotal :{type: Number, required: true, default : 0},
    diskon :{type: Number, required: true},
    ongkir :{type: Number, required: true},
    total_bayar :{type: Number, required: true, default: 0}
})


module.exports= mongoose.model("t_sales",SalesSchema)
