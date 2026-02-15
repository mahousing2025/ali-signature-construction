function qs(sel, root=document){ return root.querySelector(sel); }
function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav
  const burger = qs("#burger");
  const links = qs("#navLinks");
  if (burger && links){
    burger.addEventListener("click", () => {
      links.classList.toggle("open");
      burger.setAttribute("aria-expanded", links.classList.contains("open") ? "true" : "false");
    });
  }

  // Projects filter
  const pills = qsa("[data-filter]");
  const cards = qsa("[data-cat]");
  if (pills.length && cards.length){
    pills.forEach(p => p.addEventListener("click", () => {
      pills.forEach(x => x.classList.remove("active"));
      p.classList.add("active");
      const filter = p.getAttribute("data-filter");
      cards.forEach(c => {
        const cat = c.getAttribute("data-cat");
        const show = (filter === "all") || (cat && cat.split(",").includes(filter));
        c.style.display = show ? "" : "none";
      });
    }));
  }

  

  // Contact form -> mailto (simple static)
  const form = qs("#contactForm");
  if (form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = qs("#name").value.trim();
      const phone = qs("#phone").value.trim();
      const service = qs("#service").value.trim();
      const message = qs("#message").value.trim();

      const subject = encodeURIComponent(`Estimate Request - ${service || "General"} (${name || "Client"})`);
      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}\n`
      );

      // CHANGE THIS EMAIL:
      const to = "your-email@example.com";
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }

  const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function rotateSlides(){
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
}

setInterval(rotateSlides, 4000);

});

