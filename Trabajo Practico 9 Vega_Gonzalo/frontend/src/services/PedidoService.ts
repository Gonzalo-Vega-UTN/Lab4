import { Pedido } from '../entities/Pedido';
import PreferenceMP from '../entities/PreferenceMP';



export async function savePedido(pedido : Pedido) {
	let urlServer = 'http://localhost:8080/api/pedidos';
	let method:string = "POST";
	if(pedido && Number(pedido.id) > 0){
		method = "PUT";
	}
	const response = await fetch(urlServer, {
	  method: method,
	  body: JSON.stringify(pedido),
	  headers: {
		"Content-Type": 'application/json'
	  },
	  mode: "cors"
	});

	const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
        return responseData as Pedido; // Devuelve el ID del pedido si la respuesta es exitosa
    } else {
        throw new Error('Error al agregar el pedido');
    }
	
}

export async function createPreferenceMP(pedido?:Pedido){
    let urlServer = 'http://localhost:8080/api/pedidos/create-preference-mp';
	let method:string = "POST";
    const response = await fetch(urlServer, {
	  "method": method,
	  "body": JSON.stringify(pedido),
	  "headers": {
		"Content-Type": 'application/json'
	  }
	});
	const responseData = await response.json();
    console.log("REPONSE MP EN SERVICE",responseData);
    if (response.ok) {
        return responseData as PreferenceMP; // Devuelve el ID del pedido si la respuesta es exitosa
    } else {
        throw new Error('Error al agregar el pedido');
    }
}  