import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from '@douyinfe/semi-ui';
import UserItem from '~/features/users/UserItem';
import { getUsers, isLoadingUsers } from '~/features/users/users.selector';
import { usersFetchActions } from '~/features/users/users.action';

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const loading = useSelector(isLoadingUsers);

  useEffect(() => {
    dispatch(usersFetchActions.request({ page: 1 }));
  }, []);

  return (
    <div className='list-group'>
      <List
        loading={loading}
        dataSource={users}
        renderItem={item => <UserItem {...item} loading={loading} />}
      />
    </div>
  );
}
