export default class Venda {

    constructor(
        Id: number, usuarioId: number, DataVenda: Date, pagamentoEfetuado: boolean, formaPagamento: FormaPagamentoEnum, valorTotal: number, produto: string, produtoId: number, cliente: string, clienteId: number) {
        this.Id = Id;
        this.usuarioId = usuarioId;
        this.produto = produto;
        this.produtoId = produtoId;
        this.Cliente = cliente;
        this.clienteId = clienteId;
        this.DataVenda = DataVenda;
        this.pagamentoEfetuado = pagamentoEfetuado;
        this.formaPagamento = formaPagamento;
        this.valorTotal = valorTotal;
        this.valorTotalDisplay = '';
        this.formaPagamentoDisplay = FormaPagamentoEnum[this.formaPagamento];
    }

    Id: number;
    usuarioId: number;
    produto: string;
    produtoId: number;
    Cliente: string;
    clienteId: number
    DataVenda: Date;
    pagamentoEfetuado: boolean;
    formaPagamento: FormaPagamentoEnum;
    formaPagamentoDisplay: string;
    valorTotal: number;
    valorTotalDisplay: string;

}

export enum FormaPagamentoEnum {
    DINHEIRO = 0,
    CREDITO = 1,
    DEBITO = 2,
    CHEQUE = 3
}