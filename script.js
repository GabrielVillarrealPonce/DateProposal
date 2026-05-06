document.addEventListener("DOMContentLoaded", function () {
    const noButton = document.getElementById("no");
    const yesButton = document.getElementById("yes");

    let yesSize = 1;

    noButton.addEventListener("mouseover", function () {
        noButton.style.position = "absolute";

        const buttonContainer = document.getElementById("button-container");
        const containerRect = buttonContainer.getBoundingClientRect();
        const buttonWidth = noButton.clientWidth;
        const buttonHeight = noButton.clientHeight;

        const maxX = containerRect.width - buttonWidth;
        const maxY = containerRect.height - buttonHeight;

        const x = Math.random() * Math.max(maxX, 0);
        const y = Math.random() * Math.max(maxY, 0);

        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;

        yesSize += 0.25;

        yesButton.style.fontSize = `${1.2 * yesSize}rem`;
        yesButton.style.padding = `${10 * yesSize}px ${20 * yesSize}px`;
    });

    yesButton.addEventListener("click", function () {
        window.location.href = "date.html";
    });
});