import type  Instrumento  from '../entities/Instrumento'; // Import interface

export async function getInstrumentosFetch(email? : string){
	console.log("en el service", email);
	
	let urlServer = 'http://localhost:8080/api/instrumentos';

	if (email) {
		urlServer += `?email=${email}`;
	}
	
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	if (!response.ok) {
		throw new Error('Error al conseguir Instrumentos');
	}

	return await response.json() as Instrumento[];
}

export async function deleteInstrumentoById(id:string){
	const urlServer = 'http://localhost:8080/api/instrumentos/'+id;
	 await fetch(urlServer, {
		method: 'DELETE',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	
}

export async function saveInstrumento(instrumento : Instrumento){
	let urlServer = 'http://localhost:8080/api/instrumentos';
	let method:string = "POST";
	if(instrumento && Number(instrumento.id) > 0){
		method = "PUT";
	}
	await fetch(urlServer, {
	  method: method,
	  body: JSON.stringify(instrumento),
	  headers: {
		"Content-Type": 'application/json'
	  },
	  mode: "cors"
	});
	
}

export async function getTop5SelledInstrumentosFetch(){
	const urlServer = 'http://localhost:8080/api/instrumentos/top5';
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	return await response.json() as Instrumento[];
}

export async function getInstrumentoXIdFetch(id:number){
	const urlServer = 'http://localhost:8080/api/instrumentos/'+id;
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});

	if (!response.ok) {
		throw new Error('Error al conseguir Instrumento');
	}
	return await response.json() as Instrumento;
    
}