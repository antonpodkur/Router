import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";

interface UserProfileCardProps {
  username: string;
  email: string;
  registeredAt: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  username,
  email,
  registeredAt,
}) => {
  return (
    <>
      {/*<!-- Component: User profile card --> */}
      <div className="overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200">
        {/*  <!-- Image --> */}
        <figure className="p-6 pb-0">
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full text-white">
            <img
              src="https://i.pravatar.cc/80?img=22"
              alt="user name"
              title="user name"
              width="80"
              height="80"
              className="max-w-full rounded-full"
            />
          </span>
        </figure>
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="mb-4">
            <h3 className="text-xl font-medium text-slate-700">
              {username}
            </h3>
            <p className=" text-slate-400">
                {email}
            </p>
            <p className=" text-slate-400">
                {new Date(registeredAt).toDateString()}
            </p>
          </header>
        </div>
      </div>
      {/*<!-- End User profile card --> */}
    </>
  );
};

export default UserProfileCard;
