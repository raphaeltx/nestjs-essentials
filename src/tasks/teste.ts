export class Usuario {
  nome: string;
  idade: Number;
  ativo: boolean;
  endereco: Endereco;
}

export class Endereco {
  logradouro: string;
  complemento: string;
  cep: string;
  cidade: string;
  estado: string;
}

let usuario = new Usuario();

usuario.nome = 'Raphael';
usuario.idade = 30;
usuario.ativo = true;
usuario.endereco = new Endereco();

usuario.endereco.cep = '72120055';
usuario.endereco.logradouro = 'praça do bicalho';
usuario.endereco.complemento = 'rua 7';
usuario.endereco.cidade = 'Taguatinga Norte';
usuario.endereco.estado = 'DF';
