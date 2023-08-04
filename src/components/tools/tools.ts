import axios, { AxiosError } from "axios";

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

export async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/checkAuth");

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}

export async function checkLikes(ids: string[]) {
  try {
    const { data } = await axios.post("/api/checkLikes", { imageIds: ids });

    return data.likes;
  } catch (e) {
    const error = e as AxiosError;

    return null;
  }
}
