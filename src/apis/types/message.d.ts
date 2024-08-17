import {GetAllUsersResponse} from './user';

export interface GetMessagesResponse extends Response {
  data: {
    messages: {
      _id: string;
      sender: string;
      content: string;
      createdAt: Date;
      is_delete: boolean;
      room_id: string;
    }[];
    page: GetAllUsersResponse['data']['page'];
  };
}
