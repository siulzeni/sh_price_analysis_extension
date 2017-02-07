
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
    var url = new URL(tab_url[0].url); // convert to URL class to more easily extract pathname
    // check to see if current page is stubhub
    if (string_url.search("stubhub") !== -1) {
        // verify that user is on event page
        if (string_url.search("event") !== -1 && string_url.search("priceanalysis") == -1  ) {
            // get pathname "/event/9564741"
            var pathname = new String(url.pathname);
            // split pathname into array
            var url_array = pathname.split("/");
            // there's two types of event URLs, check for both
            if(url_array[2] == "event"){
                var eventID = url_array[3];
                // document.write(eventID);
                getStubHubURL(eventID, current_tab_index);
            }
            else {
                var eventID = url_array[2];
                // document.write(eventID);
                getStubHubURL(eventID, current_tab_index);
            }


        } 
        else document.write("Not Event Page");
    } 
    else {
        document.write("Not StubHub");
    }
    return;
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
    var next_to_current = current_tab_index + 1
    chrome.tabs.create({ url: priceAnalysisURL, index: next_to_current});
}

// Run
getTabInfo(getEventID);
console.log('sucess');


