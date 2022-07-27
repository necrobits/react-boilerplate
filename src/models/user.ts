import { ErrorResponse } from '~/services';

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatar?: string;
    createdAt: string;
    roles: string[];
}

export interface UserState {
    currentUser: User | undefined;
    error: ErrorResponse | undefined;
    isAuthing: boolean;
}

export interface UsersState {
    loading: boolean;
    items: User[];
    errors?: string;
}
