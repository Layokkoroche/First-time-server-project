const input = document.querySelector(".controls input")
let lastValue = "";

input.oninput = function() {
    lastValue = input.value;
};

document.querySelector(".controls button").onclick = function() {
    fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: lastValue
    });
    input.value = "";
}

const galleryImgs = document.querySelectorAll(".gallery img");
const display = document.querySelector(".text-display");

galleryImgs.forEach(img => {
    img.addEventListener("mouseenter", () => {
        display.textContent = img.dataset.text;
        display.classList.add("show");
    });
    img.addEventListener("mouseleave", () => {
        display.textContent = "...";
        display.classList.remove("show");
    });
});
