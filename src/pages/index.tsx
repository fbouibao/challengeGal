import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/home/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { checkLikes, getUser } from "@/components/tools/tools";

interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
}

export default function Home() {
  const [clickedImage, setClickedImage] = useState<Number[]>([]);
  const { push } = useRouter();
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
  
      if (error) {
        push("/login");
        return;
      }  
      setIsAuth(true);
    })();
  }, []);

  useEffect(() => {
    console.log("@index auth",isAuth);
    if (isAuth) {
      fetchData();
    }
  }, [isAuth]);
  const fetchData = async () => {
    try {
        const unsplashApi = "https://api.unsplash.com";
        const response = await axios.get(
          `${unsplashApi}/photos/?client_id=nguu6c3h4BEso6znQYUpSFHEXCKo0wgQFp9eMfhWXqc&per_page=16&page=${page}`
        );
        setPage(page + 1);
        if (response.data) {
          const ids = response.data.map((image: any) => image.id);
          const likes = await checkLikes(ids);
          setClickedImage([...clickedImage, ...likes]);
          setImages([...images, ...response.data]);
        }
    } catch (error) {
      console.error("Something went wrong");
    }
  };
  
  const handleClickedImage = async (id: Number) => {
    try {
      const response = await axios.post("/api/likeImage", { imageId: id });
    } catch (error) {
      console.error("Something went wrong");
    }
    const isStringInArray = clickedImage.includes(id);
    if (isStringInArray) {
      const newArray: any[] = clickedImage.filter((item) => item !== id);
      setClickedImage(newArray);
      return;
    }
    setClickedImage([...clickedImage, id]);
  };

  if (!isAuth) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="pr-3 text-2xl font-extrabold text-green-700">
          LOADING
        </div>
        <Loading color="bg-green-700" />
      </div>
    );
  }

  return (
    <main className={`w-full p-3`}>
      <InfiniteScroll
        dataLength={images.length}
        next={fetchData}
        hasMore={true}
        loader={<Loading />}
      >
        <div className="flex justify-center pt-11">

        </div>
        <div
          className="max-w-[70rem] grid gap-y-[1.6em] gap-x-[0.9em] grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-[200px] mx-auto my-16"
        >
          {images.length > 0 &&
            images.map((item: any, index) => (
              <div>
                <img
                  className="rounded"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={`${item.urls.thumb}`}
                />
                <div className="flex justify-end">
                  <FavoriteIcon
                    onClick={() => handleClickedImage(item.id)}
                    sx={{
                      width: "14px",
                      height: "14px",
                      color: clickedImage.includes(item.id)
                        ? "red"
                        : "rgb(75 85 99)",
                      position: "relative",
                      top: "1px",
                      right: "4px",
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </main>
  );
}

