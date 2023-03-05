Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90,
})
camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'">';
})
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/O77vv1p8y/model.json',model_loaded);

function model_loaded() {
    console.log("Model Loaded Successfully!");
}

function check_snapshot() {
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.error(error);
    }
else{
    console.log(results);
    document.getElementById("result_object_name").innerHTML = results[0].label
    document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
}
}