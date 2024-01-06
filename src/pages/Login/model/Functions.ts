import { enqueueSnackbar } from "notistack";
import axios from "../../../utils/axios";
import { LoginReq } from "./Types";
import { SetLocalToken } from "../../../utils/auth";

export const Login = async (payload: LoginReq): Promise<boolean> => {
  try {
    const response = await axios.post('/auth/login', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    enqueueSnackbar("Login berhasil", { variant: 'success' });
    SetLocalToken(response.data.data.token);
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
