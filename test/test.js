document.addEventListener("DOMContentLoaded", function () {
    const aboutText = document.querySelector(".about-text");
    const text = aboutText.textContent.trim();
    const radius = 100;
    const angleIncrement = 15;
    let angle = 0;

    aboutText.textContent = "";
    let currentLine = "";

    for (let i = 0; i < text.length; i++) {
        if (text[i] === " " || i === text.length - 1) {
            const span = document.createElement("span");
            span.textContent = currentLine + (i === text.length - 1 ? text[i] : "");
            const y = -radius * Math.cos(angle * (Math.PI / 180));
            const x = radius * Math.sin(angle * (Math.PI / 180));
            span.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
            aboutText.appendChild(span);
            angle += angleIncrement;
            currentLine = "";
        } else {
            currentLine += text[i];
        }
    }
});
