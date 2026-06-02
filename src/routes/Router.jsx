import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import CalendarView from "../Pages/CalendarView";
import GmailView from "../Pages/GmailView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/", // ডিফল্ট হোম পেজ হিসেবে ক্যালেন্ডার ভিউ দেখাবে
        element: <CalendarView />,
        loader: async () => {
          // আপনার দেওয়া ২ সেকেন্ডের ডিলে লোডার
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return null;
        },
      },
      {
        path: "/gmail", // জিমেইল ইনবক্স রাউট
        element: <GmailView />,
      },
    ],
  },
]);

export default router;
