self.port.on("urnList", function(urnList, frontend) {
    var doc = document.body;
    if (doc) {
        doc = doc.innerHTML;
        newdoc = doc;
        var regex = /urn:cts:([A-Za-z0-9\.]*:[A-Za-z0-9\.\-]*)(:[A-Za-z0-9\.\-]*)?/ig;
        var results = regex.exec(doc);
        var offset = 0;
        
        while (results && results.length > 2) {
            var index = urnList.indexOf("urn:cts:"+results[1]+":");
            if (index != -1) {
                var length = results[0].length;
                var lastIndex = regex.lastIndex + offset;
                var firstIndex = lastIndex - length;
                
                if (results[2] == null) results[0] += ":";
                
                frontend = frontend.replace("@urn@", results[0]);
                var insert = "<a href=\"" + frontend + "\">" + results[0] + "</a>";

                newdoc = [
                    newdoc.slice(0, firstIndex),
                    insert,
                    newdoc.slice(lastIndex)
                ].join('');
                
                offset += insert.length - length;
            } else {
                var length = results[0].length;
                var lastIndex = regex.lastIndex + offset;
                var firstIndex = lastIndex - length;
                
                var insert = "<a title=\"Reference not in database\">" + results[0] + "</a>";

                newdoc = [
                    newdoc.slice(0, firstIndex),
                    insert,
                    newdoc.slice(lastIndex)
                ].join('');
                
                offset += insert.length - length;
            }
            results = regex.exec(doc);            
        }
        document.body.innerHTML = newdoc;
    }
});

