import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Preloader from "../../components/preloader/Preloader";
import { useFetch } from "../../hooks/useFetch";
import { HttpRequestType } from "../../models/HttpRequest.model";
import { Produto } from "../../models/Produto.model";
import axios from "axios";
import { ResponseModel } from "../../models/Response.model";
import { toast, ToastContainer } from "react-toastify";


const EstoquePage = () => {
  const apiURL = import.meta.env.VITE_APIURL;

  //Data Table Options
  const [produtos, setProdutos] = useState<Produto[]>([]);
  var columns = [
    {
      name: "codigo",
      label: "Código",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "descricao",
      label: "Descrição",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "tamanho",
      label: "Tamanho",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "cor",
      label: "Cor",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "genero",
      label: "Gênero",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "estoque",
      label: "Estoque",
      options: {
        filter: false,
        sort: false,
      }
    },
  ]

  var idsSelecionados: number[] = [];

  const options: MUIDataTableOptions = {
    filterType: 'checkbox',
    onRowSelectionChange: showSelected,
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

  function showSelected(currentRowsSelected: any[], allRowsSelected: any[], rowsSelected?: any[]): void {
    console.log("currentRowsSelected :");
    console.log(currentRowsSelected)
    console.log("allRowsSelected:");
    console.log(allRowsSelected);
    console.log("rowsSelected: ");
    console.log(allRowsSelected);
  }

  //  /DataTableOptions


  const [openModalAddProduto, setopenModalAddProduto] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const handleClickOpen = () => {
    setopenModalAddProduto(true);
  };

  const handleClose = () => {
    reset();
    setopenModalAddProduto(false);
  };


  const ModalAddProdutoCancelar = () => {
    reset();
    setopenModalAddProduto(false);
  }


  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const onSubmit = async (values: Produto) => {
    setisLoading(true);
    // const {data,isFetching} =  await useFetch<Produto[]>('/produtos/cadastrar',HttpRequestType.POST,values);

    await axios.post<ResponseModel<Produto[]>>(apiURL + '/produtos/cadastrar', {
      data: values, validateStatus: function (status: number) {
        return status < 500;
      }
    })
      .then(async (response) => {
        setisLoading(false);
        if (response.data.success) {
        
          toast.success(response.data.message ? response.data.message : "Sucesso!" , {
            type:"success",
            theme: "colored",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          handleClose();
          listarProdutos();
        } else {
          toast.error(response.data.message, {
            type:"error",
            theme: "colored",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setisLoading(false);
        }


      }).catch((error: ResponseModel<any>) => {
        console.log(error.message);
        setisLoading(false);
      });

  }

  const listarProdutos = async () => {

    await axios.get<ResponseModel<Produto[]>>(apiURL + '/produtos')
      .then((response) => {
        var novalista: Produto[] = [];
        response.data.data?.map((prod) => {
          novalista.push(prod);
        })
        setisLoading(false);
        setIsPageLoading(false);
        setProdutos(novalista);
        handleClose();
        reset();
      }).catch((error) => {
        console.log(error);
        setisLoading(false);
      });


  }

  useEffect(() => {
    setisLoading(true);
    setIsPageLoading(true);
    listarProdutos();
  }, []);


  return (
    <>
      {isPageLoading && <Preloader />}
      <h2> Estoque </h2>
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
      <div className="row">
        <div className="col-md-12 p-3">
          <button className="btn btn-primary" onClick={handleClickOpen}> Adicionar Produto</button>
        </div>
      </div>

      <MUIDataTable
        title={"Lista De Produtos"}
        data={produtos}
        columns={columns}
        options={options}
      />





      {/* Modal de Adicionar Produto */}
      <Dialog open={openModalAddProduto} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
        {!isLoading &&
          <DialogTitle sx={{ textAlign: "center" }}>Cadastrar Produtos</DialogTitle>
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
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label"
                  >Código
                  </label>
                  <input
                    {...register("codigo", { required: { value: true, message: "Campo Necessário!" } })}
                    type="text"
                    placeholder="Código"
                    className={`form-control ${errors.codigo?.message != null ? "is-invalid" : ""}`}
                    id="exampleInputPassword1" />
                  {errors.codigo && <p className="text-danger">{errors.codigo.message}</p>}
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Descrição</label>
                  <input {...register("descricao", { required: { value: true, message: "Campo Necessário!" } })}
                    type="text"
                    placeholder="Descrição"
                    className={`form-control ${errors.descricao?.message != null ? "is-invalid" : ""}`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp" />
                  {errors.descricao && <p className="text-danger">{errors.descricao?.message}</p>}
                </div>
              </div>
              <div className="row">
                <div className="col-3 mb-3">
                  <label htmlFor="exampleInputEmail1"
                    className="form-label">Tamanho
                  </label>
                  <input
                    {...register("tamanho", { required: { value: true, message: "Campo Necessário!" } })}
                    type="text"

                    className={`form-control ${errors.tamanho?.message != null ? "is-invalid" : ""}`}
                    placeholder="Tamanho"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp" />
                </div>
                <div className="col-3 mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Gênero</label>
                  <select
                    {...register("genero", { required: { value: true, message: "Campo Necessário!" } })}
                    className={`form-select ${errors.genero?.message != null ? "is-invalid" : ""}`}
                  >
                    <option value=""  ></option>
                    <option value="1">Masculino</option>
                    <option value="2">Feminino</option>
                    <option value="3">Sem Gênero</option>
                  </select>
                  {errors.genero && <p className="text-danger">{errors.genero?.message}</p>}
                </div>
                <div className="col-3 mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label">
                    Cor
                  </label>
                  <input
                    {...register("cor", { required: { value: true, message: "Campo Necessário!" } })}
                    type="text"
                    className={`form-control ${errors.cor?.message != null ? "is-invalid" : ""}`}
                    placeholder="Cor"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp" />
                </div>
                <div className="col-3 mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label">
                    Marca
                  </label>
                  <select
                    {...register("marca", { required: { value: true, message: "Campo Necessário!" } })}
                    className={`form-select ${errors.marca?.message != null ? "is-invalid" : ""}`}
                  >
                    <option key={''} value=''></option>
                    <option key={1} value={1}>Marca 1</option>
                    <option key={2} value={2}>Marca 3</option>
                    <option key={3} value={3}>Marca 2</option>
                  </select>

                </div>

              </div>
              <div className="row">
                <div className="col-2 mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label">
                    Estoque
                  </label>
                  <input
                    {...register("estoque", { required: { value: true, message: "Campo Necessário!" } })}
                    type="number"
                    className={`form-control ${errors.estoque?.message != null ? "is-invalid" : ""}`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp" />
                </div>
                <div className="col-8 mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Fornecedor</label>
                  <select
                    {...register("fornecedor", { required: { value: true, message: "Campo Necessário!" } })}
                    className={`form-select ${errors.fornecedor?.message != null ? "is-invalid" : ""}`}>
                    <option key={''} value=''></option>
                    <option key={1} value={1}>Fornecedor 1</option>
                    <option key={2} value={2}>Fornecedor 2</option>
                    <option key={3} value={3}>Fornecedor 3</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-end">
                <button className="btn btn-danger mx-1" type="button" onClick={ModalAddProdutoCancelar}>Cancelar</button>
                <button className="btn btn-success mx-1" placeholder="" type="submit"> Criar Produto </button>
              </div>
            </form>}


        </DialogContent>
      </Dialog>

    </>
  )


}

export default EstoquePage;