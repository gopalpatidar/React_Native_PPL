const db=require('../model/modelcategories');
module.exports={
    usercategory:(data)=>{
        return new Promise((resolve,reject)=>{
        db.create(data ,function(err,result){
            if(err)
            reject(err);
          else 
             resolve(result);
        })
    })
    },

    showpost:(data)=>{
        console.log(data,'aaa')
        return new Promise((resolve,reject)=>{
            db.find({Gmail:data},(err,result)=>{
                if(err || result.length===0)
                  reject(err);
                else 
                   resolve(result);
            })
        })
    },
}