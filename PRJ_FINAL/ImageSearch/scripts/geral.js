document.addEventListener('DOMContentLoaded', () => {
    const clickSound = new Audio('Click.mp3');

    const galleryButton = document.getElementById('galleryButton');
    galleryButton?.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });

    const questyButton = document.getElementById('questyButton');
    questyButton?.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });

    const statsyButton = document.getElementById('statsyButton');
    statsyButton?.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });

    const ImportExportyButton = document.getElementById('ImportExportyButton');
    ImportExportyButton?.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
});
