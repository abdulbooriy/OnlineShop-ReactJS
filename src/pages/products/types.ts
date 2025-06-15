interface User {
  firstname: string;
  lastname: string;
  email: string;
}

interface Color {
  name: string;
}

interface Category {
  name: string;
}

interface Like {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
}

interface Comment {
  id: string;
  text: string;
  star: number;
  userId: string;
  productId: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  description: string;
  count: number;
  skidka: number;
  categoryId: string;
  userId: string;
  createdAt: string;
  user: User;
  colors: Color[];
  category: Category;
  likes: Like[];
  comments: Comment[];
  totalLikes: number;
  discountedPrice: number;
  avgStars: string;
}

export type CreateProductDto = {
  name: string;
  price: number;
  img: string;
  description: string;
  count: number;
  skidka: number;
  categoryId: string;
  userId: string;
  discountedPrice: number;
  avgStars: string;
  totalLikes: number;
  colors: { name: string }[];
};
