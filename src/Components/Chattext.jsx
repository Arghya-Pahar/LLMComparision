function Chattext({ obj }) {

    if (obj.role === "user") {
      return (
        <div className="bg-blue-100 p-2 rounded-lg shadow-md w-fit self-end mb-4 ml-auto">
              <p className=" text-gray-600 text-sm sm:text-base text-right">
              {obj.text}
              </p>
        </div>
      );
    } 
    if (obj.role === "model" && Array.isArray(obj.text)) {
        return (
          <div className="flex flex-wrap justify-center md:justify-between w-full gap-4">
            {obj.text.map((modelResponse, index) => (
              <div
                key={index}
                className="bg-[#B6F2D1] p-4 rounded-lg shadow-md w-full sm:w-3/4 md:w-[48%] mb-4 transition-all"
              >
                <h2 className="font-bold text-lg sm:text-md text-gray-700">
                  {modelResponse.Model}
                </h2>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  {modelResponse.Response}
                </p>
                <div className="mt-2 text-xs sm:text-sm text-gray-500">
                  Time taken: {modelResponse.time}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-gray-500">
                  Token Count: {modelResponse["Token Count"]}
                </div>
              </div>
            ))}
          </div>
        );
      }
      return null;
  }
  
  export default Chattext;
  