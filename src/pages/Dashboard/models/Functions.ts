import { UserType } from "../../../@types/AuthType";
import { GetLocalUserInfo } from "../../../utils/auth";
import { MenuType } from "../models/Types";

// Definisikan menu yang terkait dengan masing-masing jenis pengguna
const menusByUserType: Record<UserType, MenuType[]> = {
  [UserType.SuperAdmin]: [
    {
        Icon: "carbon:machine-learning-model",
        Path: "/training",
        Title: "training"
    },
    {
        Icon: "majesticons:data-plus-line",
        Path: "/dataset",
        Title: "dataset"
    },
    {
        Icon: "cil:list",
        Path: "/category",
        Title: "category"
    },
    {
        Icon: "ri:user-settings-line",
        Path: "/user_access",
        Title: "user access"
    },
    {
        Icon: "lucide:users-round",
        Path: "/user",
        Title: "user"
    },
    {
        Icon: "",
        Path: "",
        Title: "divider"
    },
    {
        Icon: "fe:logout",
        Path: "/logout",
        Title: "logout"
    },
  ],
  [UserType.Pakar]: [
    {
        Icon: "carbon:machine-learning-model",
        Path: "/training",
        Title: "training"
    },
    {
        Icon: "majesticons:data-plus-line",
        Path: "/dataset",
        Title: "dataset"
    },
    {
        Icon: "",
        Path: "",
        Title: "divider"
    },
    {
        Icon: "fe:logout",
        Path: "/logout",
        Title: "logout"
    },
  ],
  [UserType.RegularUser]: [
    
  ],
};

export const GetListMenu = (): MenuType[] => {
  const userinfo = GetLocalUserInfo();

  // Cek jenis pengguna dan kembalikan menu yang sesuai
  return menusByUserType[userinfo.user_access_id] || [];
};
