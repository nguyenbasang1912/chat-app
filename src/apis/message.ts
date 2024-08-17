import http from '../configs/http';
import {GetMessagesResponse} from './types/message';
import {PageType} from './types/user';

const getListMessages = async (
  props: PageType & {roomId: string; additionalSkip?: number},
) => {
  return await http.get<any, GetMessagesResponse>('/api/message', {
    params: {
      page: props.page,
      limit: props?.limit,
      roomId: props.roomId,
      additionalSkip: props?.additionalSkip,
    },
  });
};

export {getListMessages};
