import http from '../configs/http';
import {GetAllUsersResponse, PageType} from './types/user';

const getAllUsers = async (props: PageType) => {
  return await http.get<any, GetAllUsersResponse>(
    '/api/auth/get-all-users',
    {
      params: {
        page: props.page,
        limit: props.limit,
      },
    },
  );
};

export {getAllUsers};
