import {
  faGears,
  faExclamationCircle,
  faQuestionCircle,
  faShield,
  faBook,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const routes = [
  { id: 1, title: "Profile", icon: faUser, route: "/" },
  {
    id: 1,
    title: "About Repair Find",
    icon: faExclamationCircle,
    route: "/about",
  },
  { id: 1, title: "Privacy Policy", icon: faShield, route: "/privacy-policy" },
  { id: 1, title: "Terms & Conditions", icon: faBook, route: "/terms" },
  { id: 1, title: "Help & Support", icon: faQuestionCircle, route: "/help" },
];
