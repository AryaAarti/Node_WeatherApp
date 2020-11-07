const request =require('request')

const geocode=(address,callback)=>{
    const url ='http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2hlcnJ5NCIsImEiOiJja2ZtZ3V3c3YxYTlrMnVxaHMzYXplaHZvIn0.Ky03TU2APz6kCdVE3kkvtQ&limit=1'
    request({ url, json: true},(error, {body}={})=>
    {
        if(error)
        {
        callback("Check your internet connection",undefined)
        }
        else if(body.features.length===0)
        {
        callback("Enter valid location",undefined)
        }
        else 
        {
        callback(undefined,{
        Longitude:body.features[0].center[0],
        Latitude : body.features[0].center[1],
        Location: body.features[0].place_name})
        }
    })
}
module.exports = geocode