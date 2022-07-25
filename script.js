
var version = 22;
var versions = [19, 21, 22];
var i = 0;
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