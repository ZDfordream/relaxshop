const Koa = require('koa')
const app = new Koa()
const {connect, initSchemas} = require('./database/init.js')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')
const Log = require('./config/logger');
const logger = require('log4js').getLogger('index.js');

app.use(bodyParser())
app.use(cors())
app.use(Log())

let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let goods = require('./appApi/goods.js')

//装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


;(async () => {
  await connect()
  initSchemas()
})()

app.on("error",(err,ctx)=>{//捕获异常记录错误日志
  logger.error(new Date(),":",err);
});

app.use(async (ctx) => {
  ctx.body = '<h1>relaxmall</h1>'
})

app.onerror = (err) => {
  logger.error('捕获到了!', new Date()+"---"+err.message);
}

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
  logger.info('服务启动成功');
})
