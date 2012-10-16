
window.getAllAttrs = function (obj) {
    var it = '';
    for (var i in obj) {
        it += i + ":" + obj[i] + "\n";
    }
    return it;
};
$(document).ready(init);
window.W = function (scale) { }
window.H = function (scale) { }
function init() {
    window.IH = window.innerHeight;
    window.IW = window.innerWidth;
    window.W = function (scale) {
        return scale * 640;
    };
    window.H = function (scale) {
        return scale * 350;
    };
    graphingPage();
    /* ========== DRAWING THE PATH AND INITIATING THE PLUGIN ============= */

    var path = $.fn.scrollPath("getPath", {
        scrollSpeed: 50, // Default is 50
        rotationSpeed: Math.PI / 10 // Default is Math.PI / 15
    });
    path.moveTo(W(1), H(0.8), { name: "start" })
    .lineTo(W(4), H(0.8), { name: "end-start" })
    .arc(W(4), H(1.715), W(0.5), 3 * Math.PI / 2, 0, false, { name: "to-html" })
    //    .rotate(-Math.PI / 2, { name: "rotations-rotated" })
    .lineTo(W(4.5), H(2.5), { name: "html-tag" })
    .lineTo(W(5), H(3), { name: "html-tag-inline-start" })
    .lineTo(W(5), H(3.7), { name: "html-tag-inline-end" })
    .lineTo(W(4.5), H(3.35), { name: "html-tag-to-block" })
    //    .rotate(Math.PI, { name: "html-tag-to-block-rotated" })
    .lineTo(W(4), H(3), { name: "html-tag-block-start" })
    .lineTo(W(4), H(3.7), { name: "html-tag-block-end" })
    .lineTo(W(4.5), H(4.2), { name: "html-tag-end" })
    .lineTo(W(4.5), H(4.5), { name: "css-display-start" })
    .lineTo(W(4.5), H(6), { name: "css-display-end" })
    .arc(W(4.08), H(6), W(0.42), 0, Math.PI / 2, false, { name: "to-css-float" })
    .lineTo(W(3), H(6.78), { name: "css-float-start" })
    .lineTo(W(2.4), H(6.78), { name: "css-float-end" })
    ;

    /*
    $.fn.scrollPath("getPath",
    { drawPath: true,
    wrapAround: true,
    scrollBar: true,
    scrollSpeed: 5, // Default is 50滚轮用
    rotationSpeed: Math.PI / 15  // Default is Math.PI / 15滚轮用
    })
    // Move to 'start' element
    .moveTo(400, 50, { name: "start" })
    // Line to 'description' element
    .lineTo(400, 800, { name: "description" })
    // Arc down and line to 'syntax'
    .arc(200, 1200, 400, -Math.PI / 2, Math.PI / 2, true)
    .lineTo(600, 1600, {
    callback: function () {
    highlight($(".settings"));
    },
    name: "syntax"
    })
    // Continue line to 'scrollbar'
    .lineTo(1750, 1600, {
    callback: function () {
    highlight($(".sp-scroll-handle"));
    },
    name: "scrollbar"
    })
    // Arc up while rotating
    .arc(1800, 1000, 600, Math.PI / 2, 0, true, { rotate: Math.PI / 2 })
    // Line to 'rotations'
    .lineTo(2400, 750, {
    name: "rotations"
    })
    // Rotate in place
    .rotate(3 * Math.PI / 2, {
    name: "rotations-rotated"
    })
    // Continue upwards to 'source'
    .lineTo(2400, -700, {
    name: "source"
    })
    // Small arc downwards
    .arc(2250, -700, 150, 0, -Math.PI / 2, true)

    //Line to 'follow'
    .lineTo(1350, -1850, {
    name: "follow"
    })
    // Arc and rotate back to the beginning.
    .arc(1300, 50, 1900, -Math.PI / 2, -Math.PI, true, { rotate: Math.PI * 2, name: "end" });
    */


    // We're done with the path, let's initate the plugin on our wrapper element
    $(".wrapper").scrollPath({ drawPath: true, wrapAround: true });

    // Add scrollTo on click on the navigation anchors
    $("nav").find("a").each(function () {
        var target = $(this).attr("href").replace("#", "");
        $(this).click(function (e) {
            e.preventDefault();

            // Include the jQuery easing plugin (http://gsgd.co.uk/sandbox/jquery/easing/)
            // for extra easing functions like the one below
            $.fn.scrollPath("scrollTo", target, 1000, "easeInOutSine");
        });
    });

    /* ===================================================================== */
    $(".settings .show-path").click(function (e) {
        e.preventDefault();
        $(".sp-canvas").toggle();
    }).toggle(function () {
        $(this).text("Hide Path");
    }, function () {
        $(this).text("Show Path");
    });

}

