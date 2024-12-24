import { FaGithub, FaLinkedin } from "react-icons/fa";

const authButtons = [
  {
    label: "Google",
    logo: "https://ipfs.near.social/ipfs/bafkreihnscd5o3g4nuofg2mpmbuppgds457ipsgqclam7wwrhmc3ntftpq",
    accent: "#5e548e",
    link: `${import.meta.env.VITE_API_URL}/auth/google`,
  },
  {
    label: "LinkedIn",
    icon: <FaLinkedin className="h-full w-full text-[#0077B5]" />,
    link: `${import.meta.env.VITE_API_URL}/auth/github`,
    accent: "#0077B5",
  },
  {
    label: "Github",
    icon: <FaGithub className="h-full w-full" />,
    link: `${import.meta.env.VITE_API_URL}/auth/github`,
    accent: "#24292e",
  },
  // {
  //   label: "Near",
  //   icon: <SiNear className="h-4 w-4" />,
  //   onClick: () => authWithNear(),
  //   accent: "#274c77",
  // },
  // {
  //   label: "Facebook",
  //   icon: <FaFacebookF className="h-4 w-4" />,
  //   onClick: () => authWithFacebook(),
  //   accent: "#007f5f",
  // },
];

export default authButtons;
