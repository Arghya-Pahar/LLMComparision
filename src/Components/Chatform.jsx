import { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";



function Chatform({ setChatStorage, chatStorage, generateResponse }) {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    inputRef.current.focus();
    const userMsg = inputRef.current.value.trim();
    if (!userMsg) return;
    inputRef.current.value = "";

    setChatStorage((prev) => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setChatStorage((prev) => [
        ...prev,
        JSON.stringify({ role: "model", text: "Generating..." }),
      ]);
      generateResponse([...chatStorage, { role: "user", text: userMsg }]);
    }, 600);
  };

  return (
    <form className="w-full max-w-3xl flex items-center space-x-2 p-3 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.25)] drop-shadow-xl sticky bottom-0 h-[60px] mb-2" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your query..."
          className="flex-grow p-2 rounded-lg border-none focus:ring-0 focus:outline-none  text-sm sm:text-base"
        />
        <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-200 transition">
        <FontAwesomeIcon icon={faPaperPlane} className="text-black w-6 h-6" />
        </button>
      </form>
  );
}

export default Chatform;
