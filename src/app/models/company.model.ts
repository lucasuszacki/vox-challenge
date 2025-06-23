export interface CompanyRequest {
  id?: number;
  solicitante: Applicant;
  empresa: Company;
}

export interface Applicant {
  ds_responsavel: string;
  nu_cpf: string;
  date_nascimento: string;
}

export interface Company {
  ds_nome_fantasia: string;
  co_entidade_registro: number;
  endereco: Address;
}

export interface Address {
  co_cep: number;
  ds_logradouro: string;
  ds_bairro: string;
  ds_complemento?: string;
  ds_municipio: string;
  co_uf: string;
  co_numero: string;
}
