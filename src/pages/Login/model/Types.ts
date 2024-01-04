export interface LoginReq {
    email: string;
    password: string;
}

export interface LoginRes {
    status: "success";
    message: "Login successfully";
    data: {
      Token: string;
    };
}