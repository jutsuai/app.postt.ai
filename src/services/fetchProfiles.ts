import httpClient from "@/lib/httpClient";

export const fetchProfiles = async () => {
  const url = `/linkedin/management/organizationList`;

  return httpClient()
    .get(url)
    .then((res) => {
      const data = res.data.data as any[];
      return data;
    })
    .catch((err) => {
      console.error("Error fetching profiles: ", err);
      return [] as any[];
    });
};
