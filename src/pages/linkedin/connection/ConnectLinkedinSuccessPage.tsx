import BoringAvatar from "@/components/BoringAvatar";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import httpClient from "@/lib/httpClient";
import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { RiExternalLinkLine } from "react-icons/ri";
import { VscDebugRestart, VscLoading } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// {
//   createdBy: "63c4f98e4f1c2e01e5a3f890", // Example MongoDB ObjectId
//   type: "organization",
//   linkedinId: "123456789",
//   name: "Tech Innovators Inc.",
//   slug: "tech-innovators-inc",
//   logo: "https://example.com/logo.png",
//   cover: "https://example.com/cover.jpg",
//   description:
//     "A leading technology company specializing in AI and cloud solutions.",
//   websiteUrl: "https://www.techinnovators.com",
//   linkedinUrl: "https://www.linkedin.com/company/tech-innovators",
//   tags: ["Technology", "Innovation", "AI"],
//   industries: ["Technology", "Software Development"],
// },
// {
//   createdBy: "63c4f98e4f1c2e01e5a3f891", // Another Example MongoDB ObjectId
//   type: "person",
//   linkedinId: "987654321",
//   name: "Jane Doe",
//   slug: "jane-doe",
//   logo: "https://example.com/jane-profile.jpg",
//   cover: "https://example.com/jane-cover.jpg",
//   description:
//     "Experienced software engineer with expertise in backend systems and databases.",
//   websiteUrl: null, // No personal website
//   linkedinUrl: "https://www.linkedin.com/in/jane-doe",
//   tags: ["Backend", "Databases", "Software Engineering"],
//   industries: ["Information Technology", "Consulting"],
// },
// {
//   createdBy: "63c4f98e4f1c2e01e5a3f892",
//   type: "organization",
//   linkedinId: "456789123",
//   name: "Green Solutions Ltd.",
//   slug: "green-solutions-ltd",
//   logo: "https://example.com/green-logo.png",
//   cover: null, // No cover photo
//   description: "Sustainable energy solutions for a greener future.",
//   websiteUrl: "https://www.greensolutions.com",
//   linkedinUrl: "https://www.linkedin.com/company/green-solutions",
//   tags: ["Sustainability", "Energy", "Environment"],
//   industries: ["Renewable Energy", "Environmental Services"],
// },
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
      .get(`/linkedin/management/organizationList`)
      .then((res) => {
        console.log(res.data);
        setOrganizationList(res.data.data);

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
      .post(`/linkedin/management/organizationList`)
      .then((res) => {
        console.log(res.data);

        setOrganizationList(res.data.data);
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
      .get(`/linkedin/management/user`)
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
