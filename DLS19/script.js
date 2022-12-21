const settings = document.getElementById('settings');
settings.addEventListener('input', (event) => drawCard());

if (screen.width < 510) {
    document.getElementById('card').style = 'width:90%;';
}
if (screen.width < 750) {
    document.getElementById('buttons').style = 'position:relative;';
}

for (var i = 0; i <= 183; i++) {
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    document.getElementById('nationality').appendChild(opt);
}
document.getElementById('nationality').value = '140';

function value(el) {
    return document.getElementById(el).value;
};

// https://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;

    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].crossOrigin = 'anonymous';
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

function drawCard() {
    var card = document.getElementById('card');
    var ctx = card.getContext('2d');

    var sources = {
        template: `./assets/card/card${value('position') == 'GK' ? 'GK' : ''}.png`,
        positionImage: `./assets/position/${value('position')}.png`,
        flagImage: `https://raw.githubusercontent.com/theshinramen/DLS-Files/main/flags/${value('nationality')}.png`,
        uploadImage: `./assets/placeholder.png`
    };

    if (document.getElementById('uploadImage').files.length > 0) {
        sources.uploadImage = URL.createObjectURL(document.getElementById('uploadImage').files[0]);
    }

    ctx.clearRect(0, 0, ctx.width, ctx.height);

    loadImages(sources, function (images) {
        ctx.drawImage(images.template, 0, 0);
        ctx.drawImage(images.uploadImage, 4, 72, 192, 240);
        ctx.drawImage(images.positionImage, 414, 192);
        ctx.drawImage(images.flagImage, 414, 49, 89, 51);

        // First Name
        ctx.textAlign = 'left'
        ctx.fillStyle = '#515C6A';
        ctx.font = '31px Source Sans Pro';
        ctx.fillText(value('firstName'), 17, 36);

        // Last Name
        ctx.fillStyle = '#081826';
        ctx.fillText(value('lastName'), value('firstName') == '' ? 17 : ctx.measureText(value('firstName')).width + 25, 36);

        // Stats
        ctx.textAlign = 'center'
        ctx.font = '31px Source Sans Pro';
        var coordinates = [[281, 84], [281, 137], [281, 190], [281, 243], [281, 296], [390, 84], [390, 137], [390, 190], [390, 243], [390, 296]];
        for (var i = 1; i <= 10; i++) {
            if (value(`stats${i}`) > 0 && value(`stats${i}`) <= 59) {
                ctx.fillStyle = '#EB5048';
            } else if (value(`stats${i}`) > 59 && value(`stats${i}`) <= 69) {
                ctx.fillStyle = '#F09247';
            } else if (value(`stats${i}`) > 69 && value(`stats${i}`) <= 79) {
                ctx.fillStyle = '#F6ED52';
            } else if (value(`stats${i}`) > 79 && value(`stats${i}`) <= 89) {
                ctx.fillStyle = '#70E04A';
            } else if (value(`stats${i}`) > 89 && value(`stats${i}`) <= 100) {
                ctx.fillStyle = '#66DEFB';
            }

            if (value(`stats${i}`) == 100) {
                ctx.save();
                ctx.translate(coordinates[i - 1][0], coordinates[i - 1][1]);
                ctx.save();
                ctx.scale(0.9, 1);
                ctx.fillText(value(`stats${i}`), 0, 0);
                ctx.restore();
                ctx.restore();
            } else {
                ctx.fillText(value(`stats${i}`), coordinates[i - 1][0], coordinates[i - 1][1]);
            }
        }

        // Rating
        if (value('rating') > 0 && value('rating') <= 59) {
            ctx.fillStyle = '#EB5048';
        } else if (value('rating') > 59 && value('rating') <= 69) {
            ctx.fillStyle = '#F09247';
        } else if (value('rating') > 69 && value('rating') <= 79) {
            ctx.fillStyle = '#F6ED52';
        } else if (value('rating') > 79 && value('rating') <= 89) {
            ctx.fillStyle = '#70E04A';
        } else if (value('rating') > 89 && value('rating') <= 100) {
            ctx.fillStyle = '#66DEFB';
        }
        ctx.font = '53px Source Sans Pro';
        ctx.fillText(value('rating'), 459, 291);

        // Foot
        ctx.textAlign = 'center'
        ctx.fillStyle = '#081826';
        ctx.font = '35px Source Sans Pro';
        ctx.fillText(value('foot'), 475, 135);

        // Height
        ctx.save();
        ctx.translate(475, 180);
        ctx.save();
        ctx.scale(0.8, 1);
        ctx.fillText(value('height'), 0, 0);
        ctx.restore();
        ctx.restore();
    });
}

// https://daily-dev-tips.com/posts/vanilla-javascript-save-canvas-as-an-image/
function saveCard() {
    var card = document.getElementById('card');
    const link = document.createElement('a');
    link.download = `${value('firstName')} ${value('lastName')}.png`;
    link.href = card.toDataURL();
    link.click();
    link.delete;
}  