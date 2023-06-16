const SalesDetail = require('../model/t_sales_det');
const Barang = require('../model/m_barang')


//GET all sales_detail_list
exports.get_all_sales_detail_list = (req, res,next) => {
    SalesDetail.find({})
    .then((data)=>{
     res.send(data);
    })
    .catch((err)=>{
     return next(err)
    })
  };

//GET all sales_detail_list by _id
exports.get_sales_detail_by_id = (req, res,next) => {
    SalesDetail.find({_id : req.params.sales_detail_id},)
    .then((data)=>{
     res.send(data);
    })
    .catch((err)=>{
     return next(err)
    })
  };

//GET all sales_detail_list by sales_id
exports.get_sales_detail_by_sales_id = (req, res,next) => {
    SalesDetail.find({sales_id : req.params.sales_id},)
    .then((data)=>{
     res.send(data);
    })
    .catch((err)=>{
     return next(err)
    })
  };


// Middleware untuk calkulasi data yang diinput pada sales detail
exports.middleware_calculate_for_sales_detail=(req,res,next)=>{
    Barang.find({_id : req.body.barang_id},)
    .then((data)=>{

     // find harga_bandrol
     const harga_barang=data[0].harga;
     const diskon_nilai= req.body.diskon_pct * harga_barang;
     res.locals.harga_bandrol = harga_barang;
     res.locals.diskon_nilai= diskon_nilai;
     res.locals.total= harga_barang - diskon_nilai;
     next()
    })
    .catch((err)=>{
     return next(err)
    })
}

//POST add new sales_detail
exports.post_new_sales_detail=(req,res,next)=>{
    const item = new SalesDetail({
        sales_id : req.body.sales_id,
        barang_id : req.body.barang_id,
        harga_bandrol : res.locals.harga_bandrol,//generated
        qty : req.body.qty,
        diskon_pct : req.body.diskon_pct,
        diskon_nilai : res.locals.diskon_nilai, //generated
        total : res.locals.total//generated
    })
    item.save().then((data)=>{
        res.send({
            status : 'Succeed',
            message : "Sales detail berhasil ditambahkan",
            data : data
        })
    }
    ).catch((err)=>{
        return next(err)
    });
    }

// UPDATE sales_detail
exports.update_sales_det_by_id=(req,res,next)=>{
    const updateData = {
        sales_id : req.body.sales_id,
        barang_id : req.body.barang_id,
        harga_bandrol : res.locals.harga_bandrol,//generated
        qty : req.body.qty,
        diskon_pct : req.body.diskon_pct,
        diskon_nilai : res.locals.diskon_nilai, //generated
        total : res.locals.total//generated
    }
    SalesDetail.findByIdAndUpdate(req.params.sales_det_id, updateData)
    .then(()=>{
     res.send({
        message : `Sales detail dengan _id : ${req.params.sales_det_id} berhasil diupdate`,
        newData : updateData,
        status : 'Success'
     });
    })
    .catch((err)=>{
     return next(err)
    })
}


//DELETE sales detail by sales_detail_id
exports.delete_sales_det_by_id=(req,res,next)=>{
    SalesDetail.findByIdAndDelete({_id : req.params.sales_det_id},)
    .then(()=>{
     res.send({
        message : `Sales detail dengan _id : ${req.params.sales_det_id} berhasil dihapus`,
        status : 'Success'
     });
    })
    .catch((err)=>{
     return next(err)
    })
}