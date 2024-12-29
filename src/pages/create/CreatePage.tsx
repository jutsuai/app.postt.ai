import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/Wrapper";
import { Link } from "react-router-dom";

export default function CreatePage() {
  return (
    <Wrapper className="p-10 gap-10">
      <h1 className="text-2xl font-semibold">Create Page</h1>

      <div className="flex gap-4">
        <Link to={"/create/carousel"}>
          <Button className="bg-primary  text-white">Create Carousel</Button>
        </Link>

        <Link to={"/create/post"}>
          <Button className="bg-primary  text-white">Create Post</Button>
        </Link>
      </div>
    </Wrapper>
  );
}
