export class Produto {
    Id?: number;
    codigo?: string;
    descricao?: string;
    tamanho?: string;
    genero?: string;
    marca?: string;
    cor?: string;
    estoque?: number;
    fornecedorId?:number;
    usuarioId?: number;
    precoDisplay?: string;
    preco?: number;
    label?: string;

    constructor(){
        this.Id = 0;
        this.codigo = "";
    }
}

export enum GeneroEnum {
    MASCULINO = 0,
    FEMININO = 1,
    SEM_GENERO = 2
}