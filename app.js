// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraSwitch = document.querySelector("#camera--switch");

// Track the currently active camera
var activeCamera = "environment";

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

// Switch between front and rear cameras
cameraSwitch.onclick = function() {
    if (activeCamera === "user") {
        constraints.video.facingMode = { exact: "environment" };
        activeCamera = "environment";
    } else {
        constraints.video.facingMode = "user";
        activeCamera = "user";
    }

    // Stop the current stream
    if (track) {
        track.stop();
    }

    // Restart the camera with the updated constraints
    cameraStart();
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
