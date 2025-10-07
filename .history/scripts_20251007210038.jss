// Typing animation
const typedText = document.getElementById("typed-text");
const words = ["DevOps Engineer", "Azure Cloud Expert", "CI/CD Specialist", "Automation Enthusiast"];
let i = 0, j = 0, currentWord = "", isDeleting = false;

function type() {
  currentWord = words[i];
  if (isDeleting) {
    typedText.textContent = currentWord.substring(0, j--);
    if (j < 0) {
      isDeleting = false;
      i = (i + 1) % words.length;
      setTimeout(type, 400);
    } else setTimeout(type, 50);
  } else {
    typedText.textContent = currentWord.substring(0, j++);
    if (j === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1000);
    } else setTimeout(type, 100);
  }
}
type();

// Navbar highlight on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href").includes(current)) {
      a.classList.add("active");
    }
  });
});
