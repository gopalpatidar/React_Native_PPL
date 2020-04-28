const db=require('../model/modelcomments');

module.exports={
    addComent:(data)=>{
        return new Promise((resolve,reject)=>{
            db.create(data,(err,result)=>{
                if(err)
                reject(err);
              else 
                 resolve(result);
            })
        })
    },

    showComent:(data)=>{
     return new Promise((resolve,reject)=>{
         db.find({Postid:data},(err,result)=>{
             if(err || result.length==0)
               reject(err);
             else
               resolve(result)
         })
     })
    }
}