import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";

function AddEditNote({ noteData, type, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTag] = useState([]);

  const [error, setError] = useState(null);

  // Add Note
  async function addNewNote() {}

  // Edit Note
  async function editNote() {}

  function handleAddNote() {
    if (!title) {
      setError("Please enter a title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  }

  return (
    <div className="relative">
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500 cursor-pointer"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400 hover:text-slate-50" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-500 bg-slate-100/60 outline-none"
          placeholder="Add title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-100/60 py-2 rounded-md "
          placeholder="Add Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTag={setTag} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3 cursor-pointer "
        onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
  );
}

export default AddEditNote;
