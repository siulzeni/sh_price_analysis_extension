#StubHub Price Analysis Extension
This is a Chrome Extension that makes opening StubHub Price Analysis as easy as one click.

##Motivation
When I browse StubHub event listings looking for new artists and events, I always like to check demand. Opening the Price
Analysis tool usually takes me 3 to 4 clicks and a copy/pase. I know it's not a lot, but when I laizly browse for new
events I like to relax and search with one hand. I came up with this solution to further enable my laziness.

#How/Where It Works
Click extension when:
- On the event page.
- There is an event link in your clipboard.
- If already on Price Analysis, click to open SellHub.
- All of this also works on pro StubHub

##Installing
- Download the package.zip onto your machine and unzip into any location of your choosing.
- Go to Chrome Extensions (chrome://extensions) and on the top right corner, check "Developer Mode".
- You will see three new buttons, one being "Load unpacked extension...". Click that button.
- Search and select the folder where you unpacked the extension, load it, and you're all set.

##Built with
- JavaScript
- HTML
- XML
- CSS
- Chrome.tabs API

##Permissions
Chrome Permissions:
- tabs: Used to access chrome tabs API in order to get current tab URL. No history is accessed.
- clipboardRead: Used to get top most clipboard data.

##Issues
I've been using it for a while, I've found no bugs so far. If you find any, please let me know

##Troubleshooting
If Price Analysis does not work or SellHub keeps looping, sign in and out of SH. It's a problem with their site.

##Why didn't I upload it to the Chrome Web Store?
It's a very niche extension thus I didn't deem it worthy to upload to the Chrome Web Store. Distribution
would be much easier, but I'd like to give people the option to comb the source code and verify nothing 
malicious is going on.

##Suggestions and Requests
They are very welcome. Leave a comment or shoot me an email and I'll see what I can do.