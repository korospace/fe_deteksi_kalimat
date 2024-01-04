export const GetLocalToken = () => {
    const jwt_token = window.localStorage.getItem('jwt_token') || null;

    return jwt_token
}