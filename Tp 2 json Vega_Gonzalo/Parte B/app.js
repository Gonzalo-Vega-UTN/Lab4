const {  connectToDatabase, insertPais, findData, crearIndice, updateData, deleteData } = require("./database")
const { obtenerInfoDelPais } = require("./apiService");
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function opciones(opcion) {
    await connectToDatabase();

    switch (opcion) {
        case '0':
            await insertPaises();
            break;
        case '1':
            console.log(await findData( { region: 'Americas' }));
            break;
        case '2':
            console.log(await findData( { region: 'Americas', poblacion: { $gt: 100000000 } }));
            break;
        case '3':
            console.log(await findData( { region: { $ne: 'Africa' } }));
            break;
        case '4':
            console.log(await updateData( { nombre: 'Egypt' }, { nombre: 'Egipto', poblacion: 95000000 }));
            console.log("Egipto actualizado.");
            break;
        case '5':
            console.log(await deleteData( { codigo: 258 }));;
            console.log("País con codigo 258 eliminado.");
            break;
        case '6':
            console.log("El metodo drop()  elimina una colección o una base de datos ");
            break;
        case '7':
            console.log(await findData( { poblacion: { $gt: 50000000, $lt: 150000000 } }));
            break;
        case '8':
            console.log(await findData({}).sort({ nombre: 1 }).toArray());
            break;
        case '9':
            console.log("El metodo skip() omite documentos una consulta en una cierta cantidad");
            break;
        case '10':
            console.log("Expresiones regulares permiten buscar patrones de texto.");
            const regex = new RegExp('^Arg', 'i'); 
            console.log(await findData({ nombre: regex }));
            break;
        case '11':
            await crearIndice( { codigo: 1 });
            console.log("Índice creado en campo codigo.");
            break;
        case '12':
            console.log("Para hacer backup se utiliza el comando mongodump.");
            break;
        case '15':
            rl.close();
            console.log("Fin del programa");
            break;
        default:
            console.log("Opción no válida.");
            break;
    }
}



function mostrarMenu() {
    console.log("Selecciona una opción:");
    console.log("0. Insertar 300 paises automaticamente");
    console.log("1. Obtener países de la region Americas.");
    console.log("2. Países de América con poblacion > 100,000,000.");
    console.log("3. Países no de la region África.");
    console.log("4. Actualizar Egipto a Egipto con poblacion 95,000,000.");
    console.log("5. Eliminar país con codigo 258.");
    console.log("6. Describir el método drop() en MongoDB.");
    console.log("7. Países con poblacion entre 50,000,000 y 150,000,000.");
    console.log("8. Países ordenados alfabéticamente.");
    console.log("9. Describir el método skip() en MongoDB.");
    console.log("10. Uso de expresiones regulares en MongoDB.");
    console.log("11. Crear índice en campo codigo.");
    console.log("12. Realizar backup de base de datos.");
    console.log("15. Salir");
}


async function insertPaises() {
    await connectToDatabase()
    for (let i = 0; i <= 300; i++) {
        const listaPaises = await obtenerInfoDelPais(i);
        if(listaPaises == null) continue;
        for (const pais of listaPaises) {
            await insertPais(pais);
        }
    }
    console.log("Carga de datos finalizada con exito")
}


mostrarMenu();



rl.on('line', async (input) => {
   await opciones(input.trim());
    if (input === '15') {
        rl.close();
    } else {
        mostrarMenu();
    }
});

