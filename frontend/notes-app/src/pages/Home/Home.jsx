import { MdAdd } from "react-icons/md";
import NextCard from "../../components/Cards/NextCard";
import Navbar from "../../components/Navbar/Navbar";
import AddEditNote from "./AddEditNote";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  const getUserInfo = useCallback(async () => {
    try {
      const response = await axiosInstance("/user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [navigate]);

  // Get all Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/note");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, [getUserInfo]);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="w-[95%] mx-auto">
        {" "}
        {/*class has to be container*/}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes?.map((note) => (
            <NextCard
              key={note._id}
              title={note.title}
              date={note.createdAt}
              content={note.content}
              tags={note.tag?.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
              isPinned={true}
              onEdit={() => {}}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-violet-600 absolute right-10 bottom-10 cursor-pointer "
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white " />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}} //function that will be runned when the modal window is closed
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
          content: {
            width: "70%", // Set the width of the modal here
            margin: "auto", // Center it horizontally
          },
        }}
        contentLabel="Add/Edit Note" //accessibility support by describing the modal's content to screen readers
        className=""
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>
    </>
  );
}

export default Home;
