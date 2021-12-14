import React, { useState } from 'react';
import { Button, Form } from '@douyinfe/semi-ui';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authRegisterActions } from '~/features/auth/auth.action';
import { getAuthErrors } from '~/features/auth/auth.selector';
import ErrorMessage from '@douyinfe/semi-ui/lib/es/form/errorMessage';

export default function Signup() {
  const dispatch = useDispatch();

  // local state
  const [submitted, setSubmitted] = useState(false);
  const error = useSelector(state => getAuthErrors(state, submitted));

  const onSubmit = (values: Record<string, any>) => {
    const { name, email, password } = values;
    dispatch(authRegisterActions.request({ name, email, password }));
    setTimeout(() => setSubmitted(true), 500);
  };

  return (
    <Form
      onSubmit={onSubmit}
      style={{ width: 400 }}
      onValueChange={() => setSubmitted(false)}>
      {({ values, formState }) => (
        <>
          {error && <ErrorMessage error={error} />}
          <Form.Input
            field='name'
            label='Name'
            style={{ width: '100%' }}
            placeholder='Enter your name'
            trigger='blur'
            rules={[{ required: true, message: 'Name is required' }]}
          />
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
            style={{ width: '100%' }}
            trigger='blur'
            type='password'
            placeholder='Enter your password'
            rules={[{ required: true, message: 'Password is required' }]}
          />
          <Form.Checkbox field='agree' noLabel rules={[{ required: true }]}>
            I have read and agree to the terms of service
          </Form.Checkbox>
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
                <Link to='login'>Login</Link>
              </Button>
            </p>
            <Button
              disabled={!values.agree || formState.errors?.length === 0}
              htmlType='submit'
              type='tertiary'>
              Signup
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
