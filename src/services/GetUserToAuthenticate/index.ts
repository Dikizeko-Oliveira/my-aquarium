import api from "../api";

export interface UserToAuthenticate{
  id: string;
  email: string;
  name: string;
  cellphone_number: string;
}

export interface CreateUserProps {
  name: string,
  email: string,
  birthdate: string,
  cpf?: string,
  document: string,
  country: string,
  cellphone_number: string,
  address_city: string,
  address_uf?: string,
  password?: string,
  password_confirmation?: string
}

export async function GetUserToAuthenticate(document: string): Promise<UserToAuthenticate>{
  const response = await api.get<UserToAuthenticate>(`users/document/${document}`);
  
  return response.data
}

export async function ConfirmAccountService(token: string): Promise<void>{
  await api.post('users/account/confirmation', {
    token: token.toString(),
  });
}

export async function CreateAccountService(data: CreateUserProps): Promise<CreateUserProps>{
  const response = await api.post('users', {
   ...data,
  });
  
  return response.data;
}
