import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatPanel from './components/ChatPanel';
import { getConversations, markConversationAsRead } from './mockApi';

function App() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConversations()
      .then((data) => {
        setConversations(data);
        if (data.length > 0) {
          setSelectedConversationId(data[0].id);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading conversations:', error);
        setLoading(false);
      });
  }, []);

  const handleConversationSelect = (id) => {
    setSelectedConversationId(id);
    
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === id ? { ...conv, unreadCount: 0 } : conv
      )
    );
    
    markConversationAsRead(id);
  };

  const handleMessageSent = (conversationId) => {
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-gray-600 text-lg">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        conversations={conversations}
        selectedId={selectedConversationId}
        onSelect={handleConversationSelect}
      />
      <ChatPanel 
        conversationId={selectedConversationId} 
        onMessageSent={handleMessageSent}
      />
    </div>
  );
}

export default App;