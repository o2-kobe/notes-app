import { MdAdd } from "react-icons/md";
import NextCard from "../../components/Cards/NextCard";
import Navbar from "../../components/Navbar";
import AddEditNote from "./AddEditNote";
import { useState } from "react";
import Modal from "react-modal";

function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: true,
    type: "add",
    data: null,
  });

  return (
    <>
      <Navbar />

      <div className="w-[95%] mx-auto">
        {" "}
        {/*class has to be container*/}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NextCard
            title="Eat breakfast"
            date={new Date().toDateString()}
            content="I enjoy breakfast because it is filled with all the vitamins i need"
            tags="#food"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
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
