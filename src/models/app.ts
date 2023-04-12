import { UserState } from '~/models';

export interface AppState {
    user: UserState;
}

export enum SupportedLanguage {
    English = 'en',
    German = 'de'
}
