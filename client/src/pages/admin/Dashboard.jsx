import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BLurCircle";
import { dateFormat } from "../../lib/dateFormat";

function Dashboard() {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });
  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: currency + dashboardData.totalRevenue || "0",
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || "0",
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UsersIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <div className="relative px-4 md:px-8 py-6 max-w-7xl mx-auto">
      <BlurCircle top="10%" left="90%" />
      <BlurCircle top="80%" left="90%" />
      <Title text1="Admin" text2="Dashboard" />

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1e1e2f] dark:to-[#1a1a27] rounded-xl p-5 flex items-center justify-between transition-transform hover:scale-[1.03] duration-300 shadow-md dark:shadow-lg"
          >
            <div>
              <h2 className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {card.title}
              </h2>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {card.value}
              </p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-800/20 p-2 rounded-full">
              <card.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Active Shows */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-8">
        Active Shows
      </h2>

      <div>
        <BlurCircle top="100px" left="-10%" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {dashboardData.activeShows.map((show) => (
            <div
              key={show._id}
              className="rounded-xl shadow-md dark:shadow-lg overflow-hidden bg-gray-100 dark:bg-[#1e1e2f] hover:shadow-xl transition-all"
            >
              <img
                src={show.movie.poster_path}
                className="w-full h-80 object-cover object-top"
                alt={show.movie.title}
              />
              <div className="p-4 space-y-1">
                <p className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                  {show.movie.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Price: {currency} {show.showPrice}
                </p>
                <p className="flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-400">
                  <StarIcon className="h-4 w-4" />
                  {show.movie.vote_average.toFixed(1)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {dateFormat(show.showDateTime)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Dashboard;
