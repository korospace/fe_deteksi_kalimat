export enum UserType {
    SuperAdmin = 1,
    Pakar = 2,
    RegularUser = 3,
}

export interface UserInfoType {
    id: number;
    name: string;
    email: string;
    user_access_id: UserType;
}