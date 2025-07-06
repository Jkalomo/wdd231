document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById("menu");
    const navigation = document.getElementById("nav");

    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("show");
    });
});