const mockConversations = [
  { id: 1, title: "Support Ticket #1", unreadCount: 3 },
  { id: 2, title: "Support Ticket #2", unreadCount: 1 },
  { id: 3, title: "Technical Question", unreadCount: 0 },
  { id: 4, title: "Product Inquiry", unreadCount: 2 },
  { id: 5, title: "Billing Issue", unreadCount: 4 },
];

const mockMessages = {
  1: {
    id: 1,
    messages: [
      { role: "user", content: "Merhaba, ürünümle ilgili bir sorun yaşıyorum." },
      { role: "assistant", content: "Merhaba! Size nasıl yardımcı olabilirim? Lütfen sorununuzu detaylı bir şekilde açıklayabilir misiniz?" },
      { role: "user", content: "Ürün teslim edilmedi ve ödeme yaptım." },
      { role: "assistant", content: "Anlıyorum. Öncelikle özür dilerim. Sipariş numaranızı paylaşabilir misiniz? Hemen kontrol edip size geri dönüş yapacağım." },
      { role: "user", content: "Sipariş numaram: #12345" },
      { role: "assistant", content: "Teşekkürler. Siparişinizi kontrol ettim. Ürününüz bugün kargoya verilecek ve 2-3 iş günü içinde size ulaşacak. Takip numaranızı size SMS ile göndereceğiz." },
    ],
  },
  2: {
    id: 2,
    messages: [
      { role: "user", content: "Hesabımı nasıl silebilirim?" },
      { role: "assistant", content: "Hesabınızı silmek için Ayarlar > Hesap > Hesabı Sil bölümünden işlemi gerçekleştirebilirsiniz. Hesabınız silindiğinde tüm verileriniz kalıcı olarak silinecektir." },
      { role: "user", content: "Verilerim geri getirilemez mi?" },
      { role: "assistant", content: "Evet, maalesef hesap silme işlemi geri alınamaz. Tüm verileriniz kalıcı olarak silinir. Eğer emin değilseniz, hesabınızı geçici olarak devre dışı bırakabilirsiniz." },
    ],
  },
  3: {
    id: 3,
    messages: [
      { role: "user", content: "API dokümantasyonunu nerede bulabilirim?" },
      { role: "assistant", content: "API dokümantasyonumuza https://api.example.com/docs adresinden ulaşabilirsiniz. Ayrıca GitHub repository'mizde de örnekler bulunmaktadır." },
      { role: "user", content: "Rate limit nedir?" },
      { role: "assistant", content: "Rate limit, API'nizi kötüye kullanımı önlemek için dakikada yapabileceğiniz istek sayısını sınırlar. Ücretsiz plan için dakikada 60 istek, premium plan için 300 istek limiti bulunmaktadır." },
    ],
  },
  4: {
    id: 4,
    messages: [
      { role: "user", content: "Yeni ürününüz hakkında bilgi almak istiyorum." },
      { role: "assistant", content: "Tabii ki! Hangi ürün hakkında bilgi almak istersiniz? Size detaylı bilgi verebilirim." },
      { role: "user", content: "Pro plan özellikleri nelerdir?" },
      { role: "assistant", content: "Pro planımız şu özellikleri içerir: Sınırsız API isteği, öncelikli destek, gelişmiş analitikler, özel entegrasyonlar ve daha fazlası. Aylık $29 veya yıllık $290 fiyatlandırma seçeneklerimiz bulunmaktadır." },
    ],
  },
  5: {
    id: 5,
    messages: [
      { role: "user", content: "Faturamda hatalı bir ücret görüyorum." },
      { role: "assistant", content: "Özür dilerim, bu durum için hemen ilgileniyorum. Fatura numaranızı ve hangi ücretin hatalı olduğunu paylaşabilir misiniz?" },
      { role: "user", content: "Fatura #INV-2024-001, çift ücretlendirme yapılmış." },
      { role: "assistant", content: "Anladım. Faturanızı kontrol ettim ve gerçekten de bir çift ücretlendirme söz konusu. Hemen düzeltiyorum ve fazla ücreti hesabınıza iade edeceğim. İşlem 3-5 iş günü içinde tamamlanacaktır." },
    ],
  },
};

export const getConversations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockConversations);
    }, 500);
  });
};

export const getMessages = (conversationId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const messages = mockMessages[conversationId];
      if (messages) {
        resolve(messages);
      } else {
        reject(new Error(`Conversation with id ${conversationId} not found`));
      }
    }, 500);
  });
};

export const sendMessage = (conversationId, messageContent) => {
  return new Promise((resolve) => {
    const userMessage = {
      role: "user",
      content: messageContent,
    };
    resolve({ message: userMessage, conversationId });
    
    setTimeout(() => {
      if (!mockMessages[conversationId]) {
        mockMessages[conversationId] = { id: conversationId, messages: [] };
      }
      
      const userMessageToSave = {
        role: "user",
        content: messageContent,
      };
      
      mockMessages[conversationId].messages.push(userMessageToSave);
      
      const assistantResponses = [
        "Anladım, size yardımcı olmaya çalışıyorum.",
        "Bu konuda daha fazla bilgi verebilirim.",
        "Sorunuzu inceliyorum, kısa süre içinde size dönüş yapacağım.",
        "Teşekkürler, mesajınızı aldım. En kısa sürede yanıtlayacağım.",
        "Bu durumu değerlendiriyorum ve size yardımcı olacağım.",
      ];
      
      const randomResponse = assistantResponses[Math.floor(Math.random() * assistantResponses.length)];
      
      const assistantMessage = {
        role: "assistant",
        content: randomResponse,
      };
      
      mockMessages[conversationId].messages.push(assistantMessage);
    }, 1000);
  });
};

export const markConversationAsRead = (conversationId) => {
  const conversation = mockConversations.find(conv => conv.id === conversationId);
  if (conversation) {
    conversation.unreadCount = 0;
  }
};
