import React from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutateAsyncFunction
} from 'react-query';
import { AuthenticatedUser } from '~/models';
import { AuthSignInInput, AuthSignUpInput } from '~/services';

export interface AuthProviderConfig {
  key?: string;
  loadUser: () => Promise<AuthenticatedUser | undefined>;
  loginFn: (data: AuthSignInInput) => Promise<AuthenticatedUser>;
  registerFn: (data: AuthSignUpInput) => Promise<AuthenticatedUser>;
  logoutFn: () => Promise<void>;
}

export interface AuthContextValue<Error> {
  user: AuthenticatedUser | undefined;
  login: UseMutateAsyncFunction<AuthenticatedUser | undefined, any, AuthSignInInput>;
  logout: UseMutateAsyncFunction<any, any, void, any>;
  register: UseMutateAsyncFunction<AuthenticatedUser | undefined, any, AuthSignUpInput>;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isRegistering: boolean;
  // refetchUser: (
  //   opts?: RefetchOptions | undefined
  // ) => Promise<QueryObserverResult<AuthenticatedUser | undefined, Error | unknown>>;
  error: Error | unknown;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function initReactQueryAuth<Error = any>(config: AuthProviderConfig) {
  const AuthContext = React.createContext<AuthContextValue<Error> | null>(null);
  AuthContext.displayName = 'AuthContext';

  const { loadUser, loginFn, registerFn, logoutFn, key = 'auth-user' } = config;

  const AuthProvider = ({ children }: AuthProviderProps) => {
    const queryClient = useQueryClient();

    const {
      data: user,
      error
      // refetch
    } = useQuery<AuthenticatedUser | undefined, any>({
      queryKey: key,
      queryFn: loadUser
    });

    const setUser = React.useCallback(
      (data: AuthenticatedUser) => queryClient.setQueryData(key, data),
      [queryClient]
    );

    const loginMutation = useMutation<AuthenticatedUser, any, AuthSignInInput, unknown>({
      mutationFn: loginFn,
      onSuccess: user => {
        setUser(user as AuthenticatedUser);
      }
    });

    const registerMutation = useMutation<
      AuthenticatedUser,
      any,
      AuthSignUpInput,
      unknown
    >({
      mutationFn: registerFn,
      onSuccess: user => {
        setUser(user as AuthenticatedUser);
      }
    });

    const logoutMutation = useMutation({
      mutationFn: logoutFn,
      onSuccess: () => {
        queryClient.clear();
      }
    });

    const value = React.useMemo<AuthContextValue<Error>>(
      () => ({
        user,
        isLoggedIn: !!user,
        error: loginMutation.error,
        // refetchUser: refetch,
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isLoading,

        logout: logoutMutation.mutateAsync,
        isLoggingOut: logoutMutation.isLoading,
        register: registerMutation.mutateAsync,
        isRegistering: registerMutation.isLoading
      }),
      [
        user,
        error,
        // refetch,
        loginMutation.mutateAsync,
        loginMutation.isLoading,
        logoutMutation.mutateAsync,
        logoutMutation.isLoading,
        registerMutation.mutateAsync,
        registerMutation.isLoading
      ]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };

  function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
      throw new Error(`useAuth must be used within an AuthProvider`);
    }
    return context;
  }

  return { AuthProvider, AuthConsumer: AuthContext.Consumer, useAuth };
}
