async function callApi(codigoPais) {
    const url = "https://restcountries.com/v2/callingcode/" + codigoPais;
    const response = await fetch(url);

    if (!response.ok) {
        return null;
    } else {
        const result = await response.json();
        return result; 
    }
}


async function obtenerInfoDelPais(codigoPais) {
    try {
        const infoPais = await callApi(codigoPais);
        const listaPaises = [];
        if (infoPais != null) {
            const promises = infoPais.map((element) => {
                return new Promise((resolve, reject) => {
                    const data = {
                        codigo: element.numericCode,
                        nombre: element.nativeName,
                        capital: element.capital,
                        region: element.region,
                        poblacion: element.population,
                        latitud: element.latlng[0],
                        longitud: element.latlng[1]
                    };
                    listaPaises.push(data);
                    resolve(); // Resolve the promise once data is pushed
                });
            });
            await Promise.all(promises);
            return listaPaises;
        }
        return null;
    } catch (error) {
        console.error("Error al obtener información del país:", error.message);
    }
}




module.exports = {
 
    obtenerInfoDelPais
}
