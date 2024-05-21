// app.js
const { initializeDatabase, insertIntoDatabase } = require('./db');
const { callApi } = require("./apiService");
// Inicializar la base de datos
const db = initializeDatabase();

async function obtenerInfoDelPais(codigoPais) {
    try {
        const infoPais = await callApi(codigoPais);
        if (infoPais != null) {
            const promises = infoPais.map((element) => {
                const data = {
                    $codigo: element.numericCode,
                    $nombre: element.nativeName,
                    $capital: element.capital,
                    $region: element.region,
                    $poblacion: element.population,
                    $latitud: element.latlng[0],
                    $longitud: element.latlng[1]
                };
                insertIntoDatabase(db, data);
            });
            await Promise.all(promises);
            console.log("Todos los datos insertados correctamente.");
        }
    } catch (error) {
        console.error("Error al obtener información del país:", error.message);
    }
}

async function findData() {
    try {
        // Ejemplo de consulta
        db.serialize(() => {
            db.each("SELECT * FROM pais", (err, row) => {
                if (err) {
                    console.error(err.message);
                }

               
                const data = {
                    codigo: row.codigo_pais,
                    nombre: row.nombre_pais,
                    capital: row.capital_pais,
                    region: row.region,
                    poblacion: row.poblacion,
                    latitud: row.latitud,
                    longitud: row.longitud
                };
                console.log(data);
            });
        });
    } catch (error) {
        console.error("Error al consultar la base de datos:", error.message);
    }
}

async function main() {
    for(let i =0; i <= 300; i++) await obtenerInfoDelPais(i);
    await findData();
}

main();
