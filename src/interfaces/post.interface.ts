export default interface IPost {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  author: { _id: string; name: string; avatar: string };
  view: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  status: string;
}
