// -----------------Set Date-----------------
//Selecet Span
const date = document.getElementById("date");  // HTML içinde id'si "date" olan bir elementi seçiyoruz.
date.innerHTML = new Date().getFullYear();  // Seçilen elementin içeriğini güncelliyoruz, içeriği şu anki yıl olarak ayarlıyoruz.

// -----------------Close Links-----------------
//Menüyü açma kapatma fonksiyonu
const navToggle = document.querySelector(".nav-toggle");  // HTML içinde class'ı "nav-toggle" olan bir elementi seçiyoruz.
const linksContainer = document.querySelector(".links-container");  // HTML içinde class'ı "links-container" olan bir elementi seçiyoruz.
const links = document.querySelector(".links");  // HTML içinde class'ı "links" olan bir elementi seçiyoruz.

navToggle.addEventListener("click", function () { // "nav-toggle" elementine tıklandığında aşağıdaki fonksiyon çalışacak
    const linksHeight = links.getBoundingClientRect().height; // linksin yüksekliği
    const containerHeight = linksContainer.getBoundingClientRect().height; // linksContainer'ın mevcut yüksekliği
    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px` // Eğer containerHeight 0 ise (yani menü kapalıysa), linksContainer'ın yüksekliğini links'ın yüksekliği kadar ayarla
    }
    else {
        linksContainer.style.height = 0; // Aksi halde (yani menü açıksa), linksContainer'ın yüksekliğini sıfıra ayarla
    }
});

// -----------------Fixed Navbar-----------------
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
    // Olay dinleyicisi içeriği buraya yazılacak
    const scrollHeight = window.scrollY; // Sayfanın dikey olarak ne kadar kaydırıldığını piksel cinsinden verir.
    const navHeight = navbar.getBoundingClientRect().height; // navHeight, sabit gezinme çubuğunun yüksekliğini piksel cinsinden verir (getBoundingClientRect() fonksiyonu kullanılarak).
    // Eğer sayfa yukarı kaydırıldığında (scrollHeight > navHeight), navbar elementine "fixed-nav" sınıfı eklenir; aksi takdirde, bu sınıf kaldırılır.
    if (scrollHeight > navHeight) {
        navbar.classList.add("fixed-nav");
    }
    else {
        navbar.classList.remove("fixed-nav");
    }

    // Setup Back to Top Link - Ayrıca, sayfa yukarıda belirli bir mesafeden fazla kaydırıldığında (scrollHeight > 500), topLink elementine "show-link" sınıfı eklenir; aksi takdirde, bu sınıf kaldırılır.
    if (scrollHeight > 500) {
        topLink.classList.add("show-link");
    }
    else {
        topLink.classList.remove("show-link");
    }
    // Bu kod bloğu, sayfa yukarı kaydırıldıkça sabit bir gezinme çubuğu ekler ve sayfa yukarıda belirli bir mesafeden fazla kaydırıldığında sayfa üstüne dönme bağlantısını görünür kılar. CSS tarafında, "fixed-nav" sınıfı genellikle gezinme çubuğuna sabit bir pozisyon ekler, "show-link" sınıfı ise sayfa üstüne dönme bağlantısının görünürlüğünü sağlar.
});

// -----------------Smooth Scroll-----------------
// Select Links
const scrollLinks = document.querySelectorAll(".scroll-link"); //Sayfadaki tüm elementleri seçer

scrollLinks.forEach((link) => { //scrollLinks koleksiyonundaki her bir bağlantıya bir olay dinleyici eklenir
    link.addEventListener("click", (e) => { //Bağlantıya tıklandığında çalışacak işlev, (e) => { ... } içine yazılır.
        // Prevent Default
        e.preventDefault(); // e.preventDefault() ile bağlantıya tıklama olayının varsayılan davranışı engellenir. Bu, bağlantının sayfanın belirli bir yerine hızlıca atlamasını önler.

        // Navigate to Specific Spot
        const id = e.currentTarget.getAttribute("href").slice(1); // e.currentTarget.getAttribute("href") ile tıklanan bağlantının "href" özelliğinden hedefin id'sini alır. slice(1) ile "#" karakterini kaldırarak sadece id'yi alır.
        const element = document.getElementById(id); //Bu id ile document.getElementById(id) ile sayfadaki hedef elementi seçilir.
        // Calculate the Heights
        const navHeight = navbar.getBoundingClientRect().height; //navbar.getBoundingClientRect().height ile sabit gezinme çubuğunun yüksekliği alınır.
        const containerHeight = linksContainer.getBoundingClientRect().height; //linksContainer.getBoundingClientRect().height ile menü bağlantılarının içeren konteynerin yüksekliği alınır.
        const fixedNav = navbar.classList.contains("fixed-nav"); //navbar.classList.contains("fixed-nav") ile sabit gezinme çubuğunun varlığı kontrol edilir.
        let position = element.offsetTop - navHeight; // element.offsetTop - navHeight ile hedef elementin sayfa üzerindeki dikey pozisyonu alınır.

        if (!fixedNav) {
            position = position - navHeight; // Eğer sabit gezinme çubuğu yoksa, bu değerin üzerine bir daha navHeight eklenir.
        }
        if (navHeight > 82) {
            position = position + containerHeight; // Eğer sabit gezinme çubuğu varsa ve çubuk yüksekliği 82 pikselden büyükse, containerHeight kadar daha eklenir.
        }
        window.scrollTo({ // Sayfa belirli bir yere yumuşak bir şekilde kaydırılır.
            left: 0,
            top: position,
        });
        linksContainer.style.height = 0; // Menü bağlantılarını içeren konteynerin yüksekliği sıfıra ayarlanır. Bu, bağlantıya tıkladıktan sonra menünün otomatik olarak kapatılmasını sağlar. Bu kod, belirli bir bağlantıya tıklandığında sayfanın belirli bir bölgesine yumuşak bir şekilde kaydırmak ve aynı zamanda menüyü otomatik olarak kapatmak için kullanılır.
    });

});
