import { useRef } from "react";

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
        { role: "model", text: "Generating..." },
      ]);
      generateResponse([...chatStorage, { role: "user", text: userMsg }]);
    }, 600);
  };

  return (
    <form className="w-full max-w-3xl flex items-center space-x-2 p-3 bg-white shadow-md sticky bottom-0 h-[60px]" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your query..."
          className="flex-grow p-2 rounded-lg border border-gray-300 text-sm sm:text-base"
        />
        <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-200 transition">
          ✈️
        </button>
      </form>
  );
}

export default Chatform;
