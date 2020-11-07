const request=require('request')
const forecast = (lat,long,callback)=>{
const url='http://api.weatherstack.com/current?access_key=6518ce8feba01e46e7c2900e2d1157fd&query='+lat+','+long
request({url, json: true},(error, {body})=>
{   if(error)
    {
        callback("Weather server is not available",undefined)
    }
    else if(body.error)
    {
        callback("Please enter valid location",undefined)
    }
    else{
        callback(undefined,{Temperature :body.current.temperature,
        rain:body.current.precip})
        }
})
}
module.exports=forecast