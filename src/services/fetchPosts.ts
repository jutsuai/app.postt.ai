import httpClient from "@/lib/httpClient";

export const fetchPosts = async () => {
  const url = `/posts`;

  return httpClient()
    .get(url)
    .then((res) => {
      const data = res.data.data as any[];

      console.log("Posts fetched: ", data);
      return data;
    })
    .catch((err) => {
      console.error("Error fetching posts: ", err);
      return [] as any[];
    });
};
