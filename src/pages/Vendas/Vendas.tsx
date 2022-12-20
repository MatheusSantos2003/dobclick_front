import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import {
  Autocomplete,
  Box, Card,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState, useContext } from "react";
import Layout from "../../components/layout/Layout/Layout"
import Venda, { FormaPagamentoEnum } from "../../models/Venda.model";
import Preloader from "../../components/preloader/Preloader";
import User from "../../models/User.model";
import './Vendas.css';
import { AuthContext } from "../../context/AuthContext";
import { VendasColumns } from './VendasColumns';
import { saveAs } from 'file-saver';


import { Produto } from "../../models/Produto.model";
const apiURL = import.meta.env.VITE_APIURL;
import { ResponseModel } from "../../models/Response.model";
import axios from "axios";
import CurrencyInput from "react-currency-input-field";
import CurrencyService from "../../services/CurrencyService";
import { toast, ToastContainer } from "react-toastify";
import Compra from "../../models/Compra.model";
import { ComprasColumns } from "./ComprasColumns";
import Cliente from "../../models/Cliente.model";
import Fornecedor from "../../models/Fornecedor.model";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Vendas = () => {

  const [isPageLoading, setIsPageLoading] = useState(false);

  const [isLoading, setisLoading] = useState(false);
  const [vendas, setVenda] = useState<Venda[]>([]);
  const [compras, setCompras] = useState<Compra[]>([]);
  const [value, setValue] = useState(0);
  const [quantidadeSelect, SetQuantidade] = useState<number>(0);

  const _currencyService = new CurrencyService();

  const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // const { register, handleSubmit, reset, formState: { errors } } = useForm();

  var idsSelecionados: number[] = [];
  let userDataState: User | null = new User();
  const [userData, setUserData] = useState(userDataState);

  const context = useContext(AuthContext);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("AppUsuario") || "null") as User);
    setisLoading(true);
    setIsPageLoading(true);

  }, []);

  useEffect(() => {
    if (userData.Id) {
      listarVendas().then(() => {
        listarCompras().then(() => {
          setisLoading(false);
        });
      });
    }
  }, [userData]);

  async function listarVendas() {
    await axios.post<ResponseModel<any[]>>(apiURL + "/vendas/listar", { "id": userData?.Id })
      .then(async (response) => {
        var novalista: Venda[] = [];


        if (response.data.data != null) {
          for await (const prod of response.data.data) {
            // let clienteFound = clientes.find((x) => x.Id === prod.clienteId)
            prod.formaPagamentoDisplay = FormaPagamentoEnum[prod.formaPagamento];
            novalista.push({ ...prod, "clienteDesc": prod.clienteDesc });
            // novalista.push(prod);
          }
        }

        // setisLoading(false);
        setIsPageLoading(false);
        setVenda(novalista);
        // reset();
      }).catch((error) => {
        console.log(error);
        setisLoading(false);
        setIsPageLoading(false);
      });
  }

  async function listarCompras() {
    await axios.post<ResponseModel<any[]>>(apiURL + "/compras/listar", { "usuarioId": userData?.Id })
      .then(async (response) => {
        var novalista: Compra[] = [];
        if (response.data.data != null) {
          for await (const prod of response.data.data) {
            // let fornecedorFound = fornecedores.find((x) => x.Id === prod.fornecedor.Id);

            novalista.push({ ...prod});
            // novalista.push(prod);
          }
        }

        // setisLoading(false);
        setIsPageLoading(false);
        setCompras(novalista);
        // console.log(novalista);

        // reset();
      }).catch((error) => {
        console.log(error);
        setisLoading(false);
        setIsPageLoading(false);
      });
  }

  // const handleProductChange = (prod: Produto) => {
  //   setProdutoSelect(prod);
  // }

  // const handleClienteChange = (cliente: Cliente) => {
  //   setCliente(cliente);
  // }

  // const handleFornecedor = (fornecedor: Fornecedor) => {
  //   setFornecedoresSelect(fornecedor);
  // }

  // useEffect(() => {
  //   if (ProdutoEditing?.Id != 0 && ProdutoEditing?.Id != null) {
  //     setopenModalEditProduto(true);

  //   }
  // }, [ProdutoEditing])

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
    onRowsDelete: ((rowsDeleted, newTableData) => {
      var listaIndices: number[] = [];

      rowsDeleted.data.map((values) => {
        listaIndices.push(values.index);
      });

      var listaIds: any[] = [];

      listaIndices.map((indice) => {
        listaIds?.push(vendas[indice].Id);
      });


      exlcuirVenda(listaIds);
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

  const optionsCompra: MUIDataTableOptions = {
    filterType: 'checkbox',
    onRowClick: ((rowdata, rowmeta) => {

    }),
    onRowsDelete: ((rowsDeleted, newTableData) => {
      var listaIndices: number[] = [];

      rowsDeleted.data.map((values) => {
        listaIndices.push(values.index);
      });

      var listaIds: any[] = [];

      listaIndices.map((indice) => {
        listaIds?.push(compras[indice].Id);
      });


      exlcuirCompras(listaIds);
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
        filterTable: "Filtrar Tabela"
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
      }
    }
  };

  function exlcuirCompras(listaIds: number[]) {
    setIsPageLoading(true);
    if (listaIds.length == 1) {
      excluirUnicaCompra(listaIds[0]);
    } else {
      excluirListasCompras(listaIds);
    }
  }

  function excluirUnicaCompra(id: number) {

    axios.delete<ResponseModel<any>>(apiURL + '/compras/delete', {
      data: { "id": id }
    }).then((response) => {

      if (response.data.success) {
        toast.success(response.data.message ? response.data.message : "Sucesso!", {
          type: "success",
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        listarCompras();
        setIsPageLoading(false);
      } else {
        toast.error(response.data.message, {
          type: "error",
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        listarCompras();
        setIsPageLoading(false);
      }

    }).catch((error) => {
      console.log(error);
      setIsPageLoading(false);
    });
  }

  function excluirListasCompras(listaids: number[]) {
    axios.delete<ResponseModel<any>>(apiURL + '/compras/deleteporLista', {
      data: { "listaids": listaids }
    }).then((response) => {

      if (response.data.success) {
        toast.success(response.data.message ? response.data.message : "Sucesso!", {
          type: "success",
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        listarCompras();
        setIsPageLoading(false);
      } else {
        toast.error(response.data.message, {
          type: "error",
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        listarCompras();
        setIsPageLoading(false);
      }
    }).catch((error) => {
      console.log(error);
      setIsPageLoading(false);
    });
  }


  function exlcuirVenda(listaIds: number[]) {
    setIsPageLoading(true);
    if (listaIds.length == 1) {
      excluirUnicaVenda(listaIds[0]);
    } else {
      exlcuirListasVendas(listaIds);
    }
  }

  function excluirUnicaVenda(id: number) {
    setIsPageLoading(true);

    axios.delete<ResponseModel<any>>(apiURL + '/vendas/delete', {
      data: { "id": id }
    }).then((response) => {

      if (response.data.success) {
        toast.success(response.data.message ? response.data.message : "Sucesso!", {
          type: "success",
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        listarVendas();
        setIsPageLoading(false);
      } else {
        toast.error(response.data.message, {
          type: "error",
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        listarVendas();
        setIsPageLoading(false);
      }

    }).catch((error) => {
      console.log(error);
      setIsPageLoading(false);
    });

  }

  function exlcuirListasVendas(listaids: number[]) {
    setisLoading(true);

    axios.delete<ResponseModel<any>>(apiURL + '/vendas/deleteporLista', {
      data: { "listaids": listaids }
    }).then((response) => {

      if (response.data.success) {
        toast.success(response.data.message ? response.data.message : "Sucesso!", {
          type: "success",
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        listarVendas();
        setIsPageLoading(false);
      } else {
        toast.error(response.data.message, {
          type: "error",
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        listarVendas();
        setIsPageLoading(false);
      }
    });
  }

  return (
    <Layout>
      <div className="">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Card>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleTabsChange} aria-label="basic tabs example">
                <Tab label="Vendas de Produtos" />
                <Tab label="Compras de Produtos" />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <VendasInterface vendas={vendas} column={VendasColumns} options={options} authUser={userData} isLoadingMain={isLoading} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ComprasInterface compras={compras} column={ComprasColumns} options={optionsCompra} authUser={userData} isLoadingMain={isLoading} />
            </TabPanel>
          </Box>
        </Card>
      </div>
    </Layout>
  );
}

const VendasInterface = (props: any) => {
  const [openModalAddVenda, setOpenModalAddVenda] = useState(false);
  const [totalBrutoValue, setTotalBruto] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User>(new User());

  const dataProdutos: Produto[] = [];
  const [produtos, setProdutos] = useState<any>({ loading: false, d: dataProdutos });
  const dataClientes: Cliente[] = [];
  const [clientes, setClientes] = useState<any>({ loading: false, d: dataClientes });

  const [dataInicial, setDataInicial] = useState<string>();
  const [dataFinal, setDataFinal] = useState<string>();

  const _currencyService = new CurrencyService();

  const { control, register, handleSubmit, reset, setValue: setValueControl, formState: { errors } } = useForm<{
    controls: {
      usuarioId: any,
      produtoId: any,
      datavenda: string,
      quantidade: string,
      formaPag: string,
      cliente: any,
      valorTotal: any,
      valorTotalDisplay: string
    }[];
  }>({
    defaultValues: {
      controls: [
        {
          usuarioId: null,
          produtoId: null,
          datavenda: '',
          quantidade: '',
          formaPag: '',
          cliente: null,
          valorTotal: null,
          valorTotalDisplay: ''
        }
      ],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "controls", // unique name for your Field Array
  });

  useEffect(() => {
    if (props.authUser.Id) {
      setUserData(props.authUser);
    }
  }, [props.authUser]);

  useEffect(() => {
    if (props.isLoadingMain) {
      setIsLoading(props.isLoadingMain);
    }
  }, [props.isLoadingMain]);

  const getProdutos = async () => {
    setProdutos((prev: any) => ({
      ...prev,
      loading: true
    }));

    var listaProdutos: Produto[] | null = [];
    await axios.post<ResponseModel<Produto[]>>(apiURL + "/produtos/listar", { "id": userData?.Id })
      .then((response) => {
        var novalista: Produto[] = [];
        response.data.data?.map((prod) => {
          novalista.push(prod);
        });

        listaProdutos = novalista;
      }).catch((error) => {
        console.log(error);
      });

    const withLabel = listaProdutos && listaProdutos.map(function (prod: Produto) {
      prod.label = prod.codigo + " - " + prod.descricao + " - " + prod.cor + " - " + prod.genero + " - " + prod.marca;
      return prod;
    });

    setProdutos((prev: any) => ({
      ...prev,
      loading: false,
      d: withLabel
    }));
  }

  const getClientes = async () => {
    setClientes((prev: any) => ({
      ...prev,
      loading: false
    }));

    var listaClientes: Cliente[] | null = [];
    await axios.get<ResponseModel<any[]>>(apiURL + "/usuarios/listar-clientes/" + userData.Id)
      .then((response) => {
        var novalista: any[] = [];
        response.data.data?.map((prod) => {
          novalista.push(prod);
        })

        listaClientes = novalista;
      }).catch((error) => {
        console.log(error);
      });

    const withLabel = listaClientes && listaClientes.map(function (cliente: Cliente) {
      cliente.label = cliente.nome + " - " + cliente.contato
      return cliente;
    });

    setClientes((prev: any) => ({
      ...prev,
      loading: false,
      d: withLabel
    }));
  }

  async function listarVendas() {
    await axios.post<ResponseModel<any[]>>(apiURL + "/vendas/listar", { "id": userData?.Id })
      .then(async (response) => {
        var novalista: Venda[] = [];


        if (response.data.data != null) {
          for await (const prod of response.data.data) {
            // let clienteFound = clientes.find((x) => x.Id === prod.clienteId)
            prod.formaPagamentoDisplay = FormaPagamentoEnum[prod.formaPagamento];
            novalista.push({ ...prod, "clienteDesc": prod.cliente.nome });
            // novalista.push(prod);
          }
        }

        // setisLoading(false);
        // setIsPageLoading(false);
        // setVenda(novalista);
        // reset();
      }).catch((error) => {
        // console.log(error);
        // setisLoading(false);
        // setIsPageLoading(false);
      });
  }

  const handleClickOpen = () => {
    setOpenModalAddVenda(!openModalAddVenda);
  };

  const ModalAddProdutoCancelar = () => {
    setTotalBruto(0);
    reset();
    setOpenModalAddVenda(false);
  }

  const removerProdutoCriar = (ev: any, index: number) => {
    ev.stopPropagation();
    fields.length == 1 ? '' : remove(index);
  }

  const handleReportGenerate = async (option: string) => {
    // setisLoading(true);
    // setIsPageLoading(true);
    // if (userData?.Id == undefined) {
    //   userData = JSON.parse(localStorage.getItem("AppUsuario") || "null") as User;
    // }
    let data = {
      "userId": userData.Id,
      "dataInicial": dataInicial,
      "dataFinal": dataFinal,
      "tipo": option
    }
    await axios.post(apiURL + "/relatorios/csv", data, { responseType: "blob", }).then((response) => {



      saveAs(response.data, 'report.csv');

      // setisLoading(false);
      // setIsPageLoading(false)
    }).catch((error) => {
      console.log(error);
      // setisLoading(false);
      // setIsPageLoading(false);
    });
  }

  const updateDataInicialValue = (evt: any) => {
    const val = evt.target.value;
    setDataInicial(val);
  }

  const updateDataFinalValue = (evt: any) => {
    const val = evt.target.value;
    setDataFinal(val);
  }

  const onSubmit = async (values: any) => {
    console.log(values);

    const array = [];

    for await (const cont of values.controls) {
      cont.usuarioId = userData?.Id as number;
      cont.valorTotal = _currencyService.Formatar(cont?.valorTotalDisplay as string);

      const data = { ...cont, "cliente": cont.cliente };

      array.push(data);
    }
    // setisLoading(true);

    // if (userData?.Id == null) {
    //   userData = JSON.parse(localStorage.getItem("AppUsuario") || "null") as User;
    // }

    // values.produtoId = ProdutoSelect.Id as number;

    if(array.length === 1){
      await axios.post<ResponseModel<Venda>>(apiURL + '/vendas/cadastrar', { data: array[0] })
      .then((response) => {

        if (response.data.success) {
          toast.success(response.data.message ? response.data.message : "Sucesso!", {
            type: "success",
            theme: "colored",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(response.data.message, {
            type: "error",
            theme: "colored",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        reset();
        // setProdutoSelect(new Produto());
        // setopenModalAddVenda(false)

      }).catch((error: ResponseModel<any>) => {
        console.log(error.message);
      }).finally(function () {
        // setisLoading(false);
        listarVendas();
      });


    }else if(array.length > 1){

      await axios.post<ResponseModel<Venda>>(apiURL + '/vendas/cadastrar-lista', { data: array })
      .then((response) => {

        if (response.data.success) {
          toast.success(response.data.message ? response.data.message : "Sucesso!", {
            type: "success",
            theme: "colored",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(response.data.message, {
            type: "error",
            theme: "colored",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        reset();
        listarVendas();
        // setProdutoSelect(new Produto());
        // setopenModalAddVenda(false)

      }).catch((error: ResponseModel<any>) => {
        console.log(error.message);
      })

    }

  }

  return (
    <>
      <div>
        <div className="mb-3">
          {!openModalAddVenda && (
            <button className="btn btn-primary" disabled={isLoading} onClick={() => {
              handleClickOpen();
              getProdutos();
              getClientes();
            }}> {isLoading ? 'Carregando dados...' : 'Registrar Venda'}</button>
          )
          }
          {openModalAddVenda && (
            <button className="btn btn-primary" disabled={isLoading} onClick={handleClickOpen}> Fechar</button>
          )}
        </div>

        {!isLoading && openModalAddVenda &&
          <form onSubmit={handleSubmit(onSubmit)} className="mb-3 p-4 border border-2">

            <div>
              {fields.map((item: any, index: any) => {
                var errorControls = errors.controls;
                // console.log(optionsSelect);



                return (
                  <Accordion key={item.id} defaultExpanded={true}>
                    <AccordionSummary
                      expandIcon={<FontAwesomeIcon icon={faChevronDown} size={'1x'} />}
                      aria-controls={`produto-${index}-content`}
                      id={`produto-${index}-header`}
                    >
                      <Typography>
                        <button
                          className="btn btn-danger mx-1"
                          type="button"
                          onClick={(ev) => removerProdutoCriar(ev, index)}
                        >
                          <FontAwesomeIcon icon={faMinus} size={'1x'} />
                        </button>
                        Produto - {index + 1}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <input type="hidden" value={userData?.Id} {...register(`controls.${index}.usuarioId`)} />
                          <label className="form-label">Produto</label>

                          <input type="hidden" value={userData?.Id} {...register(`controls.${index}.produtoId`, { required: { value: true, message: "Campo Necessário!" } })} />
                          <Autocomplete
                            options={produtos.d}
                            getOptionLabel={(option: any) => option.label}
                            isOptionEqualToValue={(option: any, value: any) => option.Id === value.Id}
                            onChange={(event: any, produto: Produto | any) => {
                              setValueControl(`controls.${index}.produtoId`, produto.Id, { shouldValidate: true });
                            }}
                            renderInput={(params) => <TextField {...params} label="Produto" />}
                          />
                          {errorControls && errorControls[index]?.produtoId &&
                            <p className="text-danger">{errorControls && errorControls[index]?.produtoId?.message}</p>
                          }
                        </div>
                        <div className="col-4 mb-3">
                          <label className="form-label">Data de Venda</label>
                          <input
                            {...register(`controls.${index}.datavenda`, { required: { value: true, message: "Campo Necessário!" } })}
                            type="date"
                            className={`form-control ${errorControls && errorControls[index]?.datavenda != null ? "is-invalid" : ""}`}
                          />
                          {errorControls && errorControls[index]?.datavenda &&
                            <p className="text-danger">{errorControls && errorControls[index]?.datavenda?.message}</p>
                          }
                        </div>
                        <div className="col-4 mb-3">
                          <label className="form-label">Quantidade</label>
                          <input
                            {...register(`controls.${index}.quantidade`, { required: { value: true, message: "Campo Necessário!" } })}
                            type="number"
                            step={1}
                            min={0}
                            className={`form-control ${errorControls && errorControls[index]?.quantidade != null ? "is-invalid" : ""}`}
                          />
                          {errorControls && errorControls[index]?.quantidade &&
                            <p className="text-danger">{errorControls && errorControls[index]?.quantidade?.message}</p>
                          }
                        </div>
                        <div className="col-4 mb-3">
                          <label className="form-label">Forma Pagam.</label>
                          <select
                            {...register(`controls.${index}.formaPag`, { required: { value: true, message: "Campo Necessário!" } })}
                            className={`form-control ${errorControls && errorControls[index]?.formaPag != null ? "is-invalid" : ""}`}
                          >
                            <option key={''} value={''}></option>
                            <option key={1} value={0}>Dinheiro</option>
                            <option key={2} value={1}>Crédito</option>
                            <option key={3} value={2}>Débito</option>
                            <option key={4} value={3}>Cheque</option>
                          </select>
                          {errorControls && errorControls[index]?.formaPag &&
                            <p className="text-danger">{errorControls && errorControls[index]?.formaPag?.message}</p>
                          }
                        </div>
                        <div className="col mb-3">
                          <label className="form-label">Cliente</label>

                          <input type="hidden" value={userData?.Id} {...register(`controls.${index}.cliente`, { required: { value: true, message: "Campo Necessário!" } })} />
                          <Autocomplete
                            options={clientes.d}
                            getOptionLabel={(option: any) => option.label}
                            isOptionEqualToValue={(option: any, value: any) => option.Id === value.Id}
                            onChange={(event: any, cliente: Cliente | any) => {
                              setValueControl(`controls.${index}.cliente`, cliente.Id, { shouldValidate: true });
                            }}
                            renderInput={(params) => <TextField {...params} label="Cliente" />}
                          />
                          {errorControls && errorControls[index]?.cliente &&
                            <p className="text-danger">{errorControls && errorControls[index]?.cliente?.message}</p>
                          }
                        </div>
                        <div className="col-4 mb-3">
                          <label className="form-label">Valor a ser Pago</label>
                          <CurrencyInput
                            decimalSeparator=","
                            groupSeparator=""
                            placeholder="R$ 0.00"
                            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                            {...register(`controls.${index}.valorTotalDisplay`, { required: { value: true, message: "Campo Necessário!" } })}
                            className={`form-control ${errorControls && errorControls[index]?.valorTotalDisplay != null ? "is-invalid" : ""}`}
                          />
                          {errorControls && errorControls[index]?.valorTotalDisplay &&
                            <p className="text-danger">{errorControls && errorControls[index]?.valorTotalDisplay?.message}</p>
                          }
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                )
              })}

              <div className="d-flex justify-content-between align-items-end" style={{
                position: 'sticky',
                bottom: '-24px',
                background: 'white',
                padding: '20px 24px',
                margin: '6px -20px 0 -24px'
              }}>
                <button className="btn btn-primary mx-1" type="button" onClick={() => append({
                  usuarioId: 0,
                  produtoId: '',
                  datavenda: '',
                  quantidade: '',
                  formaPag: '',
                  cliente: {},
                  valorTotal: '',
                  valorTotalDisplay: ''
                })}>Adicionar Produto</button>
                <div className="d-flex justify-content-end align-items-end">
                  <button className="btn btn-danger mx-1" type="button" onClick={ModalAddProdutoCancelar}>Cancelar</button>
                  <button className="btn btn-success mx-1" placeholder="" type="submit">Registrar Venda </button>
                </div>
              </div>
            </div>

          </form>
        }


        {props.vendas && props.column && props.options && (
          <MUIDataTable
            title={"Vendas"}
            data={props.vendas}
            columns={props.column}
            options={props.options}
          />
        )}
        <div className="row my-5">
          <div className="col-2">
            <label htmlFor="">Inicio</label>
            <input value={dataInicial} onChange={event => updateDataInicialValue(event)} className="form-control" type="date" placeholder="" />
          </div>
          <div className="col-2">
            <label htmlFor="">Final</label>
            <input value={dataFinal} onChange={event => updateDataFinalValue(event)} className="form-control" type="date" placeholder="" />
          </div>
          <div className="col-2">
            <button onClick={() => handleReportGenerate('venda')} className="relat">Gerar relatório</button>
          </div>
        </div>
      </div>

      {/* <button className="relat">Gerar relatório</button> */}
    </>
  )
}

const ComprasInterface = (props: any) => {
  const [openModalAddCompras, setOpenModalAddCompras] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User>(new User());

  const dataProdutos: Produto[] = [];
  const [produtos, setProdutos] = useState<any>({ loading: false, d: dataProdutos });

  const dataFornecedores: Produto[] = [];
  const [fornecedores, setFornecedores] = useState<any>({ loading: false, d: dataFornecedores });

  const [dataInicial, setDataInicial] = useState<string>();
  const [dataFinal, setDataFinal] = useState<string>();

  const _currencyService = new CurrencyService();


  const { control, register, handleSubmit, reset, setValue: setValueControl, formState: { errors } } = useForm<{
    controls: {
      usuarioId: any,
      produtoId: any,
      datacompra: string,
      quantidade: string,
      formaPag: string,
      fornecedor: any,
      valorTotal: any,
      valorTotalDisplay: string
    }[];
  }>({
    defaultValues: {
      controls: [
        {
          usuarioId: null,
          produtoId: null,
          datacompra: '',
          quantidade: '',
          formaPag: '',
          fornecedor: null,
          valorTotal: null,
          valorTotalDisplay: ''
        }
      ],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "controls", // unique name for your Field Array
  });

  const getProdutos = async () => {
    setProdutos((prev: any) => ({
      ...prev,
      loading: true
    }));

    var listaProdutos: Produto[] | null = [];
    await axios.post<ResponseModel<Produto[]>>(apiURL + "/produtos/listar", { "id": userData?.Id })
      .then((response) => {
        var novalista: Produto[] = [];
        response.data.data?.map((prod) => {
          novalista.push(prod);
        });

        listaProdutos = novalista;
      }).catch((error) => {
        console.log(error);
      });

    const withLabel = listaProdutos && listaProdutos.map(function (prod: Produto) {
      prod.label = prod.codigo + " - " + prod.descricao + " - " + prod.cor + " - " + prod.genero + " - " + prod.marca;
      return prod;
    });

    setProdutos((prev: any) => ({
      ...prev,
      loading: false,
      d: withLabel
    }));
  }

  const getFornecedores = async () => {
    setFornecedores((prev: any) => ({
      ...prev,
      loading: true
    }));

    var listaFornecedores: Fornecedor[] | null = [];
    await axios.get<ResponseModel<any[]>>(apiURL + "/usuarios/listar-fornecedor/" + userData.Id)
      .then((response) => {
        var novalista: any[] = [];
        response.data.data?.map((prod) => {
          novalista.push(prod);
        })

        listaFornecedores = novalista;
      }).catch((error) => {
        console.log(error);
      });

    const withLabel = listaFornecedores && listaFornecedores.map(function (prod: Fornecedor) {
      prod.label = prod.descricao + " - " + prod.contato;
      return prod;
    });

    setFornecedores((prev: any) => ({
      ...prev,
      loading: false,
      d: withLabel
    }));
  }

  useEffect(() => {
    if (props.authUser.Id) {
      setUserData(props.authUser);
    }
  }, [props.authUser]);

  useEffect(() => {
    if (props.isLoadingMain) {
      setIsLoading(props.isLoadingMain);
    }
  }, [props.isLoadingMain]);

  const handleClickOpen = () => {
    setOpenModalAddCompras(!openModalAddCompras);
  };

  const removerProdutoCriar = (ev: any, index: number) => {
    ev.stopPropagation();
    fields.length == 1 ? '' : remove(index);
  }

  const onSubmitCompras = async (values: any) => {
    console.log(values);
    let dataToSend = [];

    for await (const cont of values.controls) {
      cont.usuarioId = userData?.Id as number;
      cont.valorTotal = _currencyService.Formatar(cont?.valorTotalDisplay as string);

      dataToSend.push({ ...cont, "fornecedor": cont.fornecedor });

       
    }

    await axios.post<ResponseModel<any>>(apiURL + '/compras/cadastrar-lista', {
      data: dataToSend
    }).then((response) => {

      if (response.data.success) {
        toast.success(response.data.message ? response.data.message : "Sucesso!", {
          type: "success",
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // listarCompras();
        reset();
        // setProdutoSelect(new Produto());
        // setisLoading(false);
        setOpenModalAddCompras(false)
      } else {
        toast.error(response.data.message, {
          type: "error",
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // listarCompras();
        reset();
        // setProdutoSelect(new Produto());
        // setisLoading(false);
        setOpenModalAddCompras(false)
      }
    })
  .catch((error: ResponseModel<any>) => {
          console.log(error.message);
        }).finally(function () {
          // setisLoading(false);
          // listarVendas();
        });
    // setisLoading(true);

    // if (userData?.Id == null) {
    //   userData = JSON.parse(localStorage.getItem("AppUsuario") || "null") as User;
    // }

    // values.produtoId = ProdutoSelect.Id as number;

  }

  const handleReportGenerate = async (option: string) => {
    // setisLoading(true);
    // setIsPageLoading(true);
    // if (userData?.Id == undefined) {
    //   userData = JSON.parse(localStorage.getItem("AppUsuario") || "null") as User;
    // }
    let data = {
      "userId": userData.Id,
      "dataInicial": dataInicial,
      "dataFinal": dataFinal,
      "tipo": option
    }
    await axios.post(apiURL + "/relatorios/csv", data, { responseType: "blob", }).then((response) => {



      saveAs(response.data, 'report.csv');

      // setisLoading(false);
      // setIsPageLoading(false)
    }).catch((error) => {
      console.log(error);
      // setisLoading(false);
      // setIsPageLoading(false);
    });
  }

  const updateDataInicialValue = (evt: any) => {
    const val = evt.target.value;
    setDataInicial(val);
  }

  const updateDataFinalValue = (evt: any) => {
    const val = evt.target.value;
    setDataFinal(val);
  }

  return (
    <>
      <div>
        <div className="mb-3">
          {!openModalAddCompras && (
            <button className="btn btn-primary" disabled={isLoading} onClick={() => {
              handleClickOpen();
              getProdutos();
              getFornecedores();
            }}> {isLoading ? 'Carregando dados...' : 'Registrar Compra'}</button>
          )
          }
          {openModalAddCompras && (
            <button className="btn btn-primary" disabled={isLoading} onClick={handleClickOpen}> Fechar</button>
          )}
        </div>

        {!isLoading && openModalAddCompras &&
          <form onSubmit={handleSubmit(onSubmitCompras)} className="mb-3 p-4 border border-2">

            <div>
              {fields.map((item: any, index: any) => {
                var errorControls = errors.controls;
                // console.log(optionsSelect);



                return (
                  <Accordion key={item.id} defaultExpanded={true}>
                    <AccordionSummary
                      expandIcon={<FontAwesomeIcon icon={faChevronDown} size={'1x'} />}
                      aria-controls={`produto-${index}-content`}
                      id={`produto-${index}-header`}
                    >
                      <Typography>
                        <button
                          className="btn btn-danger mx-1"
                          type="button"
                          onClick={(ev) => removerProdutoCriar(ev, index)}
                        >
                          <FontAwesomeIcon icon={faMinus} size={'1x'} />
                        </button>
                        Produto - {index + 1}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <input type="hidden" value={userData?.Id} {...register(`controls.${index}.usuarioId`)} />
                          <label className="form-label">Produto</label>

                          <input type="hidden" value={userData?.Id} {...register(`controls.${index}.produtoId`, { required: { value: true, message: "Campo Necessário!" } })} />
                          <Autocomplete
                            options={produtos.d}
                            getOptionLabel={(option: any) => option.label}
                            isOptionEqualToValue={(option: any, value: any) => option.Id === value.Id}
                            onChange={(event: any, produto: Produto | any) => {
                              setValueControl(`controls.${index}.produtoId`, produto.Id, { shouldValidate: true });
                            }}
                            renderInput={(params) => <TextField {...params} label="Produto" />}
                          />
                          {errorControls && errorControls[index]?.produtoId &&
                            <p className="text-danger">{errorControls && errorControls[index]?.produtoId?.message}</p>
                          }
                        </div>
                        <div className="col-4 mb-3">
                          <label className="form-label">Data de Compra</label>
                          <input
                            {...register(`controls.${index}.datacompra`, { required: { value: true, message: "Campo Necessário!" } })}
                            type="date"
                            className={`form-control ${errorControls && errorControls[index]?.datacompra != null ? "is-invalid" : ""}`}
                          />
                          {errorControls && errorControls[index]?.datacompra &&
                            <p className="text-danger">{errorControls && errorControls[index]?.datacompra?.message}</p>
                          }
                        </div>
                        <div className="col-4 mb-3">
                          <label className="form-label">Quantidade</label>
                          <input
                            {...register(`controls.${index}.quantidade`, { required: { value: true, message: "Campo Necessário!" } })}
                            type="number"
                            step={1}
                            min={0}
                            className={`form-control ${errorControls && errorControls[index]?.quantidade != null ? "is-invalid" : ""}`}
                          />
                          {errorControls && errorControls[index]?.quantidade &&
                            <p className="text-danger">{errorControls && errorControls[index]?.quantidade?.message}</p>
                          }
                        </div>
                        <div className="col-4 mb-3">
                          <label className="form-label">Forma Pagam.</label>
                          <select
                            {...register(`controls.${index}.formaPag`, { required: { value: true, message: "Campo Necessário!" } })}
                            className={`form-control ${errorControls && errorControls[index]?.formaPag != null ? "is-invalid" : ""}`}
                          >
                            <option key={''} value={''}></option>
                            <option key={1} value={0}>Dinheiro</option>
                            <option key={2} value={1}>Crédito</option>
                            <option key={3} value={2}>Débito</option>
                            <option key={4} value={3}>Cheque</option>
                          </select>
                          {errorControls && errorControls[index]?.formaPag &&
                            <p className="text-danger">{errorControls && errorControls[index]?.formaPag?.message}</p>
                          }
                        </div>
                        <div className="col mb-3">
                          <label className="form-label">Fornecedor</label>

                          <input type="hidden" value={userData?.Id} {...register(`controls.${index}.fornecedor`, { required: { value: true, message: "Campo Necessário!" } })} />
                          <Autocomplete
                            options={fornecedores.d}
                            getOptionLabel={(option: any) => option.label}
                            isOptionEqualToValue={(option: any, value: any) => option.Id === value.Id}
                            onChange={(event: any, fornecedor: Fornecedor | any) => {
                              setValueControl(`controls.${index}.fornecedor`, fornecedor.Id, { shouldValidate: true });
                            }}
                            renderInput={(params) => <TextField {...params} label="Fornecedor" />}
                          />
                          {errorControls && errorControls[index]?.fornecedor &&
                            <p className="text-danger">{errorControls && errorControls[index]?.fornecedor?.message}</p>
                          }
                        </div>
                        <div className="col-4 mb-3">
                          <label className="form-label">Valor a ser Pago</label>
                          <CurrencyInput
                            decimalSeparator=","
                            groupSeparator=""
                            placeholder="R$ 0.00"
                            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                            {...register(`controls.${index}.valorTotalDisplay`, { required: { value: true, message: "Campo Necessário!" } })}
                            className={`form-control ${errorControls && errorControls[index]?.valorTotalDisplay != null ? "is-invalid" : ""}`}
                          />
                          {errorControls && errorControls[index]?.valorTotalDisplay &&
                            <p className="text-danger">{errorControls && errorControls[index]?.valorTotalDisplay?.message}</p>
                          }
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                )
              })}

              <div className="d-flex justify-content-between align-items-end" style={{
                position: 'sticky',
                bottom: '-24px',
                background: 'white',
                padding: '20px 24px',
                margin: '6px -20px 0 -24px'
              }}>
                <button className="btn btn-primary mx-1" type="button" onClick={() => append({
                  usuarioId: 0,
                  produtoId: '',
                  datacompra: '',
                  quantidade: '',
                  formaPag: '',
                  fornecedor: {},
                  valorTotal: '',
                  valorTotalDisplay: ''
                })}>Adicionar Produto</button>
                <div className="d-flex justify-content-end align-items-end">
                  <button className="btn btn-danger mx-1" type="button" onClick={handleClickOpen}>Cancelar</button>
                  <button className="btn btn-success mx-1" placeholder="" type="submit">Registrar Venda </button>
                </div>
              </div>
            </div>

          </form>
        }

        {props.compras && props.column && props.options && (
          <MUIDataTable
            title={"Compras"}
            data={props.compras}
            columns={props.column}
            options={props.options}
          />
        )}

        <div className="row my-5">
          <div className="col-2">
            <label htmlFor="">Inicio</label>
            <input value={dataInicial} onChange={event => updateDataInicialValue(event)} className="form-control" type="date" placeholder="" />
          </div>
          <div className="col-2">
            <label htmlFor="">Final</label>
            <input value={dataFinal} onChange={event => updateDataFinalValue(event)} className="form-control" type="date" placeholder="" />
          </div>
          <div className="col-2">
            <button onClick={() => handleReportGenerate('compra')} className="relat">Gerar relatório</button>
          </div>
        </div>
      </div>

      {/* <button className="relat">Gerar relatório</button> */}
    </>
  )
}


export default Vendas