import React, { useState } from 'react';
import { Button, Form, Spin } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLoginActions } from '~/features/auth/auth.action';
import { getAuthErrors, isAuthing } from '~/features/auth/auth.selector';
import ErrorMessage from '@douyinfe/semi-ui/lib/es/form/errorMessage';
import { useAppDispatch } from '~/app/hook';
import AppState from '~/models/app.model';

export default function Login() {
  const dispatch = useAppDispatch();

  // selector
  const loading = useSelector(isAuthing);

  // local state
  const [submitted, setSubmitted] = useState(false);
  const error = useSelector<AppState, string | undefined>((state: AppState) =>
    getAuthErrors(state, submitted)
  );

  const onSubmit = (values: Record<string, any>) => {
    const { email, password } = values;
    dispatch(authLoginActions.request({ email, password }));
    setTimeout(() => setSubmitted(true), 500);
  };

  return (
    <Spin spinning={loading}>
      <Form
        onSubmit={onSubmit}
        style={{ width: 400 }}
        onValueChange={() => setSubmitted(false)}>
        {({ values, formState }) => (
          <>
            {error && <ErrorMessage error={error} />}
            <Form.Input
              field='email'
              label='Email'
              style={{ width: '100%' }}
              placeholder='Enter your email'
              trigger='blur'
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Email is not valid' }
              ]}
            />
            <Form.Input
              field='password'
              label='Password'
              type='password'
              style={{ width: '100%' }}
              trigger='blur'
              placeholder='Enter your password'
              rules={[{ required: true, message: 'Password is required' }]}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <p>
                <span>Or</span>
                <Button
                  theme='borderless'
                  style={{
                    color: 'rgb(101, 178, 252)',
                    marginLeft: 10,
                    cursor: 'pointer'
                  }}>
                  <Link to='signup'> Sign up</Link>
                </Button>
              </p>
              <Button
                disabled={
                  !values.email || !values.password || formState.errors?.length === 0
                }
                htmlType='submit'
                type='tertiary'>
                Log in
              </Button>
            </div>
          </>
        )}
      </Form>
    </Spin>
  );
}
