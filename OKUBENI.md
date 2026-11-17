# OCR ve PDF Aracı: GitHub ile .exe ve Mac uygulaması yapma

Bu paket, GitHub'ın ücretsiz sunucularında uygulamayı senin yerine derler.
Sonunda iki dosya elde edersin:

- **Windows:** `OCR-PDF-Araci-Windows.exe` (çift tıkla, kurulum yok)
- **Mac:** `OCR-PDF-Araci-Mac-arm64.zip` (M1/M2/M3/M4 Mac) ve `OCR-PDF-Araci-Mac-x64.zip` (Intel Mac)

Derleme bittikten sonra uygulama internet istemez.

## Adımlar (yaklaşık 10 dakika)

1. **github.com** adresinde ücretsiz hesap aç (varsa giriş yap).
2. Sağ üstte **+** → **New repository** de. Bir ad yaz (örn. `ocr-pdf`). **Public** seç. **Create repository**'ye bas.
3. Açılan sayfada **uploading an existing file** bağlantısına tıkla.
4. Bu ZIP'i klasöre çıkar. **İçindeki tüm dosya ve klasörleri** (app, scripts, main.js, package.json...) sayfaya sürükle. **Commit changes**'e bas.
   - Windows'ta `.github` klasörü de sürüklenir.
   - Mac'te `.github` klasörü gizli görünür (Finder'da Cmd+Shift+Nokta ile göster) ya da aşağıdaki "Sorun giderme"ye bak.
5. Üstteki **Actions** sekmesine gir. Gerekirse **I understand my workflows, enable them** de.
6. Soldan **Uygulamayi derle**'yi seç, sağdaki **Run workflow** → yeşil **Run workflow**'a bas.
7. 5-10 dakika bekle. İki satırın yanında yeşil ✓ görünce bitmiştir. Çalıştırmaya (en üstteki satıra) tıkla.
8. Sayfanın altındaki **Artifacts** bölümünden **Windows-exe** ve **Mac-uygulamasi** dosyalarını indir (zip içinde gelir, çıkar).

## İlk açılışta çıkabilecek uyarılar (normal)

- **Windows "bilgisayarınızı korudu" derse:** **Daha fazla bilgi** → **Yine de çalıştır**. Uygulama imzasız olduğu için çıkar.
- **Mac "açılamıyor" veya "hasarlı" derse:** Uygulamayı **Uygulamalar** klasörüne at, sağ tıkla → **Aç** → **Aç**. Hâlâ açılmazsa Terminal'e şunu yapıştır:
  `xattr -cr "/Applications/OCR PDF Araci.app"`
- Mac'in hangisi olduğunu bilmiyorsan: sol üst Elma menüsü → **Bu Mac Hakkında**. "Apple M..." yazıyorsa `arm64`, "Intel" yazıyorsa `x64` olanı kullan.

## Sorun giderme

- **Actions'ta "Uygulamayi derle" görünmüyorsa:** `.github` klasörü yüklenmemiş demektir. Repo sayfasında **Add file → Create new file** de. Dosya adı kutusuna `.github/workflows/build.yml` yaz. Bu paketteki `github-workflow-build.yml` dosyasının içeriğini kopyalayıp yapıştır, **Commit changes**'e bas.
- **Derleme kırmızı ✗ olursa:** Çalıştırmaya tıkla, kırmızı adıma tıkla, hata metnini kopyalayıp Claude'a yapıştır.

## Uygulamada neler var

- **OCR:** Görsel veya PDF'ten metin (Türkçe ve İngilizce), `.txt` / `.doc` olarak kaydetme, aranabilir PDF oluşturma.
- **PDF araçları:** önizleme, sayfa ayırma/silme/döndürme, birleştirme, filigran, sayfa numarası, sayfaları PNG olarak indirme.
