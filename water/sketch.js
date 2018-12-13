//Authors: Abeer Kazi, Davood Mazraeh, William Tigno

//https://blog.kadenze.com/creative-technology/p5-js-crash-course-recreate-art-you-love/

// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
var phase, speed, maxCircleSize, numRows, numCols, numStrands, colorA, colorB;

var bg;

function setup() {

    bg = loadImage("https://i.imgur.com/mkgwINS.jpg");
    createCanvas(1920, 1080);

    // Instantiate our SerialPort object
    serial = new p5.SerialPort();

    // Get a list the ports available
    // You should have a callback defined to see the results
    serial.list();

    // Assuming our Arduino is connected, let's open the connection to it
    // Change this to the name of your arduino's serial port
    serial.open("/dev/cu.usbmodem1461");

    // Here are the callbacks that you can register

    // When we connect to the underlying server
    serial.on('connected', serverConnected);

    // When we get a list of serial ports that are available
    serial.on('list', gotList);
    // OR
    //serial.onList(gotList);

    // When we some data from the serial port
    serial.on('data', gotData);
    // OR
    //serial.onData(gotData);

    // When or if we get an error
    serial.on('error', gotError);
    // OR
    //serial.onError(gotError);

    // When our serial port is opened and ready for read/write
    serial.on('open', gotOpen);
    // OR
    //serial.onOpen(gotOpen);

    // Callback to get the raw data, as it comes in for handling yourself
    //serial.on('rawdata', gotRawData);
    // OR
    //serial.onRawData(gotRawData);


    noStroke();
    frameRate(60);
    phase = 0;
    speed = 0.03;
    maxCircleSize = 25;
    numRows = 50;
    numCols = 30;
    numStrands = 3;

    colorA = color(16, 125, 172);
    colorB = color(134, 195, 235);


}

// We are connected and ready to go
function serverConnected() {
    println("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
    println("List of Serial Ports:");
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
        // Display in the console
        println(i + " " + thelist[i]);
    }
}

// Connected to our serial device
function gotOpen() {
    println("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
    println(theerror);
}

// There is data available to work with from the serial port
function gotData() {
    var currentString = serial.readLine(); // read the incoming string
    trim(currentString); // remove any trailing whitespace
    if (!currentString) return; // if the string is empty, do no more
    console.log(currentString); // println the string
    latestData = currentString; // save it for the draw method
}

// We got raw from the serial port
function gotRawData(thedata) {
    println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device

function draw() {



    //background(255,255,255);
    background(bg);



    fill(0, 0, 0);
    text(latestData, 10, 10);
    phase = frameCount * speed;

    if ((latestData) >= 90) {


        for (var strand = 0; strand < numStrands; strand += 1) {
            var strandPhase = phase + map(strand, 0, numStrands, 0, TWO_PI);

            for (var col = 0; col < numCols; col += 1.5) {
                var colOffset = map(col, 0, numCols, 0, TWO_PI);
                var x = map(col, 0, numCols, 50, width - 50);

                for (var row = 0; row < numRows; row += 5) {
                    var y = height / 4 + row * 10 + sin(strandPhase + colOffset) * 200;
                    var sizeOffset = (cos(strandPhase - (row / numRows) + colOffset) + 2) * 2;
                    var circleSize = sizeOffset * maxCircleSize;

                    fill(lerpColor(colorA, colorB, row / numRows));
                    ellipse(x, y, circleSize, circleSize);

                }
            }
        }

    } else if ((latestData) >= 70 && (latestData) < 90) {

        for (var strand = 0; strand < numStrands; strand += 1) {
            var strandPhase = phase + map(strand, 0, numStrands, 0, TWO_PI);

            for (var col = 0; col < numCols; col += 1.5) {
                var colOffset = map(col, 0, numCols, 0, TWO_PI);
                var x = map(col, 0, numCols, 50, width - 50);

                for (var row = 0; row < numRows; row += 5) {
                    var y = height / 4 + row * 10 + sin(strandPhase + colOffset) * 200;
                    var sizeOffset = (cos(strandPhase - (row / numRows) + colOffset) + 2) * 2;
                    var circleSize = sizeOffset * maxCircleSize;

                    fill(lerpColor(color(16, 125, 172, 75), color(113, 199, 236, 75), row / numRows));
                    ellipse(x, y, circleSize, circleSize);

                }
            }
        }


    } else if ((latestData) >= 60 && (latestData) < 90) {

        for (var strand = 0; strand < numStrands; strand += 1) {
            var strandPhase = phase + map(strand, 0, numStrands, 0, TWO_PI);

            for (var col = 0; col < numCols; col += 1.5) {
                var colOffset = map(col, 0, numCols, 0, TWO_PI);
                var x = map(col, 0, numCols, 50, width - 50);

                for (var row = 0; row < numRows; row += 5) {
                    var y = height / 4 + row * 10 + sin(strandPhase + colOffset) * 200;
                    var sizeOffset = (cos(strandPhase - (row / numRows) + colOffset) + 2) * 2;
                    var circleSize = sizeOffset * maxCircleSize;

                    fill(lerpColor(color(16, 125, 172, 50), color(113, 199, 236, 50), row / numRows));
                    ellipse(x, y, circleSize, circleSize);

                }
            }
        }


    } else if ((latestData) >= 45 && (latestData) < 90) {

        for (var strand = 0; strand < numStrands; strand += 1) {
            var strandPhase = phase + map(strand, 0, numStrands, 0, TWO_PI);

            for (var col = 0; col < numCols; col += 1.5) {
                var colOffset = map(col, 0, numCols, 0, TWO_PI);
                var x = map(col, 0, numCols, 50, width - 50);

                for (var row = 0; row < numRows; row += 5) {
                    var y = height / 4 + row * 10 + sin(strandPhase + colOffset) * 200;
                    var sizeOffset = (cos(strandPhase - (row / numRows) + colOffset) + 2) * 2;
                    var circleSize = sizeOffset * maxCircleSize;

                    fill(lerpColor(color(16, 125, 172, 25), color(113, 199, 236, 25), row / numRows));
                    ellipse(x, y, circleSize, circleSize);

                }
            }
        }


    } else {

        for (var strand = 0; strand < numStrands; strand += 1) {
            var strandPhase = phase + map(strand, 0, numStrands, 0, TWO_PI);

            for (var col = 0; col < numCols; col += 1.5) {
                var colOffset = map(col, 0, numCols, 0, TWO_PI);
                var x = map(col, 0, numCols, 50, width - 50);

                for (var row = 0; row < numRows; row += 5) {
                    var y = height / 4 + row * 10 + sin(strandPhase + colOffset) * 200;
                    var sizeOffset = (cos(strandPhase - (row / numRows) + colOffset) + 2) * 2;
                    var circleSize = sizeOffset * maxCircleSize;

                    fill(lerpColor(color(16, 125, 172, 0), color(113, 199, 236, 0), row / numRows));
                    ellipse(x, y, circleSize, circleSize);

                }
            }
        }


    }


}
