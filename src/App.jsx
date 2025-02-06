import React, { useEffect, useRef, useState } from "react";
import Chatform from "./Components/Chatform";
import Chattext from "./Components/Chattext";
import "./index.css";


const ChatApp = () => {
  
  const [chatStorage, setChatStorage] = useState([]);
  const msgRef = useRef(null);

  const generateResponse = async (history) => {
    const updateHistory=(response)=>{
      console.log(response);
      setChatStorage(prev=>[...prev.filter((msg)=>msg.text!=="Generating..."),{role:"model",text:response}])
      
    }
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = [
        { "Model": "model 1", "time": "1s", "Token Count": "45", "Response": "Response from model 1" },
        { "Model": "model 2", "time": "2s", "Token Count": "60", "Response": "Response from model 2" },
        { "Model": "model 3", "time": "2s", "Token Count": "60", "Response": "Response from model 3" }
      ]
      updateHistory(data)
      

    if (!response.ok) throw new Error(data.error.message || "something went wrong");
      
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatStorage]);

  return (
    <div className="bg-white h-screen flex flex-col items-center justify-between overflow-hidden">
      <header className="w-full bg-[#85D1DB] text-center py-4 text-xl font-bold shadow-md z-10 ">
        LLM Output Comparisons
      </header>

      <main className="w-full max-w-7xl flex flex-col items-center space-y-4 flex-grow overflow-hidden bg-white">
        <div className="w-full flex flex-col items-center pl-5 pt-5 pr-5 space-y-4 flex-grow max-h-[80vh] overflow-y-auto pr-4 thin-scrollbar">
          <div className="w-full max-w-5xl">
            {/* User Message */}
            
            {chatStorage.map((obj, idx) => (
              <Chattext key={idx} obj={obj} />
            ))}

            <div ref={msgRef} />
            {/* Model Responses */}
            

          </div>
        </div>
      </main>

      <Chatform
            setChatStorage={setChatStorage}
            chatStorage={chatStorage}
            generateResponse={generateResponse}
      />

      <footer className="w-full bg-black text-center py-3 text-xs sm:text-sm text-white shadow-md">
        © 2025 LLM Comparisons. All rights reserved.
      </footer>
    </div>
  );
};

export default ChatApp;
