const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const categorySubSchema = new Schema({
    ID:{unique:true,type:String},
    MALL_CATEGORY_ID:{type:String},
    MALL_SUB_NAME:{type:String},
    COMMENTS:{type:String},
    SORT:{type:Number},
})
//发布到model上建立模型
mongoose.model('CategorySub',categorySubSchema)
