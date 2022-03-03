noseX = 0;
noseY = 0;
difference = 0;
leftWristX = 0;
rightWristX = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    background("#969A97");

    document.getElementById("square_sides").innerHTML = "Side length of square: " + difference + "px";
    fill('#F90093');
    stroke('F90093');
    square(noseX, noseY, difference);
}

function modelloaded(){
    console.log('PoseNet Initallized!');
}

function gotPoses(results){
    if(results.length > 0){
        // nose
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("NoseX = " + noseX + ", NoseY = " + noseY);
        // wrists
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("LeftWristX = " + leftWristX + ", RightWristX = " + rightWristX);
        console.log("Difference: " + difference);
    }
}