define("ace/mode/marker_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var colors = [  "aqua","black","blue","fuchsia",
                "gray","green","lime","maroon",
                "navy","olive","orange","purple",
                "red","silver","teal","white",
                "yellow"];

var MarkerHighlightRules = function() {  

    this.$rules = {
        "start" : [{
            // A comment. Tex comments start with % and go to 
            // the end of the line
            token : "comment",
            regex : "--.*$"
        }, {
            // #data
            token : "keyword",
            regex : "\\#[a-zA-Z]+"
        }, {
            // @highest
            token : "storage.type",
            regex : "\\@[a-zA-Z]+"
        }, {
            token : "string",           // " string
            regex : "([a-zA-Z]+.csv)"
        }, {
            token : "constant.language.boolean",
            regex : "([0-9]+)"
        }, {
            token : "constant.language.boolean",
            regex : /(?:true|false)\b/
        }, {
            token: function(value) {
                if (colors.indexOf(value.toLowerCase()) != -1) {
                    return "support.constant.color";
                } else {
                    return "text";
                }
            },
            regex: "[a-zA-Z]+"
        }]
    };
};
oop.inherits(MarkerHighlightRules, TextHighlightRules);

exports.MarkerHighlightRules = MarkerHighlightRules;

});


define("ace/mode/folding/marker",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range","ace/token_iterator"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;
var Range = require("../../range").Range;
var TokenIterator = require("../../token_iterator").TokenIterator;

var FoldMode = exports.FoldMode = function() {};

oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.foldingStartMarker = /^\s*\\(begin)|(section|subsection|paragraph)\b|{\s*$/;
    this.foldingStopMarker = /^\s*\\(end)\b|^\s*}/;

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.doc.getLine(row);
        var match = this.foldingStartMarker.exec(line);
        if (match) {
            if (match[1])
                return this.markerBlock(session, row, match[0].length - 1);
            if (match[2])
                return this.markerSection(session, row, match[0].length - 1);

            return this.openingBracketBlock(session, "{", row, match.index);
        }

        var match = this.foldingStopMarker.exec(line);
        if (match) {
            if (match[1])
                return this.markerBlock(session, row, match[0].length - 1);

            return this.closingBracketBlock(session, "}", row, match.index + match[0].length);
        }
    };

    this.markerBlock = function(session, row, column) {
        var keywords = {
            "\\begin": 1,
            "\\end": -1
        };

        var stream = new TokenIterator(session, row, column);
        var token = stream.getCurrentToken();
        if (!token || !(token.type == "storage.type" || token.type == "constant.character.escape"))
            return;

        var val = token.value;
        var dir = keywords[val];

        var getType = function() {
            var token = stream.stepForward();
            var type = token.type == "lparen" ?stream.stepForward().value : "";
            if (dir === -1) {
                stream.stepBackward();
                if (type)
                    stream.stepBackward();
            }
            return type;
        };
        var stack = [getType()];
        var startColumn = dir === -1 ? stream.getCurrentTokenColumn() : session.getLine(row).length;
        var startRow = row;

        stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
        while(token = stream.step()) {
            if (!token || !(token.type == "storage.type" || token.type == "constant.character.escape"))
                continue;
            var level = keywords[token.value];
            if (!level)
                continue;
            var type = getType();
            if (level === dir)
                stack.unshift(type);
            else if (stack.shift() !== type || !stack.length)
                break;
        }

        if (stack.length)
            return;

        var row = stream.getCurrentTokenRow();
        if (dir === -1)
            return new Range(row, session.getLine(row).length, startRow, startColumn);
        stream.stepBackward();
        return new Range(startRow, startColumn, row, stream.getCurrentTokenColumn());
    };

    this.markerSection = function(session, row, column) {
        var keywords = ["\\subsection", "\\section", "\\begin", "\\end", "\\paragraph"];

        var stream = new TokenIterator(session, row, column);
        var token = stream.getCurrentToken();
        if (!token || token.type != "storage.type")
            return;

        var startLevel = keywords.indexOf(token.value);
        var stackDepth = 0
        var endRow = row;

        while(token = stream.stepForward()) {
            if (token.type !== "storage.type")
                continue;
            var level = keywords.indexOf(token.value);

            if (level >= 2) {
                if (!stackDepth)
                    endRow = stream.getCurrentTokenRow() - 1;
                stackDepth += level == 2 ? 1 : - 1;
                if (stackDepth < 0)
                    break
            } else if (level >= startLevel)
                break;
        }

        if (!stackDepth)
            endRow = stream.getCurrentTokenRow() - 1;

        while (endRow > row && !/\S/.test(session.getLine(endRow)))
            endRow--;

        return new Range(
            row, session.getLine(row).length,
            endRow, session.getLine(endRow).length
        );
    };

}).call(FoldMode.prototype);

});

define("ace/mode/marker",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/marker_highlight_rules","ace/mode/folding/marker","ace/range"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var MarkerHighlightRules = require("./marker_highlight_rules").MarkerHighlightRules;
var MarkerFoldMode = require("./folding/marker").FoldMode;
var Range = require("../range").Range;

var Mode = function() {
    this.HighlightRules = MarkerHighlightRules;
    this.foldingRules = new MarkerFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.type = "text";
    
    this.lineCommentStart = "--";

    this.$id = "ace/mode/marker";
}).call(Mode.prototype);

exports.Mode = Mode;

});
