const key = 'jwt_token'
export const GetLocalToken = (): string => {
    const jwt_token = window.localStorage.getItem(key) || null;

    return jwt_token !== null ? JSON.parse(jwt_token) : ''
}

export const SetLocalToken = (token: string) => {
    localStorage.setItem(key, JSON.stringify(token));
}