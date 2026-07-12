interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

const userResponse: ApiResponse<string[]> = {
  data: ["Andrew", "Alex"],
  loading: false,
  error: null
}

console.log(userResponse);

export {};