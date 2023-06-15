const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CustomerSchema = new Schema({
    kode : {type: String, required: true, maxlength : 10, minlength : 4  },
    nama : {type: String, required: true, maxlength : 100, minlength : 4  },
    telp : {type: String, required: true, maxlength : 20, minlength : 4  }
})


module.exports= mongoose.model("m_customer",CustomerSchema)
