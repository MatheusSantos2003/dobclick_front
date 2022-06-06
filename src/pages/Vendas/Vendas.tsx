import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState, useContext } from "react";
import Layout from "../../components/layout/Layout/Layout"
import Venda from "../../models/Venda.model";
import Preloader from "../../components/preloader/Preloader";
import User from "../../models/User.model";
import { AuthContext } from "../../context/AuthContext";


import { Produto } from "../../models/Produto.model";
const apiURL = import.meta.env.VITE_APIURL;
import { ResponseModel } from "../../models/Response.model";
import axios from "axios";

const Vendas = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [openModalAddVenda, setopenModalAddVenda] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [vendas, setVenda] = useState<Venda[]>([]);
  const [produtos, setProdutos] = useState<Produto[] | null>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  var idsSelecionados: number[] = [];
  let userData: User | null = new User();

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
    userData = context.user;
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




  }
  // useEffect(() => {
  //   if (ProdutoEditing?.Id != 0 && ProdutoEditing?.Id != null) {
  //     setopenModalEditProduto(true);

  //   }
  // }, [ProdutoEditing])

  const onSubmit = async (values: any) => {
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


  var columns = [
    {
      name: "Id",
      label: "Id",
      options: {
        display: false,
        filter: false,
        sort: false,
      }
    },
    {
      name: "Produto",
      label: "Produto",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "Quantidade",
      label: "Quantidade",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "Cliente",
      label: "Cliente",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "DataVenda",
      label: "Data da Venda",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "Valor Total",
      label: "Valor Total",
      options: {
        filter: true,
        sort: true,
      }
    }
  ]


  const options: MUIDataTableOptions = {
    filterType: 'checkbox',
    onRowClick: ((rowdata, rowmeta) => {
      setIsPageLoading(true);
      //   selecionarProduto(Number(rowdata[0]));

    }),
    onRowsDelete: ((rowsDeleted, newTableData) => {
      //   var listaIndices: number[] = [];

      //   rowsDeleted.data.map((values) => {
      //     listaIndices.push(values.index);
      //   });

      //   var listaIds: any[] = [];

      //   listaIndices.map((indice) => {
      //     listaIds?.push(produtos[indice].Id);
      //   });


      //   exlcuirProduto(listaIds);
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
      <h2>Vendas</h2>

      <div className="row">
        <div className="col-md-12 p-3">
          <button className="btn btn-primary" onClick={handleClickOpen}> Registrar Venda</button>
        </div>
      </div>

      <MUIDataTable
        title={"Vendas"}
        data={vendas}
        columns={columns}
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
                <div className="col-6 mb-3">
                  <input type="hidden" value={userData?.Id} {...register("usuarioId")} />
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label"
                  >Produto
                  </label>
                  <select
                    {...register("produto", { required: { value: true, message: "Campo Necessário!" } })}
                    className={`form-select ${errors.produto?.message != null ? "is-invalid" : ""}`}>
                    <option key={''} value=''></option>
                    {produtos?.map((prod) => {
                      <option key={prod.Id} value={prod.Id}>{prod.descricao} - {prod.tamanho} - {prod.cor} - {prod.genero} </option>
                    })
                    }
                  </select>
                  {errors.codigo && <p className="text-danger">{errors.codigo.message}</p>}
                </div>
              </div>
            </form>}


        </DialogContent>
      </Dialog>



    </Layout>
  )



}



export default Vendas