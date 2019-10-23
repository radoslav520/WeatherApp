const request = require('request');


const geocode = (adress,callback ) =>{

	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+adress+'.json?access_token=pk.eyJ1IjoicmFkb3NsYXY1MjAiLCJhIjoiY2p6dmtwcDc0MDZ0NzNvbDlseXZ4eDc1NyJ9.rgJsrpAZD_XNhB13XUrOiA';


	request({uri:url, json:true},(error,response)=>{

		if(error){
			callback("Unable to connect on service",undefined)
		}else if(response.body.features.length === 0){
			callback("Unable to find that location, try again search!",undefined)
		}else {
			callback(undefined, {
				latitude: response.body.features[0].center[0],
				longitude:response.body.features[0].center[1],
				location: response.body.features[0].place_name
			})
		}


	});

};

module.exports = geocode;


