//JStools which can make JS base development be easier
/*
 * parameter：
 * 	obj: the object will do the move animiation
 * 	attr: move to left/top/width/height
 * 	destination: obj will stop at here
 * 	speed: how fast it will go
 *  callback: when finish, call one more custom function
 */
function move(obj, attr, destination, speed, callback) {
    //reset timer
    clearInterval(obj.timer);

    //get object's position
    var current = parseInt(getStyle(obj, attr));

    if (current > destination) {
        //go right is positive, left is negative
        speed = -speed;
    }

    //setInterval is a timer to work on a obj
    obj.timer = setInterval(function() {

        //get object's old position
        var oldValue = parseInt(getStyle(obj, attr));

        //new value
        var newValue = oldValue + speed;

        //boundry test
        if ((speed < 0 && newValue < destination) || (speed > 0 && newValue > destination)) {
            newValue = destination;
        }

        //set up new value
        obj.style[attr] = newValue + "px";

        //stop at destination 
        if (newValue == destination) {
            //close timer at destination 
            clearInterval(obj.timer);
            //when finish, user can call one more custom function
            callback && callback();
        }

    }, 30);
}

/*
 * get obj's CSS Style
 * parameter：
 * 		obj - the object we want it's CSS Style
 * 		name - Style name
 */
function getStyle(obj, name) {

    if (window.getComputedStyle) {
        //almost browsers works
        return getComputedStyle(obj, null)[name];
    } else {
        //IE8 compatibility
        return obj.currentStyle[name];
    }

}