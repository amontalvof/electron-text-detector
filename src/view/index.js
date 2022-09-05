const screenshot = document.getElementById('screen-shot');
// const screenshotMsg = document.getElementById('screenshot-path');
const imagesContainer = document.getElementById('images-container');

screenshot.addEventListener('click', function (event) {
    // screenshotMsg.textContent = 'Gathering screens...';
    window.electronAPI.takeScreenShoot(window.devicePixelRatio);
});

window.electronAPI.getImages((event, data) => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let rect = {};
    let drag = false;
    let imageObj = null;

    function init() {
        imageObj = new Image();
        imageObj.onload = function () {
            ctx.drawImage(imageObj, 0, 0);
        };
        imageObj.src = data[1];
        canvas.addEventListener('mousedown', mouseDown, false);
        canvas.addEventListener('mouseup', mouseUp, false);
        canvas.addEventListener('mousemove', mouseMove, false);
    }

    function mouseDown(e) {
        rect.startX = e.pageX - this.offsetLeft;
        rect.startY = e.pageY - this.offsetTop;
        drag = true;
    }

    function mouseUp() {
        drag = false;
        // let preview = document.getElementById('preview');
        // preview.src = '';

        imageClipper(data[1], function () {
            this.crop(rect.startX, rect.startY, rect.w, rect.h).toDataURL(
                function (dataUrl) {
                    console.log('image cropped!');
                    // preview.src = dataUrl;
                    window.electronAPI.getText(dataUrl);
                }
            );
        });
    }

    function mouseMove(e) {
        if (drag) {
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(imageObj, 0, 0);
            rect.w = e.pageX - this.offsetLeft - rect.startX;
            rect.h = e.pageY - this.offsetTop - rect.startY;
            ctx.strokeStyle = 'tomato';
            ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
        }
    }
    //
    init();
    // screenshotMsg.textContent = '';
});

window.electronAPI.showNotification(() => {
    new Notification('Text Copied', {
        body: 'Text is successfully copied.',
    });
});
