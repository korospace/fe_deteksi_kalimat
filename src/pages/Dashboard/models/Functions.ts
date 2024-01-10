import { UserType } from "../../../@types/AuthType";
import { MenuType } from "../models/Types";

// Definisikan menu yang terkait dengan masing-masing jenis pengguna
export const menusByUserType: Record<UserType, MenuType[]> = {
  [UserType.SuperAdmin]: [
    {
        Icon: "carbon:machine-learning-model",
        Path: "/",
        Title: "Kalimat Utama"
    },
  ],
};

export const GetListMenu = (): MenuType[] => {
  // Cek jenis pengguna dan kembalikan menu yang sesuai
  return menusByUserType[1] || [];
};
