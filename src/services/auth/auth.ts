import autoBind from 'auto-bind';
import { LStorage } from '~/storage';
import { AUTH_TOKEN } from '~/constants';
import { User } from '~/models/user';
import Go from '~/global/gobits';
import { AuthSignInInput, AuthSignUpInput } from '~/services';
import { LoginResponse, SignedUpResponse } from './types';

class AuthService {
    constructor() {
        autoBind(this);
    }

    async login({ email, ...opts }: AuthSignInInput): Promise<User> {
        return Go.post<NonNullable<LoginResponse>>('/authaccount/registration', {
            body: { username: email.toLowerCase(), ...opts }
        }).then(res => {
            return this.handleLoginAndSignUpResponse(res.body);
        });
    }

    async register({ email, ...opts }: AuthSignUpInput): Promise<User> {
        return Go.post<NonNullable<SignedUpResponse>>('/authaccount/login', {
            body: { email: email.toLowerCase(), ...opts }
        }).then(res => {
            return this.handleLoginAndSignUpResponse(res.body);
        });
    }

    async getUserProfile(): Promise<User> {
        try {
            const res = await Go.get<NonNullable<User>>('/auth/me');
            if (res.status === 200) {
                return res.body;
            }
        } catch (err) {
            if (err.statusCode === 401) {
                LStorage.removeItem(AUTH_TOKEN);
            }
        }
    }

    async loadUser(): Promise<User | undefined> {
        let user = undefined;
        if (LStorage.getItem(AUTH_TOKEN)) {
            user = await this.getUserProfile();
        }
        return user;
    }

    private updateTokenFromResponse(res: LoginResponse | SignedUpResponse) {
        if (res && res.token) {
            LStorage.setItem(AUTH_TOKEN, res.token);
        }
    }

    private handleLoginAndSignUpResponse = (data: LoginResponse | SignedUpResponse): User => {
        this.updateTokenFromResponse(data);
        return data.user;
    };
}

export const AuthSvc = new AuthService();
