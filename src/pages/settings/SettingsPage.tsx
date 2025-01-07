import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  return (
    <Wrapper>
      <WrapperContent className="gap-8 flex-1 bg-[#f3f4f6] p-[26px]">
        <div className="gap-4 flex flex-col">
          <h1 className="text-2xl font-semibold">Settings</h1>

          <div className="flex flex-col gap-4">
            <Link to="/settings/profile">
              <Button className="flex w-full max-w-72 rounded-full items-center gap-2">
                <FiUser />
                <span>Account</span>
              </Button>
            </Link>

            <Link to="/linkedin/connect/success">
              <Button className="flex w-full max-w-72 rounded-full items-center gap-2">
                <FiUser />
                <span>Connect LinkedIn</span>
              </Button>
            </Link>
          </div>
        </div>
      </WrapperContent>
    </Wrapper>
  );
}
