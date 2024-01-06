import { UserInfoType } from "../@types/AuthType";

/**
 * TOKEN
 * ==========================
 */
const token_key = 'jwt_token'

export const GetLocalToken = (): string => {
    const jwt_token = window.localStorage.getItem(token_key) || null;

    return jwt_token !== null ? JSON.parse(jwt_token) : ''
}

export const SetLocalToken = (token: string) => {
    localStorage.setItem(token_key, JSON.stringify(token));
}

export const RemoveLocalToken = () => {
    localStorage.removeItem(token_key);
}

/**
 * USER INFO
 * ==========================
 */
const userinfo_key = 'userinfo'

export const GetLocalUserInfo = (): UserInfoType => {
    const data = window.localStorage.getItem(userinfo_key) || null;

    return data !== null ? JSON.parse(data) : ''
}

export const SetLocalUserInfo = (data: UserInfoType) => {
    localStorage.setItem(userinfo_key, JSON.stringify(data));
}

export const RemoveLocalUserInfo = () => {
    localStorage.removeItem(userinfo_key);
}