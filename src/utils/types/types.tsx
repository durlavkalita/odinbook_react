export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type Post = {
  id: number;
  author: String;
  content: string;
  created_at: Date;
  likes: number;
  comments: Comment[];
};

export type Comment = {
  id: number;
  author: String;
  content: string;
  created_at: Date;
};
