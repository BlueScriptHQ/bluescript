AmCharts.translations.export || (AmCharts.translations.export = {}), AmCharts.translations.export.en || (AmCharts.translations.export.en = {
        "fallback.save.text": "CTRL + C to copy the data into the clipboard.",
        "fallback.save.image": "Rightclick -> Save picture as... to save the image.",
        "capturing.delayed.menu.label": "{{duration}}",
        "capturing.delayed.menu.title": "Click to cancel",
        "menu.label.print": "Print",
        "menu.label.undo": "Undo",
        "menu.label.redo": "Redo",
        "menu.label.cancel": "Cancel",
        "menu.label.save.image": "Download as ...",
        "menu.label.save.data": "Save as ...",
        "menu.label.draw": "Annotate ...",
        "menu.label.draw.change": "Change ...",
        "menu.label.draw.add": "Add ...",
        "menu.label.draw.shapes": "Shape ...",
        "menu.label.draw.colors": "Color ...",
        "menu.label.draw.widths": "Size ...",
        "menu.label.draw.opacities": "Opacity ...",
        "menu.label.draw.text": "Text",
        "menu.label.draw.modes": "Mode ...",
        "menu.label.draw.modes.pencil": "Pencil",
        "menu.label.draw.modes.line": "Line",
        "menu.label.draw.modes.arrow": "Arrow",
        "label.saved.from": "Saved from: "
    }),
    function() {
        AmCharts.export = function(a, b) {
            var c, d = {
                name: "export",
                version: "1.4.42",
                libs: {
                    async: !0,
                    autoLoad: !0,
                    reload: !1,
                    resources: ["fabric.js/fabric.min.js", "FileSaver.js/FileSaver.min.js", "jszip/jszip.min.js", "xlsx/xlsx.min.js", {
                        "pdfmake/pdfmake.min.js": ["pdfmake/vfs_fonts.js"]
                    }],
                    namespaces: {
                        "pdfmake.min.js": "pdfMake",
                        "jszip.min.js": "JSZip",
                        "xlsx.min.js": "XLSX",
                        "fabric.min.js": "fabric",
                        "FileSaver.min.js": "saveAs"
                    },
                    loadTimeout: 1e4
                },
                config: {},
                setup: {
                    chart: a,
                    hasBlob: !1,
                    wrapper: !1,
                    isIE: !!window.document.documentMode,
                    IEversion: window.document.documentMode,
                    hasTouch: "object" == typeof window.Touch
                },
                drawing: {
                    enabled: !1,
                    undos: [],
                    redos: [],
                    buffer: {
                        position: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 0,
                            xD: 0,
                            yD: 0
                        }
                    },
                    handler: {
                        undo: function(a, b) {
                            var c = d.drawing.undos.pop();
                            if (c) {
                                c.selectable = !0, d.drawing.redos.push(c), "added" == c.action && d.setup.fabric.remove(c.target);
                                var e = JSON.parse(c.state);
                                c.target.set(e), c.target instanceof fabric.Group && d.drawing.handler.change({
                                    color: e.cfg.color,
                                    width: e.cfg.width,
                                    opacity: e.cfg.opacity
                                }, !0, c.target), d.setup.fabric.renderAll(), c.state != c.target.recentState || b || d.drawing.handler.undo(c, !0)
                            }
                        },
                        redo: function(a, b) {
                            var c = d.drawing.redos.pop();
                            if (c) {
                                c.selectable = !0, d.drawing.undos.push(c), "added" == c.action && d.setup.fabric.add(c.target);
                                var e = JSON.parse(c.state);
                                c.target.recentState = c.state, c.target.set(e), c.target instanceof fabric.Group && d.drawing.handler.change({
                                    color: e.cfg.color,
                                    width: e.cfg.width,
                                    opacity: e.cfg.opacity
                                }, !0, c.target), d.setup.fabric.renderAll(), "addified" == c.action && d.drawing.handler.redo()
                            }
                        },
                        done: function(a) {
                            d.drawing.enabled = !1, d.drawing.buffer.enabled = !1, d.drawing.undos = [], d.drawing.redos = [], d.createMenu(d.config.menu), d.setup.fabric.deactivateAll(), d.setup.wrapper && (d.setup.chart.containerDiv.removeChild(d.setup.wrapper), d.setup.wrapper = !1)
                        },
                        add: function(a) {
                            var b = d.deepMerge({
                                    top: d.setup.fabric.height / 2,
                                    left: d.setup.fabric.width / 2
                                }, a || {}),
                                c = b.url.indexOf(".svg") != -1 ? fabric.loadSVGFromURL : fabric.Image.fromURL;
                            c(b.url, function(a, c) {
                                var e = void 0 !== c ? fabric.util.groupSVGElements(a, c) : a,
                                    f = !1;
                                (e.height > d.setup.fabric.height || e.width > d.setup.fabric.width) && (f = d.setup.fabric.height / 2 / e.height), b.top > d.setup.fabric.height && (b.top = d.setup.fabric.height / 2), b.left > d.setup.fabric.width && (b.left = d.setup.fabric.width / 2), e.set({
                                    originX: "center",
                                    originY: "center",
                                    top: b.top,
                                    left: b.left,
                                    width: f ? e.width * f : e.width,
                                    height: f ? e.height * f : e.height,
                                    fill: d.drawing.color
                                }), d.setup.fabric.add(e)
                            })
                        },
                        change: function(a, b, c) {
                            var f, g, h, e = d.deepMerge({}, a || {}),
                                i = c || d.drawing.buffer.target,
                                j = i ? i._objects ? i._objects : [i] : null;
                            if (e.mode && (d.drawing.mode = e.mode), e.width && (d.drawing.width = e.width, d.drawing.fontSize = 3 * e.width), e.fontSize && (d.drawing.fontSize = e.fontSize), e.color && (d.drawing.color = e.color), e.opacity && (d.drawing.opacity = e.opacity), h = d.getRGBA(d.drawing.color), h.pop(), h.push(d.drawing.opacity), d.drawing.color = "rgba(" + h.join() + ")", d.setup.fabric.freeDrawingBrush.color = d.drawing.color, d.setup.fabric.freeDrawingBrush.width = d.drawing.width, i) {
                                for (f = JSON.parse(i.recentState).cfg, f && (e.color = e.color || f.color, e.width = e.width || f.width, e.opacity = e.opacity || f.opacity, e.fontSize = e.fontSize || 3 * e.width, h = d.getRGBA(e.color), h.pop(), h.push(e.opacity), e.color = "rgba(" + h.join() + ")"), g = 0; g < j.length; g++) j[g] instanceof fabric.Text || j[g] instanceof fabric.PathGroup || j[g] instanceof fabric.Triangle ? ((e.color || e.opacity) && j[g].set({
                                    fill: e.color
                                }), e.fontSize && j[g].set({
                                    fontSize: e.fontSize
                                })) : (j[g] instanceof fabric.Path || j[g] instanceof fabric.Line) && (i instanceof fabric.Group ? (e.color || e.opacity) && j[g].set({
                                    stroke: e.color
                                }) : ((e.color || e.opacity) && j[g].set({
                                    stroke: e.color
                                }), e.width && j[g].set({
                                    strokeWidth: e.width
                                })));
                                b || (f = JSON.stringify(d.deepMerge(i.saveState().originalState, {
                                    cfg: {
                                        color: e.color,
                                        width: e.width,
                                        opacity: e.opacity
                                    }
                                })), i.recentState = f, d.drawing.redos = [], d.drawing.undos.push({
                                    action: "modified",
                                    target: i,
                                    state: f
                                })), d.setup.fabric.renderAll()
                            }
                        },
                        text: function(a) {
                            var b = d.deepMerge({
                                text: d.i18l("menu.label.draw.text"),
                                top: d.setup.fabric.height / 2,
                                left: d.setup.fabric.width / 2,
                                fontSize: d.drawing.fontSize,
                                fontFamily: d.setup.chart.fontFamily || "Verdana",
                                fill: d.drawing.color
                            }, a || {});
                            b.click = function() {};
                            var c = new fabric.IText(b.text, b);
                            return d.setup.fabric.add(c), d.setup.fabric.setActiveObject(c), c.selectAll(), c.enterEditing(), c
                        },
                        line: function(a) {
                            var c, e, f, g, b = d.deepMerge({
                                    x1: d.setup.fabric.width / 2 - d.setup.fabric.width / 10,
                                    x2: d.setup.fabric.width / 2 + d.setup.fabric.width / 10,
                                    y1: d.setup.fabric.height / 2,
                                    y2: d.setup.fabric.height / 2,
                                    angle: 90,
                                    strokeLineCap: d.drawing.lineCap,
                                    arrow: d.drawing.arrow,
                                    color: d.drawing.color,
                                    width: d.drawing.width,
                                    group: []
                                }, a || {}),
                                h = new fabric.Line([b.x1, b.y1, b.x2, b.y2], {
                                    stroke: b.color,
                                    strokeWidth: b.width,
                                    strokeLineCap: b.strokeLineCap
                                });
                            if (b.group.push(h), b.arrow && (b.angle = b.angle ? b.angle : d.getAngle(b.x1, b.y1, b.x2, b.y2), "start" == b.arrow ? (f = b.y1 + b.width / 2, g = b.x1 + b.width / 2) : "middle" == b.arrow ? (f = b.y2 + b.width / 2 - (b.y2 - b.y1) / 2, g = b.x2 + b.width / 2 - (b.x2 - b.x1) / 2) : (f = b.y2 + b.width / 2, g = b.x2 + b.width / 2), e = new fabric.Triangle({
                                    top: f,
                                    left: g,
                                    fill: b.color,
                                    height: 7 * b.width,
                                    width: 7 * b.width,
                                    angle: b.angle,
                                    originX: "center",
                                    originY: "bottom"
                                }), b.group.push(e)), "config" != b.action) {
                                if (b.arrow) {
                                    var i = new fabric.Group(b.group);
                                    return i.set({
                                        cfg: b,
                                        fill: b.color,
                                        action: b.action,
                                        selectable: !0,
                                        known: "change" == b.action
                                    }), "change" == b.action && d.setup.fabric.setActiveObject(i), d.setup.fabric.add(i), i
                                }
                                return d.setup.fabric.add(h), h
                            }
                            for (c = 0; c < b.group.length; c++) b.group[c].noUndo = !0, d.setup.fabric.add(b.group[c]);
                            return b
                        }
                    }
                },
                defaults: {
                    position: "top-right",
                    fileName: "amCharts",
                    action: "download",
                    overflow: !0,
                    path: (a.path || "") + "plugins/export/",
                    formats: {
                        JPG: {
                            mimeType: "image/jpg",
                            extension: "jpg",
                            capture: !0
                        },
                        PNG: {
                            mimeType: "image/png",
                            extension: "png",
                            capture: !0
                        },
                        SVG: {
                            mimeType: "text/xml",
                            extension: "svg",
                            capture: !0
                        },
                        PDF: {
                            mimeType: "application/pdf",
                            extension: "pdf",
                            capture: !0
                        },
                        CSV: {
                            mimeType: "text/plain",
                            extension: "csv"
                        },
                        JSON: {
                            mimeType: "text/plain",
                            extension: "json"
                        },
                        XLSX: {
                            mimeType: "application/octet-stream",
                            extension: "xlsx"
                        }
                    },
                    fabric: {
                        backgroundColor: "#FFFFFF",
                        removeImages: !0,
                        forceRemoveImages: !1,
                        selection: !1,
                        loadTimeout: 5e3,
                        drawing: {
                            enabled: !0,
                            arrow: "end",
                            lineCap: "butt",
                            mode: "pencil",
                            modes: ["pencil", "line", "arrow"],
                            color: "#000000",
                            colors: ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF"],
                            shapes: ["11.svg", "14.svg", "16.svg", "17.svg", "20.svg", "27.svg"],
                            width: 1,
                            fontSize: 11,
                            widths: [1, 5, 10, 15],
                            opacity: 1,
                            opacities: [1, .8, .6, .4, .2],
                            menu: void 0,
                            autoClose: !0
                        },
                        border: {
                            fill: "",
                            fillOpacity: 0,
                            stroke: "#000000",
                            strokeWidth: 1,
                            strokeOpacity: 1
                        }
                    },
                    pdfMake: {
                        images: {},
                        pageOrientation: "portrait",
                        pageMargins: 40,
                        pageOrigin: !0,
                        pageSize: "A4",
                        pageSizes: {
                            "4A0": [4767.87, 6740.79],
                            "2A0": [3370.39, 4767.87],
                            A0: [2383.94, 3370.39],
                            A1: [1683.78, 2383.94],
                            A2: [1190.55, 1683.78],
                            A3: [841.89, 1190.55],
                            A4: [595.28, 841.89],
                            A5: [419.53, 595.28],
                            A6: [297.64, 419.53],
                            A7: [209.76, 297.64],
                            A8: [147.4, 209.76],
                            A9: [104.88, 147.4],
                            A10: [73.7, 104.88],
                            B0: [2834.65, 4008.19],
                            B1: [2004.09, 2834.65],
                            B2: [1417.32, 2004.09],
                            B3: [1000.63, 1417.32],
                            B4: [708.66, 1000.63],
                            B5: [498.9, 708.66],
                            B6: [354.33, 498.9],
                            B7: [249.45, 354.33],
                            B8: [175.75, 249.45],
                            B9: [124.72, 175.75],
                            B10: [87.87, 124.72],
                            C0: [2599.37, 3676.54],
                            C1: [1836.85, 2599.37],
                            C2: [1298.27, 1836.85],
                            C3: [918.43, 1298.27],
                            C4: [649.13, 918.43],
                            C5: [459.21, 649.13],
                            C6: [323.15, 459.21],
                            C7: [229.61, 323.15],
                            C8: [161.57, 229.61],
                            C9: [113.39, 161.57],
                            C10: [79.37, 113.39],
                            RA0: [2437.8, 3458.27],
                            RA1: [1729.13, 2437.8],
                            RA2: [1218.9, 1729.13],
                            RA3: [864.57, 1218.9],
                            RA4: [609.45, 864.57],
                            SRA0: [2551.18, 3628.35],
                            SRA1: [1814.17, 2551.18],
                            SRA2: [1275.59, 1814.17],
                            SRA3: [907.09, 1275.59],
                            SRA4: [637.8, 907.09],
                            EXECUTIVE: [521.86, 756],
                            FOLIO: [612, 936],
                            LEGAL: [612, 1008],
                            LETTER: [612, 792],
                            TABLOID: [792, 1224]
                        }
                    },
                    menu: void 0,
                    divId: null,
                    menuReviver: null,
                    menuWalker: null,
                    fallback: !0,
                    keyListener: !0,
                    fileListener: !0,
                    compress: !0
                },
                i18l: function(a, b) {
                    var c = b ? langugage : d.setup.chart.language ? d.setup.chart.language : "en",
                        e = AmCharts.translations[d.name][c] || AmCharts.translations[d.name].en;
                    return e[a] || a
                },
                download: function(a, b, c) {
                    if (window.saveAs && d.setup.hasBlob) {
                        d.toBlob({
                            data: a,
                            type: b
                        }, function(a) {
                            saveAs(a, c)
                        })
                    } else if (d.config.fallback && "text/plain" == b) {
                        var f = document.createElement("div"),
                            g = document.createElement("div"),
                            h = document.createElement("textarea");
                        g.innerHTML = d.i18l("fallback.save.text"), f.appendChild(g), f.appendChild(h), g.setAttribute("class", "amcharts-export-fallback-message"), f.setAttribute("class", "amcharts-export-fallback"), d.setup.chart.containerDiv.appendChild(f), h.setAttribute("readonly", ""), h.value = a, h.focus(), h.select(), d.createMenu([{
                            class: "export-main export-close",
                            label: "Done",
                            click: function() {
                                d.createMenu(d.config.menu), d.setup.chart.containerDiv.removeChild(f)
                            }
                        }])
                    } else {
                        if (!d.config.fallback || "image" != b.split("/")[0]) throw new Error("Unable to create file. Ensure saveAs (FileSaver.js) is supported.");
                        var f = document.createElement("div"),
                            g = document.createElement("div"),
                            i = d.toImage({
                                data: a
                            });
                        g.innerHTML = d.i18l("fallback.save.image"), f.appendChild(g), f.appendChild(i), g.setAttribute("class", "amcharts-export-fallback-message"), f.setAttribute("class", "amcharts-export-fallback"), d.setup.chart.containerDiv.appendChild(f), d.createMenu([{
                            class: "export-main export-close",
                            label: "Done",
                            click: function() {
                                d.createMenu(d.config.menu), d.setup.chart.containerDiv.removeChild(f)
                            }
                        }])
                    }
                    return a
                },
                loadResource: function(a, b) {
                    var c, e, f, g, h, i, j = a.indexOf("//") != -1 ? a : [d.libs.path, a].join(""),
                        k = function() {
                            if (b)
                                for (c = 0; c < b.length; c++) d.loadResource(b[c])
                        };
                    for (a.indexOf(".js") != -1 ? (f = document.createElement("script"), f.setAttribute("type", "text/javascript"), f.setAttribute("src", j), d.libs.async && f.setAttribute("async", "")) : a.indexOf(".css") != -1 && (f = document.createElement("link"), f.setAttribute("type", "text/css"), f.setAttribute("rel", "stylesheet"), f.setAttribute("href", j)), c = 0; c < document.head.childNodes.length; c++)
                        if (g = document.head.childNodes[c], h = !!g && (g.src || g.href), i = !!g && g.tagName, g && h && h.indexOf(a) != -1) {
                            d.libs.reload && document.head.removeChild(g), e = !0;
                            break
                        }
                    for (c in d.libs.namespaces) {
                        var l = d.libs.namespaces[c],
                            h = a.toLowerCase(),
                            g = c.toLowerCase();
                        if (h.indexOf(g) != -1 && void 0 !== window[l]) {
                            e = !0;
                            break
                        }
                    }
                    e && !d.libs.reload || (f.addEventListener("load", k), document.head.appendChild(f), d.listenersToRemove || (d.listenersToRemove = []), d.listenersToRemove.push({
                        node: f,
                        method: k,
                        event: "load"
                    }))
                },
                loadDependencies: function() {
                    var a, b;
                    if (d.libs.autoLoad)
                        for (a = 0; a < d.libs.resources.length; a++)
                            if (d.libs.resources[a] instanceof Object)
                                for (b in d.libs.resources[a]) d.loadResource(b, d.libs.resources[a][b]);
                            else d.loadResource(d.libs.resources[a])
                },
                pxToNumber: function(a, b) {
                    if (a || !b) return Number(String(a).replace("px", "")) || 0
                },
                numberToPx: function(a) {
                    return String(a) + "px"
                },
                cloneObject: function(a) {
                    var b, c, e, f, g;
                    b = Array.isArray(a) ? [] : {};
                    for (e in a) c = a[e], f = "object" == typeof c, g = c instanceof Date, b[e] = f && !g ? d.cloneObject(c) : c;
                    return b
                },
                deepMerge: function(a, b, c) {
                    var e, f, g = b instanceof Array ? "array" : "object";
                    for (e in b) "array" == g && isNaN(e) || (f = b[e], (void 0 == a[e] || c) && (f instanceof Array ? a[e] = new Array : f instanceof Function ? a[e] = function() {} : f instanceof Date ? a[e] = new Date : f instanceof Object ? a[e] = new Object : f instanceof Number ? a[e] = new Number : f instanceof String && (a[e] = new String)), (a instanceof Object || a instanceof Array) && (f instanceof Object || f instanceof Array) && !(f instanceof Function || f instanceof Date || d.isElement(f)) && "chart" != e ? d.deepMerge(a[e], f, c) : a instanceof Array && !c ? a.push(f) : a[e] = f);
                    return a
                },
                isElement: function(a) {
                    return a instanceof Object && a && 1 === a.nodeType
                },
                isHashbanged: function(a) {
                    var b = String(a).replace(/\"/g, "");
                    return "url" == b.slice(0, 3) && b.slice(b.indexOf("#") + 1, b.length - 1)
                },
                isPressed: function(a) {
                    return "mousemove" == a.type && 1 === a.which || ("touchmove" == a.type || 1 === a.buttons || 1 === a.button || 1 === a.which ? d.drawing.buffer.isPressed = !0 : d.drawing.buffer.isPressed = !1), d.drawing.buffer.isPressed
                },
                removeImage: function(a) {
                    if (a) {
                        if (d.config.fabric.forceRemoveImages) return !0;
                        if (d.config.fabric.removeImages && d.isTainted(a)) return !0;
                        if (d.setup.isIE && (10 == d.setup.IEversion || 11 == d.setup.IEversion) && a.toLowerCase().indexOf(".svg") != -1) return !0
                    }
                    return !1
                },
                isTainted: function(a) {
                    var b = String(window.location.origin || window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""));
                    if (a) {
                        if (b.indexOf(":\\") != -1 || a.indexOf(":\\") != -1 || b.indexOf("file://") != -1 || a.indexOf("file://") != -1) return !0;
                        if (a.indexOf("//") != -1 && a.indexOf(b.replace(/.*:/, "")) == -1) return !0
                    }
                    return !1
                },
                isSupported: function() {
                    return !!d.config.enabled && !(d.setup.isIE && d.setup.IEversion <= 9 && (!Array.prototype.indexOf || !document.head || d.config.fallback === !1))
                },
                getAngle: function(a, b, c, d) {
                    var g, e = c - a,
                        f = d - b;
                    return g = 0 == e ? 0 == f ? 0 : f > 0 ? Math.PI / 2 : 3 * Math.PI / 2 : 0 == f ? e > 0 ? 0 : Math.PI : e < 0 ? Math.atan(f / e) + Math.PI : f < 0 ? Math.atan(f / e) + 2 * Math.PI : Math.atan(f / e), 180 * g / Math.PI
                },
                gatherAttribute: function(a, b, c, e) {
                    var f, e = e ? e : 0,
                        c = c ? c : 3;
                    return a && (f = a.getAttribute(b), !f && e < c) ? d.gatherAttribute(a.parentNode, b, c, e + 1) : f
                },
                gatherClassName: function(a, b, c, e) {
                    var f, e = e ? e : 0,
                        c = c ? c : 3;
                    if (d.isElement(a)) {
                        if (f = (a.getAttribute("class") || "").split(" ").indexOf(b) != -1, !f && e < c) return d.gatherClassName(a.parentNode, b, c, e + 1);
                        f && (f = a)
                    }
                    return f
                },
                gatherElements: function(a, b, c) {
                    var e, f;
                    for (e = 0; e < a.children.length; e++) {
                        var g = a.children[e];
                        if ("clipPath" == g.tagName) {
                            var h = {},
                                i = fabric.parseTransformAttribute(d.gatherAttribute(g, "transform"));
                            for (f = 0; f < g.childNodes.length; f++) g.childNodes[f].setAttribute("fill", "transparent"), h = {
                                x: d.pxToNumber(g.childNodes[f].getAttribute("x")),
                                y: d.pxToNumber(g.childNodes[f].getAttribute("y")),
                                width: d.pxToNumber(g.childNodes[f].getAttribute("width")),
                                height: d.pxToNumber(g.childNodes[f].getAttribute("height"))
                            };
                            a.clippings[g.id] = {
                                svg: g,
                                bbox: h,
                                transform: i
                            }
                        } else if ("pattern" == g.tagName) {
                            var j = {
                                node: g,
                                source: g.getAttribute("xlink:href"),
                                width: Number(g.getAttribute("width")),
                                height: Number(g.getAttribute("height")),
                                repeat: "repeat",
                                offsetX: 0,
                                offsetY: 0
                            };
                            for (f = 0; f < g.childNodes.length; f++)
                                if ("rect" == g.childNodes[f].tagName) j.fill = g.childNodes[f].getAttribute("fill");
                                else if ("image" == g.childNodes[f].tagName) {
                                var k = fabric.parseAttributes(g.childNodes[f], fabric.SHARED_ATTRIBUTES);
                                k.transformMatrix && (j.offsetX = k.transformMatrix[4], j.offsetY = k.transformMatrix[5])
                            }
                            d.removeImage(j.source) ? a.patterns[g.id] = j.fill ? j.fill : "transparent" : a.patterns[j.node.id] = j
                        } else if ("image" == g.tagName) c.included++, fabric.Image.fromURL(g.getAttribute("xlink:href"), function(a) {
                            c.loaded++
                        });
                        else {
                            var k = ["fill", "stroke"];
                            for (f = 0; f < k.length; f++) {
                                var l = k[f],
                                    m = g.getAttribute(l),
                                    n = d.getRGBA(m),
                                    o = d.isHashbanged(m);
                                !m || n || o || (g.setAttribute(l, "none"), g.setAttribute(l + "-opacity", "0"))
                            }
                        }
                    }
                    return a
                },
                getRGBA: function(a, b) {
                    return !("none" == a || "transparent" == a || d.isHashbanged(a) || (a = new fabric.Color(a), !a._source)) && (b ? a : a.getSource())
                },
                gatherPosition: function(a, b) {
                    var f, c = d.drawing.buffer.position,
                        e = fabric.util.invertTransform(d.setup.fabric.viewportTransform);
                    return "touchmove" == a.type && ("touches" in a ? a = a.touches[0] : "changedTouches" in a && (a = a.changedTouches[0])), f = fabric.util.transformPoint(d.setup.fabric.getPointer(a, !0), e), 1 == b && (c.x1 = f.x, c.y1 = f.y), c.x2 = f.x, c.y2 = f.y, c.xD = c.x1 - c.x2 < 0 ? (c.x1 - c.x2) * -1 : c.x1 - c.x2, c.yD = c.y1 - c.y2 < 0 ? (c.y1 - c.y2) * -1 : c.y1 - c.y2, c
                },
                modifyFabric: function() {
                    fabric.ElementsParser.prototype.resolveGradient = function(a, b) {
                        var c = a.get(b);
                        if (/^url\(/.test(c)) {
                            var d = c.slice(c.indexOf("#") + 1, c.length - 1);
                            fabric.gradientDefs[this.svgUid][d] && a.set(b, fabric.Gradient.fromElement(fabric.gradientDefs[this.svgUid][d], a))
                        }
                    }, fabric.Text.fromElement = function(a, b) {
                        if (!a) return null;
                        var c = fabric.parseAttributes(a, fabric.Text.ATTRIBUTE_NAMES);
                        b = fabric.util.object.extend(b ? fabric.util.object.clone(b) : {}, c), b.top = b.top || 0, b.left = b.left || 0, "dx" in c && (b.left += c.dx), "dy" in c && (b.top += c.dy), "fontSize" in b || (b.fontSize = fabric.Text.DEFAULT_SVG_FONT_SIZE), b.originX || (b.originX = "left");
                        var d = "",
                            e = [];
                        if ("textContent" in a)
                            if (a.childNodes)
                                for (var f = 0; f < a.childNodes.length; f++) e.push(a.childNodes[f].textContent);
                            else e.push(a.textContent);
                        else "firstChild" in a && null !== a.firstChild && "data" in a.firstChild && null !== a.firstChild.data && e.push(a.firstChild.data);
                        d = e.join("\n");
                        var g = new fabric.Text(d, b),
                            h = 0;
                        return "left" === g.originX && (h = g.getWidth() / 2), "right" === g.originX && (h = -g.getWidth() / 2), e.length > 1 ? g.set({
                            left: g.getLeft() + h,
                            top: g.getTop() + g.fontSize * (e.length - 1) * (.18 + g._fontSizeFraction),
                            textAlign: b.originX,
                            lineHeight: e.length > 1 ? .965 : 1.16
                        }) : g.set({
                            left: g.getLeft() + h,
                            top: g.getTop() - g.getHeight() / 2 + g.fontSize * (.18 + g._fontSizeFraction)
                        }), g
                    }
                },
                capture: function(a, b) {
                    var c, e = d.deepMerge(d.deepMerge({}, d.config.fabric), a || {}),
                        f = [],
                        g = {
                            x: 0,
                            y: 0,
                            pX: 0,
                            pY: 0,
                            lX: 0,
                            lY: 0,
                            width: d.setup.chart.divRealWidth,
                            height: d.setup.chart.divRealHeight
                        },
                        h = {
                            loaded: 0,
                            included: 0
                        },
                        i = {
                            items: [],
                            width: 0,
                            height: 0,
                            maxWidth: 0,
                            maxHeight: 0
                        };
                    d.modifyFabric(), d.handleCallback(e.beforeCapture, e);
                    var j = d.setup.chart.containerDiv.getElementsByTagName("svg");
                    for (c = 0; c < j.length; c++) {
                        var k = {
                            svg: j[c],
                            parent: j[c].parentNode,
                            children: j[c].getElementsByTagName("*"),
                            offset: {
                                x: 0,
                                y: 0
                            },
                            patterns: {},
                            clippings: {},
                            has: {
                                legend: !1,
                                panel: !1,
                                scrollbar: !1
                            }
                        };
                        k.has.legend = d.gatherClassName(k.parent, d.setup.chart.classNamePrefix + "-legend-div", 1), k.has.panel = d.gatherClassName(k.parent, d.setup.chart.classNamePrefix + "-stock-panel-div"), k.has.scrollbar = d.gatherClassName(k.parent, d.setup.chart.classNamePrefix + "-scrollbar-chart-div"), k = d.gatherElements(k, e, h), f.push(k)
                    }
                    if (d.config.legend) {
                        if ("stock" == d.setup.chart.type)
                            for (c = 0; c < d.setup.chart.panels.length; c++) d.setup.chart.panels[c].stockLegend && d.setup.chart.panels[c].stockLegend.divId && i.items.push(d.setup.chart.panels[c].stockLegend);
                        else d.setup.chart.legend && d.setup.chart.legend.divId && i.items.push(d.setup.chart.legend);
                        for (c = 0; c < i.items.length; c++) {
                            var l = i.items[c],
                                k = {
                                    svg: l.container.container,
                                    parent: l.container.container.parentNode,
                                    children: l.container.container.getElementsByTagName("*"),
                                    offset: {
                                        x: 0,
                                        y: 0
                                    },
                                    legend: {
                                        id: c,
                                        type: ["top", "left"].indexOf(d.config.legend.position) != -1 ? "unshift" : "push",
                                        position: d.config.legend.position,
                                        width: d.config.legend.width ? d.config.legend.width : l.container.div.offsetWidth,
                                        height: d.config.legend.height ? d.config.legend.height : l.container.div.offsetHeight
                                    },
                                    patterns: {},
                                    clippings: {},
                                    has: {
                                        legend: !1,
                                        panel: !1,
                                        scrollbar: !1
                                    }
                                };
                            i.width += k.legend.width, i.height += k.legend.height, i.maxWidth = k.legend.width > i.maxWidth ? k.legend.width : i.maxWidth, i.maxHeight = k.legend.height > i.maxHeight ? k.legend.height : i.maxHeight, k = d.gatherElements(k, e, h), f[k.legend.type](k)
                        }["top", "bottom"].indexOf(d.config.legend.position) != -1 ? (g.width = i.maxWidth > g.width ? i.maxWidth : g.width, g.height += i.height) : ["left", "right"].indexOf(d.config.legend.position) != -1 ? (g.width += i.maxWidth, g.height = i.height > g.height ? i.height : g.height) : (g.height += i.height, g.width += i.maxWidth)
                    }
                    if (d.drawing.enabled = e.drawing.enabled = "draw" == e.action, d.drawing.buffer.enabled = d.drawing.enabled, d.setup.wrapper = document.createElement("div"), d.setup.wrapper.setAttribute("class", d.setup.chart.classNamePrefix + "-export-canvas"), d.setup.chart.containerDiv.appendChild(d.setup.wrapper), "stock" == d.setup.chart.type) {
                        var m = {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        };
                        d.setup.chart.leftContainer && (g.width -= d.setup.chart.leftContainer.offsetWidth, m.left = d.setup.chart.leftContainer.offsetWidth + 2 * d.setup.chart.panelsSettings.panelSpacing), d.setup.chart.rightContainer && (g.width -= d.setup.chart.rightContainer.offsetWidth, m.right = d.setup.chart.rightContainer.offsetWidth + 2 * d.setup.chart.panelsSettings.panelSpacing), d.setup.chart.periodSelector && ["top", "bottom"].indexOf(d.setup.chart.periodSelector.position) != -1 && (g.height -= d.setup.chart.periodSelector.offsetHeight + d.setup.chart.panelsSettings.panelSpacing, m[d.setup.chart.periodSelector.position] += d.setup.chart.periodSelector.offsetHeight + d.setup.chart.panelsSettings.panelSpacing), d.setup.chart.dataSetSelector && ["top", "bottom"].indexOf(d.setup.chart.dataSetSelector.position) != -1 && (g.height -= d.setup.chart.dataSetSelector.offsetHeight, m[d.setup.chart.dataSetSelector.position] += d.setup.chart.dataSetSelector.offsetHeight), d.setup.wrapper.style.paddingTop = d.numberToPx(m.top), d.setup.wrapper.style.paddingRight = d.numberToPx(m.right), d.setup.wrapper.style.paddingBottom = d.numberToPx(m.bottom), d.setup.wrapper.style.paddingLeft = d.numberToPx(m.left)
                    }
                    for (d.setup.canvas = document.createElement("canvas"), d.setup.wrapper.appendChild(d.setup.canvas), d.setup.fabric = new fabric.Canvas(d.setup.canvas, d.deepMerge({
                            width: g.width,
                            height: g.height,
                            isDrawingMode: !0
                        }, e)), d.deepMerge(d.setup.fabric, e), d.deepMerge(d.setup.fabric.freeDrawingBrush, e.drawing), d.deepMerge(d.drawing, e.drawing), d.drawing.handler.change(e.drawing), d.setup.fabric.on("mouse:down", function(a) {
                            d.gatherPosition(a.e, 1);
                            d.drawing.buffer.pressedTS = Number(new Date), d.isPressed(a.e)
                        }), d.setup.fabric.on("mouse:move", function(a) {
                            var b = d.gatherPosition(a.e, 2);
                            if (d.isPressed(a.e), d.drawing.buffer.isPressed && !d.drawing.buffer.line && !d.drawing.buffer.isSelected && "pencil" != d.drawing.mode && (b.xD > 5 || b.xD > 5) && (d.drawing.buffer.hasLine = !0, d.setup.fabric.isDrawingMode = !1, d.setup.fabric._onMouseUpInDrawingMode(a), d.drawing.buffer.line = d.drawing.handler.line({
                                    x1: b.x1,
                                    y1: b.y1,
                                    x2: b.x2,
                                    y2: b.y2,
                                    arrow: "line" != d.drawing.mode && d.drawing.arrow,
                                    action: "config"
                                })), d.drawing.buffer.line) {
                                var e, f, g, h = d.drawing.buffer.line;
                                for (h.x2 = b.x2, h.y2 = b.y2, c = 0; c < h.group.length; c++) e = h.group[c], e instanceof fabric.Line ? e.set({
                                    x2: h.x2,
                                    y2: h.y2
                                }) : e instanceof fabric.Triangle && (h.angle = d.getAngle(h.x1, h.y1, h.x2, h.y2) + 90, "start" == h.arrow ? (f = h.y1 + h.width / 2, g = h.x1 + h.width / 2) : "middle" == h.arrow ? (f = h.y2 + h.width / 2 - (h.y2 - h.y1) / 2, g = h.x2 + h.width / 2 - (h.x2 - h.x1) / 2) : (f = h.y2 + h.width / 2, g = h.x2 + h.width / 2), e.set({
                                    top: f,
                                    left: g,
                                    angle: h.angle
                                }));
                                d.setup.fabric.renderAll()
                            }
                        }), d.setup.fabric.on("mouse:up", function(a) {
                            if (Number(new Date) - d.drawing.buffer.pressedTS < 200) {
                                var b = d.setup.fabric.findTarget(a.e);
                                b && b.selectable && d.setup.fabric.setActiveObject(b)
                            }
                            if (d.drawing.buffer.line) {
                                for (c = 0; c < d.drawing.buffer.line.group.length; c++) d.drawing.buffer.line.group[c].remove();
                                delete d.drawing.buffer.line.action, delete d.drawing.buffer.line.group, d.drawing.handler.line(d.drawing.buffer.line)
                            }
                            d.drawing.buffer.line = !1, d.drawing.buffer.hasLine = !1, d.drawing.buffer.isPressed = !1
                        }), d.setup.fabric.on("object:selected", function(a) {
                            d.drawing.buffer.isSelected = !0, d.drawing.buffer.target = a.target, d.setup.fabric.isDrawingMode = !1
                        }), d.setup.fabric.on("selection:cleared", function(a) {
                            d.drawing.buffer.onMouseDown = d.setup.fabric.freeDrawingBrush.onMouseDown, d.drawing.buffer.target = !1, d.drawing.buffer.isSelected && (d.setup.fabric._isCurrentlyDrawing = !1, d.setup.fabric.freeDrawingBrush.onMouseDown = function() {}), setTimeout(function() {
                                d.drawing.buffer.isSelected = !1, d.setup.fabric.isDrawingMode = !0, d.setup.fabric.freeDrawingBrush.onMouseDown = d.drawing.buffer.onMouseDown
                            }, 10)
                        }), d.setup.fabric.on("path:created", function(a) {
                            var b = a.path;
                            if (Number(new Date) - d.drawing.buffer.pressedTS < 200 || d.drawing.buffer.hasLine) return d.setup.fabric.remove(b), void d.setup.fabric.renderAll()
                        }), d.setup.fabric.on("object:added", function(a) {
                            var b = a.target,
                                c = d.deepMerge(b.saveState().originalState, {
                                    cfg: {
                                        color: d.drawing.color,
                                        width: d.drawing.width,
                                        opacity: d.drawing.opacity,
                                        fontSize: d.drawing.fontSize
                                    }
                                });
                            return Number(new Date) - d.drawing.buffer.pressedTS < 200 && !b.noUndo ? (d.setup.fabric.remove(b), void d.setup.fabric.renderAll()) : (c = JSON.stringify(c), b.recentState = c, !b.selectable || b.known || b.noUndo || (b.isAnnotation = !0, d.drawing.undos.push({
                                action: "added",
                                target: b,
                                state: c
                            }), d.drawing.undos.push({
                                action: "addified",
                                target: b,
                                state: c
                            }), d.drawing.redos = []), b.known = !0, void(d.setup.fabric.isDrawingMode = !0))
                        }), d.setup.fabric.on("object:modified", function(a) {
                            var b = a.target,
                                c = JSON.parse(b.recentState),
                                e = d.deepMerge(b.saveState().originalState, {
                                    cfg: c.cfg
                                });
                            e = JSON.stringify(e), b.recentState = e, d.drawing.undos.push({
                                action: "modified",
                                target: b,
                                state: e
                            }), d.drawing.redos = []
                        }), d.setup.fabric.on("text:changed", function(a) {
                            var b = a.target;
                            clearTimeout(b.timer), b.timer = setTimeout(function() {
                                var a = JSON.stringify(b.saveState().originalState);
                                b.recentState = a, d.drawing.redos = [], d.drawing.undos.push({
                                    action: "modified",
                                    target: b,
                                    state: a
                                })
                            }, 250)
                        }), d.drawing.enabled ? (d.setup.wrapper.setAttribute("class", d.setup.chart.classNamePrefix + "-export-canvas active"), d.setup.wrapper.style.backgroundColor = e.backgroundColor, d.setup.wrapper.style.display = "block") : (d.setup.wrapper.setAttribute("class", d.setup.chart.classNamePrefix + "-export-canvas"), d.setup.wrapper.style.display = "none"), c = 0; c < f.length; c++) {
                        var k = f[c];
                        "stock" == d.setup.chart.type && d.setup.chart.legendSettings.position ? ["top", "bottom"].indexOf(d.setup.chart.legendSettings.position) != -1 ? k.parent.style.top && k.parent.style.left ? (k.offset.y = d.pxToNumber(k.parent.style.top), k.offset.x = d.pxToNumber(k.parent.style.left)) : (k.offset.x = g.x, k.offset.y = g.y, g.y += d.pxToNumber(k.parent.style.height), k.has.panel ? (g.pY = d.pxToNumber(k.has.panel.style.marginTop), k.offset.y += g.pY) : k.has.scrollbar && (k.offset.y += g.pY)) : ["left", "right"].indexOf(d.setup.chart.legendSettings.position) != -1 && (k.offset.y = d.pxToNumber(k.parent.style.top) + g.pY, k.offset.x = d.pxToNumber(k.parent.style.left) + g.pX, k.has.legend ? g.pY += d.pxToNumber(k.has.panel.style.height) + d.setup.chart.panelsSettings.panelSpacing : k.has.scrollbar && (k.offset.y -= d.setup.chart.panelsSettings.panelSpacing)) : ("absolute" == k.parent.style.position ? (k.offset.absolute = !0, k.offset.top = d.pxToNumber(k.parent.style.top), k.offset.right = d.pxToNumber(k.parent.style.right, !0), k.offset.bottom = d.pxToNumber(k.parent.style.bottom, !0), k.offset.left = d.pxToNumber(k.parent.style.left), k.offset.width = d.pxToNumber(k.parent.style.width), k.offset.height = d.pxToNumber(k.parent.style.height)) : k.parent.style.top && k.parent.style.left ? (k.offset.y = d.pxToNumber(k.parent.style.top), k.offset.x = d.pxToNumber(k.parent.style.left)) : k.legend ? ("left" == k.legend.position ? g.x = i.maxWidth : "right" == k.legend.position ? k.offset.x = g.width - i.maxWidth : "top" == k.legend.position ? g.y += k.legend.height : "bottom" == k.legend.position && (k.offset.y = g.height - i.height), k.offset.y += g.lY, g.lY += k.legend.height) : (k.offset.x = g.x, k.offset.y = g.y + g.pY, g.y += d.pxToNumber(k.parent.style.height)), k.has.legend && k.has.panel && k.has.panel.style.marginTop ? (g.y += d.pxToNumber(k.has.panel.style.marginTop), k.offset.y += d.pxToNumber(k.has.panel.style.marginTop)) : d.setup.chart.legend && ["left", "right"].indexOf(d.setup.chart.legend.position) != -1 && (k.offset.y = d.pxToNumber(k.parent.style.top), k.offset.x = d.pxToNumber(k.parent.style.left))), fabric.parseSVGDocument(k.svg, function(a) {
                            return function(c, i) {
                                var j, l = fabric.util.groupSVGElements(c, i),
                                    m = [],
                                    n = {
                                        selectable: !1,
                                        isCoreElement: !0
                                    };
                                for (a.offset.absolute ? (void 0 !== a.offset.bottom ? n.top = g.height - a.offset.height - a.offset.bottom : n.top = a.offset.top, void 0 !== a.offset.right ? n.left = g.width - a.offset.width - a.offset.right : n.left = a.offset.left) : (n.top = a.offset.y, n.left = a.offset.x), j = 0; j < l.paths.length; j++) {
                                    var o = null;
                                    if (l.paths[j]) {
                                        if (d.removeImage(l.paths[j]["xlink:href"])) continue;
                                        if (l.paths[j].fill instanceof Object) "radial" == l.paths[j].fill.type && ["pie", "gauge"].indexOf(d.setup.chart.type) == -1 && (l.paths[j].fill.coords.r2 = l.paths[j].fill.coords.r1 * -1, l.paths[j].fill.coords.r1 = 0, l.paths[j].set({
                                            opacity: l.paths[j].fillOpacity
                                        }));
                                        else if ((o = d.isHashbanged(l.paths[j].fill)) && a.patterns && a.patterns[o]) {
                                            var p = a.patterns[o];
                                            h.included++, fabric.Image.fromURL(p.source, function(a, b) {
                                                return function(c) {
                                                    h.loaded++, c.set({
                                                        top: a.offsetY,
                                                        left: a.offsetX,
                                                        width: a.width,
                                                        height: a.height
                                                    }), d.setup.fabric._isRetinaScaling() && c.set({
                                                        top: a.offsetY / 2,
                                                        left: a.offsetX / 2,
                                                        scaleX: .5,
                                                        scaleY: .5
                                                    });
                                                    var e = new fabric.StaticCanvas(void 0, {
                                                        backgroundColor: a.fill,
                                                        width: c.getWidth(),
                                                        height: c.getHeight()
                                                    });
                                                    e.add(c);
                                                    var f = new fabric.Pattern({
                                                        source: e.getElement(),
                                                        offsetX: l.paths[b].width / 2,
                                                        offsetY: l.paths[b].height / 2,
                                                        repeat: "repeat"
                                                    });
                                                    l.paths[b].set({
                                                        fill: f,
                                                        opacity: l.paths[b].fillOpacity
                                                    })
                                                }
                                            }(p, j))
                                        }(o = d.isHashbanged(l.paths[j].clipPath)) && a.clippings && a.clippings[o] && (! function(b, c) {
                                            var d = l.paths[b].toSVG;
                                            l.paths[b].toSVG = function(b) {
                                                return d.apply(this, [function(d) {
                                                    return b(d, a.clippings[c])
                                                }])
                                            }
                                        }(j, o), l.paths[j].set({
                                            clipTo: function(b, c) {
                                                return function(b) {
                                                    var e = a.clippings[c],
                                                        f = this.transformMatrix || [1, 0, 0, 1, 0, 0],
                                                        g = {
                                                            top: e.bbox.y,
                                                            left: e.bbox.x,
                                                            width: e.bbox.width,
                                                            height: e.bbox.height
                                                        };
                                                    "map" == d.setup.chart.type && (g.top += e.transform[5], g.left += e.transform[4]), e.bbox.x && f[4] && e.bbox.y && f[5] && (g.top -= f[5], g.left -= f[4]), b.rect(g.left, g.top, g.width, g.height)
                                                }
                                            }(j, o)
                                        }))
                                    }
                                    m.push(l.paths[j])
                                }
                                if (l.paths = m, l.set(n), d.setup.fabric.add(l), a.svg.parentNode && a.svg.parentNode.getElementsByTagName) {
                                    var q = a.svg.parentNode.getElementsByClassName(d.setup.chart.classNamePrefix + "-balloon-div");
                                    for (j = 0; j < q.length; j++)
                                        if (e.balloonFunction instanceof Function) e.balloonFunction.apply(d, [q[j], a]);
                                        else {
                                            var r = q[j],
                                                s = fabric.parseStyleAttribute(r),
                                                t = fabric.parseStyleAttribute(r.childNodes[0]),
                                                u = new fabric.Text(r.innerText || r.textContent || r.innerHTML, {
                                                    selectable: !1,
                                                    top: s.top + a.offset.y,
                                                    left: s.left + a.offset.x,
                                                    fill: t.color,
                                                    fontSize: t.fontSize,
                                                    fontFamily: t.fontFamily,
                                                    textAlign: t["text-align"],
                                                    isCoreElement: !0
                                                });
                                            d.setup.fabric.add(u)
                                        }
                                }
                                if (a.svg.nextSibling && "A" == a.svg.nextSibling.tagName) {
                                    var r = a.svg.nextSibling,
                                        s = fabric.parseStyleAttribute(r),
                                        u = new fabric.Text(r.innerText || r.textContent || r.innerHTML, {
                                            selectable: !1,
                                            top: s.top + a.offset.y,
                                            left: s.left + a.offset.x,
                                            fill: s.color,
                                            fontSize: s.fontSize,
                                            fontFamily: s.fontFamily,
                                            opacity: s.opacity,
                                            isCoreElement: !0
                                        });
                                    a.has.scrollbar || d.setup.fabric.add(u)
                                }
                                if (f.pop(), !f.length) var v = Number(new Date),
                                    w = setInterval(function() {
                                        var a = Number(new Date);
                                        (h.loaded == h.included || a - v > d.config.fabric.loadTimeout) && (clearTimeout(w), d.handleBorder(e), d.handleCallback(e.afterCapture, e), d.setup.fabric.renderAll(), d.handleCallback(b, e))
                                    }, AmCharts.updateRate)
                            }
                        }(k), function(a, b) {
                            var c, f = d.gatherAttribute(a, "class"),
                                g = d.gatherAttribute(a, "visibility"),
                                h = d.gatherAttribute(a, "clip-path");
                            if (b.className = String(f), b.classList = String(f).split(" "), b.clipPath = h, b.svg = a, "hidden" == g) b.opacity = 0;
                            else {
                                var i = ["fill", "stroke"];
                                for (c = 0; c < i.length; c++) {
                                    var j = i[c],
                                        k = String(a.getAttribute(j) || "none"),
                                        l = Number(a.getAttribute(j + "-opacity") || "1"),
                                        m = d.getRGBA(k);
                                    m && (m.pop(), m.push(l), b[j] = "rgba(" + m.join() + ")", b[j + d.capitalize("opacity")] = l)
                                }
                            }
                            d.handleCallback(e.reviver, b, a)
                        })
                    }
                },
                toCanvas: function(a, b) {
                    var c = d.deepMerge({}, a || {}),
                        e = d.setup.canvas;
                    return d.handleCallback(b, e, c), e
                },
                toImage: function(a, b) {
                    var c = d.deepMerge({
                            format: "png",
                            quality: 1,
                            multiplier: d.config.multiplier
                        }, a || {}),
                        e = c.data,
                        f = document.createElement("img");
                    return c.data || (e = c.lossless || "svg" == c.format ? d.toSVG(d.deepMerge(c, {
                        getBase64: !0
                    })) : d.setup.fabric.toDataURL(c)), f.setAttribute("src", e), d.handleCallback(b, f, c), f
                },
                toBlob: function(a, b) {
                    var e, c = d.deepMerge({
                            data: "empty",
                            type: "text/plain"
                        }, a || {}),
                        f = /^data:.+;base64,(.*)$/.exec(c.data);
                    return f && (c.data = f[0], c.type = c.data.slice(5, c.data.indexOf(",") - 7), c.data = d.toByteArray({
                        data: c.data.slice(c.data.indexOf(",") + 1, c.data.length)
                    })), e = c.getByteArray ? c.data : new Blob([c.data], {
                        type: c.type
                    }), d.handleCallback(b, e, c), e
                },
                toJPG: function(a, b) {
                    var c = d.deepMerge({
                        format: "jpeg",
                        quality: 1,
                        multiplier: d.config.multiplier
                    }, a || {});
                    c.format = c.format.toLowerCase();
                    var e = d.setup.fabric.toDataURL(c);
                    return d.handleCallback(b, e, c), e
                },
                toPNG: function(a, b) {
                    var c = d.deepMerge({
                            format: "png",
                            quality: 1,
                            multiplier: d.config.multiplier
                        }, a || {}),
                        e = d.setup.fabric.toDataURL(c);
                    return d.handleCallback(b, e, c), e
                },
                toSVG: function(a, b) {
                    var c = [],
                        e = d.deepMerge({
                            compress: d.config.compress,
                            reviver: function(a, b) {
                                var e = new RegExp(/\bstyle=(['"])(.*?)\1/),
                                    f = e.exec(a)[0].slice(7, -1),
                                    g = f.split(";"),
                                    h = [];
                                for (i1 = 0; i1 < g.length; i1++)
                                    if (g[i1]) {
                                        var i = g[i1].replace(/\s/g, "").split(":"),
                                            j = i[0],
                                            k = i[1];
                                        if (["fill", "stroke"].indexOf(j) != -1)
                                            if (k = d.getRGBA(k, !0)) {
                                                var l = "#" + k.toHex(),
                                                    m = k._source[3];
                                                h.push([j, l].join(":")), h.push([j + "-opacity", m].join(":"))
                                            } else h.push(g[i1]);
                                        else "opactiy" != j && h.push(g[i1])
                                    }
                                if (a = a.replace(f, h.join(";")), b) {
                                    var n = 2,
                                        o = a.slice(-n);
                                    "/>" != o && (n = 3, o = a.slice(-n));
                                    var p = a.slice(0, a.length - n),
                                        q = ' clip-path="url(#' + b.svg.id + ')" ',
                                        r = (new XMLSerializer).serializeToString(b.svg);
                                    a = p + q + o, c.push(r)
                                }
                                return a
                            }
                        }, a || {}),
                        f = d.setup.fabric.toSVG(e, e.reviver);
                    if (c.length) {
                        var g = f.slice(0, f.length - 6),
                            h = f.slice(-6);
                        f = g + c.join("") + h
                    }
                    return e.compress && (f = f.replace(/[\t\r\n]+/g, "")), e.getBase64 && (f = "data:image/svg+xml;base64," + btoa(f)), d.handleCallback(b, f, e), f
                },
                toPDF: function(a, b) {
                    function f(a) {
                        if ("number" == typeof a || a instanceof Number) a = {
                            left: a,
                            right: a,
                            top: a,
                            bottom: a
                        };
                        else if (a instanceof Array)
                            if (2 === a.length) a = {
                                left: a[0],
                                top: a[1],
                                right: a[0],
                                bottom: a[1]
                            };
                            else {
                                if (4 !== a.length) throw "Invalid pageMargins definition";
                                a = {
                                    left: a[0],
                                    top: a[1],
                                    right: a[2],
                                    bottom: a[3]
                                }
                            }
                        else a = {
                            left: d.defaults.pdfMake.pageMargins,
                            top: d.defaults.pdfMake.pageMargins,
                            right: d.defaults.pdfMake.pageMargins,
                            bottom: d.defaults.pdfMake.pageMargins
                        };
                        return a
                    }

                    function g(a, b) {
                        var c = d.defaults.pdfMake.pageSizes[String(a).toUpperCase()].slice();
                        if (!c) throw new Error('The given pageSize "' + a + '" does not exist!');
                        return "landscape" == b && c.reverse(), c
                    }
                    var c = d.deepMerge(d.deepMerge({
                            multiplier: d.config.multiplier || 2,
                            pageOrigin: void 0 === d.config.pageOrigin
                        }, d.config.pdfMake), a || {}, !0),
                        e = new pdfMake.createPdf(c);
                    if (c.images.reference = d.toPNG(c), !c.content) {
                        var h = [],
                            i = g(c.pageSize, c.pageOrientation),
                            j = f(c.pageMargins);
                        i[0] -= j.left + j.right, i[1] -= j.top + j.bottom, c.pageOrigin && (h.push(d.i18l("label.saved.from")), h.push(window.location.href), i[1] -= 28.128), h.push({
                            image: "reference",
                            fit: i
                        }), c.content = h
                    }
                    return b && e.getDataUrl(function(a) {
                        return function(b) {
                            a.apply(d, arguments)
                        }
                    }(b)), e
                },
                toPRINT: function(a, b) {
                    var c, e = d.deepMerge({
                            delay: 1,
                            lossless: !1
                        }, a || {}),
                        f = d.toImage(e),
                        g = [],
                        h = document.body.childNodes,
                        i = document.documentElement.scrollTop || document.body.scrollTop;
                    for (f.setAttribute("style", "width: 100%; max-height: 100%;"), c = 0; c < h.length; c++) d.isElement(h[c]) && (g[c] = h[c].style.display, h[c].style.display = "none");
                    return document.body.appendChild(f), window.print(), setTimeout(function() {
                        for (c = 0; c < h.length; c++) d.isElement(h[c]) && (h[c].style.display = g[c]);
                        document.body.removeChild(f), document.documentElement.scrollTop = document.body.scrollTop = i, d.handleCallback(b, f, e)
                    }, e.delay), f
                },
                toJSON: function(a, b) {
                    var c = d.deepMerge({
                            dateFormat: d.config.dateFormat || "dateObject"
                        }, a || {}, !0),
                        e = {};
                    return c.data = void 0 !== c.data ? c.data : d.getChartData(c), e = JSON.stringify(c.data, void 0, "\t"), d.handleCallback(b, e, c), e
                },
                toCSV: function(a, b) {
                    var c, f = d.deepMerge({
                            delimiter: ",",
                            quotes: !0,
                            escape: !0,
                            withHeader: !0
                        }, a || {}, !0),
                        g = [],
                        h = "";
                    g = d.toArray(f);
                    for (c in g) isNaN(c) || (h += g[c].join(f.delimiter) + "\n");
                    return d.handleCallback(b, h, f), h
                },
                toXLSX: function(a, b) {
                    function h(a, b) {
                        b && (a += 1462);
                        var c = Date.parse(a),
                            d = 60 * a.getTimezoneOffset() * 1e3;
                        return (c - d - new Date(Date.UTC(1899, 11, 30))) / 864e5
                    }

                    function i(a, b) {
                        for (var c = {}, d = {
                                s: {
                                    c: 1e7,
                                    r: 1e7
                                },
                                e: {
                                    c: 0,
                                    r: 0
                                }
                            }, e = 0; e != a.length; ++e)
                            for (var f = 0; f != a[e].length; ++f) {
                                d.s.r > e && (d.s.r = e), d.s.c > f && (d.s.c = f), d.e.r < e && (d.e.r = e), d.e.c < f && (d.e.c = f);
                                var g = {
                                    v: a[e][f]
                                };
                                if (null != g.v) {
                                    var i = XLSX.utils.encode_cell({
                                        c: f,
                                        r: e
                                    });
                                    "number" == typeof g.v ? g.t = "n" : "boolean" == typeof g.v ? g.t = "b" : g.v instanceof Date ? (g.t = "n", g.z = XLSX.SSF._table[14], g.v = h(g.v)) : g.t = "s", c[i] = g
                                }
                            }
                        return d.s.c < 1e7 && (c["!ref"] = XLSX.utils.encode_range(d)), c
                    }
                    var c = d.deepMerge({
                            name: "amCharts",
                            dateFormat: d.config.dateFormat || "dateObject",
                            withHeader: !0,
                            stringify: !1
                        }, a || {}, !0),
                        e = [],
                        f = "",
                        g = {
                            SheetNames: [],
                            Sheets: {}
                        };
                    return e = d.toArray(c), g.SheetNames.push(c.name), g.Sheets[c.name] = i(e), f = XLSX.write(g, {
                        bookType: "xlsx",
                        bookSST: !0,
                        type: "base64"
                    }), f = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + f, d.handleCallback(b, f, c), f
                },
                toArray: function(a, b) {
                    function k(a, b) {
                        var c = b.exportFields || Object.keys(b.dataFieldsMap);
                        for (e = 0; e < c.length; e++) {
                            var f = c[e],
                                g = b.dataFieldsTitlesMap[f];
                            h.push(g)
                        }
                        return j ? d.handleCallback(j, a, b) : a
                    }

                    function l(a) {
                        return "string" == typeof a && (f.escape && (a = a.replace('"', '""')), f.quotes && (a = ['"', a, '"'].join(""))), a
                    }
                    var c, e, f = d.deepMerge({
                            withHeader: !1,
                            stringify: !0,
                            escape: !1,
                            quotes: !1
                        }, a || {}, !0),
                        g = [],
                        h = [],
                        i = [],
                        j = d.config.processData;
                    if (f.processData = k, f.data = void 0 !== f.data ? f.data : d.getChartData(f), f.withHeader) {
                        i = [];
                        for (e in h) isNaN(e) || i.push(l(h[e]));
                        g.push(i)
                    }
                    for (c in f.data)
                        if (i = [], !isNaN(c)) {
                            for (e in h)
                                if (!isNaN(e)) {
                                    var e = h[e],
                                        m = f.data[c][e];
                                    m = null == m ? "" : f.stringify ? String(m) : m, i.push(l(m))
                                }
                            g.push(i)
                        }
                    return d.handleCallback(b, g, f), g
                },
                toByteArray: function(a, b) {
                    function l(a) {
                        var b = a.charCodeAt(0);
                        return b === f ? 62 : b === g ? 63 : b < h ? -1 : b < h + 10 ? b - h + 26 + 26 : b < j + 26 ? b - j : b < i + 26 ? b - i + 26 : void 0
                    }

                    function m(a) {
                        function k(a) {
                            h[j++] = a
                        }
                        var b, c, d, f, g, h;
                        if (a.length % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                        var i = a.length;
                        g = "=" === a.charAt(i - 2) ? 2 : "=" === a.charAt(i - 1) ? 1 : 0, h = new e(3 * a.length / 4 - g), d = g > 0 ? a.length - 4 : a.length;
                        var j = 0;
                        for (b = 0, c = 0; b < d; b += 4, c += 3) f = l(a.charAt(b)) << 18 | l(a.charAt(b + 1)) << 12 | l(a.charAt(b + 2)) << 6 | l(a.charAt(b + 3)), k((16711680 & f) >> 16), k((65280 & f) >> 8), k(255 & f);
                        return 2 === g ? (f = l(a.charAt(b)) << 2 | l(a.charAt(b + 1)) >> 4, k(255 & f)) : 1 === g && (f = l(a.charAt(b)) << 10 | l(a.charAt(b + 1)) << 4 | l(a.charAt(b + 2)) >> 2, k(f >> 8 & 255), k(255 & f)), h
                    }
                    var c = d.deepMerge({}, a || {}),
                        e = "undefined" != typeof Uint8Array ? Uint8Array : Array,
                        f = "+".charCodeAt(0),
                        g = "/".charCodeAt(0),
                        h = "0".charCodeAt(0),
                        i = "a".charCodeAt(0),
                        j = "A".charCodeAt(0),
                        k = m(c.data);
                    return d.handleCallback(b, k, c), k
                },
                handleCallback: function(a) {
                    var b, c = Array();
                    if (a && a instanceof Function) {
                        for (b = 0; b < arguments.length; b++) b > 0 && c.push(arguments[b]);
                        return a.apply(d, c)
                    }
                },
                handleBorder: function(a) {
                    if (d.config.border instanceof Object) {
                        var b = d.deepMerge(d.defaults.fabric.border, a.border || {}, !0),
                            c = new fabric.Rect;
                        b.width = d.setup.fabric.width - b.strokeWidth, b.height = d.setup.fabric.height - b.strokeWidth, c.set(b), d.setup.fabric.add(c)
                    }
                },
                handleDropbox: function(a) {
                    if (d.drawing.enabled)
                        if (a.preventDefault(), a.stopPropagation(), "dragover" == a.type) d.setup.wrapper.setAttribute("class", d.setup.chart.classNamePrefix + "-export-canvas active dropbox");
                        else if (d.setup.wrapper.setAttribute("class", d.setup.chart.classNamePrefix + "-export-canvas active"), "drop" == a.type && a.dataTransfer.files.length)
                        for (var b = 0; b < a.dataTransfer.files.length; b++) {
                            var c = new FileReader;
                            c.onloadend = function(b) {
                                return function() {
                                    d.drawing.handler.add({
                                        url: c.result,
                                        top: a.layerY - 10 * b,
                                        left: a.layerX - 10 * b
                                    })
                                }
                            }(b), c.readAsDataURL(a.dataTransfer.files[b])
                        }
                },
                handleReady: function(a) {
                    var d = this,
                        e = Number(new Date);
                    d.handleCallback(a, "data", !1);
                    for (filename in d.libs.namespaces) {
                        var f = d.libs.namespaces[filename];
                        ! function(b) {
                            var c = setInterval(function() {
                                var f = Number(new Date);
                                (f - e > d.libs.loadTimeout || b in window) && (clearTimeout(c), d.handleCallback(a, b, f - e > d.libs.loadTimeout))
                            }, AmCharts.updateRate)
                        }(f)
                    }
                },
                getChartData: function(a) {
                    function j(a, e, f) {
                        function g(a, c) {
                            return b.dataFields.indexOf(a) != -1 ? g([a, ".", c].join("")) : a
                        }
                        a && b.exportTitles && "gantt" != d.setup.chart.type && (c = g(a, f), b.dataFieldsMap[c] = a, b.dataFields.push(c), b.titles[c] = e || c)
                    }
                    var c, e, f, g, i, b = d.deepMerge({
                            data: [],
                            titles: {},
                            dateFields: [],
                            dataFields: [],
                            dataFieldsMap: {},
                            exportTitles: d.config.exportTitles,
                            exportFields: d.config.exportFields,
                            exportSelection: d.config.exportSelection,
                            columnNames: d.config.columnNames
                        }, a || {}, !0),
                        h = ["valueField", "openField", "closeField", "highField", "lowField", "xField", "yField"];
                    if (0 == b.data.length)
                        if ("stock" == d.setup.chart.type) {
                            for (b.data = d.cloneObject(d.setup.chart.mainDataSet.dataProvider), j(d.setup.chart.mainDataSet.categoryField), b.dateFields.push(d.setup.chart.mainDataSet.categoryField), e = 0; e < d.setup.chart.mainDataSet.fieldMappings.length; e++) {
                                var k = d.setup.chart.mainDataSet.fieldMappings[e];
                                for (f = 0; f < d.setup.chart.panels.length; f++) {
                                    var l = d.setup.chart.panels[f];
                                    for (g = 0; g < l.stockGraphs.length; g++) {
                                        var m = l.stockGraphs[g];
                                        for (i4 = 0; i4 < h.length; i4++) m[h[i4]] == k.toField && j(k.fromField, m.title, h[i4])
                                    }
                                }
                            }
                            if (d.setup.chart.comparedGraphs.length) {
                                for (i = [], e = 0; e < b.data.length; e++) i.push(b.data[e][d.setup.chart.mainDataSet.categoryField]);
                                for (e = 0; e < d.setup.chart.comparedGraphs.length; e++) {
                                    var m = d.setup.chart.comparedGraphs[e];
                                    for (f = 0; f < m.dataSet.dataProvider.length; f++) {
                                        var n = m.dataSet.categoryField,
                                            o = m.dataSet.dataProvider[f][n],
                                            p = i.indexOf(o);
                                        if (p != -1)
                                            for (g = 0; g < m.dataSet.fieldMappings.length; g++) {
                                                var k = m.dataSet.fieldMappings[g],
                                                    c = m.dataSet.id + "_" + k.toField;
                                                b.data[p][c] = m.dataSet.dataProvider[f][k.fromField], b.titles[c] || j(c, m.dataSet.title)
                                            }
                                    }
                                }
                            }
                        } else if ("gantt" == d.setup.chart.type) {
                        j(d.setup.chart.categoryField), b.dateFields.push(d.setup.chart.categoryField);
                        var q = d.setup.chart.segmentsField;
                        for (e = 0; e < d.setup.chart.dataProvider.length; e++) {
                            var r = d.setup.chart.dataProvider[e];
                            if (r[q])
                                for (f = 0; f < r[q].length; f++) r[q][f][d.setup.chart.categoryField] = r[d.setup.chart.categoryField], b.data.push(r[q][f])
                        }
                        for (e = 0; e < d.setup.chart.graphs.length; e++) {
                            var m = d.setup.chart.graphs[e];
                            for (f = 0; f < h.length; f++) {
                                var s = h[f],
                                    t = m[s];
                                m.title;
                                j(t, m.title, s)
                            }
                        }
                    } else if (["pie", "funnel"].indexOf(d.setup.chart.type) != -1) b.data = d.setup.chart.dataProvider, j(d.setup.chart.titleField), b.dateFields.push(d.setup.chart.titleField), j(d.setup.chart.valueField);
                    else if ("map" != d.setup.chart.type)
                        for (b.data = d.setup.chart.dataProvider, d.setup.chart.categoryAxis && (j(d.setup.chart.categoryField, d.setup.chart.categoryAxis.title), d.setup.chart.categoryAxis.parseDates !== !1 && b.dateFields.push(d.setup.chart.categoryField)), e = 0; e < d.setup.chart.graphs.length; e++) {
                            var m = d.setup.chart.graphs[e];
                            for (f = 0; f < h.length; f++) {
                                var s = h[f],
                                    t = m[s];
                                j(t, m.title, s)
                            }
                        }
                    return d.processData(b)
                },
                getAnnotations: function(a, b) {
                    var e, c = d.deepMerge({}, a || {}, !0),
                        f = [];
                    for (e = 0; e < d.setup.fabric._objects.length; e++)
                        if (!d.setup.fabric._objects[e].isCoreElement) {
                            var g = d.setup.fabric._objects[e].toJSON();
                            d.handleCallback(c.reviver, g, e), f.push(g)
                        }
                    return d.handleCallback(b, f), f
                },
                setAnnotations: function(a, b) {
                    var c = d.deepMerge({
                        data: []
                    }, a || {}, !0);
                    return fabric.util.enlivenObjects(c.data, function(a) {
                        a.forEach(function(a, b) {
                            d.handleCallback(c.reviver, a, b), d.setup.fabric.add(a)
                        }), d.handleCallback(b, c)
                    }), c.data
                },
                processData: function(b) {
                    var e, f, c = d.deepMerge({
                        data: [],
                        titles: {},
                        dateFields: [],
                        dataFields: [],
                        dataFieldsMap: {},
                        dataFieldsTitlesMap: {},
                        dataDateFormat: d.setup.chart.dataDateFormat,
                        dateFormat: d.config.dateFormat || d.setup.chart.dataDateFormat || "YYYY-MM-DD",
                        exportTitles: d.config.exportTitles,
                        exportFields: d.config.exportFields,
                        exportSelection: d.config.exportSelection,
                        columnNames: d.config.columnNames,
                        processData: d.config.processData
                    }, b || {}, !0);
                    if (c.data.length) {
                        for (e = 0; e < c.data.length; e++)
                            for (f in c.data[e]) c.dataFields.indexOf(f) == -1 && (c.dataFields.push(f), c.dataFieldsMap[f] = f);
                        void 0 !== c.exportFields && (c.dataFields = c.exportFields.filter(function(a) {
                            return c.dataFields.indexOf(a) != -1
                        }));
                        var g = [];
                        for (e = 0; e < c.data.length; e++) {
                            var h = {},
                                i = !1;
                            for (f = 0; f < c.dataFields.length; f++) {
                                var j = c.dataFields[f],
                                    k = c.dataFieldsMap[j],
                                    l = c.columnNames && c.columnNames[j] || c.titles[j] || j,
                                    m = c.data[e][k];
                                null == m && (m = void 0), c.exportTitles && "gantt" != d.setup.chart.type && l in h && (l += ["( ", j, " )"].join("")), c.dateFields.indexOf(k) != -1 && (c.dataDateFormat && (m instanceof String || "string" == typeof m) ? m = AmCharts.stringToDate(m, c.dataDateFormat) : c.dateFormat && (m instanceof Number || "number" == typeof m) && (m = new Date(m)), c.exportSelection && (m instanceof Date ? (m < a.startDate || m > a.endDate) && (i = !0) : (e < a.startIndex || e > a.endIndex) && (i = !0)), c.dateFormat && "dateObject" != c.dateFormat && m instanceof Date && (m = AmCharts.formatDate(m, c.dateFormat))), c.dataFieldsTitlesMap[k] = l, h[l] = m
                            }
                            i || g.push(h)
                        }
                        c.data = g
                    }
                    return void 0 !== c.processData && (c.data = d.handleCallback(c.processData, c.data, c)), c.data
                },
                capitalize: function(a) {
                    return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()
                },
                createMenu: function(b, c) {
                    function g(b, c) {
                        var e, h, i = document.createElement("ul");
                        for (e = 0; e < b.length; e++) {
                            var j = "string" == typeof b[e] ? {
                                    format: b[e]
                                } : b[e],
                                k = document.createElement("li"),
                                l = document.createElement("a"),
                                m = document.createElement("img"),
                                n = document.createElement("span"),
                                o = String(j.action ? j.action : j.format).toLowerCase();
                            if (j.format = String(j.format).toUpperCase(), d.config.formats[j.format] ? j = d.deepMerge({
                                    label: j.icon ? "" : j.format,
                                    format: j.format,
                                    mimeType: d.config.formats[j.format].mimeType,
                                    extension: d.config.formats[j.format].extension,
                                    capture: d.config.formats[j.format].capture,
                                    action: d.config.action,
                                    fileName: d.config.fileName
                                }, j) : j.label || (j.label = j.label ? j.label : d.i18l("menu.label." + o)), (["CSV", "JSON", "XLSX"].indexOf(j.format) == -1 || ["map", "gauge"].indexOf(d.setup.chart.type) == -1) && (d.setup.hasBlob || "UNDEFINED" == j.format || !j.mimeType || "image" == j.mimeType.split("/")[0] || "text/plain" == j.mimeType)) {
                                if ("draw" == j.action) d.config.fabric.drawing.enabled ? (j.menu = j.menu ? j.menu : d.config.fabric.drawing.menu, j.click = function(a) {
                                    return function() {
                                        this.capture(a, function() {
                                            this.createMenu(a.menu)
                                        })
                                    }
                                }(j)) : j.menu = [];
                                else if (!j.populated && j.action && j.action.indexOf("draw.") != -1) {
                                    var p = j.action.split(".")[1],
                                        q = j[p] || d.config.fabric.drawing[p] || [];
                                    for (j.menu = [], j.populated = !0, h = 0; h < q.length; h++) {
                                        var r = {
                                            label: q[h]
                                        };
                                        if ("shapes" == p) {
                                            var s = q[h].indexOf("//") == -1,
                                                t = (s ? d.config.path + "shapes/" : "") + q[h];
                                            r.action = "add", r.url = t, r.icon = t, r.ignore = s, r.class = "export-drawing-shape"
                                        } else "colors" == p ? (r.style = "background-color: " + q[h], r.action = "change", r.color = q[h], r.class = "export-drawing-color") : "widths" == p ? (r.action = "change", r.width = q[h], r.label = document.createElement("span"), r.label.style.width = d.numberToPx(q[h]), r.label.style.height = d.numberToPx(q[h]), r.class = "export-drawing-width") : "opacities" == p ? (r.style = "opacity: " + q[h], r.action = "change", r.opacity = q[h], r.label = 100 * q[h] + "%", r.class = "export-drawing-opacity") : "modes" == p && (r.label = d.i18l("menu.label.draw.modes." + q[h]), r.click = function(a) {
                                            return function() {
                                                d.drawing.mode = a
                                            }
                                        }(q[h]), r.class = "export-drawing-mode");
                                        j.menu.push(r)
                                    }
                                } else j.click || j.menu || j.items || (d.drawing.handler[o] instanceof Function ? (j.action = o, j.click = function(a) {
                                    return function() {
                                        this.drawing.handler[a.action](a)
                                    }
                                }(j)) : d.drawing.enabled ? j.click = function(a) {
                                    return function() {
                                        this.config.drawing.autoClose && this.drawing.handler.done(), this["to" + a.format](a, function(b) {
                                            "download" == a.action && this.download(b, a.mimeType, [a.fileName, a.extension].join("."))
                                        })
                                    }
                                }(j) : "UNDEFINED" != j.format && (j.click = function(a) {
                                    return function() {
                                        if (a.capture || "print" == a.action || "PRINT" == a.format) this.capture(a, function() {
                                            this.drawing.handler.done(), this["to" + a.format](a, function(b) {
                                                "download" == a.action && this.download(b, a.mimeType, [a.fileName, a.extension].join("."))
                                            })
                                        });
                                        else {
                                            if (!this["to" + a.format]) throw new Error("Invalid format. Could not determine output type.");
                                            this["to" + a.format](a, function(b) {
                                                this.download(b, a.mimeType, [a.fileName, a.extension].join("."))
                                            })
                                        }
                                    }
                                }(j)));
                                (void 0 === j.menu || j.menu.length) && (l.setAttribute("href", "#"), l.addEventListener("click", function(a, b) {
                                    return function(c) {
                                        c.preventDefault();
                                        var e = [c, b];
                                        return ("draw" == b.action || "PRINT" == b.format || "UNDEFINED" != b.format && b.capture) && !d.drawing.enabled && (b.delay = b.delay ? b.delay : d.config.delay, b.delay) ? void d.delay(b, a) : void a.apply(d, e)
                                    }
                                }(j.click || function(a) {
                                    a.preventDefault()
                                }, j)), d.setup.hasTouch && k.classList && l.addEventListener("click", function(a) {
                                    return function(b) {
                                        function j(a) {
                                            var b = a.parentNode.parentNode,
                                                c = b.classList;
                                            return !("LI" != b.tagName || !c.contains("active"))
                                        }

                                        function k(a) {
                                            var b = a.parentNode.children;
                                            for (e = 0; e < b.length; e++) {
                                                var c = b[e],
                                                    d = c.classList;
                                                if (c !== a && d.contains("active")) return d.remove("active"), !0
                                            }
                                            return !1
                                        }

                                        function l(a) {
                                            return a.getElementsByTagName("ul").length > 0
                                        }

                                        function m(a) {
                                            return a.classList.contains("export-main") || a.classList.contains("export-drawing")
                                        }
                                        b.preventDefault();
                                        var c = a.elements.li,
                                            g = j(c),
                                            i = (k(c), l(c));
                                        if (!m(c) && i || d.setup.menu.classList.toggle("active"), !g || !i)
                                            for (; f.length;) {
                                                var n = f.pop(),
                                                    o = m(n),
                                                    p = n !== c;
                                                o ? i || n.classList.remove("active") : p && n.classList.remove("active")
                                            }
                                        f.push(c), i && c.classList.toggle("active")
                                    }
                                }(j)), k.appendChild(l), d.isElement(j.label) ? n.appendChild(j.label) : n.innerHTML = j.label, j.class && (k.className = j.class), j.style && k.setAttribute("style", j.style), j.icon && (m.setAttribute("src", (j.ignore || j.icon.slice(0, 10).indexOf("//") != -1 ? "" : a.pathToImages) + j.icon), l.appendChild(m)), j.label && l.appendChild(n), j.title && l.setAttribute("title", j.title), d.config.menuReviver && (k = d.config.menuReviver.apply(d, [j, k])), j.elements = {
                                    li: k,
                                    a: l,
                                    img: m,
                                    span: n
                                }, (j.menu || j.items) && "draw" != j.action ? g(j.menu || j.items, k).childNodes.length && i.appendChild(k) : i.appendChild(k))
                            }
                        }
                        return i.childNodes.length && c.appendChild(i), i
                    }
                    var f = [];
                    return c || ("string" == typeof d.config.divId ? d.config.divId = c = document.getElementById(d.config.divId) : c = d.isElement(d.config.divId) ? d.config.divId : d.setup.chart.containerDiv), d.isElement(d.setup.menu) ? d.setup.menu.innerHTML = "" : d.setup.menu = document.createElement("div"), d.setup.menu.setAttribute("class", d.setup.chart.classNamePrefix + "-export-menu " + d.setup.chart.classNamePrefix + "-export-menu-" + d.config.position + " amExportButton"), d.config.menuWalker && (g = d.config.menuWalker), g.apply(this, [b, d.setup.menu]), d.setup.menu.childNodes.length && c.appendChild(d.setup.menu), d.setup.menu
                },
                delay: function(a, b) {
                    var e, f, c = d.deepMerge({
                            delay: 3,
                            precision: 2
                        }, a || {}),
                        g = Number(new Date),
                        h = d.createMenu([{
                            label: d.i18l("capturing.delayed.menu.label").replace("{{duration}}", AmCharts.toFixed(c.delay, c.precision)),
                            title: d.i18l("capturing.delayed.menu.title"),
                            class: "export-delayed-capturing",
                            click: function() {
                                clearTimeout(e), clearTimeout(f), d.createMenu(d.config.menu)
                            }
                        }]),
                        i = h.getElementsByTagName("a")[0];
                    e = setInterval(function() {
                        var a = c.delay - (Number(new Date) - g) / 1e3;
                        a <= 0 ? (clearTimeout(e), "draw" != c.action && d.createMenu(d.config.menu)) : i && (i.innerHTML = d.i18l("capturing.delayed.menu.label").replace("{{duration}}", AmCharts.toFixed(a, 2)))
                    }, AmCharts.updateRate), f = setTimeout(function() {
                        b.apply(d, arguments)
                    }, 1e3 * c.delay)
                },
                migrateSetup: function(a) {
                    function c(a) {
                        var d;
                        for (d in a) {
                            var e = a[d];
                            "export" == d.slice(0, 6) && e ? b.menu.push(d.slice(6)) : "userCFG" == d ? c(e) : "menuItems" == d ? b.menu = e : "libs" == d ? b.libs = e : "string" == typeof d && (b[d] = e)
                        }
                    }
                    var b = {
                        enabled: !0,
                        migrated: !0,
                        libs: {
                            autoLoad: !0
                        },
                        menu: []
                    };
                    return c(a), b
                },
                clear: function() {
                    d.setup = void 0, d.docListener && document.removeEventListener("keydown", d.docListener);
                    var a = d.listenersToRemove;
                    if (a)
                        for (var b = 0; b < a.length; b++) {
                            var c = a[b];
                            c.node.removeEventListener(c.event, c.method)
                        }
                    d.listenersToRemove = []
                },
                loadListeners: function() {
                    function a(a) {
                        a && (a.set({
                            top: a.top + 10,
                            left: a.left + 10
                        }), d.setup.fabric.add(a))
                    }
                    d.config.keyListener && "attached" != d.config.keyListener && (d.docListener = function(b) {
                        var c = d.drawing.buffer.target;
                        8 != b.keyCode && 46 != b.keyCode || !c ? 27 == b.keyCode && d.drawing.enabled ? (b.preventDefault(), d.drawing.handler.done()) : 67 == b.keyCode && (b.metaKey || b.ctrlKey) && c ? d.drawing.buffer.copy = c : 88 == b.keyCode && (b.metaKey || b.ctrlKey) && c ? (d.drawing.buffer.copy = c, d.setup.fabric.remove(c)) : 86 == b.keyCode && (b.metaKey || b.ctrlKey) ? d.drawing.buffer.copy && a(d.drawing.buffer.copy.clone(a)) : 90 == b.keyCode && (b.metaKey || b.ctrlKey) && (b.preventDefault(), b.shiftKey ? d.drawing.handler.redo() : d.drawing.handler.undo()) : (b.preventDefault(), d.setup.fabric.remove(c))
                    }, d.config.keyListener = "attached", document.addEventListener("keydown", d.docListener)), d.config.fileListener && (d.setup.chart.containerDiv.addEventListener("dragover", d.handleDropbox), d.setup.chart.containerDiv.addEventListener("dragleave", d.handleDropbox), d.setup.chart.containerDiv.addEventListener("drop", d.handleDropbox))
                },
                init: function() {
                    clearTimeout(c), c = setInterval(function() {
                        d.setup.chart.containerDiv && (clearTimeout(c), d.config.enabled && (d.setup.chart.AmExport = d, d.config.overflow && (d.setup.chart.div.style.overflow = "visible"), d.loadListeners(), d.createMenu(d.config.menu), d.handleReady(d.config.onReady)))
                    }, AmCharts.updateRate)
                },
                construct: function() {
                    d.drawing.handler.cancel = d.drawing.handler.done;
                    try {
                        d.setup.hasBlob = !!new Blob
                    } catch (a) {}
                    window.safari = window.safari ? window.safari : {}, d.defaults.fabric.drawing.fontSize = d.setup.chart.fontSize || 11, d.config.drawing = d.deepMerge(d.defaults.fabric.drawing, d.config.drawing || {}, !0), d.config.border && (d.config.border = d.deepMerge(d.defaults.fabric.border, d.config.border || {}, !0)), d.deepMerge(d.defaults.fabric, d.config, !0), d.deepMerge(d.defaults.fabric, d.config.fabric || {}, !0), d.deepMerge(d.defaults.pdfMake, d.config, !0), d.deepMerge(d.defaults.pdfMake, d.config.pdfMake || {}, !0), d.deepMerge(d.libs, d.config.libs || {}, !0), d.config.drawing = d.defaults.fabric.drawing, d.config.fabric = d.defaults.fabric, d.config.pdfMake = d.defaults.pdfMake, d.config = d.deepMerge(d.defaults, d.config, !0), d.config.fabric.drawing.enabled && void 0 === d.config.fabric.drawing.menu && (d.config.fabric.drawing.menu = [], d.deepMerge(d.config.fabric.drawing.menu, [{
                        class: "export-drawing",
                        menu: [{
                            label: d.i18l("menu.label.draw.add"),
                            menu: [{
                                label: d.i18l("menu.label.draw.shapes"),
                                action: "draw.shapes"
                            }, {
                                label: d.i18l("menu.label.draw.text"),
                                action: "text"
                            }]
                        }, {
                            label: d.i18l("menu.label.draw.change"),
                            menu: [{
                                label: d.i18l("menu.label.draw.modes"),
                                action: "draw.modes"
                            }, {
                                label: d.i18l("menu.label.draw.colors"),
                                action: "draw.colors"
                            }, {
                                label: d.i18l("menu.label.draw.widths"),
                                action: "draw.widths"
                            }, {
                                label: d.i18l("menu.label.draw.opacities"),
                                action: "draw.opacities"
                            }, "UNDO", "REDO"]
                        }, {
                            label: d.i18l("menu.label.save.image"),
                            menu: ["PNG", "JPG", "SVG", "PDF"]
                        }, "PRINT", "CANCEL"]
                    }])), void 0 === d.config.menu && (d.config.menu = [], d.deepMerge(d.config, {
                        menu: [{
                            class: "export-main",
                            menu: [{
                                label: d.i18l("menu.label.save.image"),
                                menu: ["PNG", "JPG", "SVG", "PDF"]
                            }, {
                                label: d.i18l("menu.label.save.data"),
                                menu: ["CSV", "XLSX", "JSON"]
                            }, {
                                label: d.i18l("menu.label.draw"),
                                action: "draw",
                                menu: d.config.fabric.drawing.menu
                            }, {
                                format: "PRINT",
                                label: d.i18l("menu.label.print")
                            }]
                        }]
                    })), d.libs.path || (d.libs.path = d.config.path + "libs/"), d.isSupported() && (d.loadDependencies(d.libs.resources, d.libs.reload), d.setup.chart.addClassNames = !0, d.setup.chart[d.name] = d, d.init())
                }
            };
            if (b) d.config = b;
            else if (d.setup.chart[d.name]) d.config = d.setup.chart[d.name];
            else {
                if (!d.setup.chart.amExport && !d.setup.chart.exportConfig) return;
                d.config = d.migrateSetup(d.setup.chart.amExport || d.setup.chart.exportConfig)
            }
            return d.construct(), d.deepMerge(this, d)
        }
    }(), AmCharts.addInitHandler(function(a) {
        new AmCharts.export(a)
    }, ["pie", "serial", "xy", "funnel", "radar", "gauge", "stock", "map", "gantt"]);
