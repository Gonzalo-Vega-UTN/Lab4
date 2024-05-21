import type  Instrumento  from '../entities/Instrumento'; // Import interface

export async function getInstrumentosFetch(){
	const urlServer = 'http://localhost:8080/api/instrumentos';
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
	return await response.json() as Instrumento;
    
}