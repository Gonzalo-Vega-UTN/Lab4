async function callApi(codigoPais) {
    const url = "https://restcountries.com/v2/callingcode/" + codigoPais;
    const response = await fetch(url);

    if (!response.ok) {
        return null;
    } else {
        const result = await response.json();
        return result; // Retornar el resultado en caso de éxito
    }
}

module.exports = {
    callApi
}
