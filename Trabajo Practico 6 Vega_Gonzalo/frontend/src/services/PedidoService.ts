import type  Instrumento  from '../entities/Instrumento'; // Import interface
import { Pedido } from '../entities/Pedido';



export async function savePedido(pedido : Pedido){
	let urlServer = 'http://localhost:8080/api/pedidos';
	let method:string = "POST";
	if(pedido && Number(pedido.id) > 0){
		method = "PUT";
	}
	await fetch(urlServer, {
	  method: method,
	  body: JSON.stringify(pedido),
	  headers: {
		"Content-Type": 'application/json'
	  },
	  mode: "cors"
	});
	
}