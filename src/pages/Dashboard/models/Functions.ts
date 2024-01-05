import { MenuType } from "../models/Types";

export const ListMenu1 = (): MenuType[] => {
    return [
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
    ]
};

export const ListMenu2 = (): MenuType[] => {
    return [
        {
            Icon: "fe:logout",
            Path: "/logout",
            Title: "logout"
        },
    ]
};