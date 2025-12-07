Markdown

#  Sophy Chat App

Modern ve kullanıcı dostu bir chat arayüzü uygulaması. React, Vite ve Tailwind CSS kullanılarak geliştirilmiş, gerçek zamanlı mesajlaşma deneyimi sunan bir case study projesi.

##  Proje Özeti

Sophy Chat App, React, Vite ve Tailwind CSS teknolojileri kullanılarak geliştirilmiş modern bir chat arayüzü uygulamasıdır. Backend entegrasyonu olmadan, tamamen frontend tabanlı bir mock API servisi ile gerçekçi bir asenkron veri akışı simüle edilmiştir. Proje, component-based mimari, state yönetimi ve modern UI/UX pratiklerini sergilemektedir.

###  Teknoloji Stack

- **React 18.2.0** - UI kütüphanesi
- **Vite 7.2.4** - Build tool ve development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript özellikleri

##  Kurulum (Installation)

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Adımlar

1. Projeyi indirin ve klasöre gidin:
```bash
cd sophy-chat-app
Bağımlılıkları yükleyin:

Bash

npm install
Uygulamayı başlatın:

Bash

npm run dev
Tarayıcınızda açın:

http://localhost:5173
 Proje Mimarisi
 Dizin Yapısı
sophy-chat-app/
├── src/
│   ├── App.jsx              # Ana state yönetimi (Merkezi kontrol)
│   ├── main.jsx             # React uygulaması giriş noktası
│   ├── mockApi.js           # Backend simülasyonu ve asenkron veri akışı
│   └── components/
│       ├── Sidebar.jsx      # Konuşma listesi ve arama bileşeni
│       └── ChatPanel.jsx    # Mesaj görüntüleme ve gönderme bileşeni
 Ana Bileşenler
App.jsx - Merkezi State Yönetimi
Tüm uygulama state'lerini yönetir (conversations, selectedConversationId, loading)

useState ve useEffect hook'ları ile veri yönetimi

Prop drilling ile state'i alt bileşenlere dağıtır

components/Sidebar.jsx - Konuşma Listesi
Konuşma listesini görüntüler

Client-side arama/filtreleme özelliği

Okunmamış mesaj bildirimleri (badges)

components/ChatPanel.jsx - Mesajlaşma Arayüzü
Mesaj görüntüleme ve gönderme

Skeleton loading animasyonları

Sticky footer ile mesaj input alanı

mockApi.js - Mock API Servisi
Backend simülasyonu için Promise ve setTimeout kullanımı

Asenkron veri akışı simülasyonu

getConversations() - Konuşma listesi getirme

getMessages(conversationId) - Mesajları getirme

sendMessage(conversationId, messageContent) - Mesaj gönderme ve otomatik cevap

Öne Çıkan Özellikler (Bonuslar)
 Kullanıcı Dostu Arama Çubuğu
Client-side filtering: Konuşma başlıklarına göre anlık arama

useMemo hook'u ile performans optimizasyonu

 Optimistic UI ile Anlık Mesaj Gönderme
Kullanıcı mesajı gönderilir gönderilmez UI'da görünür

Backend yanıtı beklenmeden anında geri bildirim sağlanır

 Skeleton Loading ile Modern Yükleme Ekranı
Gri renkli, titreyen (animate-pulse) yükleme animasyonları

Kullanıcıya içerik yüklenirken görsel geri bildirim

 Okunmamış Mesaj Bildirimleri (Badges)
Kırmızı yuvarlak badge ile görsel bildirim

Konuşma seçildiğinde otomatik sıfırlama

 Otomatik Bot Cevabı
Kullanıcı mesajından 1 saniye sonra otomatik assistant cevabı simülasyonu

 Bu Projeyi Nasıl Yaptım? (Teknik Açıklama)
Backend Simülasyonu: Promise ve setTimeout
Backend entegrasyonu olmadığı için, gerçekçi bir asenkron API deneyimi oluşturmak amacıyla Promise ve setTimeout kullanarak bir Mock API servisi geliştirdim. Bu yaklaşım, gerçek API çağrılarındaki ağ gecikmesini (network latency) simüle etmemi sağladı.

Merkezi State Yönetimi: App.jsx
React'in useState ve useEffect hook'larını kullanarak tüm uygulama state'ini App.jsx üzerinde merkezi olarak yönettim. Bu "Single Source of Truth" yaklaşımı sayesinde veri akışını kolayca takip edebildim ve yönetebildim.

Component-Based Mimari
UI'ı yeniden kullanılabilir ve modüler bileşenlere (Sidebar, ChatPanel) ayırdım. Bu bileşenler kendi içinde bağımsız çalışırken, gerekli verileri props aracılığıyla ana bileşenden alır.

Tailwind CSS
Utility-first yaklaşımıyla hızlı ve responsive bir tasarım oluşturdum.

Optimistic UI Updates
Kullanıcı deneyimini iyileştirmek için Optimistic UI pattern'ini uyguladım: Mesaj gönderildiğinde sunucu yanıtını beklemeden ekrana yansıtarak uygulamanın daha hızlı hissedilmesini sağladım.

 Notlar
Bu proje bir case study olarak geliştirilmiştir.

Backend entegrasyonu yoktur, tüm veri mock API üzerinden gelir.