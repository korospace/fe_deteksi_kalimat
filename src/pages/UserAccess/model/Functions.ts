import { enqueueSnackbar } from "notistack";
import axios from "../../../utils/axios";
import { UserAccessType } from "./Types";

/* Get List */
export const GetUserAccessList = async (): Promise<UserAccessType[]> => {
  try {
    const response = await axios.get('/user_access/list');

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
export const CreateUserAccess = async (payload: UserAccessType): Promise<UserAccessType | null> => {
  try {
    const response = await axios.post('/user_access/create', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    enqueueSnackbar("User Access created successfully!", { variant: 'success' });
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
export const UpdateUserAccess = async (payload: UserAccessType): Promise<UserAccessType | null> => {
  try {
    const response = await axios.put('/user_access/update', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    enqueueSnackbar("User Access updated successfully!", { variant: 'success' });
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
export const DeleteUserAccess = async (id: number): Promise<boolean> => {
  try {
    await axios.delete('/user_access/delete?id='+id);
    enqueueSnackbar("User Access deleted successfully!", { variant: 'success' });
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