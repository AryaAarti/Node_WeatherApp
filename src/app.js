const path =require('path')
const express =require('express')
const hbs = require('hbs')
const app =express()
const port=process.env.PORT || 3000
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const playpath =  path.join( __dirname, '../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath =path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(playpath))
app.get('',(req,res)=>
{ res.render('index',{
    title:"Weather App",
    name:"Aarti Arya"
})

})
app.get('/about',(req,res)=>
{res.render('about',{
    title:"Weather App",
    name:"Aarti Arya"
})
})
app.get('/help',(req,res)=>
{res.render('help',{
    title:"Weather App",
    name:"Aarti Arya",
    helptext:"This is a help page"
})
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {return res.send({
        error:"Please enter valid Location"
    })
    }
    geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
        if(error)
         return res.send({error})
       forecast(Latitude,Longitude,(error,{Temperature,rain}={})=>{
            if(error)
             return res.send({error})
            res.send(
                {
                    Location:Location,
                    Temperature:"Temperature is: "+Temperature,
                    Rain:"Chances of rain "+rain
                }
            )
            // console.log(Location)
            // console.log("Temperatur is "+Temperature+"C")
            // console.log("Chances of rain "+rain+"%")
        }
            )
        }
       )
    }
    )

app.get('*',(req,res)=>{
    res.render('error',{
        title:"404 Wrong Page"
    })
})

app.listen(port,()=>{
    console.log("Server")
})

