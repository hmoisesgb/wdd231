const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

const openButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".closeModal");

openButtons.forEach(button => {
    button.addEventListener("click", () => {
        const dialog = document.getElementById(button.dataset.modal);

        if (dialog) {
            dialog.showModal();
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});

document.querySelectorAll("dialog").forEach(dialog => {

    dialog.addEventListener("click", (event) => {

        const rect = dialog.getBoundingClientRect();

        const inside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!inside) {
            dialog.close();
        }
    });

});