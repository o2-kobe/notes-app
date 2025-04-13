import { useNavigate } from "react-router-dom";
import ProfileInfo from "./Cards/ProfileInfo";

function Navbar() {
  const navigate = useNavigate();

  function onLogout() {
    navigate("/login");
  }

  return (
    <nav className="bg-white flex items-center justify-between px-6 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      <ProfileInfo onLogout={onLogout} />
    </nav>
  );
}

export default Navbar;
