var version = 23;
var versions = [19, 21, 22, 23];
var i = 0;

if (screen.width < 510) {
    document.getElementById('card').style = 'width:90%;';
    document.getElementById('logo').style = 'width:40%;';
}
if (screen.width < 750) {
    document.getElementById('buttons').style = 'position:relative;';
}

setInterval(function () {
    document.body.style.backgroundImage = `url(assets/bg/${versions[i]}.png)`;
    document.getElementById('card').src = `assets/card/${versions[i]}.png`;
    document.getElementById('logo').src = `assets/logo/${versions[i]}.png`;
    document.getElementById('link').href = `/DLS-Card-Creator/DLS${versions[i]}`;
    i += 1;
    if (i == versions.length) {
        i = 0;
    }
}, 5000);