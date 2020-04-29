export interface AuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string;
}

export const initialAuthState: AuthState = {
    isLoading: false,
    isAuthenticated: false,
    error: null
};