//$.fn.scrollPath("scrollTo", "syntax", 1000, "easeInOutSine", function () {
//    alert("Animation complete!")
//});

function highlight(element) {
    if (!element.hasClass("highlight")) {
        element.addClass("highlight");
        setTimeout(function () { element.removeClass("highlight"); }, 2000);
    }
}
function ordinal(num) {
    return num + (
		(num % 10 == 1 && num % 100 != 11) ? 'st' :
		(num % 10 == 2 && num % 100 != 12) ? 'nd' :
		(num % 10 == 3 && num % 100 != 13) ? 'rd' : 'th'
	);
}

/***************************--------------------***************************/
/***************************____graphingPage____***************************/
/***************************____________________***************************/
function graphingPage() {
    var paper = Raphael("RaphaelCanvas", W(6), H(8)); //W(2), H(2)
    var LinePath = function () {
        this.method = {
            path: "",
            M: function (x, y) {
                this.path += 'M' + x + ' ' + y;
                return this;
            },
            Z: function () { this.path += 'Z'; return this; },
            L: function (x, y) {
                this.path += 'L' + x + ' ' + y;
                return this;
            },
            H: function (x) {
                this.path += 'H' + x;
                return this;
            },
            V: function (y) {
                this.path += 'V' + y;
                return this;
            },
            C: function (x1, y1, x2, y2, x, y) {
                this.path += 'C' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x + ' ' + y;
                return this;
            },
            S: function (x1, y1, x, y) {
                this.path += 'S' + x1 + ' ' + y1 + ' ' + x + ' ' + y;
                return this;
            },
            Q: function (x1, y1, x, y) {
                this.path += 'Q' + x1 + ' ' + y1 + ' ' + x + ' ' + y;
                return this;
            },
            T: function (x, y) {
                this.path += 'T' + x + ' ' + y;
                return this;
            },
            $: function (S) {
                this.path += S;
                return this;
            }
        }
        return this.method;
    };
    var main = new LinePath().M(W(0.1), H(0.85)).L(W(4), H(0.85)).C(W(4.5), H(0.85), W(4.5), H(1.6), W(4.5), H(1.6))
                .L(W(4.5), H(2.5)).L(W(5), H(3)).L(W(5.0), H(3.7))
                .M(W(4), H(3)).L(W(4), H(3.7)).L(W(4.5), H(4.2)).L(W(4.5), H(4.5)).C(W(4.535), H(4.5), W(4.535), H(4.6), W(4.5), H(4.6)).C(W(4.465), H(4.6), W(4.465), H(4.5), W(4.5), H(4.5))
                .M(W(4.6), H(4.55)).C(W(4.6), H(4.8), W(4.4), H(4.8), W(4.4), H(4.55))
                .M(W(4.5), H(4.74)).L(W(4.5), H(6)).C(W(4.5), H(6.8), W(4), H(6.8), W(4), H(6.8)).L(W(3), H(6.8))
                .M(W(2.2), H(6.8)).L(W(1.8), H(6.8))
                ;
    var mainLine = paper.path(main.path)
                        .attr({ stroke: "#8BC900", "stroke-width": 4 })
    //                        .glow({ width: 35, opacity: 0.8, color: "5B990E", offsetx: 5, offsety: 5 });
    var widget = paper.set(), h1 = paper.set(), span = paper.set(), animate = {};
    widget.push(paper.text(W(0.75), H(0.831), "⿻")
                     .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                     .transform("s12")
                );
    animate.Pillar = Raphael.animation({ height: (200 * Math.random()) }, (500 * Math.random()), function () { this.animate({ height: (300 * Math.random()) }, (1000 * Math.random())) });
    for (var i = 0; i < 2.5; i++) {
        widget.push(paper.rect(W(2.6 + 0.05 * i), H(0.9), 20, H(0.2))
                     .attr({ fill: "#8BC900", "stroke-width": 0 })
                     .animate(animate.Pillar.repeat("Infinity"))
                );
    }
    widget.push(paper.rect(W(2.2), H(6.1), W(0.8), H(1.2))
                     .attr({ fill: "#4B6900", opacity: 0.5, "stroke-width": 0 })
                );
    widget.push(paper.rect(W(2.2), H(6.1), W(0.8), H(1.2))
                     .attr({ fill: "transparent", "stroke-width": 3, stroke: "#8BC900" })
                );
    widget.push(paper.rect(W(2.25), H(6.15), W(0.3), H(0.55))
                     .attr({ fill: "#8BC900", opacity: 1, "stroke-width": 0 })
                );
    widget.push(paper.rect(W(2.25), H(6.75), W(0.3), H(0.5))
                     .attr({ fill: "#8BC900", opacity: 1, "stroke-width": 0 })
                );
    widget.push(paper.rect(W(2.6), H(6.15), W(0.35), H(1.1))
                     .attr({ fill: "#8BC900", opacity: 1, "stroke-width": 0 })
                );
    /***/
    widget.push(paper.rect(W(1), H(6.1), W(0.8), H(1.2))
                     .attr({ fill: "#4B6900", opacity: 0, "stroke-width": 0 })
                     .mouseover(function () { this.animate({ opacity: 0.5 }, 200) })
                     .mouseout(function () { this.animate({ opacity: 0 }, 200) })
                );
    widget.push(paper.rect(W(1), H(6.1), W(0.8), H(1.2))
                     .attr({ fill: "transparent", "stroke-width": 3, stroke: "#8BC900" })
                );
    widget.push(paper.rect(W(1.15), H(6.3), W(0.5), H(0.8))
                     .attr({ fill: "#4B6900", "stroke-width": 0 })
                     .mouseover(function () { this.animate({ fill: "#8BC900" }, 200) })
                     .mouseout(function () { this.animate({ fill: "#4B6900" }, 200) })
                );
    widget.push(paper.rect(W(1.2), H(6.4), W(0.4), H(0.6))
                     .attr({ fill: "#5B990E", "stroke-width": 0 })
                     .mouseover(function () { this.animate({ fill: "#8BC900" }, 200) })
                     .mouseout(function () { this.animate({ fill: "#5B990E" }, 200) })
                );


    h1.push(paper.text(W(0.375), H(0.457), "< />")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                   .transform("s24")
            );
    h1.push(paper.text(W(1.206), H(1.23), "CSS")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                   .transform("s22")
            );
    h1.push(paper.text(W(3.25), H(0.60), "About:HTM")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                   .transform("s18")
            );
    h1.push(paper.text(W(4.06), H(0.6), "L")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                   .transform("s18r5")
            );
    h1.push(paper.text(W(4.38), H(0.70), "标")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                   .transform("s18r25")
            );
    h1.push(paper.text(W(4.6), H(1.15), "签")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                   .transform("s18r60")
            );
    h1.push(paper.text(W(5.12), H(3.65), "内联元素")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                   .transform("s12r90")
            );
    h1.push(paper.text(W(4.92), H(3.7), "inline element")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                   .transform("s8r270")
            );
    h1.push(paper.text(W(3.88), H(3), "块元素")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                   .transform("s12r270")
            );
    h1.push(paper.text(W(4.08), H(3), "block element")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                   .transform("s8r90")
            );
    h1.push(paper.text(W(3.2), H(6.6), "浮动")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                   .transform("s9")
            );
    h1.push(paper.text(W(3.36), H(6.8), "&")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                   .transform("s6")
            );
    h1.push(paper.text(W(3.6), H(7), "标准流")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 1 })
                   .transform("s9")
            );
    h1.push(paper.text(W(2.4), H(6.3), "float:left;")
                   .attr({ fill: "#4B6900", "stroke-width": 0 })
                   .transform("s4")
            );
    h1.push(paper.text(W(2.4), H(6.95), "clear:left;\nfloat:left;")
                   .attr({ fill: "#4B6900", "stroke-width": 0 })
                   .transform("s4")
            );
    h1.push(paper.text(W(2.78), H(6.65), "margin-left:\n110px;")
                   .attr({ fill: "#4B6900", "stroke-width": 0 })
                   .transform("s4")
            );

    span.push(paper.text(W(0.242), H(0.914), "·table-tbody-thead-th-td-tr-tfoot\n"
                                + "·textarea\n"
                                + "·!DOCTYPE\n"
                                + "·ul-ol-li\n"
                                + "·div\n"
                                + "·map\n"
                                + "·code\n"
                                + "·span\n"
                                + "·strong\n"
                                + "·style\n"
                                + "·p\n"
                                + "·title\n"
                                + "·em-strong-dfn-code-samp-kbd-var-cite\n"
                                + "·h1 - h6\n"
                                + "·hr\n"
                                + "·form-input\n"
                                + "·frameset-frame\n"
                                + "·object-param\n"
                                + "·fieldset-legend\n"
                                + "·font\n"
                                + "·a-b-big-em\n"
                                + "·body\n"
                                + "·br\n"
                                + "·center\n"
                                + "·cite\n"
                                + "·head-link-meta\n"
                                + "·optgroup\n"
                                + "·pre\n"
                                + "·q\n"
                                + "·iframe-noframes\n"
                                + "·img\n"
                                + "·label\n"
                                + "·script-noscript\n"
                                + "·select-option\n"
                                + "·small\n")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 0 })
                   .transform("s1.3r90")
            );
    span.items[0].node.style.textAnchor = "start";
    span.push(paper.text(W(1.4375), H(0.8), "·list-style-position\n"
                                + "·list-style-type\n"
                                + "·marker-offset\n"
                                + "·content\n"
                                + "·counter-increment\n"
                                + "·counter-reset\n"
                                + "·quotes\n"
                                + "·height\n"
                                + "·max-height\n"
                                + "·max-width\n"
                                + "·min-height\n"
                                + "·min-width\n"
                                + "·width\n"
                                + "·bottom\n"
                                + "·clear\n"
                                + "·clip\n"
                                + "·cursor\n"
                                + "·display\n"
                                + "·float\n"
                                + "·left\n"
                                + "·overflow\n"
                                + "·position\n"
                                + "·right\n"
                                + "·top\n"
                                + "·vertical-align\n"
                                + "·visibility\n"
                                + "·z-index\n"
                                + "·orphans\n"
                                + "·page-break-after\n"
                                + "·page-break-before\n"
                                + "·page-break-inside\n"
                                + "·widows\n"
                                + "·border-collapse\n"
                                + "·border-spacing\n"
                                + "·caption-side\n"
                                + "·empty-cells\n"
                                + "·table-layout\n"
                                + "·:active\n"
                                + "·:focus\n"
                                + "·:hover\n"
                                + "·:link\n"
                                + "·:visited\n"
                                + "·:first-child\n"
                                + "·:lang\n"
                                + "·:first-letter\n"
                                + "·:first-line\n"
                                + "·:before\n"
                                + "·:after\n")
                   .attr({ stroke: "#4B6900", fill: "#8BC900", "stroke-width": 0 })
                   .transform("s1.3r270")
            );
    span.items[1].node.style.textAnchor = "start";
    //    paper.path()
};
