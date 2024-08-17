import {Response} from './auth';

export interface PageType {
  page: number;
  limit?: number;
}

export interface GetAllUsersResponse extends Response {
  data: {
    users: {
      _id: string;
      username: string;
      fullname: string;
      fcm_token: string;
    }[],
    page: {
      currentPage: number,
      totalPages: number,
      hasNextPage: boolean,
      hasPreviousPage: boolean,
    }
  };
}
