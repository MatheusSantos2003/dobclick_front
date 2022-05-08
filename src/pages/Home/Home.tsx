
import { Card } from "@mui/material";
import Chart from "react-apexcharts";
import GraficoSemanaOptions from "./graficoSemana";
import GraficoEstoqueCritico from "./graficoEstoqueCritico";
import GraficoLinha from "./graficoLinha";
import { useEffect } from "react";

const apiURL = import.meta.env.VITE_APIURL;






function Home() {
    useEffect(() =>{
        console.log(apiURL);
    });
    return (
    
        <>
            <h2>Home</h2>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-lg-6 col-sm-12 py-2">
                        <Card raised={true} sx={{ height: 380 }}>
                            <Chart
                                options={GraficoSemanaOptions.options}
                                series={GraficoSemanaOptions.series}
                                type={GraficoSemanaOptions.type}
                                width={"100%"}
                                height={380}
                            />
                        </Card>

                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-12 py-2">
                        <Card raised={true} sx={{ height: 380 }}>
                            <Chart
                                options={GraficoEstoqueCritico.options}
                                series={GraficoEstoqueCritico.series}
                                type={GraficoEstoqueCritico.type}
                                width={"100%"}
                                height={380}
                            />
                        </Card>
                    </div>

                    <div className="col-md-6 col-lg-6 col-sm-12 py-2">
                        <Card raised={true} sx={{ height: 380 }}>
                            <Chart
                                options={GraficoLinha.options}
                                series={GraficoLinha.series}
                                type={GraficoLinha.type}
                                width={"100%"}
                                height={380}
                            />
                        </Card>
                    </div>

                    <div className="col-md-6 col-lg-6 col-sm-12 py-2">
                        <Card raised={true} sx={{ height: 380 }}>
                            <Chart
                                options={GraficoEstoqueCritico.options}
                                series={GraficoEstoqueCritico.series}
                                type={GraficoEstoqueCritico.type}
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