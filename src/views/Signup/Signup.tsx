import React from 'react';
import Signup from '~/features/auth/signup';
import { Card } from '@douyinfe/semi-ui';
import './style.scss';

export default function SignupPage() {
  return (
    <div className='signup-wrapper'>
      <Card
        shadows='always'
        bodyStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <Signup />
      </Card>
    </div>
  );
}
