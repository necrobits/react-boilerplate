import React from 'react';
import Login from '~/features/auth/login';
import './style.scss';
import { Card } from '@douyinfe/semi-ui';

export default function LoginPage() {
  return (
    <div className='login-wrapper'>
      <Card
        shadows='always'
        bodyStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <Login />
      </Card>
    </div>
  );
}
