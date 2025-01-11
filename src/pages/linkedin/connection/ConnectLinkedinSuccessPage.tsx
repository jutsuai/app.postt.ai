import BoringAvatar from "@/components/BoringAvatar";
import { Button } from "@/components/ui/button";
import httpClient from "@/lib/httpClient";
import { useEffect, useState } from "react";
import { RiExternalLinkLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ConnectLinkedinSuccessPage() {
  const [loading, setLoading] = useState(false);

  const [loadingFetch, setLoadingFetch] = useState(false);

  const [organizationList, setOrganizationList] = useState<any>([]);

  const addUserIfNotExists = (newUser: any) => {
    setOrganizationList((prevUsers: any) => {
      // Check if the user already exists
      const exists = prevUsers.some(
        (user: any) => user?.linkedinId === newUser?.linkedinId,
      );
      if (!exists) {
        return [...prevUsers, newUser]; // Add the new user if not exists
      }
      console.log(
        `User with linkedinId ${newUser?.linkedinId} already exists.`,
      );
      return prevUsers; // Return the previous array if the user exists
    });
  };

  useEffect(() => {
    handleGetOrganizationListFromDB();
  }, []);

  const handleGetOrganizationListFromDB = () => {
    setLoading(true);

    httpClient()
      .get(`/linkedin/api/organizations`)
      .then((res) => {
        const data = res.data.data;
        console.log(data);

        if (data.length === 0) {
          handleGetOrganizationListFromLinkedin();

          getUserDetails();
        } else {
          data?.map((org: any) => {
            addUserIfNotExists(org);
          });
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
    setLoadingFetch(true);

    httpClient()
      .get(`/linkedin/api/organizations/sync`)
      .then((res) => {
        console.log(res.data);

        // setOrganizationList((curArray: any) => [...curArray, res.data.data]);

        res.data.data.forEach((org: any) => {
          addUserIfNotExists(org);
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoadingFetch(false);
      });
  };

  const getUserDetails = () => {
    setLoadingFetch(true);

    httpClient()
      .get(`/linkedin/api/me`)
      .then((res) => {
        console.log(res.data);
        // setUserDetails(res.data.data);
        // setOrganizationList((curArray: any) => [...curArray, res.data.data]);

        // check if this user is already in the arrya with linkedinId, if not add it
        addUserIfNotExists(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoadingFetch(false);
      });
  };

  return (
    <div className="flex h-full w-full flex-col items-start gap-2 px-4 pt-[7dvh] lg:max-w-md">
      <div className="mt-9 flex h-full w-full flex-col items-center justify-start gap-4">
        <div className="relative flex items-center justify-center">
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

        <h3 className="text-center text-lg font-semibold">
          LinkedIn Connected
        </h3>

        <p className="-mt-2 text-center text-sm text-muted-foreground">
          Your LinkedIn profile has been successfully connected
        </p>

        <div className="flex max-h-[40dvh] flex-col gap-2 overflow-y-auto px-4">
          {organizationList?.map((org: any, index: any) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-full bg-primary/10 p-2"
            >
              <BoringAvatar name={org.name} size={48} className="min-w-12" />

              <div className="flex flex-col">
                <h3 className="text-sm font-semibold">{org.name}</h3>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {org.description}
                </p>
              </div>

              <a
                href={org.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="pr-5 text-blue-500 underline"
              >
                <RiExternalLinkLine />
              </a>
            </div>
          ))}
        </div>

        <Button className="mt-auto min-h-[56px] w-full rounded-full" asChild>
          <Link className="w-full" to="/">
            {loading ? <VscLoading className="animate-spin" /> : "Let's Go!"}
          </Link>
        </Button>

        <Button
          variant="ghost"
          className="w-full rounded-full"
          onClick={() => {
            handleGetOrganizationListFromLinkedin();
            getUserDetails();
          }}
        >
          {loadingFetch ? (
            <VscLoading className="animate-spin" />
          ) : (
            "Fetch again"
          )}
        </Button>
      </div>
    </div>
  );
}
