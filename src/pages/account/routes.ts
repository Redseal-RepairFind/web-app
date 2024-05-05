import {
  faQuestionCircle,
  faShield,
  faBook,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const routes = [
  { id: 1, title: "Profile", icon: faUser, route: "/" },
  { id: 2, title: "Privacy Policy", icon: faShield, route: "/privacy-policy" },
  { id: 3, title: "Terms & Conditions", icon: faBook, route: "/terms" },
  { id: 4, title: "Help & Support", icon: faQuestionCircle, route: "/help" },
];
