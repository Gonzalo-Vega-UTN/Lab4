
export async function getCategoriasFetch(){
	const urlServer = 'http://localhost:8080/api/categorias';
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	return await response.json() as CategoriaInstrumento[];
}
