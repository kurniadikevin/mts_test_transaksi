const Customer = require('../model/m_customer');

// get all customer list
exports.get_customer_list = (req, res,next) => {
    Customer.find({},)
    .then((data)=>{
     res.send(data);
    })
    .catch((err)=>{
     return next(err)
    })
  };

// get customer by id
exports.get_customer_by_id= (req, res,next) => {
    Customer.find({_id : req.params.customer_id},)
    .then((data)=>{
     res.send(data);
    })
    .catch((err)=>{
     return next(err)
    })
  };

// get tambahkan customer
exports.post_add_new_customer =(req,res,next)=>{
    const customer = new Customer({
        kode : req.body.kode,
        nama : req.body.nama,
        telp : req.body.telp
    })
    customer.save().then((data)=>{
        res.send({
            message : "Customer berhasil ditambahkan",
            data : data
        })
    }
    ).catch((err)=>{
        return next(err)
    });
    }

    //////////////////////////////////////
exports.delete_customer_by_id=(req,res,next)=>{
    Customer.findByIdAndDelete({_id : req.params.customer_id},)
    .then((data)=>{
     res.send({
        message : `Customer dengan _id : ${req.params.customer_id} berhasil dihapus`,
        status : 'Success'
     });
    })
    .catch((err)=>{
     return next(err)
    })
}

exports.update_customer_by_id=(req,res,next)=>{
    const updateData={
        kode : req.body.kode,
        nama : req.body.nama,
        telp : req.body.telp   
    }
    Customer.findByIdAndUpdate(req.params.customer_id, updateData)
    .then((data)=>{
     res.send({
        message : `Customer dengan _id : ${req.params.customer_id} berhasil diupdate`,
        newData : updateData,
        status : 'Success'
     });
    })
    .catch((err)=>{
     return next(err)
    })
}
