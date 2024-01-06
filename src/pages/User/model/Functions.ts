import { enqueueSnackbar } from "notistack";
import axios from "../../../utils/axios";
import { UserType } from "./Types";

/* Get List */
export const GetUserList = async (): Promise<UserType[]> => {
  try {
    const response = await axios.get('/user/list');

    return response.data.data;
  } 
  catch (error: any) {
    if (error.response && error.response.status <= 500) {
      enqueueSnackbar(error.response.data.message, { variant: 'warning' });
    } 
    else {
      enqueueSnackbar("Terjadi kesalahan pada server", { variant: 'error' });
    }
    return [];
  }
};

/* Create */
export const CreateUser = async (payload: UserType): Promise<UserType | null> => {
  try {
    const response = await axios.post('/user/create', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    enqueueSnackbar("User created successfully!", { variant: 'success' });
    return response.data.data;
  } 
  catch (error: any) {
    if (error.response && error.response.status <= 500) {
      enqueueSnackbar(error.response.data.message, { variant: 'warning' });
    } 
    else {
      enqueueSnackbar("Terjadi kesalahan pada server", { variant: 'error' });
    }
    return null;
  }
};

/* Update */
export const UpdateUser = async (payload: UserType): Promise<UserType | null> => {
  try {
    const response = await axios.put('/user/update', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    enqueueSnackbar("User updated successfully!", { variant: 'success' });
    return response.data.data;
  } 
  catch (error: any) {
    if (error.response && error.response.status <= 500) {
      enqueueSnackbar(error.response.data.message, { variant: 'warning' });
    } 
    else {
      enqueueSnackbar("Terjadi kesalahan pada server", { variant: 'error' });
    }
    return null;
  }
};

/* Delete */
export const DeleteUser = async (id: number): Promise<boolean> => {
  try {
    await axios.delete('/user/delete?id='+id);
    enqueueSnackbar("User deleted successfully!", { variant: 'success' });
    return true;
  } 
  catch (error: any) {
    if (error.response && error.response.status <= 500) {
      enqueueSnackbar(error.response.data.message, { variant: 'warning' });
    } 
    else {
      enqueueSnackbar("Terjadi kesalahan pada server", { variant: 'error' });
    }
    return false;
  }
};