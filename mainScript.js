// sampled this function from github, modified it to fit my implementation
function getClipboardText() {
    // create div element for pasting into
    var pasteDiv = document.createElement("div");
    // place div outside the visible area
    pasteDiv.style.position = "absolute";
    pasteDiv.style.left = "-10000px";
    pasteDiv.style.top = "-10000px";
    // set contentEditable mode
    pasteDiv.contentEditable = true;
    // add element to document
    document.body.appendChild(pasteDiv);
    // paste the current clipboard text into the element
    pasteDiv.focus();
    document.execCommand('paste');
    // get the pasted text from the div
    var clipboardText = pasteDiv.innerText;
    // remove the temporary element
    document.body.removeChild(pasteDiv);
    // return the text
    return clipboardText;
}

function checkIfURL(str){
    // check if string passed in is a url, mainly for checking clipboard data
    try{
        // verify string passed in is a url
        var check_str = new URL(str);
    }
    catch(e){
        return false;
    }
    var url_str = new String(str); // convert parameter to string after 
    if (url_str.search("stubhub") !== -1){
        if (url_str.search("event") !== -1 && url_str.search("priceanalysis") == -1) {
            return true;
        }
        return false;
    }
    return false;

}


// **Gets tab ID in order to extract the URL
function getTabInfo(callback){
    
    chrome.tabs.query({"active": true, "currentWindow": true}, function Tab(tab) {
        callback(tab); // pass tab to callback
    });
}

// ** Parse the URL to extract event ID
function getEventID(tab_url) {
    function process(url){
        // get pathname eg "/event/9564741"
        var tab_pathname = new String(url.pathname);
        // split pathname into array
        var url_array = tab_pathname.split("/");
        // there's two types of event URLs, check for both
        if(url_array[2] == "event"){
            var eventID = url_array[3]; // get ID
            getStubHubURL(eventID, current_tab_index);
        }
        else {
            var eventID = url_array[2]; // get ID
            getStubHubURL(eventID, current_tab_index);
        }
    }

    var current_tab_index = tab_url[0].index; // index is needed in order to open new tab next to previous tab
    var string_url = new String(tab_url[0].url); // string URL
    var tab_URL = new URL(tab_url[0].url); // convert to URL class to more easily extract pathname
    var message_span = document.getElementById("message"); // element that displays error messages
    var clipboard_text = getClipboardText(); // gets text from clipboard
    // Bools
    var check_clipboard_bool = checkIfURL(clipboard_text);
    var check_tab_url_bool = checkIfURL(string_url);
    // conditional statement that determines if user is on stubhub.com or not
    var check_if_on_sh_bool = (string_url.search("stubhub") != -1 && string_url.search("priceanalysis") == -1) ? true : false;
    
    // conditionals for various scenarios eg "on events page, but also have link on clipboard"
    if(check_tab_url_bool && !check_clipboard_bool){ // on events page, no link found (most common scenario)
        process(tab_URL);
    }
    else if(!check_tab_url_bool && check_clipboard_bool){ // not on events page, link found
        if(check_if_on_sh_bool){ // only open link if user is on stubhub site
            var clipboard_URL = new URL(clipboard_text);
            process(clipboard_URL);
        }
        else{ // link found, but not on stubhub
            message_span.innerText = "Visit StubHub Events"
            return;
        }

    }
    else if(check_tab_url_bool && check_clipboard_bool){ // yes/yes, events page takes precedence
        process(tab_URL);
    }
    else{ // no/no
        // if user is on stubhub, let them know to copy event address
        if(check_if_on_sh_bool){
            message_span.innerText = "Visit StubHub Events or Copy Event Address"
        }
        else message.innerText = "Visit StubHub Events"
    }
}

// **Generates PriceAnalysis URL with given eventID
function getStubHubURL(eventID, current_tab_index){
    // assert string
    var event_id = new String(eventID);
    // concatenate eventID to base URL
    var priceAnalysisURL = "https://sell.stubhub.com/simweb/sim/services/priceanalysis?eventId=" + event_id + "&external=true&page=true";
    openNewTabWithPriceAnalysis(priceAnalysisURL, current_tab_index);

}
// Opens link in new tab
function openNewTabWithPriceAnalysis(priceAnalysisURL, current_tab_index){
    var next_to_current = current_tab_index + 1 // used to open new tab next to current tab by incrementing current tab index
    chrome.tabs.create({ url: priceAnalysisURL, index: next_to_current});
}

// Run
getTabInfo(getEventID);
