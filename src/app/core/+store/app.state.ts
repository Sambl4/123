import { ListState } from './list/list.state';
import { AuthState } from './auth/auth.state';

export interface AppState {
    list: ListState;
    Auth: AuthState;
}