function move(obj, attr, destination, speed, callback) {
    clearInterval(obj.timer);
    var current = parseInt(getStyle(obj, attr));
    if (current > destination) {
        speed = -speed;
    }
    obj.timer = setInterval(function() {
        var oldValue = parseInt(getStyle(obj, attr));
        var newValue = oldValue + speed;
        if ((speed < 0 && newValue < destination) || (speed > 0 && newValue > destination)) {
            newValue = destination;
        }
        obj.style[attr] = newValue + "px";
        if (newValue == destination) {
            clearInterval(obj.timer);
            callback && callback();
        }

    }, 30);
}

function getStyle(obj, name) {

    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    } else {
        return obj.currentStyle[name];
    }

}