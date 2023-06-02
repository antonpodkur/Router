import { useSelector } from "react-redux";
import RoutesDropdownBasic from "../components/RoutesDropdownBasic";
import UserProfileCard from "../components/UserProfileCard";
import { selectUser } from "../features/auth/authSlice";
import SpinnerBaseSquareHorizontal from "../components/SpinnerBaseSquareHorizontal";
import { useEffect, useState } from "react";
import { Route as RouteModel } from "../models/route";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AlertSimpleDanger from "../components/alerts/AlertSimpleDanger";
import ImportRouteModal from "../components/ImportRouteModal";
import { useTranslation } from "react-i18next";

const PersonalCabinet: React.FC<{}> = () => {
  const user = useSelector(selectUser);
  const {t, i18n} = useTranslation()
  const [isLoading, setIsLoading] = useState(true);
  const [routes, setRoutes] = useState<RouteModel[]>([]);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const axiosPrivate = useAxiosPrivate();

  const fetchRoutes = async () => {
    try {
      const response = await axiosPrivate.get(`/api/v1/route/user/${user!.id}`);
      if (response.data.status !== "success") {
        setErrMsg("Failed to fetch routes");
      }
      if (response.status !== 200) {
        setErrMsg("Failed to fetch routes");
      }
      setRoutes(response.data.data);
      setErrMsg(null);
    } catch (err) {
      setErrMsg("Failed to fetch routes");
    }
  };

  useEffect(() => {
    fetchRoutes();
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <SpinnerBaseSquareHorizontal />;
  }
  return (
    <section className="flex flex-col items-center">
      {errMsg && <AlertSimpleDanger message={errMsg} />}
      <div className="container m-8 font-bold text-2xl text-center md:text-left">
        {t("Welcome back")}, {user!.name}!
      </div>
      <div className="container m-2">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 lg:col-span-3">
            <UserProfileCard
              username={user!.name}
              email={user!.email}
              registeredAt={user!.created_at}
            />
          </div>
          <div className="col-span-4 lg:col-span-9 mx-2">
            <div className="flex flex-row px-4 justify-between">
              <div className="text-2xl font-bold text-center md:text-left">{t("My routes")}</div>
              <ImportRouteModal fetchRoutes={fetchRoutes}/>
            </div>
            {!routes && <div className="mt-4 text-md font-medium text-slate-800">{t("No routes yet")}</div>}
            <ul className="divide-y divide-slate-100">
              {routes &&
                routes.map((route) => (
                  <li
                    key={route.id}
                    className="flex items-center gap-4 px-4 py-3"
                  >
                    <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center flex-1 overflow-hidden">
                      <label
                        className="w-full text-base font-medium truncate cursor-pointer text-slate-800"
                        htmlFor="id-30a"
                      >
                        {route.name}
                      </label>
                      <label
                        className="w-full text-base truncate cursor-pointer text-slate-500"
                        htmlFor="id-30a"
                      >
                        {new Date(route.created_at).toLocaleDateString()}
                      </label>
                    </div>
                    <div className="relative flex flex-wrap items-center">
                      <RoutesDropdownBasic route={route} fetchRoutes={fetchRoutes}/>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalCabinet;
