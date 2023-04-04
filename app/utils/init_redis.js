const redisDb=require("redis");
const redisClient=redisDb.createClient();
redisClient.connect();
redisClient.on("connect",()=>console.log("try to connect to redis..."))
redisClient.on("error",(error)=>console.log("redis error: ",error.message))
redisClient.on("ready",()=>console.log("redis is connected..."))
redisClient.on("end",()=>console.log("redis is disconnected..."))
module.exports=redisClient