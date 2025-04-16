import { useNavigate } from "react-router-dom";
import ProfileInfo from "./Cards/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";
import { useState } from "react";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function onLogout() {
    navigate("/login");
  }

  function handleSearch() {}

  return (
    <nav className="bg-white flex items-center justify-between px-6 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClearSearch={() => setSearchQuery("")}
        handleSearch={handleSearch}
      />

      <ProfileInfo onLogout={onLogout} />
    </nav>
  );
}

export default Navbar;
