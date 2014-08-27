var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var sp = require("sdk/simple-prefs");
var xhr = new require("sdk/net/xhr");
var storage = require("sdk/simple-storage").storage;

function loadCTSURNs(worker) {
    var parseXML = function(self, worker) {
        var caps = [];
        
        var xml = self.responseXML.getElementsByTagName("work");
        if (xml.length == 0) xml = self.responseXML.getElementsByTagName("ti:work");
        for (var c = 0; c < xml.length; c++)
        {
            var urn = xml[c].getAttribute("urn")
            if (urn && urn != "") {
                caps.push(xml[c].getAttribute("urn"));
                console.log(xml[c].getAttribute("urn"));
            }
        }
        storage.validURNs = caps;
        worker.port.emit("urnList", caps, sp.prefs.CTSFrontend);
        console.log("Reload");
    }
    
    var request = new xhr.XMLHttpRequest();
    request.onload = function() { parseXML(this, worker) };
    request.open("GET", sp.prefs.CTSServer + "?request=GetCapabilities", true);
    request.send(null);  
}

if (!storage.validURNs) storage.validURNs = [];

pageMod.PageMod({
    include: "*",
    contentScriptFile: data.url("highlight-cts.js"),
    onAttach: function(worker) {
        if (!storage.lastDate || (new Date() - storage.lastDate) / (1000 * 60 * 60 ) > sp.prefs.CTSRefresh) {
            storage.lastDate = new Date();
            loadCTSURNs(worker);
        } else {
            worker.port.emit("urnList", storage.validURNs, sp.prefs.CTSFrontend);
        }
    }
});

sp.on("refresh", function() {
    delete storage.lastDate;
});