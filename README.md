# solana_odev_1

 İlk Ödevini Teslim Et
Bu ödevi kendini test edebilmen için hazırladık. Amacımız araştırma becerilerini geliştirmek. Bu aşamada bu ödevi tamamlayamıyor olabilirsin. Bu gayet normal moralini bozmadan derslere devam et. Hep beraber gelişeceğiz. 💪

İlk ödevin Solana üzerinde kişileştirilmiş cüzdan projesi yapmak olacak. Bu proje Solana üzerindeki cüzdan ve cüzdan işlemlerini takip etmek için kullanılacaktır. Bazı fonksiyonlar gerektiği yerde parametre alması gerekiyor. 

📌 Notlar

Bu projeyi typescript ya da javascript dilinde kodlayabilirsin. Sana ödevinde yardımcı olabileceğini düşündüğümüz dokümanlar şu şekilde: 😎

Solana Test Validator | Solana Validator (solanalabs.com)

Keypairs and Wallets | Solana Cookbook

Send and Receive Tokens | Solana Validator (solanalabs.com)

Ödevi tamamladığında aşağı kısımdan github reposu olarak teslim edebilirsin. 

Fonksiyonların gerçek Solana ağında işlem yapmasına gerek yoktur. Dilersen Solana testnet ya da devnet ağını kullanabilir ya da ödevinin temel kodlamasını yapıp teslim edebilirsin.

⏰ Son teslim tarihi: 5 Şubat Pazartesi 20:00

Wallet Oluşturma ve Yönetme

wallet.ts/.js dosyasında aşağıdaki komutlar belirtilen işlemleri yapmalıdır. 👇

new komutu ile Solana üzerinde bir cüzdan oluşturup, cüzdan bilgileri aynı dosyadaki wallet.json dosyasına kaydedilmelidir.

Aynı zamanda oluşturulan cüzdanın json dosyasında bakiyesi de kaydedilmelidir.

airdrop [X] komutu ile X kadar ya da varsayılan olarak 1 SOL airdrop yapılacak.

balance komutu ile önceki adımda oluşturulan cüzdan için bakiye kontrolü yapılmalıdır.

transer [otherPublicKey][Amount] komutu  otherPublicKey parametresine girilen cüzdan adresine Amount parametresine girilen değer kadar transfer yapması gerekli ve işlem sonucu ekrana yazılmalıdır.

Bu transfer önceki adımlarda oluşturduğun cüzdan adresinden yapılmalıdır.

İleri Düzey (Opsiyonel)

Anlık blok yüksekliği, işlem sayısı gibi Solana ağının genel istatistiklerini görüntülenebilmelidir.

Kullanıcıların birden fazla cüzdan arasında geçiş yapabilmesi ve her birini ayrı ayrı yönetebilmesi sağlanmalıdır.

Belirli bir işlem gerçekleştiğinde (örneğin, belirli bir miktarın üzerinde transfer alındığında) kullanıcıya bildirim gönderilmelidir.
