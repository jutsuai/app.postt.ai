import BoringAvatar from "@/components/BoringAvatar";
import { Button } from "@/components/ui/button";
import httpClient from "@/lib/httpClient";
import { useEffect, useState } from "react";
import { RiExternalLinkLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function ConnectLinkedinSuccessPage() {
  const [loading, setLoading] = useState(false);
  const [organizationList, setOrganizationList] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetOrganizationListFromDB();
  }, []);

  const handleGetOrganizationListFromDB = () => {
    setLoading(true);

    httpClient()
      .get(`/linkedin/api/organizations`)
      .then((res) => {
        console.log(res.data);
        // setOrganizationList(res.data.data);
        setOrganizationList( (curArray:any) =>  [...curArray, res.data.data]);

        if (res.data.data.length === 0) {
          handleGetOrganizationListFromLinkedin();

          getUserDetails();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetOrganizationListFromLinkedin = () => {
    setLoading(true);

    httpClient()
      .get(`/linkedin/api/organizations/sync`)
      .then((res) => {
        console.log(res.data);

        setOrganizationList( (curArray:any) =>  [...curArray, res.data.data]);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUserDetails = () => {
    setLoading(true);

    httpClient()
      .get(`/linkedin/api/me`)
      .then((res) => {
        console.log(res.data);
        // setUserDetails(res.data.data);
        setOrganizationList((curArray: any) => [...curArray, res.data.data]);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="lg:max-w-md w-full h-full flex flex-col gap-2 px-4 items-start  pt-[7dvh]">
      <div className=" flex w-full justify-start flex-col items-center  h-full mt-9 gap-4">
        <div className="flex items-center justify-center  relative">
          <img
            src="/onboarding/social-linkedin.svg"
            alt=""
            className="size-[140px]"
          />
          {/* <Button
            variant="ghost"
            className=" rounded-full absolute  left-36"
            onClick={() => {
              handleGetOrganizationListFromLinkedin();
            }}
          >
            <VscDebugRestart />
          </Button>
          <Button
            variant="ghost"
            className=" rounded-full text-red-600 absolute  right-36"
            onClick={() => {
              getUserDetails();
            }}
          >
            <VscDebugRestart />
          </Button> */}
        </div>

        <h3 className="text-lg font-semibold text-center ">
          LinkedIn Connected
        </h3>

        <p className="text-muted-foreground text-sm -mt-2 text-center">
          Your LinkedIn profile has been successfully connected
        </p>

        <div className="flex flex-col gap-2 max-h-[40dvh] px-4 overflow-y-auto">
          {organizationList?.map((org: any, index: any) => (
            <div
              key={index}
              className="flex gap-3 bg-primary/10 p-2 rounded-full items-center "
            >
              <BoringAvatar name={org.name} size={48} className="min-w-12" />

              <div className="flex flex-col">
                <h3 className="text-sm font-semibold">{org.name}</h3>
                <p className="text-muted-foreground text-xs  line-clamp-1">
                  {org.description}
                </p>
              </div>

              <a
                href={org.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 pr-5 underline"
              >
                <RiExternalLinkLine />
              </a>
            </div>
          ))}
        </div>

        <Button className="w-full rounded-full mt-auto min-h-[56px]" asChild>
          <Link className="w-full" to="/">
            {loading ? <VscLoading className="animate-spin" /> : "Let's Go!"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
