export default class Compra {
    Id?: number;
    dataCompra?: Date;
    pagamentoEfetuado?: boolean;
    formaPagamento?: number;
    valorTotal?: number;
    valorCompra?: number;
    fornecedor?: string;
    fornecedorContato?: string;
    quantidade?: number;
}