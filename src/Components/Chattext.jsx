
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Chattext = ({ obj }) => {
  const renderMessageContent = () => {
    if (obj.role === "user") {
      return (
        <div className="bg-blue-200 p-2 rounded-lg shadow-md self-end mb-4 ml-auto 
  max-w-[50%] w-fit break-words">
  <p className="text-gray-600 text-sm sm:text-base ">{obj.text}</p>
</div>
      );
    }

    if (obj.role === "model") {
      if (obj.isError) {
        return (
          <div className="bg-red-200 p-3 rounded-lg shadow-md w-full sm:w-3/4 md:w-[48%] mb-4 text-red-700">
            <p className="font-bold text-lg sm:text-md">Error</p>
            <p className="mt-2 text-sm sm:text-base">{obj.text || "An error occurred."}</p>
          </div>
        );
      }

      const responses = JSON.parse(obj.text); // Assuming `obj.text` is already parsed

      return (
        <div className="flex flex-wrap justify-center md:justify-between w-full gap-4 h-auto items-start">
          {responses.map((modelResponse, index) => (
            <div
              key={index}
              className="bg-[#ece3ff] flex flex-col p-4 rounded-lg shadow-md w-full sm:w-3/4 md:w-[48%] mb-4 transition-all h-auto"
            >
              <h2 className="font-bold text-md sm:text-base text-gray-700">{modelResponse.Model}</h2>
              <div className="mt-2 text-sm sm:text-base">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <p className="mb-2">{children}</p>,
                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    del: ({ children }) => <del className="line-through">{children}</del>,
                    blockquote: ({ children }) => (
                      <blockquote className="pl-4 border-l-4 border-gray-400 italic mb-2">
                        {children}
                      </blockquote>
                    ),
                    ul: ({ children }) => <ul className="list-disc pl-6 mb-2 ">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-6 mb-2 ">{children}</ol>,
                    li: ({ children }) => <li className="mb-1 ">{children}</li>,
                    code: ({ inline, className, children }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      return inline ? (
                        <code className="bg-gray-200 text-red-600 px-1 rounded">{children}</code>
                      ) : (
                        <SyntaxHighlighter
                          style={vs2015}
                          language={match ? match[1] : "plaintext"}
                          className="rounded-md my-2"
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      );
                    },
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {children}
                      </a>
                    ),
                    img: ({ src, alt }) => <img src={src} alt={alt} className="max-w-full rounded-md my-2" />,
                    h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,  // Reduced from 2xl to xl
                    h2: ({ children }) => <h2 className="text-md font-bold mb-2">{children}</h2>,  // Reduced from xl to lg
                    h3: ({ children }) => <h3 className="text-base font-bold mb-2">{children}</h3>,  // Reduced from lg to md
                    h4: ({ children }) => <h4 className="text-sm font-bold mb-2">{children}</h4>, // Reduced from md to base
                    h5: ({ children }) => <h5 className="text-xs font-bold mb-2">{children}</h5>,   // Reduced from base to sm
                    h6: ({ children }) => <h6 className="text-xs font-bold mb-2">{children}</h6>,   // Kept as xs
                  }}
                >
                  {modelResponse.Response}
                </ReactMarkdown>
              </div>
              <div className="mt-2 text-xs sm:text-sm text-gray-800 font-bold">Time taken: {modelResponse.time}</div>
              <div className="mt-2 text-xs sm:text-sm text-gray-800 font-bold">Token Count: {modelResponse["Token Count"]}</div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return renderMessageContent();
};

export default Chattext;
