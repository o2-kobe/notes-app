import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

function TagInput({ tags, setTag }) {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function addNewTag() {
    if (inputValue.trim() !== "") {
      setTag([...tags, inputValue.trim()]);
      setInputValue("");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addNewTag();
    }
  }

  function handleRemoveTag(tagToRemove) {
    setTag(tags.filter((tag) => tag !== tagToRemove));
  }

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, i) => (
            <span
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded "
              key={i}
            >
              #{tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose className="cursor-pointer hover:scale-[1.3] hover:text-red-400 transition-all " />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent outer px-3 py-2 rounded outline-none "
          value={inputValue}
          onChange={handleInputChange}
          placeholder="#Add tags"
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={addNewTag}
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 "
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
}

export default TagInput;
