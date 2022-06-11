import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { Autocomplete, Box, Card, Dialog, DialogContent, DialogTitle, MenuItem, Select, SelectChangeEvent, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState, useContext } from "react";
import Layout from "../../components/layout/Layout/Layout"
import Venda from "../../models/Venda.model";
import Preloader from "../../components/preloader/Preloader";
import User from "../../models/User.model";

import { AuthContext } from "../../context/AuthContext";
import { VendasColumns } from './VendasColumns';



import { Produto } from "../../models/Produto.model";
const apiURL = import.meta.env.VITE_APIURL;
import { ResponseModel } from "../../models/Response.model";
import axios from "axios";
import CurrencyInput from "react-currency-input-field";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Vendas = () => {

  const [isPageLoading, setIsPageLoading] = useState(false);
  const [openModalAddVenda, setopenModalAddVenda] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [vendas, setVenda] = useState<Venda[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [value, setValue] = useState(0);


  const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  var idsSelecionados: number[] = [];
  let userData: User | null = new User();

  var column = VendasColumns;

  const context = useContext(AuthContext);

  const handleClickOpen = () => {
    setopenModalAddVenda(true);
  };

  const ModalAddProdutoCancelar = () => {
    reset();
    setopenModalAddVenda(false);
  }
  const handleClose = () => {
    reset();
    setopenModalAddVenda(false);
  };

  useEffect(() => {
    userData = JSON.parse(localStorage.getItem("AppUsuario") || "null") as User;
    setisLoading(false);
    setIsPageLoading(true);
    getProdutos();
    var teste = 123;



  }, []);


  const getProdutos = async () => {
    var listaProdutos: Produto[] | null = [];
    if (userData?.Id == undefined) {

    } else {
      await axios.post<ResponseModel<Produto[]>>(apiURL + "/produtos/listar", { "id": userData?.Id })
        .then((response) => {
          var novalista: Produto[] = [];
          response.data.data?.map((prod) => {
            novalista.push(prod);
          })

          listaProdutos = novalista;
        }).catch((error) => {
          console.log(error);

        });
    }
    setProdutos(listaProdutos);

  }
  // useEffect(() => {
  //   if (ProdutoEditing?.Id != 0 && ProdutoEditing?.Id != null) {
  //     setopenModalEditProduto(true);

  //   }
  // }, [ProdutoEditing])



  const onSubmit = (values: any) => {
    console.log(values);
    // if (userData?.Id == undefined) {
    //   userData = JSON.parse(localStorage.getItem("AppUsuario") || "null") as User;
    // }
    // values.usuarioId = userData?.Id;
    // values.preco = _currencyService.Formatar(values?.precoDisplay as string);

    // await axios.post<ResponseModel<Produto[]>>(apiURL + '/produtos/cadastrar', {
    //   data: values, validateStatus: function (status: number) {
    //     return status < 500;
    //   }
    // })
    //   .then(async (response) => {
    //     setisLoading(false);
    //     if (response.data.success) {

    //       toast.success(response.data.message ? response.data.message : "Sucesso!", {
    //         type: "success",
    //         theme: "colored",
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       });
    //       handleClose();
    //       listarProdutos();
    //     } else {
    //       toast.error(response.data.message, {
    //         type: "error",
    //         theme: "colored",
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       });
    //       setisLoading(false);

    //     }


    //   }).catch((error: ResponseModel<any>) => {
    //     console.log(error.message);
    //     setisLoading(false);
    //     listarProdutos();
    //   });

  }

  const optionsSelect = produtos.map(function (prod: Produto) {
    prod.label = prod.codigo + " - " + prod.descricao + " - " + prod.cor + " - " + prod.genero + " - " + prod.marca;
    return prod;
    // return { Id: prod.Id, label: prod.codigo+" - "+prod.descricao+" - "+prod.cor+" - "+prod.genero+" - "+prod.marca };
  })

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }




  const options: MUIDataTableOptions = {
    filterType: 'checkbox',
    onRowClick: ((rowdata, rowmeta) => {
      setIsPageLoading(true);
    }),
    rowsSelected: idsSelecionados,
    print: false,
    download: false,
    textLabels: {
      body: {
        noMatch: "Desculpe, Nenhum Dado foi encontrado!",
        toolTip: "Filtrar",
        columnHeaderTooltip: column => `Ordenar por ${column.label}`
      },
      pagination: {
        next: "Próxima Pagina",
        previous: "Pagina Anterior",
        rowsPerPage: "Linhas por pagina:",
        displayRows: "De",
      },
      toolbar: {
        search: "Pesquisar",
        downloadCsv: "Download do CSV",
        print: "Imprimir",
        viewColumns: "Ver Colunas",
        filterTable: "Filtrar Tabela",
      },
      filter: {
        all: "TUDO",
        title: "FILTROS",
        reset: "REINICIAR",
      },
      viewColumns: {
        title: "Mostrar Colunas",
        titleAria: "Mostrar/Esconder Colunas da Tabela",
      },
      selectedRows: {
        text: "Coluna(s) selecionada(s)",
        delete: "Deletar",
        deleteAria: "Deletar linhas selecionadas",
      },
    }
  };



  return (
    <Layout>
      <div className="">
        <Card>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleTabsChange} aria-label="basic tabs example">
                <Tab label="Vendas de Produtos" />
                <Tab label="Compras de Produtos" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div>
                <div className="row">
                  <div className="col-md-12 p-3">
                    <button className="btn btn-primary" onClick={handleClickOpen}> Registrar Venda</button>
                  </div>
                </div>

                <MUIDataTable
                  title={"Vendas"}
                  data={vendas}
                  columns={column}
                  options={options}
                />

                <Dialog open={openModalAddVenda} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
                  {!isLoading &&
                    <DialogTitle sx={{ textAlign: "center" }}>Registrar Venda</DialogTitle>
                  }
                  <DialogContent>
                    {isLoading &&
                      <div className="m-5 p-5">
                        <Preloader />
                      </div>
                    }
                    {!isLoading &&
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-12 mb-3">
                            <input type="hidden" value={userData?.Id} {...register("usuarioId")} />
                            <label
                              htmlFor="exampleInputPassword1"
                              className="form-label"
                            >Produto
                            </label>
                            <Autocomplete
                              onChange={(event: React.SyntheticEvent, value: any, reason: any, details: any) => {

                              }}
                              disablePortal
                              id="combo-box-demo"
                              options={optionsSelect}
                              renderInput={(params) => <TextField {...params} label="Produto" />}

                            />
                            {errors.produto && <p className="text-danger">{errors.produto?.message}</p>}

                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-4">
                            <label htmlFor="datavenda">Data de Venda</label>
                            <input
                              {...register("datavenda", { required: { value: true, message: "Campo Necessário!" } })}
                              type="date" className="form-control" name="datavenda" />
                          </div>
                          <div className="col-4">
                            <label htmlFor="quantidade">Quantidade</label>
                            <input
                              {...register("quantidade", { required: { value: true, message: "Campo Necessário!" } })}
                              type="number" step={1} className="form-control" name="quantidade" />
                          </div>
                          <div className="col-4">
                            <label htmlFor="quantidade">Forma Pagam.</label>
                            <select
                              {...register("formaPag", { required: { value: true, message: "Campo Necessário!" } })}
                            className="form-control"

                            >
                              <option key={''} value={0}></option>
                              <option key={1} value={1}>Dinheiro</option>
                              <option key={2} value={2}>Crédito</option>
                              <option key={3} value={3}>Débito</option>
                              <option key={4} value={4}>Cheque</option>


                            </select>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col 4">
                            <label htmlFor="precoDisplay">Cliente</label>
                            <input
                              {...register("cliente", { required: { value: true, message: "Campo Necessário!" } })}
                              className="form-control" type="text" />
                          </div>
                          <div className="col 4">
                            <label htmlFor="precoDisplay">Tel. Cliente</label>
                            <input
                              {...register("contatoCliente", { required: { value: true, message: "Campo Necessário!" } })}
                              className="form-control" type="text" />
                          </div>
                          <div className="col-4">
                            <label htmlFor="precoDisplay">Valor Total</label>
                            <CurrencyInput
                              id="input-example"
                              decimalSeparator=","
                              groupSeparator=""
                              placeholder="R$ 0.00"
                              intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                              {...register("precoDisplay", { required: { value: true, message: "Campo Necessário!" } })}
                              className={`form-control ${errors.precoDisplay?.message != null ? "is-invalid" : ""}`}
                            >
                            </CurrencyInput>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end align-items-end">
                          <button className="btn btn-danger mx-1" type="button" onClick={ModalAddProdutoCancelar}>Cancelar</button>
                          <button className="btn btn-success mx-1" placeholder="" type="submit">Registrar Venda </button>
                        </div>
                      </form>}
                  </DialogContent>
                </Dialog>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>

          </Box>
        </Card>

      </div>

    </Layout>
  );



}



export default Vendas