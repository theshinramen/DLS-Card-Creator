const settings = document.getElementById('settings');
settings.addEventListener('input', (event) => drawCard());

if (screen.width < 510) {
    document.getElementById('card').style = 'width:90%;';
}
if (screen.width < 750) {
    document.getElementById('buttons').style = 'position:relative;';
}

for (var i = 0; i <= 182; i++) {
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    document.getElementById('nationality').appendChild(opt);
}
document.getElementById('nationality').value = '138';

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
        template: `./assets/card/${value('cardType')}${value('position') == 'GK' ? 'GK' : ''}.png`,
        positionImage: `./assets/position/${value('position')}.png`,
        flagImage: `/DLS-Card-Creator/assets/flag/${value('nationality')}.png`,
        footImage: `./assets/foot/${value('cardType')}/${value('footColor')}.png`,
        uploadImage: `./assets/placeholder.png`
    };

    if (document.getElementById('uploadImage').files.length > 0) {
        sources.uploadImage = URL.createObjectURL(document.getElementById('uploadImage').files[0]);
    }

    ctx.clearRect(0, 0, ctx.width, ctx.height);

    loadImages(sources, function (images) {
        ctx.drawImage(images.template, 0, 0);
        ctx.drawImage(images.uploadImage, 18, 32, 224, 224);
        ctx.drawImage(images.positionImage, 202, 87);
        ctx.drawImage(images.flagImage, 202, 123, 46, 29);
        ctx.drawImage(images.footImage, 365, 25);

        /**
        // Nationality
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(202, 123, 46, 29);
        **/

        // First Name
        ctx.textAlign = 'center'
        ctx.fillStyle = '#777a85';
        ctx.font = '16px Renogare';
        ctx.fillText(value('firstName'), 130, 277);

        // Last Name
        ctx.fillStyle = '#ffffff';
        ctx.font = '25px Renogare';
        ctx.fillText(value('lastName'), 130, 301);

        // Stats
        ctx.font = '22px Renogare';
        var coordinates = [[335, 103], [335, 150], [335, 197], [335, 243], [434, 103], [434, 150], [434, 197], [434, 243]];
        for (var i = 1; i < 9; i++) {
            if (value(`stats${i}`) > 0 && value(`stats${i}`) <= 59) {
                ctx.fillStyle = '#d9342b';
            } else if (value(`stats${i}`) > 59 && value(`stats${i}`) <= 69) {
                ctx.fillStyle = '#e08835';
            } else if (value(`stats${i}`) > 69 && value(`stats${i}`) <= 79) {
                ctx.fillStyle = '#eadd4c';
            } else if (value(`stats${i}`) > 79 && value(`stats${i}`) <= 89) {
                ctx.fillStyle = '#5eca3d';
            } else if (value(`stats${i}`) > 89 && value(`stats${i}`) <= 100) {
                ctx.fillStyle = '#62d0c7';
            }

            if (value(`stats${i}`) == 100) {
                ctx.save();
                ctx.translate(coordinates[i - 1][0], coordinates[i - 1][1]);
                ctx.save();
                ctx.scale(0.85, 1);
                ctx.fillText(value(`stats${i}`), 0, 0);
                ctx.restore();
                ctx.restore();
            } else {
                ctx.fillText(value(`stats${i}`), coordinates[i - 1][0], coordinates[i - 1][1]);
            }
        }

        // Rating Circle
        ctx.beginPath();
        ctx.arc(222, 41, 31, 0, 2 * Math.PI);
        if (value('rating') > 0 && value('rating') <= 59) {
            ctx.fillStyle = '#d0504b';
        } else if (value('rating') > 59 && value('rating') <= 69) {
            ctx.fillStyle = '#de8735';
        } else if (value('rating') > 69 && value('rating') <= 79) {
            ctx.fillStyle = '#eed94a';
        } else if (value('rating') > 79 && value('rating') <= 89) {
            ctx.fillStyle = '#63d041';
        } else if (value('rating') > 89 && value('rating') <= 100) {
            ctx.fillStyle = '#5697cd';
        }
        ctx.fill();

        // Rating
        ctx.fillStyle = '#1d2234';
        ctx.font = '28px Renogare';
        ctx.fillText(value('rating'), 222, 52);

        // Height
        ctx.textAlign = 'left'
        ctx.fillStyle = '#1d2234';
        ctx.font = '23px Renogare';
        ctx.fillText(value('height'), 304, 56);

        // Foot
        ctx.fillText(value('foot'), 414, 56);
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