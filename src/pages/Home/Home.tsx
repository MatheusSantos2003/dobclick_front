
import { Card } from "@mui/material";
import Chart from "react-apexcharts";
import GraficoSemanaOptions from "./graficoSemana";
import GraficoEstoqueCritico from "./graficoEstoqueCritico";
import GraficoLinha from "./graficoLinha";
import { useEffect, useState } from "react";
import User from "../../models/User.model";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Layout from "../../components/layout/Layout/Layout";









function Home() {
    let userData: User = new User();
    const [usuarioName, setUsuario] = useState<string | undefined>("");
    const navigate = useNavigate();



    useEffect(() => {
        var token: any = JSON.parse(localStorage.getItem("userToken") || 'null');

        if (token != null) {
            userData = jwtDecode(token);

            setUsuario(userData.nome);
        }

        if (userData?.Id == null) {
            navigate("/");
        }
    });
    return (




        <Layout>

            <h2>Home</h2>
            {usuarioName && <h6>Seja Bem-vindo(a) {usuarioName} ! </h6>}
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
        </Layout>
    )
}

export default Home