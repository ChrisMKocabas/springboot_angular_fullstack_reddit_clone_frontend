export interface LoginResponse {
    authenticationToken: string;
    refreshToken: string;
    expirationDate: Date;
    username: string;
}
