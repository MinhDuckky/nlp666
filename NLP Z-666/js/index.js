var api_url = 
      "http://localhost:5000/Nostradamus/predict_2";

var mode = "normal";

async function getapi(url, context) {
    context = "How are ";

    fetch(url, {

        // Declare what type of data we're sending
        headers: {
          'Content-Type': 'application/json'
        },
    
        // Specify the method
        method: 'POST',
    
        // A JSON payload
        body: JSON.stringify({
            "text": context
        })
    }).then(function (response) { // At this point, Flask has printed our JSON
        return response.text();
    }).then(function (data) {
        predictions = JSON.parse(data);
        console.log('POST response: ');
        console.log(predictions.result);
        // Should be 'OK' if everything was successful
        updatePredict(predictions.result);
    });
}

function updatePredict(predictions){
    let index = predict.options.length;
    while (index--) {
        predict.remove(predict.options[index]);
    }
    let index2 = 0;
    while (index2 < predictions.length) {
        var option = new Option(predictions[index2], predictions[index2]);
        predict.add(option, undefined);
        index2++;
    }
}

function normalMode(){
    img1.src = "images/Nostradamus X.png";
    api_url = "http://localhost:5000/Nostradamus/predict_2";
    mode = "normal";
    getapi(api_url, context);
}
function advancedMode(){
    img1.src = "images/Nostradamus Z.png";
    api_url = "http://localhost:5000/Nostradamus/predict_4";
    mode = "advanced";
    getapi(api_url, context);
}
//tab, enter, down, up
const specialcode = [9, 13, 40, 38];
const dead = [20, 16, 17, 8, 33, 34, 27, 173, 174, 175, 179, 91, 120, 36, 35, 45, 46];

var context = "";

function predicts(event){
    let unicode= event.which;
    if (unicode == 9){
        event.preventDefault();
        userinput.value += predict.options[0].value + " ";
        context = "";
    }
    if (unicode == 13){
        context = "";
        console.log(context);
    }
    if (unicode == 8){
        context = context.substring(0, context.length - 1);
        console.log(context);
    }
    if (unicode == 40){
        event.preventDefault();
        predict.focus();
    }
    if (unicode == 38){
        event.preventDefault();
        predict.focus();
    }
    if (specialcode.includes(unicode) == false && dead.includes(unicode) == false){
        context += event.key;
        console.log(context);
        if (unicode == 32){
            console.log(context);
            getapi(api_url, context);
        }
    } 
}

function enterfun() {
    
    var ev = new KeyboardEvent('keydown', {altKey:false,
      bubbles: true,
      cancelBubble: false, 
      cancelable: true,
      charCode: 0,
      code: "Enter",
      composed: true,
      ctrlKey: false,
      currentTarget: null,
      defaultPrevented: true,
      detail: 0,
      eventPhase: 0,
      isComposing: false,
      isTrusted: true,
      key: "Enter",
      keyCode: 13,
      location: 0,
      metaKey: false,
      repeat: false,
      returnValue: false,
      shiftKey: false,
      type: "keydown",
      which: 13});

    predict.dispatchEvent(ev);
    predict.setAttribute("onfocus", "");
}


function choose(e){
    let unicode= e.which;
    if (unicode == 40){
        e.preventDefault();
        let i = predict.selectedIndex;
        len = (predict.options.length).toString();
        switch(i){
            case len:
                predict.selectedIndex = "0";
            case "0":
                predict.selectedIndex = "1";
            case "1":
                predict.selectedIndex = "2";
            case "2":
                predict.selectedIndex = "3";
            case "3":
                predict.selectedIndex = "4";
            case "4":
                predict.selectedIndex = "0";
        }
    }
    if (unicode == 38){
        e.preventDefault();
        let i = predict.selectedIndex;
        len = (predict.options.length).toString();
        switch(i){
            case "0":
                predict.selectedIndex = len;
            case "0":
                predict.selectedIndex = "4";
            case "4":
                predict.selectedIndex = "3";
            case "3":
                predict.selectedIndex = "2";
            case "2":
                predict.selectedIndex = "1";
            case "1":
                predict.selectedIndex = "0";
        }
    }
    if (unicode == 13){
        e.preventDefault();
        userinput.value += predict.options[predict.selectedIndex].value;
        console.log(predict.options[predict.selectedIndex].value);
        context = "";
        userinput.focus();
    }
}
