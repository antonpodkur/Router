import { useSelector } from "react-redux";
import DropdownBasic from "../components/BasicDropdown";
import UserProfileCard from "../components/UserProfileCard";
import { selectUser } from "../features/auth/authSlice";
import SpinnerBaseSquareHorizontal from "../components/SpinnerBaseSquareHorizontal";
import { useEffect, useState } from "react";

const PersonalCabinet: React.FC<{}> = () => {
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <SpinnerBaseSquareHorizontal />;
  }
  return (
    <section className="flex flex-col items-center">
      <div className="container m-8 font-bold text-2xl">
        Welcome back, {user!.name}!
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
          <div className="col-span-4 lg:col-span-9">
            <div className="text-2xl font-bold">My routes</div>
            <ul className="divide-y divide-slate-100">
              <li className="flex items-center gap-4 px-4 py-3">
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center flex-1 overflow-hidden">
                  <label
                    className="w-full text-base truncate cursor-pointer text-slate-700"
                    htmlFor="id-30a"
                  >
                    {"My first route"}
                  </label>
                </div>

                <div className="relative flex flex-wrap items-center">
                  <DropdownBasic />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalCabinet;
