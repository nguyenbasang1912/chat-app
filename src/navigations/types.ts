export type RootParamsList = {
  login: undefined;
  register: undefined;
  chat: {
    userId: string;
    fcmToken: string;
  };
  home: undefined;
};
