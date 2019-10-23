const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');


const app = express();


const publicDirectoryPath = path.join(__dirname,'../public');  //pristupanje folderima preko path join

const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

const port = process.env.PORT || 3000;

app.set('view engine','hbs'); // setovanje app da koristi view engine zbog templatea i dinamic page
app.set('views',viewPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);  // registracija partiala iz templatea, da na svakoj stranici bude header / footer



app.get('/', (req, res) =>{
	res.render("index",{          //dynamic pages, renderuje index.hbs
		title:"Weather App",				// podaci koje salje
		name:"Radoslav Radic"
	});
});

app.get('/about',(req,res)=>{
	res.render("about",{
		title:"About",
		name:"Radoslav Radic"
	})

});

app.get('/help',(req,res)=>{
	res.render("help",{
		title:"Help Page",
		message:"Some help message",
		name:"Radoslav Radic",

	})

});


app.get('/weather',(req,res)=>{
	if(!req.query.adress){
	return	res.send({
		error:"You must provide an adress!"
	})
	}


	geocode(req.query.adress, (error,response)=>{
		if(error){
			return res.send({error})
		}


		forecast(response.latitude,response.longitude,(error,data) =>{
			if (error) {
				return res.send({error})
			}


			res.send({
				forecast:data,
				location:response.location,
				adress:req.query.adress
			})

		})

	});


});

app.get('/help/*',(req,res)=>{
	res.render("404",{
		title:"404",
		name:"Radoslav Radic",
		errorMessage:"Help article not found"
	})
});

app.get('*',(req,res)=>{    //kad ne pronadje ni jednu od ovih ruta
	res.render('404',{
		title:"404",
		name:"Radoslav Radic",
		errorMessage:"Page not found"
	})
});


app.listen(port,()=>{

	console.log("Server running on port "+port)
});
