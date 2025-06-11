export interface productsList {
  data: {
    createdAt: string;
    id: string;
    name: string;
    description: string;
    price: number;
    img: string;
    count: number;
    discountedPrice: number;
    skidka: number;
    categoryId: string;
    userId: string;
    avgStars: string;
    comments: {
      id: string;
    };
    likes: {
      id: string;
    };
    user: {
      email: string;
      firstname: string;
      lastname: string;
    };
  }[];
  totalLikes: number;
}
