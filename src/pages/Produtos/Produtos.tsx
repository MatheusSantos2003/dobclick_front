import MUIDataTable, {MUIDataTableOptions} from "mui-datatables";

const ProdutosPage = () => {

    var idsSelecionados: number[] = [];


    const columns = ["Nome", "Quantidade","Tamanho"];

    const data = [
        ["Camisa", 10, "GG"],
        [ "Camisa2",48, "M"],
        [ "Calça Jeans Skinny",125, "M"],
        [ "Camisa Polo",100, "42"],
    ];

    const options: MUIDataTableOptions = {
        filterType: 'checkbox',
        onRowSelectionChange: showSelected,
        count:10,
        rowsSelected:idsSelecionados,
        print: false,
        download:false,
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
              text: "Coluna(s) selecionada",
              delete: "Deletar",
              deleteAria: "Deletar linhas selecionadas",
            },
          }
    };

    function showSelected(currentRowsSelected: any[], allRowsSelected: any[], rowsSelected?: any[]) : void{
        console.log(rowsSelected)

        // if(allRowsSelected.length == 0){
        //     if(!idsSelecionados.includes(currentRowsSelected[0].index)){
        //         idsSelecionados.push(currentRowsSelected[0].index);
        //     }else{
        //         let index = idsSelecionados.indexOf(currentRowsSelected[0].index)
        //         idsSelecionados.splice(index,1);
        //     }
        // }else{
           
        // }

       
        // console.log(idsSelecionados);
    }

    return (
        <>

            <h2> Produtos </h2>


        
                <MUIDataTable
                    title={"Employee List"}
                    data={data}
                    columns={columns}
                    options={options}
                />
          
        </>
    )


}

export default ProdutosPage;