import { getInitials, initialsToUpper } from "../../utils/helper";

function ProfileInfo({ onLogout, userInfo }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(userInfo?.fullName)}
      </div>

      <div>
        <p className="text-sm font-medium">
          {initialsToUpper(userInfo?.fullName)}
        </p>
        <button
          className="text-sm text-slate-700 underline cursor-pointer hover:no-underline"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
