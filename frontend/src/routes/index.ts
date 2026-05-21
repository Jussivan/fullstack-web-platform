import { IncidentsPage } from "../pages/incidents";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: IncidentsPage,
  },
  {
    path: "/incidents",
    name: "Incidents",
    component: IncidentsPage,
  },
];

export default routes;

