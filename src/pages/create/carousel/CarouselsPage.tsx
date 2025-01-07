import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import httpClient from "@/lib/httpClient";
import { useEffect, useState } from "react";

export default function CarouselsPage() {
  const [loading, setLoading] = useState(false);
  const [carousels, setCarousels] = useState([]);

  useEffect(() => {
    handleGetCarousels();
  }, []);

  const handleGetCarousels = async () => {
    setLoading(true);

    httpClient()
      .get("/create/carousel")
      .then((res) => {
        setCarousels(res.data);

        console.log("res.data", res.data);
      })
      .catch((err) => {
        console.error("Error getting carousels:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper>
      <WrapperContent className="items-center my-10">
        <div>CarouselsPage</div>

        {loading && <div>Loading...</div>}

        {JSON.stringify(carousels, null, 2)}
      </WrapperContent>
    </Wrapper>
  );
}
