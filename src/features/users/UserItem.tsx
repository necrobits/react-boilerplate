import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  ButtonGroup,
  List,
  Typography,
  Descriptions,
  Skeleton
} from '@douyinfe/semi-ui';
import { parseISO, format } from 'date-fns';

import { UserModel } from '~/models/user.model';
import './Useritem.scss';

type Props = UserModel & {
  loading: boolean;
};

function UserItem(props: Props) {
  const { Text } = Typography;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const description = [
    {
      key: 'Email',
      value: <Text link={{ href: `mailto:${props.email}` }}>{props.email}</Text>
    },
    { key: 'Location', value: props.location }
  ];

  const placeholder = (
    <div className='placeholder'>
      <Skeleton.Avatar className='avatar' />
      <div>
        <Skeleton.Title className='title' />
        <Skeleton.Paragraph className='description' rows={2} />
      </div>
    </div>
  );
  return (
    <Skeleton className='skeleton' placeholder={placeholder} loading={loading}>
      <List.Item
        className='user'
        header={<Avatar src={props.profilepicture} />}
        main={
          <div className='body'>
            <div className='title-wrapper'>
              <span className='name'>{props.name}</span>
              <span className='date-time-wrapper'>
                <span className='label'>created on</span>
                <span className='date-time'>
                  {format(parseISO(props.createdat), ' HH:mm dd.MM.yyyy')}
                </span>
              </span>
            </div>
            <div className='description-wrapper'>
              <Descriptions align='left' data={description} />
            </div>
          </div>
        }
        extra={
          <ButtonGroup theme='borderless'>
            <Button>Edit</Button>
            <Button type='danger'>X</Button>
          </ButtonGroup>
        }
      />
    </Skeleton>
  );
}

export default UserItem;
