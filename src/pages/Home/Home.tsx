
import { Card } from "@mui/material";
import Chart from "react-apexcharts";
import { ChartType } from "../../models/ChartOptions.model";

var graficoSemanaOptions: ChartType = {
    options: {
        chart: {
            id: "basic-bar",
            locales: [{
                name: 'en',
                options: {
                    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                    shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    days: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
                    shortDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                    toolbar: {
                        download: 'Download do SVG',
                        selection: 'Seleção',
                        selectionZoom: 'Zoom da Seleção',
                        zoomIn: 'Mais Zoom',
                        zoomOut: 'Menos Zoom',
                        pan: 'Panoramica',
                        reset: 'Resetar Zoom',
                    }
                }
            }]

        },
        xaxis: {
            categories: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
        },
        dataLabels: {
            enabled: true,
            formatter: function (value: any) {
                return "R$" + value;
            },
            offsetY: -20,
            style: {
                fontSize: '10px',
                colors: ["#fff"]
            }

        }
    },
    responsive: [{
        breakpoint: 1000,
        options: {
            chart: {
                width: "100%"
            },
            legend: {
                position: 'bottom'
            }
        }
    }],
    series: [
        {
            name: "Lucro",
            data: [30.15, 47.19, 45.10, 50.25, 49.50, 60.79, 32.01]
        }
    ],
    type: "bar",
};


var graficoEstoqueCritico: ChartType = {
    options: {
        title: {
            text: "Estoque Critico",
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
            },
        },
    },
    type: "donut",
    series: [44, 55, 41, 17, 15],

    responsive: [{
        breakpoint: 1000,
        options: {
            chart: {
                width: "100%"
            },
            legend: {
                position: 'bottom'
            }
        }
    }],

}

var graficoLinha: ChartType = {
    
    options: {
        title: {
            text: "Produto Mais Vendido da seman",
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
            },
        },
        xaxis: {
            categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
          },
    },
    type: "line",
    series: [{
        name: "Camisa Polo GG",
        data: [10,15,12,25,50]
    }],
    title: {
        text: "Produto Mais Vendido da Semana",
        align: 'left',
        margin: 10,
    }



}

function Home() {
    return (
        <>
            <h2>Home</h2>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-lg-6 col-sm-12 py-2">
                        <Card raised={true} sx={{ height: 380 }}>
                            <Chart
                                options={graficoSemanaOptions.options}
                                series={graficoSemanaOptions.series}
                                type={graficoSemanaOptions.type}
                                width={"100%"}
                                height={380}
                            />
                        </Card>

                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-12 py-2">
                        <Card raised={true} sx={{ height: 380 }}>
                            <Chart
                                options={graficoEstoqueCritico.options}
                                series={graficoEstoqueCritico.series}
                                type={graficoEstoqueCritico.type}
                                width={"100%"}
                                height={380}
                            />
                        </Card>
                    </div>

                    <div className="col-md-6 col-lg-6 col-sm-12 py-2">
                        <Card raised={true} sx={{ height: 380 }}>
                            <Chart
                                options={graficoLinha.options}
                                series={graficoLinha.series}
                                type={graficoLinha.type}
                                width={"100%"}
                                height={380}
                            />
                        </Card>
                    </div>

                    <div className="col-md-6 col-lg-6 col-sm-12 py-2">
                        <Card raised={true} sx={{ height: 380 }}>
                            <Chart
                                options={graficoEstoqueCritico.options}
                                series={graficoEstoqueCritico.series}
                                type={graficoEstoqueCritico.type}
                                width={"100%"}
                                height={380}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home