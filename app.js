const btn = document.getElementById("btn");
const text = document.getElementById("text");

btn.addEventListener("click", () => {
    if (text.style.display === "none") {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
});
