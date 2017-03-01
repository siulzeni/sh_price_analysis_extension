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
        if (url_str.search("event") !== -1) {
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

    var current_tab_index = tab_url[0].index; // index is needed in order to open new tab next to previous tab
    var string_url = new String(tab_url[0].url); // string URL
    var message_span = document.getElementById("message"); // element that displays error messages
    var clipboard_text = getClipboardText(); // gets text from clipboard
    // Bools
    var check_clipboard_bool = checkIfURL(clipboard_text);
    var check_tab_url_bool = checkIfURL(string_url);
    // conditional statement that determines if user is on stubhub.com or not
    var check_if_on_sh_bool = (string_url.search("stubhub") != -1) ? true : false;

    function process(strURL){
        var url = new URL(strURL);
        // get pathname eg "/event/9564741"
        var tab_pathname = new String(url.pathname);
        // split pathname into array
        var url_array = tab_pathname.split("/");
        // there's two types of event URLs, check for both
        if(tab_pathname.search("priceanalysis") != -1){
            var query = strURL.split("?");
            query = query[1].split("=");
            query = query[1].split("&");
            eventID = query[0];
            getSellHubURL(eventID, current_tab_index);
        }

        else if(url_array[2] == "event"){
            var eventID = url_array[3]; // get ID
            getStubHubURL(eventID, current_tab_index);
        }

        else {
            var eventID = url_array[2]; // get ID
            getStubHubURL(eventID, current_tab_index);
        }
    }

    
    // conditionals for various scenarios eg "on events page, but also have link on clipboard"
    if(check_tab_url_bool && !check_clipboard_bool){ // on events page, no link found (most common scenario)
        process(string_url);
    }
    else if(!check_tab_url_bool && check_clipboard_bool){ // not on events page, link found
        if(check_if_on_sh_bool){ // only open link if user is on stubhub site
            process(clipboard_text);
        }
        else{ // link found, but not on stubhub
            message_span.innerText = "Visit StubHub Events"
            return;
        }

    }
    else if(check_tab_url_bool && check_clipboard_bool){ // yes/yes, events page takes precedence
        process(string_url);
    }
    else{ // no/no
        // if user is on stubhub, let them know to copy event address
        if(check_if_on_sh_bool && !check_clipboard_bool){
            // message_span.innerText = "Visit StubHub Events or Copy Event Address"
            getGeneralSellHubURL(clipboard_text, current_tab_index);
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
    openNewTabWithURL(priceAnalysisURL, current_tab_index);

}

function getSellHubURL(eventID, current_tab_index){
    var eventID = new String(eventID);
    var sellHubURL = "https://www.stubhub.com/sell/hub/login?eventId=" + eventID;
    openNewTabWithURL(sellHubURL, current_tab_index);
}

function getGeneralSellHubURL(urlQuery, current_tab_index){
    urlQuery = encodeURIComponent(urlQuery);
    var genSellHub = "https://www.stubhub.com/sell/hub/performerSearch?id=" + urlQuery;
    openNewTabWithURL(genSellHub, current_tab_index);
}

// Opens link in new tab
function openNewTabWithURL(url, current_tab_index){
    var next_to_current = current_tab_index + 1 // used to open new tab next to current tab by incrementing current tab index
    chrome.tabs.create({ url: url, index: next_to_current});
}

// Run
getTabInfo(getEventID);

