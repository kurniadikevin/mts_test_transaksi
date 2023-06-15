const Barang = require('../model/m_barang')

// get all list barang 
exports.get_barang_list = (req, res,next) => {
    Barang.find({},)
    .then((data)=>{
     res.send(data);
    })
    .catch((err)=>{
     return next(err)
    })
  };

// get barang by id
exports.get_barang_by_id= (req, res,next) => {
    Barang.find({_id : req.params.barang_id},)
    .then((data)=>{
     res.send(data);
    })
    .catch((err)=>{
     return next(err)
    })
  };

exports.post_add_new_barang =(req,res,next)=>{
    const barang = new Barang({
        kode : req.body.kode,
        nama : req.body.nama,
        harga : req.body.harga,
    })
    barang.save().then((data)=>{
        res.send({
            message : "Barang berhasil ditambahkan",
            data : data
        })
    }
    ).catch((err)=>{
        return next(err)
    });
    }

exports.delete_barang_by_id=(req,res,next)=>{
    Barang.findByIdAndDelete({_id : req.params.barang_id},)
    .then((data)=>{
     res.send({
        message : `Barang dengan _id : ${req.params.barang_id} berhasil dihapus`,
        status : 'Success'
     });
    })
    .catch((err)=>{
     return next(err)
    })
}

exports.delete_barang_by_kode=(req,res,next)=>{
    Barang.findOneAndDelete({kode : req.params.barang_kode},)
    .then((data)=>{
     res.send({
        message : `Barang dengan kode : ${req.params.barang_kode} berhasil dihapus`,
        status : 'Success'
     });
    })
    .catch((err)=>{
     return next(err)
    })
}


exports.update_barang_by_id=(req,res,next)=>{
    const updateData={
        kode : req.body.kode,
        nama : req.body.nama,
        harga : req.body.harga   
    }
    Barang.findByIdAndUpdate(req.params.barang_id, updateData)
    .then((data)=>{
     res.send({
        message : `Barang dengan _id : ${req.params.barang_id} berhasil diupdate`,
        newData : updateData,
        status : 'Success'
     });
    })
    .catch((err)=>{
     return next(err)
    })
}
