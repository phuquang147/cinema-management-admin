export default interface IPost {
  id: string;
  title: string;
  content: string;
  cover: string;
  author: { id: string; name: string; avatar: string };
  view: number;
  createdAt: Date;
  slug: string;
}
