const winston = require("winston")
const {format,createLogger,transports} = winston
const { combine, timestamp, printf } = format;
const fs = require("fs")

let info =""
// const readStream = fs.createReadStream("./myLogs",{encoding:"utf8"})
const myFormat = printf(({ level, message, timestamp }) => {
  console.log(message)
  fs.appendFile("./myLogs.txt",`${timestamp}  ${level}: ${message} `,(err)=>{
    if(err){
      return fs.readFile("./myLogs",(err,data)=>{
        if(err ||data===""){
          return err
        }
        return  info.includes(data.toString())
      })
    }
  })
});

const applicationLogger=()=>{
   return createLogger({
        level: 'debug',
        format:combine(
          timestamp({format :"MMM-DD-YYYY HH:mm:ss"}),
          myFormat,
        ),
        transports: [
         
          new winston.transports.Http
        ],
      });
}

module.exports = applicationLogger;