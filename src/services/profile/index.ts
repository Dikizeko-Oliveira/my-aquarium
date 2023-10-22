import api from "../api";

export interface ProfileProps{
  id: string;
  name: string;
  birthdate: Date;
  email: string;
  document: string;
  cellphone_number: string;
  address_city: string;
  address_uf: string;
  cpf: string;
  ocupation: string;
  country: string;
  avatar_url: string;
}

export interface AccounDataProps{

}

export async function GetUserProfile(): Promise<ProfileProps>{
  const response = await api.get<ProfileProps>('users/profile');
  
  return response.data
}

export async function GetAccounData(id:string): Promise<AccounDataProps>{
  const response = await api.get<AccounDataProps>(`account/id/${id}`);
  
  return response.data
}