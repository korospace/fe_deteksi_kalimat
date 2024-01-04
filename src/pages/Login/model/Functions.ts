// Login.ts
import useHttp from "../../../hooks/useHttp";
import { LoginReq, LoginRes } from "./Types";

export const Login = async (payload: LoginReq): Promise<LoginRes | null> => {
  const { data, error } = useHttp({
    url: '/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    payload
  });

  console.log(data);
  console.log(error);

  return data;
};
