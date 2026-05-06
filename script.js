document.addEventListener("DOMContentLoaded", function () {
    const noButton = document.getElementById("no");
    const yesButton = document.getElementById("yes");
    const buttonContainer = document.getElementById("button-container");

    let yesSize = 1;

    let lastX = 0;
    let lastY = 0;
    let isFirstMove = true;

    function moveNoButton() {
        noButton.style.position = "absolute";

        const containerRect = buttonContainer.getBoundingClientRect();
        const yesRect = yesButton.getBoundingClientRect();
        const noWidth = noButton.offsetWidth;
        const noHeight = noButton.offsetHeight;

        const maxX = containerRect.width - noWidth;
        const maxY = containerRect.height - noHeight;

        const minShift = 120; // distancia mínima que debe alejarse
        const maxAttempts = 30;

        let x = 0;
        let y = 0;
        let tries = 0;

        do {
            if (isFirstMove) {
                x = Math.random() * Math.max(maxX, 0);
                y = Math.random() * Math.max(maxY, 0);
            } else {
                // se mueve mucho más lejos que la posición anterior
                const deltaX = (Math.random() * 2 - 1) * 180;
                const deltaY = (Math.random() * 2 - 1) * 180;

                x = lastX + deltaX;
                y = lastY + deltaY;
            }

            // mantener dentro del contenedor
            x = Math.max(0, Math.min(x, maxX));
            y = Math.max(0, Math.min(y, maxY));

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

            const movedEnough = Math.abs(x - lastX) > minShift || Math.abs(y - lastY) > minShift;

            tries++;

            if (!overlapsYes && (isFirstMove || movedEnough)) {
                break;
            }
        } while (tries < maxAttempts);

        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;

        lastX = x;
        lastY = y;
        isFirstMove = false;

        yesSize += 0.25;
        yesButton.style.fontSize = `${1.2 * yesSize}rem`;
        yesButton.style.padding = `${10 * yesSize}px ${20 * yesSize}px`;
    }

    noButton.addEventListener("mouseenter", moveNoButton);

    noButton.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        e.stopPropagation();
        moveNoButton();
    });

    yesButton.addEventListener("click", function () {
        window.location.href = "date.html";
    });
});