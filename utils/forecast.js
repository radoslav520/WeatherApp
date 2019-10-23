const request = require('request');

const forecast = (latitude,longitude,callback) =>{

	const url = 'https://api.darksky.net/forecast/35745b7225bfa3d89408562448423f01/'+latitude+','+longitude;

	request({url,json:true}, (error,response) =>{  //destructuring and shortcut properthy

		if(error){
			callback("Unable to conect on service!",undefined);
		}else if(response.body.error){
			callback("Unable to find location",undefined);
		}else{
			callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
		}
	})
};



module.exports = forecast;
