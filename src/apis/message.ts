import http from '../configs/http';
import {GetMessagesResponse} from './types/message';
import {PageType} from './types/user';

const getListMessages = async (props: PageType & {roomId: string}) => {
  return await http.get<any, GetMessagesResponse>('/api/message', {
    params: {
      page: props.page,
      limit: props?.limit,
      roomId: props.roomId,
    },
  });
};

export {getListMessages};
