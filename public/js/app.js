console.log('client side java script file is loeaded!');



const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");

const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");


weatherForm.addEventListener("submit",(e)=>{

	const location = searchElement.value;
	e.preventDefault();

	message1.textContent = "Loading...";
	message2.textContent = "";

	fetch("/weather?adress="+location).then((response)=>{
		response.json().then((data)=>{
			if(data.error){
				message1.textContent=data.error;
			}else{
				message1.textContent=data.location;
				message2.textContent=data.forecast;

			}
		});
	});

});
