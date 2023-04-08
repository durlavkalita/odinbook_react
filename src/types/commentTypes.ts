export type CommentType = {
  _id: number;
  author: {
    _id: number;
    firstName: string;
    lastName: string;
  };
  content: string;
  post: string;
  created_at: Date;
};
