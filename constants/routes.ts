import {
  Blocks,
  LayoutDashboard,
  Logs,
  Settings,
  UsersRound,
  Wallet,
} from "lucide-react";

export const ROUTES = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  FORGOTPASSWORD: "/forgot-password",
  VERIFY: "/verify",
  ADMIN: "/admin",
  PROJECTS: "/admin/projects",
  USERS: "/admin/users",
  PAYMENTS: "/admin/payments",
  LOGS: "/admin/logs",
  SETTINGS: "/admin/settings",
  PROJECTDETAILS: (id: string) => {
    return `/admin/projects/${id}`;
  },
  PROJECTPHASES: (id: string) => {
    return `/admin/projects/${id}/phases`;
  },
  PROJECTUPDATES: (id: string) => {
    return `/admin/projects/${id}/updates`;
  },
  PROJECTFILES: (id: string) => {
    return `/admin/projects/${id}/files`;
  },
  PROJECTTASKS: (id: string) => {
    return `/admin/projects/${id}/tasks`;
  },
  PROJECTPAYMENTS: (id: string) => {
    return `/admin/projects/${id}/payments`;
  },

  CLIENTDETAILS: (id: string) => {
    return `/client/${id}`;
  },
  CLIENTUPDATES: (id: string) => {
    return `/client/${id}/updates`;
  },
  CLIENTFILES: (id: string) => {
    return `/client/${id}/files`;
  },
  CLIENTPAYMENTS: (id: string) => {
    return `/client/${id}/payments`;
  },
};

export const SIDELINKS = [
  {
    title: "Dashboard",
    href: ROUTES.ADMIN,
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: ROUTES.PROJECTS,
    icon: Blocks,
  },
  {
    title: "Users",
    href: ROUTES.USERS,
    icon: UsersRound,
  },
  {
    title: "Payments",
    href: ROUTES.PAYMENTS,
    icon: Wallet,
  },
  {
    title: "Logs",
    href: ROUTES.LOGS,
    icon: Logs,
  },
  {
    title: "Settings",
    href: ROUTES.SETTINGS,
    icon: Settings,
  },
];
