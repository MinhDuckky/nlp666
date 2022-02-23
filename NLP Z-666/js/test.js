const api_url = 
      "http://127.0.0.1:5000/Nostradamus/predict_2";
  
async function getapi(url) {

// Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
}
// Calling that async function
//getapi(api_url);


// POST
fetch("http://127.0.0.1:5000/Nostradamus/predict_2", {

    // Declare what type of data we're sending
    headers: {
      'Content-Type': 'application/json'
    },

    // Specify the method
    method: 'POST',

    // A JSON payload
    body: JSON.stringify({
        "text": "It is",
        "mode": "normal"
    })
}).then(function (response) { // At this point, Flask has printed our JSON
    return response.text();
}).then(function (text) {
    console.log('POST response: ');
    // Should be 'OK' if everything was successful
    console.log(text);
});
  