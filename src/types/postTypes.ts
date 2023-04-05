export type Post = {
  id: number;
  author: String;
  content: string;
  created_at: Date;
  likes: number;
  comments: Comment[];
};
