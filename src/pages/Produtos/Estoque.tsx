import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { useState } from "react";

const EstoquePage = () => {

  var idsSelecionados: number[] = [];


  const columns = ["Nome", "Quantidade", "Tamanho"];

  const data = [
    ["Camisa", 10, "GG"],
    ["Camisa2", 48, "M"],
    ["Calça Jeans Skinny", 125, "M"],
    ["Camisa Polo", 100, "42"],
  ];

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
    console.log(allRowsSelected)


  }

  const [openModalAddProduto, setopenModalAddProduto] = useState(false);

  const handleClickOpen = () => {
    setopenModalAddProduto(true);
  };

  const handleClose = () => {
    setopenModalAddProduto(false);
  };


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
        <DialogTitle align={"center"}>Cadastrar Produtos</DialogTitle>
        <DialogContent>

          <form>
            <div className="row">
              <div className="col-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Descrição</label>
                <input type="email" placeholder="Descrição" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

              </div>
              <div className="col-6 mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Código</label>
                <input type="password" placeholder="Código" className="form-control" id="exampleInputPassword1" />
              </div>
            </div>
            <div className="row">
              <div className="col-3 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Tamanho</label>
                <input type="email" className="form-control" placeholder="Tamanho" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="col-3 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Gênero</label>
                <select className="form-select" name="" id="">
                  <option value="0" selected></option>
                  <option value="1">Masculino</option>
                  <option value="2">Feminino</option>
                  <option value="3">Sem Gênero</option>
                </select>
              </div>
              <div className="col-3 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Cor</label>
                <input type="email" className="form-control" placeholder="Cor" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="col-3 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Marca</label>
                <select className="form-select" name="" id="">
                  <option value="0" selected></option>
                  <option value="1">Marca 1</option>
                  <option value="2">Marca 2</option>
                  <option value="3">Marca 3</option>
                </select>
              </div>
       
            </div>
            <div className="row">
              <div className="col-2 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Estoque</label>
                <input type="number" className="form-control" value={0} id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="col-8 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Fornecedor</label>
                <select className="form-select" name="" id="">
                  <option value="0" selected></option>
                  <option value="1">Fornecedor 1</option>
                  <option value="2">Fornecedor 2</option>
                  <option value="3">Fornecedor 3</option>
                </select>
              </div>
            </div>




          </form>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-danger" onClick={handleClose}>Cancelar</button>
          <button className="btn btn-success" onClick={handleClose}>Criar Produto</button>
        </DialogActions>
      </Dialog>

    </>
  )


}

export default EstoquePage;