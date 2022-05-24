import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { useState } from "react";
import Layout from "../../components/layout/Layout/Layout"
import Venda from "../../models/Venda.model";

const Vendas = () =>{
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [produtos, setProdutos] = useState<Venda[]>([]);
    var idsSelecionados: number[] = [];

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
          name: "marca",
          label: "Marca",
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




    return(
        <Layout>
        <h2>Vendas</h2>

        
        <MUIDataTable
        title={"Vendas"}
        data={produtos}
        columns={columns}
        options={options}
        />

        </Layout>
    )

}



export default Vendas