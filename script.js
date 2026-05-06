document.addEventListener("DOMContentLoaded", function () {
    const noButton = document.getElementById("no");
    const yesButton = document.getElementById("yes");
    const buttonContainer = document.getElementById("button-container");

    let yesSize = 1;

    function moveNoButton() {
        noButton.style.position = "absolute";

        const containerRect = buttonContainer.getBoundingClientRect();
        const yesRect = yesButton.getBoundingClientRect();
        const noWidth = noButton.offsetWidth;
        const noHeight = noButton.offsetHeight;

        const maxX = containerRect.width - noWidth;
        const maxY = containerRect.height - noHeight;

        let x = 0;
        let y = 0;
        let tries = 0;

        do {
            x = Math.random() * Math.max(maxX, 0);
            y = Math.random() * Math.max(maxY, 0);
            tries++;

            const proposedRect = {
                left: containerRect.left + x,
                top: containerRect.top + y,
                right: containerRect.left + x + noWidth,
                bottom: containerRect.top + y + noHeight
            };

            const overlapsYes = !(
                proposedRect.right < yesRect.left ||
                proposedRect.left > yesRect.right ||
                proposedRect.bottom < yesRect.top ||
                proposedRect.top > yesRect.bottom
            );

            if (!overlapsYes) {
                break;
            }
        } while (tries < 20);

        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;

        yesSize += 0.25;
        yesButton.style.fontSize = `${1.2 * yesSize}rem`;
        yesButton.style.padding = `${10 * yesSize}px ${20 * yesSize}px`;
    }

    // Desktop: cuando el mouse entra
    noButton.addEventListener("mouseenter", moveNoButton);

    // Mobile / touch: cuando el dedo toca
    noButton.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        e.stopPropagation();
        moveNoButton();
    });

    yesButton.addEventListener("click", function () {
        window.location.href = "date.html";
    });
});