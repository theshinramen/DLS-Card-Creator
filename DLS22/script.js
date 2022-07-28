const settings = document.getElementById('settings');
settings.addEventListener('input', (event) => drawCard());

if (screen.width < 475) {
    document.getElementById('card').style = 'width:90%;';
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

function checked(el) {
    return document.getElementById(el).checked;
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
};

function clearCard() {
    var card = document.getElementById('card');
    var ctx = card.getContext('2d');
    ctx.clearRect(0, 0, card.width, card.height);
    drawCard();
}

function drawCard() {
    var card = document.getElementById('card');
    var ctx = card.getContext('2d');

    var sources = {
        template: `./assets/card/${checked('maxed') ? 'maxed/' : ''}${value('cardType')}${value('position') == 'GK' ? 'GK' : ''}.png`,
        positionImage: `./assets/position/${value('position')}.png`,
        flagImage: `./assets/flag/${value('nationality')}.png`,
        uploadImage: `./assets/placeholder.png`,
        starImage: './assets/card/maxed/star/red.png'
    };

    if (document.getElementById('uploadImage').files.length > 0) {
        sources.uploadImage = URL.createObjectURL(document.getElementById('uploadImage').files[0]);
    }

    if (checked('maxed')) {
        if (value('rating') > 0 && value('rating') <= 59) {
            sources.starImage = './assets/card/maxed/star/red.png'
        } else if (value('rating') > 59 && value('rating') <= 69) {
            sources.starImage = './assets/card/maxed/star/orange.png'
        } else if (value('rating') > 69 && value('rating') <= 79) {
            sources.starImage = './assets/card/maxed/star/yellow.png'
        } else if (value('rating') > 79 && value('rating') <= 89) {
            sources.starImage = './assets/card/maxed/star/green.png'
        } else if (value('rating') > 89 && value('rating') <= 100) {
            sources.starImage = './assets/card/maxed/star/blue.png'
        }
    }

    loadImages(sources, function (images) {
        ctx.drawImage(images.template, 0, 0);
        ctx.drawImage(images.uploadImage, 18, 36, 224, 224);
        ctx.drawImage(images.positionImage, 202, 91);
        ctx.drawImage(images.flagImage, 202, 127, 46, 29);
        if (checked('maxed')) ctx.drawImage(images.starImage, 178, 0);

        // First Name
        ctx.textAlign = 'center'
        ctx.fillStyle = '#777a85';
        ctx.font = '16px Renogare';
        ctx.fillText(value('firstName'), 130, 281);

        // Last Name
        ctx.fillStyle = '#ffffff';
        ctx.font = '25px Renogare';
        ctx.fillText(value('lastName'), 130, value('firstName') == '' ? 299 : 305);

        // Stats
        ctx.font = '20px Renogare';
        var coordinates = [[335, 106], [335, 153], [335, 200], [335, 246], [434, 106], [434, 153], [434, 200], [434, 246]];
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
                ctx.scale(0.9, 1);
                ctx.fillText(value(`stats${i}`), 0, 0);
                ctx.restore();
                ctx.restore();
            } else {
                ctx.fillText(value(`stats${i}`), coordinates[i - 1][0], coordinates[i - 1][1]);
            }
        }

        // Rating Circle
        if (!checked('maxed')) {
            ctx.beginPath();
            ctx.arc(222, 45, 31, 0, 2 * Math.PI);
            if (value('rating') > 0 && value('rating') <= 59) {
                ctx.fillStyle = '#d0504b';
            } else if (value('rating') > 59 && value('rating') <= 69) {
                ctx.fillStyle = '#de8735';
            } else if (value('rating') > 69 && value('rating') <= 79) {
                ctx.fillStyle = '#E4C059';
            } else if (value('rating') > 79 && value('rating') <= 89) {
                ctx.fillStyle = '#63d041';
            } else if (value('rating') > 89 && value('rating') <= 100) {
                ctx.fillStyle = '#5697cd';
            }
            ctx.fill();
        }

        // Rating
        ctx.fillStyle = '#ffffff';
        ctx.font = '28px Renogare';
        ctx.fillText(value('rating'), 222, 56);

        // Height
        ctx.textAlign = 'left'
        ctx.fillStyle = checked('maxed') && value('cardType') == 'legendary' ? '#ffffff' : '#1d2234';
        ctx.font = '23px Renogare';
        ctx.fillText(value('height'), 304, 60);

        // Foot
        ctx.fillText(value('foot'), 414, 60);
    });
};

// https://daily-dev-tips.com/posts/vanilla-javascript-save-canvas-as-an-image/
function saveCard() {
    var card = document.getElementById('card');
    const link = document.createElement('a');
    link.download = `${value('firstName')} ${value('lastName')}.png`;
    link.href = card.toDataURL();
    link.click();
    link.delete;
}; 