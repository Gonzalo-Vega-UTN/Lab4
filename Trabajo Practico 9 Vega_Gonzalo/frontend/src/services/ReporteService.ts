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

    static async generateExcelReport(fechaDesde: string, fechaHasta: string) {
        const urlServer = `http://localhost:8080/api/reportes/excel?desde=${fechaDesde}&hasta=${fechaHasta}` ; 
        const response = await fetch(urlServer, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          mode: 'cors'
        });
      
        if (!response.ok) {
          throw new Error('Error al generar el reporte Excel');
        }
      
        // Si la respuesta es exitosa, devuelve los datos del archivo Excel
        return response.blob();
      }
}

export default ReporteService;