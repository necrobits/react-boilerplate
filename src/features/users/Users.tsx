import React from 'react';
import { List } from '@douyinfe/semi-ui';
import UserItem from '~/features/users/UserItem';
import { useQuery } from 'react-query';
import { fetchUsers } from '~/services';

export default function Users() {
  const { isLoading, error, data } = useQuery('users', () => fetchUsers({ page: 1 }));

  return (
    <div className='list-group'>
      <List
        loading={isLoading}
        dataSource={data}
        renderItem={item => <UserItem {...item} loading={isLoading} />}
      />
    </div>
  );
}
