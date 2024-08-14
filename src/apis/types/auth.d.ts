export interface Response {
  message: string;
  data: any;
}

export interface LoginBody {
  username: string;
  password: string;
}

export interface RegisterBody extends LoginBody {
  fullname: string;
}

export interface RegisterResponse extends Response {
  data: {
    userId: string;
    username: string;
    fullname: string;
  };
}

export interface LoginResponse extends Response {
  data: {
    user: {
      userId: string;
      username: string;
      fullname: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}
