import  { useEffect, useRef, useState } from "react";
import Chatform from "./Components/Chatform";
import Chattext from "./Components/Chattext";
import "./index.css";


const ChatApp = () => {
  
  const [chatStorage, setChatStorage] = useState([]);
  const msgRef = useRef(null);

  const generateResponse = async (history) => {
    const updateHistory=(response,isError=false)=>{
      setChatStorage(prev=>[...prev.filter((msg)=>msg.text!=="Generating..."),{role:"model",text:response,isError}])
      
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
        {
          "Model": "model 1",
          "time": "1s",
          "Token Count": "45",
          "Response": `Generating prime numbers is a common coding exercise.\n\nHere’s a simple Python script to print prime numbers up to 50:\n\n\`\`\`python\ndef is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprimes = [n for n in range(50) if is_prime(n)]\nprint("Prime numbers:", primes)\n\`\`\``
        },
        {
          "Model": "model 2",
          "time": "2s",
          "Token Count": "60",
          "Response": `To install Kubernetes on Linux, follow these steps:\n\n\`\`\`bash\n# Update package index\nsudo apt update -y\n\n# Install necessary packages\nsudo apt install -y apt-transport-https ca-certificates curl\n\n# Add Kubernetes GPG key\ncurl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -\n\n# Add Kubernetes repository\necho "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list\n\n# Install Kubernetes components\nsudo apt update -y\nsudo apt install -y kubelet kubeadm kubectl\n\`\`\`\n\nVerify installation:\n\n\`\`\`bash\nkubectl version --client\n\`\`\``
        },
        
          {
            "Model": "model 3",
            "time": "2s",
            "Token Count": "60",
            "Response": `# Kubernetes Overview\n\nKubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.\n\n## Key Features\n- Automated deployment and scaling\n- Load balancing\n- Self-healing mechanisms\n- Secret and configuration management\n\n## Components of Kubernetes\n1. **Master Node:** Manages the cluster and schedules workloads.\n2. **Worker Nodes:** Runs applications in containers.\n3. **Kubelet:** An agent that runs on each worker node.\n4. **Kube Proxy:** Handles network communication within the cluster.\n\nKubernetes makes it easier to manage containerized applications at scale.`
          },
            {
              "Model": "model 3",
              "time": "2s",
              "Token Count": "60",
              "Response": `# Kubernetes Overview\n\nKubernetes is an open-source system for automating .`
            },
            {
              "Model": "model 3",
              "time": "2s",
              "Token Count": "60",
              "Response": `# Kubernetes Overview\n\nKubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.\n\n## Key Features\n\n1. **Automated deployment and scaling**\n2. **Load balancing**\n3. **Self-healing mechanisms**\n4. **Secret and configuration management**\n\n## Components of Kubernetes\n\n1. **Master Node:** Manages the cluster and schedules workloads.\n2. **Worker Nodes:** Runs applications in containers.\n3. **Kubelet:** An agent that runs on each worker node.\n4. **Kube Proxy:** Handles network communication within the cluster.\n\nKubernetes makes it easier to manage containerized applications at scale.# Kubernetes Overview\n\nKubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.\n\n## Key Features\n\n1. **Automated deployment and scaling**\n2. **Load balancing**\n3. **Self-healing mechanisms**\n4. **Secret and configuration management**\n\n## Components of Kubernetes\n\n1. **Master Node:** Manages the cluster and schedules workloads.\n2. **Worker Nodes:** Runs applications in containers.\n3. **Kubelet:** An agent that runs on each worker node.\n4. **Kube Proxy:** Handles network communication within the cluster.\n\nKubernetes makes it easier to manage containerized applications at scale.`
            }
        
        
      ];
     

      // const data = [
      //   { "Model": "model 1", "time": "1s", "Token Count": "45", "Response": "Error" },
      //   { "Model": "model 2", "time": "2s", "Token Count": "60", "Response": "Error" },
      //   { "Model": "model 3", "time": "2s", "Token Count": "60", "Response": "Error" }
      // ]
      const apiResponse=JSON.stringify(data)
      updateHistory(apiResponse)
      

    if (!response.ok) throw new Error(data.error.message || "something went wrong");
      //updateHistory(apiResponse)

    } catch (error) {
      //updateHistory(error.message,true);
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
      <header className="w-full text-gray-700 bg-[#d9c7ff] text-center py-4 text-xl font-bold shadow-md z-10 ">
        LLM Output Comparisons
      </header>

      <main className="w-full max-w-7xl flex flex-col items-center space-y-4 flex-grow overflow-hidden bg-white">
        <div className="w-full flex flex-col items-center pl-5 pt-5 pr-5 space-y-4 flex-grow max-h-[80vh] overflow-y-auto thin-scrollbar">
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

      <footer className="w-full bg-black text-center py-1 text-xs sm:text-sm text-white shadow-md">
        © 2025 LLM Comparisons. All rights reserved.
      </footer>
    </div>
  );
};

export default ChatApp;
