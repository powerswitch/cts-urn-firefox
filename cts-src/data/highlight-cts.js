function CTSHighlighter(urnList, frontend) {
    this.urnList = urnList;
    this.frontend = frontend;

    this.insertLink = function(match) {
        var link = document.createElement('a');
        link.setAttribute('href', this.frontend.replace("@urn@", match)+":");
        link.appendChild(document.createTextNode(match.replace(/urn:cts:/i, "")));
        this.activeNode.parentNode.appendChild(link);
    }
    
    this.matchInList = function(match) {
        var i;
        for (i = 0; i < this.urnList.length; i++) {
            var entry = this.urnList[i];
            if (entry.substr(0,match.length) == match) {
                return true;
            }
        }
        return false;
    }    
    
    this.replaceCTS = function(match) {
        console.log(match);
        if (this.matchInList(match)) {
            insertLink(match);
            return "urn:cts:";
        }
        
        return match;
    }
    
    this.findCTS = function(node) {
        if (node.nodeValue && node.nodeValue != "") {
            this.activeNode = node;
            node.nodeValue = node.nodeValue.replace(/urn:cts:([A-Za-z0-9\.]*:[A-Za-z0-9\.\-]*)(:[A-Za-z0-9\.\-]*)?/ig, this.replaceCTS)
        }
    }    
    
    this.getNodeChildren = function(node) {
        var i;
        for (i = 0; i < node.childNodes.length; i++)
        {
            this.findCTS(node.childNodes[i]);
            this.getNodeChildren(node.childNodes[i]);
        }
    }

    if (document.body) {
        this.getNodeChildren(document.body);
    }
    
}

self.port.on("urnList", CTSHighlighter);
