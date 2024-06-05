class ReporteService {
    static async getDataByMonthPerYear(year: number) {
        let urlServer = 'http://localhost:8080/api/reportes/bars/year/' + year;
        const response = await fetch(urlServer, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors'
        });
        if (!response.ok) {
            // Lanza un error con la respuesta del servidor si el estado HTTP no es 2xx
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json() as any[];
    }

    static async getDataPerYear() {
        let urlServer = 'http://localhost:8080/api/reportes/bars';
        const response = await fetch(urlServer, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors'
        });
        if (!response.ok) {
            // Lanza un error con la respuesta del servidor si el estado HTTP no es 2xx
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json() as any[];
    }

    static async geenrateExcel(desde : Date, hasta : Date) {
        let urlServer = 'http://localhost:8080/api/reportes/excel';
        const response = await fetch(urlServer, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors'
        });
        if (!response.ok) {
            // Lanza un error con la respuesta del servidor si el estado HTTP no es 2xx
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json() as any[];
    }
}

export default ReporteService;