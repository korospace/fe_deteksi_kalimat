import { enqueueSnackbar } from "notistack";
import axios from "../../../utils/axios";
import { CategoryType } from "./Types";

/* Get List */
export const GetCategoryList = async (): Promise<CategoryType[]> => {
  try {
    const response = await axios.get('/category/list');

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
export const CreateCategory = async (payload: CategoryType): Promise<CategoryType | null> => {
  try {
    const response = await axios.post('/category/create', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    enqueueSnackbar("Category created successfully!", { variant: 'success' });
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
export const UpdateCategory = async (payload: CategoryType): Promise<CategoryType | null> => {
  try {
    const response = await axios.put('/category/update', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    enqueueSnackbar("Category updated successfully!", { variant: 'success' });
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
export const DeleteCategory = async (id: number): Promise<boolean> => {
  try {
    await axios.delete('/category/delete?id='+id);
    enqueueSnackbar("Category deleted successfully!", { variant: 'success' });
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