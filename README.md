cts-urn-firefox
===============

cts-urn-firefox is a Firefox AddOn, which automatically creates links from
Canonical Text Services references (cts:urn:). 

To learn about CTS-URNs see
http://www.homermultitext.org/hmt-doc/cite/cts-urn-overview.html or
http://cts-demo.appspot.com/demo/examples

BUILD
-----
* Download the Mozilla SDK (https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/jetpack-sdk-latest.zip)
* Follow the instructions (https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation)
* activate SDK ($ source bin/activate)
* change to the cts-src dir
* run "cfx run" to test add on

INSTALL
-------
* create the xpi package "cfx xpi"
* just install the xpi package

USAGE
-----
You need to name a server which provides Canonical Text Services
(http://www.homermultitext.org/hmt-docs/specifications/cts/). The first AddOn
setting "CTSServer" wants a "http://[cts-server]?request=GetCapabilities" link.
The second AddOn setting "CTSFrontend" holds a link with a placeholder to be
called when a cts:urn: is clicked. This could be of course the same server as in
the first setting with i.e. "http://[cts-server]?request=GetFirstUrn&urn=@urn@".
Or it could be a fancy graphical cts urn server, who knows
This third setting defines a time interval to update the local cts list using
the first link. If you change the first link you'll probaly update it immediatly
by using the "refresh now" button

QUESTIONS
---------

Q: Where do I find a CTS Server?
A: Honestly - I don't know

Q: The AddOn is messing up every web page
A: If requested, I could add a whitelist to enable the plugin

Q: The AddOn took pictures of my cat and posted it on my social profile
A: That's not a question