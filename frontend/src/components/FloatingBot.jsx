import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] =useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  //scroll to the bottom of the chat whenever messages updates
  useEffect(( ) => {
    if (isOpen) { //only scroll if the window is open
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  //initial welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ sender: 'bot', text: 'Hi there! How can I help you today?' }]);
    }
  }, [isOpen]); // Only run when isOpen changes and messages are empty

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const newUserMessage = { sender: 'user', text: messageText.trim() };
    setMessages((prevMessages) => [...prevMessages,newUserMessage]);
    setInputMessage('');

    setIsTyping(true);

    const apiKey = ""; // canvas will inject the key.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    let chatHistory = [];
    // include previous messages for context
    messages.forEach(msg => {
      chatHistory.push({ role: msg.sender === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] });
    });
    chatHistory.push({ role: "user", parts: [{ text: messageText.trim() }] }); //add current user message

    const payload = {
      contents: chatHistory,
    };

    const maxRetries = 5;
    let retries = 0;
    let apiResponse = null;

    try {
      while (retries < maxRetries) {
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API error response:',errorData);
            throw new Error(`API error: ${response.status} ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
          }

          apiResponse = await response.json();
          break;

        } catch (error) {
          if (error.message.includes('429') || error.message.includes('Too Many Requests')) {
            const delay = Math.pow(2, retries) * 1000;
            console.warn(`Rate limit hit. Retrying in ${delay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            retries++;
          } else {
            throw error;
          }
        }
      }

      if (!apiResponse) {
        throw new Error('Failed to get response from AI after multiple retries.');
      }

      if (apiResponse.candidates && apiResponse.candidates.length > 0 &&
          apiResponse.candidates[0].content && apiResponse.candidates[0].content.parts &&
          apiResponse.candidates[0].content.parts.length > 0) {
        const botReply = apiResponse.candidates[0].content.parts[0].text;
        const botResponse = { sender: 'bot', text: botReply };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } else {
        console.error('Unexpected AI API response structure:', apiResponse);
        toast.error('Unexpected response from AI chatbot.');
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Error: Unexpected AI response.' }]);
      }

    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      let errorMessage = 'Failed to get response from chatbot.';
      if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Error: ' + errorMessage }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendClick = () => {
    sendMessage(inputMessage);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* floating Chatbot Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out z-[1000] focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] bg-white dark:bg-gray-900 rounded-lg shadow-xl flex flex-col z-[999] border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out transform origin-bottom-right scale-100 opacity-100">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-blue-600 text-white rounded-t-lg">
            <h3 className="text-lg font-semibold">NoteDown AI Chat</h3>
            <button onClick={toggleChatbot} className="p-1 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300" aria-label="Close Chat">
              <X size={20} />
            </button>
          </div>

          {/* chat History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-gray-800 dark:text-gray-200">
            {messages.length === 0 && !isTyping && (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                Type a message to start chatting!
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-bl-none">
                  Typing...
                  <span className="animate-pulse inline-block ml-1">.</span>
                  <span className="animate-pulse inline-block ml-0.5 animation-delay-100">.</span>
                  <span className="animate-pulse inline-block ml-0.5 animation-delay-200">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Scroll target */}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              value={inputMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button
              onClick={handleSendClick}
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isTyping || !inputMessage.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
