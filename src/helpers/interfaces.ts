export interface IUser {
  name: string;
  tokens: {
    access: string;
    refresh: string;
  };
}

export interface IBlogList {
  count: number;
  next: string;
  previous: string;
  results: IBlog[];
}

export interface IBlog {
  id: string;
  title: string;
  thumbnail: string;
  slug: string;
  excerpt: string;
  author: string;
  published_on: Date;
  published: "Draft" | "Published";
}

export interface IBlogDetails {
  id: string;
  title: string;
  thumbnail: string;
  slug: string;
  excerpt: string;
  body: string;
  published: "Draft" | "Published";
  author: string;
  published_on: Date;
}

export interface IComment {
  id?: string;
  comment: string;
  article?: string;
  time: Date;
  user: string;
}
