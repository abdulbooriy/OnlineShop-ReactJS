export interface User {
  users: {
    id: string | null;
    email: string;
    password: string | null;
    firstname: string | null;
    lastname: string | null;
    img: string | null;
    otp: string | null;
    verified: boolean;
    createdAt: string;
    role: "USER" | "ADMIN";
    regionId: string | null;
  };
}

export interface UsersResponse {
  users: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    limit: number;
  };
}
