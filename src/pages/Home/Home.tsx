
import { Box, Card, CardContent, styled, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import GraficoSemanaOptions from "./graficoSemana";
import GraficoEstoqueCritico from "./graficoEstoqueCritico";
import GraficoLinha from "./graficoLinha";
import { useContext, useEffect, useState } from "react";
import User from "../../models/User.model";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Layout from "../../components/layout/Layout/Layout";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import { AuthContext } from "../../context/AuthContext";





function CircularProgressEstoqueCriticoVermelho(props: CircularProgressProps) {
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[300],
                }}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"

                sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? '#FF1A3C' : '#FF1A3C'),
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </Box>
    );
}

function CircularProgressEstoqueCriticoAmarelo(props: CircularProgressProps) {
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[300],
                }}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? '#FFF11E' : '#FFF11E'),
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </Box>
    );
}



function Home() {
    let userData: User = new User();
    const [usuarioName, setUsuarioName] = useState<string | undefined>("");
    const [isGraphsLoading, setIsGraphsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const context = useContext(AuthContext);



    useEffect(() => {
        if (context?.isAuthenticated == false) {
            navigate("/");
        } else if (context?.user == null) {
            var usu = JSON.parse(localStorage.getItem("AppUsuario") || "null") as User;

            setUsuarioName(usu.nome);

        } else {
            setUsuarioName(context?.user?.nome);
        }

        //pega os dados do back
        const dataGraficoSemana = [30.15, 47.19, 45.10, 50.25, 49.50, 60.79, 32.01];
        const dataGraficoLinha = {
            name: "Camisa Polo GG",
            data: [10, 15, 12, 25, 50]

        }

        //  series: [{
        //     name: "Camisa Polo GG",
        //     data: [10,15,12,25,50]
        // }]

        // series: [
        //     {
        //         name: "Lucro",
        //         data: [30.15, 47.19, 45.10, 50.25, 49.50, 60.79, 32.01]
        //     }
        // ],

        GraficoSemanaOptions.series = [{
            name: "Lucro",
            data: dataGraficoSemana
        }];


        GraficoLinha.series = [{
            name: dataGraficoLinha.name,
            data: dataGraficoLinha.data
        }]


        setTimeout(function () {
            //your code to be executed after 1 second
            setIsGraphsLoading(false);
        }, 1500);



    });
    return (




        <Layout>

            <h2>Home</h2>
            {usuarioName && <h6>Seja Bem-vindo(a) {usuarioName} ! </h6>}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-lg-6 col-sm-12 py-2">
                        <Card raised={true} sx={{ height: 380 }}>

                            {!isGraphsLoading &&

                                <Chart
                                    options={GraficoSemanaOptions.options}
                                    series={GraficoSemanaOptions.series}
                                    type={GraficoSemanaOptions.type}
                                    width={"100%"}
                                    height={380}
                                />

                            }
                            {isGraphsLoading &&
                                <CardContent className="d-flex justify-content-center align-items-center" sx={{ height: 350 }}>
                                    <div className="">

                                        <div className="spinner-border avatar-sm text-primary m-2" role="status"></div>

                                    </div>
                                </CardContent>
                            }

                        </Card>

                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-12 py-2">

                        <Card raised={true} sx={{ height: 380 }} >
                            <div className="mt-2">
                                <h6 className="text-center " style={{ fontSize: "1.1rem" }}><strong> Crítico</strong></h6>
                            </div>
                            {!isGraphsLoading && <CardContent className="d-flex justify-content-center align-items-center">
                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                    <CircularProgressEstoqueCriticoVermelho variant="determinate" size={"20rem"} value={15} />
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <div className="row">
                                            <div className="col-12 text-center" >
                                                <strong>
                                                    15% Restando
                                                </strong>
                                            </div>
                                            <div className="col-12 text-center">
                                                <strong>
                                                    Camisa Polo GG
                                                </strong>
                                            </div>
                                            <div className="col-12 text-center">
                                                <strong>
                                                    10 UN
                                                </strong>
                                            </div>
                                        </div>

                                    </Box>
                                </Box>
                            </CardContent>}

                            {isGraphsLoading &&
                                <CardContent className="d-flex justify-content-center align-items-center" sx={{ height: 350 }}>
                                    <div className="">

                                        <div className="spinner-border avatar-sm text-primary m-2" role="status"></div>

                                    </div>
                                </CardContent>
                            }

                        </Card>
                    </div>

                    <div className="col-md-6 col-lg-6 col-sm-12 py-2">
                        <Card raised={true} sx={{ height: 380 }}>
                            {!isGraphsLoading && <Chart
                                options={GraficoLinha.options}
                                series={GraficoLinha.series}
                                type={GraficoLinha.type}
                                width={"100%"}
                                height={380}
                            />}
                            {isGraphsLoading &&
                                <CardContent className="d-flex justify-content-center align-items-center" sx={{ height: 350 }}>
                                    <div className="">

                                        <div className="spinner-border avatar-sm text-primary m-2" role="status"></div>

                                    </div>
                                </CardContent>
                            }
                        </Card>
                    </div>

                    <div className="col-md-6 col-lg-6 col-sm-12 py-2">
                        <Card raised={true} sx={{ height: 380 }}>
                            <div className="mt-2">
                                <h6 className="text-center"><strong>Atenção</strong></h6>
                            </div>
                            {!isGraphsLoading && <CardContent className="d-flex justify-content-center align-items-center">
                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                    <CircularProgressEstoqueCriticoAmarelo variant="determinate" size={"20rem"} value={45} />
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <div className="row">
                                            <div className="col-12 text-center" >
                                                <strong>
                                                    45% Restando
                                                </strong>
                                            </div>
                                            <div className="col-12 text-center">
                                                <strong>
                                                    JAQUETA JEANS
                                                </strong>
                                            </div>
                                            <div className="col-12 text-center">
                                                <strong>
                                                    47 UN
                                                </strong>
                                            </div>
                                        </div>

                                    </Box>
                                </Box>

                            </CardContent>}

                            {isGraphsLoading &&
                                <CardContent className="d-flex justify-content-center align-items-center" sx={{ height: 350 }}>
                                    <div className="">

                                        <div className="spinner-border avatar-sm text-primary m-2" role="status"></div>

                                    </div>
                                </CardContent>
                            }

                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home