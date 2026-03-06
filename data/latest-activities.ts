export const latestActivities: Array<{
  title: string;
  description: string;
  time: string;
}> = [
  {
    title: "New update on the mobile app project",
    description: "User interface design has been completed",
    time: "5 min ago",
  },
  {
    title: "New update on the mobile app ",
    description: "User interface design has been completed",
    time: "5 min ago",
  },
  {
    title: "New update on the mobile project",
    description: "User interface design has been completed",
    time: "5 min ago",
  },
];

export const latestActivitiesCard = {
  title: "Latest Activities",
  subtitle: "Recent activity in your projects",
  footerLabel: "View All Activities",
  items: latestActivities,
} as const;
