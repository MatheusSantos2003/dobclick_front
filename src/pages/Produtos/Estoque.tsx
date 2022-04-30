import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { useState } from "react";
import { useForm } from "react-hook-form";

const EstoquePage = () => {

  //Data Table Options
  const [data, setData] = useState([
    {
      "codigo": "001",
      "descricao": "Bermuda Jeans",
      "tamanho": "M",
      "genero": "1",
      "cor": "Azul"
    }
  ]);
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
        filter: true,
        sort: true,
      }
    },
  ]

  var idsSelecionados: number[] = [];

  const options: MUIDataTableOptions = {
    filterType: 'checkbox',
    onRowSelectionChange: showSelected,
    count: 10,
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
  const handleClickOpen = () => {
    setopenModalAddProduto(true);
  };
  const handleClose = () => {
    setopenModalAddProduto(false);
  };



  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (values: any) => {
    setData([...data, {
      "codigo": values.codigo,
      "descricao": values.descricao,
      "tamanho": values.tamanho,
      "genero": values.genero,
      "cor": values.cor
    }]);
    reset();
  }





  return (
    <>

      <h2> Estoque </h2>

      <div className="row">
        <div className="col-md-12 p-3">
          <button className="btn btn-primary" onClick={handleClickOpen}> Adicionar Produto</button>
        </div>
      </div>

      <MUIDataTable
        title={"Lista De Produtos"}
        data={data}
        columns={columns}
        options={options}
      />
      <Dialog open={openModalAddProduto} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
        <DialogTitle sx={{ textAlign: "center" }}>Cadastrar Produtos</DialogTitle>
        <DialogContent>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6 mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Código</label>
                <input {...register("codigo")} type="text" placeholder="Código" className="form-control" id="exampleInputPassword1" />

              </div>
              <div className="col-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Descrição</label>
                <input {...register("descricao")} type="text" placeholder="Descrição" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
            </div>
            <div className="row">
              <div className="col-3 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Tamanho</label>
                <input {...register("tamanho")} type="text" className="form-control" placeholder="Tamanho" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="col-3 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Gênero</label>
                <select {...register("genero")} className="form-select" name="" id="">
                  <option value="0" ></option>
                  <option value="1">Masculino</option>
                  <option value="2">Feminino</option>
                  <option value="3">Sem Gênero</option>
                </select>
              </div>
              <div className="col-3 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Cor</label>
                <input {...register("cor")} type="text" className="form-control" placeholder="Cor" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="col-3 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Marca</label>
                <select {...register("marca")} className="form-select" name="" id="">
                  <option value="0" ></option>
                  <option value="1">Marca 1</option>
                  <option value="2">Marca 2</option>
                  <option value="3">Marca 3</option>
                </select>
              </div>

            </div>
            <div className="row">
              <div className="col-2 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Estoque</label>
                <input {...register("estoque")} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="col-8 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Fornecedor</label>
                <select {...register("fornecedor")} className="form-select" name="" id="">
                  <option value="0"></option>
                  <option value="1">Fornecedor 1</option>
                  <option value="2">Fornecedor 2</option>
                  <option value="3">Fornecedor 3</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-end">
              <button className="btn btn-danger mx-1" onClick={handleClose}>Cancelar</button>
              <button className="btn btn-success mx-1" placeholder="" onClick={handleClose}> Criar Produto </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

    </>
  )


}

export default EstoquePage;