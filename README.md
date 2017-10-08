# StubHub Price Analysis Extension
This is a Chrome Extension that makes opening StubHub Price Analysis as easy as one click.

## Motivation
When I browse StubHub event listings looking for new artists and events, I always like to check demand. Opening the Price
Analysis tool usually takes me 3 to 4 clicks and a copy/pase. I know it's not a lot, but when I laizly browse for new
events I like to relax and search with one hand. I came up with this solution to further enable my laziness.

# How/Where It Works
Click extension when:
- On the event page.
- There is an event link in your clipboard.
- If already on Price Analysis, click to open SellHub.
- If artist/event name is in clipboard, general SellHub 
  search will be performed in any page except events/price 
  analysis(not 100% accurate due to Stubhub inconcistancy).
- All of this also works on pro StubHub

## Chrome Store Link
[Download From Chrome Web Store](https://chrome.google.com/webstore/detail/sh-price-analysis/olpgmhgcppgfgjfpdmmlodeohnlihfoo?hl=en-US&gl=US&authuser=1 "Download From Chrome Web Store")

## Installing
- Download the package.zip onto your machine and unzip into any location of your choosing.
- Go to Chrome Extensions (chrome://extensions) and on the top right corner, check "Developer Mode".
- You will see three new buttons, one being "Load unpacked extension...". Click that button.
- Search and select the folder where you unpacked the extension, load it, and you're all set.

## Built with
- JavaScript
- HTML
- XML
- CSS
- Chrome.tabs API

## Permissions
Chrome Permissions:
- tabs: Used to access chrome tabs API in order to get current tab URL. No history is accessed.
- clipboardRead: Used to get top most clipboard data.

## Issues
I've been using it for a while, I've found no bugs so far. If you find any, please let me know.

## Troubleshooting
If Price Analysis does not work or SellHub keeps looping, sign in and out of SH. It's a problem with their site.

## Suggestions and Requests
They are very welcome. Leave a comment or shoot me an email and I'll see what I can do.