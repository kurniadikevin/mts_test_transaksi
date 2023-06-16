const Sales = require('../model/t_sales');
const SalesDetail = require('../model/t_sales_det');

//GET all sales list
exports.get_all_sales_list = (req, res,next) => {
    Sales.find({},)
    .then((data)=>{
     res.send(data);
    })
    .catch((err)=>{
     return next(err)
    })
  };

//GET sales by sales_id
exports.get_sales_by_sales_id = (req, res,next) => {
    Sales.find({_id : req.params.sales_id},)
    .then((data)=>{
     res.send(data);
    })
    .catch((err)=>{
     return next(err)
    })
  };

//POST add new sales
exports.post_new_sales=(req,res,next)=>{
    const item = new Sales({
        kode : req.body.kode,
        tgl : req.body.tgl,
        cust_id : req.body.cust_id,
        subtotal : res.locals.subtotal, //generated,
        diskon : req.body.diskon,
        ongkir : req.body.ongkir,
        total_bayar : res.locals.total_bayar// generated
    })
    item.save().then((data)=>{
        res.send({
            status : 'Succeed',
            message : "Sales berhasil ditambahkan",
            data : data
        })
    }
    ).catch((err)=>{
        return next(err)
    });
    }

// Middleware untuk calkulasi data subtotal dan update pada sales
exports.middleware_calculate_sales_subtotal= (req,res,next)=>{
    SalesDetail.find({sales_id : req.params.sales_id},)
    .then((data)=>{
    // ambil data untuk subtotal
     const salesTotalArr = data.map((item)=>{
        return item.total
     })
    // calkulasi  total bayar 
     const sumTotal= salesTotalArr.reduce((total,num)=>{
        return total + num
     })
     res.locals.subtotal= sumTotal
     next()
     //res.send({total:sumTotal});
    })
    .catch((err)=>{
     return next(err)
    })
}

// Middleware untuk calkulasi data total bayar dan update pada sales
exports.middleware_calculate_sales_total_bayar=(req,res,next)=>{
    Sales.find({_id : req.params.sales_id},)
    .then((data)=>{
     const salesData= data[0];
     const totalBayar= res.locals.subtotal + salesData.ongkir - salesData.diskon;
     res.locals.total_bayar= totalBayar;
     next()
    })
    .catch((err)=>{
     return next(err)
    })
}

// POST update sales
exports.update_sum_sales_by_id=(req,res,next)=>{
    const updateData={
        subtotal : res.locals.subtotal, //generated
        total_bayar : res.locals.total_bayar
    }
    Sales.findByIdAndUpdate(req.params.sales_id, updateData)
    .then((data)=>{
     res.send({
        message : `Sales dengan _id : ${req.params.sales_id} berhasil diupdate`,
        newData : data,
        status : 'Success'
     });
    })
    .catch((err)=>{
     return next(err)
    })
}

//DELETE sales by sales_id
exports.delete_sales_by_id=(req,res,next)=>{
    Sales.findByIdAndDelete({_id : req.params.sales_id},)
    .then(()=>{
     res.send({
        message : `Sales dengan _id : ${req.params.sales_id} berhasil dihapus`,
        status : 'Success'
     });
    })
    .catch((err)=>{
     return next(err)
    })
}
