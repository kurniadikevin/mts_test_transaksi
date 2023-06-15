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

// Middleware untuk calkulasi data yang diupdate pada sales setiap barang ditambah 
exports.middleware_calculate_for_sales= (req,res,next)=>{
    SalesDetail.find({sales_id : req.params.sales_id},)
    .then((data)=>{
     res.send(data);
     // ambil data untuk subtotal dan total bayar update
     //last check
    })
    .catch((err)=>{
     return next(err)
    })
}


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