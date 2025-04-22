type User = {
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  password: string;
  id?: string;
};

type Message = {
  id: number;
  author: string;
  content: string;
  created_at: string;
  user_id?: string;
};
