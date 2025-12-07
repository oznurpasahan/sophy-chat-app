import { useState, useEffect, useRef } from 'react';
import { getMessages, sendMessage as apiSendMessage } from '../mockApi';

function ChatPanel({ conversationId, onMessageSent }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }
    

    setLoading(true);
    getMessages(conversationId)
      .then((data) => {
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading messages:', error);
        setLoading(false);
      });
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversationId || sending) return;

    const messageContent = newMessage.trim();
    setNewMessage('');
    setSending(true);

    const userMessage = {
      role: 'user',
      content: messageContent,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      await apiSendMessage(conversationId, messageContent);
      
      if (onMessageSent) {
        onMessageSent(conversationId);
      }

      setTimeout(() => {
        getMessages(conversationId)
          .then((data) => {
            setMessages(data.messages || []);
            setSending(false);
          })
          .catch((error) => {
            console.error('Error loading assistant response:', error);
            setSending(false);
          });
      }, 1100);
    } catch (error) {
      console.error('Error sending message:', error);
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-lg">Bir konuşma seçin</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto w-full space-y-4">
          <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-1/3"></div>
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="h-16 bg-gray-200 rounded-lg animate-pulse w-2/3"></div>
            </div>
            <div className="flex justify-end">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-1/2"></div>
            </div>
            <div className="flex justify-start">
              <div className="h-20 bg-gray-200 rounded-lg animate-pulse w-3/4"></div>
            </div>
            <div className="flex justify-end">
              <div className="h-14 bg-gray-200 rounded-lg animate-pulse w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Mesajınızı yazın..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sending}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {sending ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPanel;

