import { enqueueSnackbar } from "notistack";
import axios from "../../../utils/axios";
import { DatasetType } from "./Types";

/* Get List */
export const GetDatasetList = async (): Promise<DatasetType[]> => {
  try {
    const response = await axios.get('/dataset/list');

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
export const CreateDataset = async (payload: DatasetType): Promise<DatasetType | null> => {
  try {
    const response = await axios.post('/dataset/create', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    enqueueSnackbar("Dataset created successfully!", { variant: 'success' });
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

/* Import */
export const ImportDataset = async (file: any): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('file_dataset', file);

    await axios.post('/dataset/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    enqueueSnackbar("Dataset import successfully!", { variant: 'success' });
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

/* Update */
export const UpdateDataset = async (payload: DatasetType): Promise<DatasetType | null> => {
  try {
    const response = await axios.put('/dataset/update', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    enqueueSnackbar("Dataset updated successfully!", { variant: 'success' });
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
export const DeleteDataset = async (id: number): Promise<boolean> => {
  try {
    await axios.delete('/dataset/delete?id='+id);
    enqueueSnackbar("Dataset deleted successfully!", { variant: 'success' });
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