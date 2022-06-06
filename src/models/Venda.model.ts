export default class Venda {

    constructor(usuarioId: number, DataVenda: Date, pagamentoEfetuado: boolean, formaPagamento: FormaPagamentoEnum, valorTotal: number) {
        this.usuarioId = usuarioId;
        this.DataVenda = DataVenda;
        this.pagamentoEfetuado = pagamentoEfetuado;
        this.formaPagamento = formaPagamento;
        this.valorTotal = valorTotal;
    }

    usuarioId: number;
    produto?: string;
    produtoId?: number;
    Cliente?: string;
    clienteId?: number
    DataVenda: Date;
    pagamentoEfetuado: boolean;
    formaPagamento: FormaPagamentoEnum;
    valorTotal: number;

}

export enum FormaPagamentoEnum {
    DINHEIRO = 0,
    CREDITO,
    DEBITO,
    CHEQUE
}