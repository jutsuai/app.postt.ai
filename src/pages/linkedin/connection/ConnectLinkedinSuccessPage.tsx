import BoringAvatar from "@/components/images/BoringAvatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const handleGetOrganizationListFromDB = () => {
  return httpClient()
    .get(`/linkedin/profiles`)
    .then((res) => {
      const data = res.data.data;
      console.log(data);

      return data;

      // if (data.length === 0) {
      //   handleGetOrganizationListFromLinkedin();

      //   getUserDetails();
      // } else {
      //   data?.map((org: any) => {
      //     addUserIfNotExists(org);
      //   });
      // }
    })
    .catch((err) => {
      console.error(err);
      toast.error(err?.response?.data?.message || "An error occurred");

      return [];
    });
};

export default function ConnectLinkedinSuccessPage() {
  const { data: linkedinProfiles, isLoading: loading } = useQuery({
    queryKey: ["linkedinProfiles"],
    queryFn: () => handleGetOrganizationListFromDB(),
  });

  console.log("linkedinProfiles =====> ", linkedinProfiles);

  const { getLinkedinProfiles } = useAuth();
  // const [loading, setLoading] = useState(false);

  const [loadingFetch, setLoadingFetch] = useState(false);

  const [organizationList, setOrganizationList] = useState<any>([]);
  const [selectedOrgs, setSelectedOrgs] = useState<any>([]);

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

  // const handleCheckboxChange = (id: string) => {
  //   // check if the id is already in the array, if yes remove it, if not add it
  //   if (selectedOrgs.includes(id)) {
  //     setSelectedOrgs((prevOrgs: any) => {
  //       return prevOrgs.filter((org: any) => org !== id);
  //     });
  //   } else {
  //     setSelectedOrgs((prevOrgs: any) => {
  //       return [...prevOrgs, id];
  //     });
  //   }
  // };

  return (
    <div className="flex h-full w-full flex-col items-start gap-2 px-4 pt-[7dvh] lg:max-w-md">
      <div className="mt-9 flex h-full w-full flex-col items-center justify-start gap-4">
        <div className="relative flex items-center justify-center">
          <img
            src="/onboarding/social-linkedin.svg"
            alt=""
            className="size-[140px]"
          />
        </div>

        <h3 className="text-center text-lg font-semibold">
          Confirm your LinkedIn Profiles
        </h3>

        <p className="-mt-2 text-center text-sm text-muted-foreground">
          Select the LinkedIn profiles you want to connect
        </p>

        <div className="flex max-h-[40dvh] w-full flex-col gap-2 overflow-y-auto px-4">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-16 min-h-16 w-full rounded-full"
                />
              ))
            : linkedinProfiles?.map((org: any, index: any) => {
                const check = selectedOrgs.includes(org.linkedinId);

                return (
                  <button
                    key={index}
                    className="flex cursor-default items-center gap-3 rounded-full bg-primary/5 p-2"
                    // onClick={() => handleCheckboxChange(org.linkedinId)}
                  >
                    <BoringAvatar
                      name={org.name}
                      size={48}
                      className="min-w-12"
                    />

                    <div className="flex flex-col items-start justify-start">
                      <h3 className="text-sm font-semibold">{org.name}</h3>
                      <p className="line-clamp-1 text-start text-xs text-muted-foreground">
                        {org.description}
                      </p>
                    </div>

                    {/* <div className="mr-3 min-w-5">
                      {check ? (
                        <MdCheckBox className="size-5 text-primary" />
                      ) : (
                        <MdCheckBoxOutlineBlank className="size-5" />
                      )}
                    </div> */}
                  </button>
                );
              })}
        </div>

        <div className="mt-auto flex w-full flex-col gap-2 overflow-y-auto px-4">
          <Button className="min-h-[56px] w-full rounded-full" asChild>
            <Link
              className="w-full"
              to="/"
              onClick={() => getLinkedinProfiles()}
            >
              Let's Go!
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
    </div>
  );
}
