import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import CalendarView from "../Pages/CalendarView";
import GmailView from "../Pages/GmailView";
import ProfileAndSettings from "../Pages/ProfileAndSettings"; // 👈 সেটিংস পেজটি ইম্পোর্ট করুন

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <CalendarView />,
        loader: async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return null;
        },
      },
      {
        path: "gmail",
        element: <GmailView />,
      },
      {
        path: "settings", // 👑 নতুন ট্রেন্ডি পাথ: এখন সেটিংসে গেলে ইউআরএল হবে /settings
        element: <ProfileAndSettings />,
      },
    ],
  },
]);

export default router;
