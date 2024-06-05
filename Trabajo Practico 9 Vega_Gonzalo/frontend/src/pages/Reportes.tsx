import { useEffect, useState } from 'react';
import BarChart from '../components/reportes/BarChart';
import Container from 'react-bootstrap/Container';
import ReporteService from '../services/ReporteService';

export const Reportes = () => {
    const [selectedYear, setSelectedYear] = useState(Number(new Date().getFullYear()));
    const [dataByMonth, setDataByMonth] = useState<any[]>([]);
    const [dataPerYear, setDataPerYear] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const dataByMonthResponse = await ReporteService.getDataByMonthPerYear(selectedYear);
                setDataByMonth(dataByMonthResponse);

                const dataPerYearResponse = await ReporteService.getDataPerYear();
                setDataPerYear(dataPerYearResponse);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [selectedYear]);

    return (
        <Container>
            <h1 className=''>Reportes</h1>
            <div className='d-flex justify-content-between'>
                {dataPerYear.length > 0 ? (
                    <Container className='pt-1'>
                        <BarChart data={dataPerYear} />
                    </Container>
                ) : (
                    <p>Error buscando la información por mes</p>
                )}
                {dataByMonth.length > 0 ? (
                    <Container>
                        <label className='mb-1 mr-1' htmlFor="">
                            Elegir un Año: 
                            <input 
                                type='number' 
                                value={selectedYear} 
                                onChange={(e) => setSelectedYear(Number(e.target.value))} 
                            />
                        </label>
                        <BarChart data={dataByMonth} subtitle={`Pedidos del Año: ${selectedYear}`} />
                    </Container>
                ) : (
                    <p>Error buscando la información por año</p>
                )}
            </div>
        </Container>
    );
};
