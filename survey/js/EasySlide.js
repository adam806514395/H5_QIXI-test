!function (t, i, s) {
    function e() {
        var t = /(iPhone|iOS)/i.test(navigator.userAgent), i = 414 === window.screen.width;
        return t && i
    }

    var n = navigator.userAgent, r = Object.prototype.toString, o = {
        isPhone6P: e(), $: function (t) {
            return i.getElementById(t)
        }, getByTagName: function (t, s) {
            return s = s || i, o.makeElesArray(s.getElementsByTagName(t))
        }, getByClsName: function (t, s) {
            return s = s || i, o.makeElesArray(s.getElementsByClassName(t))
        }, makeElesArray: function (t) {
            return Array.prototype.slice.call(t)
        }, attr: function (t, i, e) {
            return e !== s ? t.setAttribute(i, e) : t.getAttribute(i)
        }, bind: function (t, i, s) {
            t.addEventListener(i, s, !1)
        }, unbind: function (t, i, s) {
            t.removeEventListener(i, s, !1)
        }, viewData: function () {
            var s = t, e = i.body, n = i.documentElement, r = s.innerWidth || n.clientWidth || e.clientWidth || 0, a = s.innerHeight || n.clientHeight || e.clientHeight || 0;
            return o.isPhone6P && (r = n.clientWidth), {
                scrollTop: e.scrollTop || n.scrollTop || s.pageYOffset,
                scrollLeft: e.scrollLeft || n.scrollLeft || s.pageXOffset,
                documentWidth: Math.max(e.scrollWidth, n.scrollWidth || 0),
                documentHeight: Math.max(e.scrollHeight, n.scrollHeight || 0, a),
                viewWidth: r,
                viewHeight: a
            }
        }, remove: function (t) {
            t && t.nodeName && t.parentNode.removeChild(t)
        }, hide: function (t) {
            t.style.display = "none"
        }, show: function (t) {
            t.style.display = "block"
        }, hasAttr: function (t, i) {
            return t.hasAttribute(i)
        }, contain: function (t, i) {
            for (; t && t.parentNode;) {
                if (o.hasClass(t, i))return t;
                t = t.parentNode
            }
            return !1
        }, hasClass: function (t, i) {
            return t.className.match(new RegExp("(\\s|^)" + i + "(\\s|$)"))
        }, addClass: function (t, i) {
            this.hasClass(t, i) || (t.className += " " + i)
        }, removeClass: function (t, i) {
            if (this.hasClass(t, i)) {
                var s = new RegExp("(\\s|^)" + i + "(\\s|$)");
                t.className = t.className.replace(s, " ")
            }
        }, isWeixin: function () {
            var t = n.toLowerCase().match(/MicroMessenger/i);
            return t ? "micromessenger" === t[0] : !1
        }, shareWeibo: function (s) {
            var e = i.title || s.title, r = s.shareImg || "", o = /weibo/i;
            o.test(n) ? t.WeiboJSBridge.invoke("openMenu", {}, function () {
            }) : i.location.href = "http://share.sina.cn/callback?vt=4&title=" + encodeURIComponent(e) + "&pic=" + encodeURIComponent(r) + "&url=" + encodeURIComponent(document.location.href)
        }, mixin: function (t, i) {
            for (var s in i)i.hasOwnProperty(s) && (t[s] = i[s]);
            return t
        }, transitionDurationToMilliseconds: function (t) {
            var i, s, e, n = t.match(/^([\d\.]+)(\w+)$/);
            if (n.length <= 1)return t;
            switch (i = n[1], s = n[2]) {
                case"ms":
                    e = 1;
                    break;
                case"s":
                    e = 1e3
            }
            return i * e
        }, isArray: function (t) {
            return "[object Array]" === r.call(t)
        }, isObject: function (t) {
            return "[object Object]" === r.call(t)
        }, isMobile: function () {
            try {
                return document.createEvent("TouchEvent"), !0
            } catch (t) {
                return !1
            }
        }
    }, a = function () {
        this.map = {}
    };
    a.prototype = {
        constructor: Event, trigger: function (t, i) {
            this.map[t] && this.map[t].forEach(function (t) {
                t.apply(this, i)
            })
        }, on: function (t, i) {
            this.map[t] ? this.map[t].push(i) : this.map[t] = [i]
        }, off: function (t, i) {
            i ? this.map[t] && (this.map[t] = this.map[t].filter(function (t) {
                return t !== i
            })) : this.map[t] = []
        }
    };
    var l = function (t) {
        this.startX = 0, this.startY = 0, this.lastX = 0, this.lastY = 0, this.scrollEle = null, this.scrollEleDire = null, this.startTime = null, this.ele = t, a.call(this), this.bindSwipe(t)
    };
    l.prototype = {
        constructor: l, isScrollContain: function (t) {
            for (; t && t.parentNode;) {
                if (o.hasAttr(t, "scroll"))return t;
                t = t.parentNode
            }
            return null
        }, bindSwipe: function (t) {
            if (o.isMobile())o.bind(t, "touchstart", this._touchstart.bind(this)), o.bind(t, "touchmove", this._touchmove.bind(this)), o.bind(t, "touchend", this._touchend.bind(this)); else {
                var i = this._touchstart.bind(this), s = this._touchmove.bind(this), e = this._touchend.bind(this);
                o.bind(t, "mousedown", function (e) {
                    o.bind(t, "mousemove", s), i(e)
                }), o.bind(t, "mouseup", function (i) {
                    o.unbind(t, "mousemove", s), e(i)
                })
            }
        }, _touchstart: function (t) {
            return t.touches && t.touches.length > 1 ? !1 : (this.scrollEle = null, this.scrollEleDire = null, this.startX = this.lastX = o.isMobile() ? t.touches[0].pageX : t.clientX, this.startY = this.lastY = o.isMobile() ? t.touches[0].pageY : t.clientY, this.startTime = Date.now(), void(this.disabled && t.preventDefault()))
        }, _touchmove: function (t) {
            var i = this.isScrollContain(t.target), s = this.lastY = o.isMobile() ? t.touches[0].pageY : t.clientY, e = this.lastX = o.isMobile() ? t.touches[0].pageX : t.clientX;
            if (t.touches && t.touches.length > 1)return !1;
            if (i)return this.scrollEle = i, this.scrollEleDire = o.attr(i, "scroll"), !1;
            var n = this.startX, r = this.startY, a = Math.abs(this.lastX - this.startX), l = Math.abs(this.lastY - this.startY), h = Date.now() - this.startTime, c = a > l ? "X" : "Y", u = {
                x: e - n >= 0 ? 1 : -1,
                y: s - r >= 0 ? 1 : -1
            };
            this.trigger("swipeMove", [this.slides, {
                moveTime: h,
                positive: u,
                direc: c,
                moveX: a,
                moveY: l,
                startX: n,
                startY: r,
                lastX: e,
                lastY: s
            }, t.target]), t.preventDefault()
        }, _touchend: function (t) {
            var i = t.target, s = Math.abs(this.lastX - this.startX), e = Math.abs(this.lastY - this.startY), n = s > e ? "x" : "y", r = 20;
            if ("x" === n && r > s || "y" === n && r > e)return !1;
            n !== this.swipeDirection && this.trigger("dragDirecNotEqual");
            var o = "y" === n ? "swipeY" : "swipeX", a = "y" === n ? this.lastY < this.startY ? 1 : -1 : this.lastX < this.startX ? 1 : -1;
            if (this.scrollEle && this.scrollEleDire === n) {
                var l = "y" === this.scrollEleDire ? this.scrollEle.scrollTop : this.scrollEle.scrollLeft, h = "y" === this.scrollEleDire ? this.scrollEle.clientHeight : this.scrollEle.clientWidth, c = "y" === this.scrollEleDire ? this.scrollEle.scrollHeight : this.scrollEle.scrollWidth;
                return h + l + 10 >= c ? this.trigger(o, [1, i]) : 10 > l && this.trigger(o, [-1, i]), !1
            }
            var u = this.lastY, d = this.lastX, p = this.startY, f = this.startX;
            return this.trigger("swipeEnd", [{
                lastY: u,
                startY: p,
                lastX: d,
                startX: f
            }]), this.disabled ? !1 : (this.trigger(o, [a, i]), void(this.startX = this.startY = this.lastX = this.lastY = 0))
        }
    }, l.prototype = o.mixin(l.prototype, a.prototype);
    var h = function (t) {
        this.slides = [], this.slidesLen = 0, this.curIndex = 0, this.curGroups = [], this.curGLen = 0, this.curGIndex = 0, this.disabled = !1, this.subppt = [], this.subpptNum = [];
        var i = {
            margin: 0,
            backgroungMusic: null,
            transition: "all 0.5s ease",
            firstTime: !0,
            animateEffect: "default",
            swipeDirection: "y",
            replay: !1,
            wrapAll: ""
        };
        o.mixin(i, t), o.mixin(this, i), this.wrapAll = o.$(this.wrapAll), l.call(this, this.wrapAll), this.bgMusicPlaying = !1, this.init()
    };
    h.STATIC = {
        flayerCls: "EasySlide-flayer",
        flayerTriggerCls: "EasySlide-triggerLayer",
        animateCls: "EasySlide-animate",
        groupCls: "EasySlide-groups",
        slideCls: "EasySlide-slides"
    }, h.animationEffects = {
        "default": function (t, i, s, e) {
            e && (t.style["-webkit-transition"] = this.transition), t.style["-webkit-transform"] = "translateZ(0) translate" + i + "(" + s + "px)"
        }
    }, h.prototype = {
        constructor: h, bindEvent: function () {
            o.bind(this.wrapAll, "click", this._click.bind(this)), this.on("swipeY", this.allowSwipeY.bind(this)), this.on("swipeX", this.allowSwipeX.bind(this)), o.bind(t, "resize", this.resize.bind(this)), o.bind(t, "scroll", function (t) {
                t.preventDefault()
            })
        }, renderSlide: function () {
            this.slides = o.getByClsName(h.STATIC.slideCls, this.wrapAll), this.slidesLen = this.slides.length, this.curGroups = o.getByClsName(h.STATIC.groupCls, this.slides[0]), this.curGLen = this.curGroups.length, this.showCurSlide()
        }, init: function () {
            if (this.initSlides(this.wrapAll), this.renderSlide(), this.bindEvent(), this.subpptObjects) {
                if (!h.Subppt)throw new Error("must have ppt.js!");
                this.initSubPPT(this.subpptObjects)
            }
        }, initSlides: function (t) {
            this.vW = this.width || o.viewData().viewWidth, this.vH = this.height || o.viewData().viewHeight, t.style.height = this.vH + "px", t.style.width = this.vW + "px"
        }, setBgMusic: function () {
            if (this.backgroungMusic) {
                var t = this.backgroungMusic, s = i.createElement("audio");
                s.loop = "loop", this.music = s, this.trigger("beforeMusicStart", [this.music]), s.src = t, this.trigger("musicStart", [this.music]), i.body.appendChild(s)
            }
        }, bgMusicPlay: function () {
            this.music && (this.bgMusicPlaying = !0, this.music.play(), this.trigger("musicPlay", [this.music]))
        }, bgMusicPause: function () {
            this.music && (this.bgMusicPlaying = !1, this.music.pause(), this.trigger("musicPause", [this.music]))
        }, bgMusicSwitch: function () {
            this.music && (this.bgMusicPlaying ? this.bgMusicPause() : this.bgMusicPlay())
        }, resize: function () {
            var t = this;
            setTimeout(function () {
                t.initSlides(t.wrapAll), t.showCurSlide()
            }, 100)
        }, getEffects: function (t) {
            return o.attr(t, "effect") || this.animateEffect
        }, setYPos: function (t, i) {
            var s = this.getEffects(t);
            h.animationEffects[s].call(this, t, "Y", i, !0)
        }, setXPos: function (t, i) {
            var s = this.getEffects(t);
            h.animationEffects[s].call(this, t, "X", i, !0)
        }, removeAnimation: function (t) {
            t.style["-webkit-animation"] = "", t.offsetWidth = t.offsetWidth
        }, setAnimation: function (t, i) {
            t.style["-webkit-animation"] = i.name + " " + i.duration + " " + i.tfunction + " " + i.delay + " " + i.iteration + " normal forwards"
        }, setAnimationAttr: function (t) {
            var i = o.attr, s = t.style, e = {
                "in": i(t, "in") || s["-webkit-animation-name"] || "",
                duration: i(t, "duration") || s["-webkit-animation-duration"] || "",
                tfunction: i(t, "tfunction") || s["-webkit-timing-function"] || "",
                delay: i(t, "delay") || s["-webkit-animation-delay"] || "",
                iteration: i(t, "iteration") || s["-webkit-iteration-count"] || ""
            };
            for (var n in e)"" !== e[n] && null !== e[n] && i(t, n, e[n])
        }, showSlide: function () {
            var t = this;
            this.slides.forEach(function (i) {
                var s = parseInt(o.attr(i, "index"), 10), e = t.curIndex === t.slidesLen - 1 && 0 === s, n = 0 === t.curIndex && s === t.slidesLen - 1, r = s === t.curIndex, a = s === t.curIndex + 1, l = s === t.curIndex - 1, h = r ? 0 : null, c = r ? 0 : null;
                a || e ? (h = t.vH + t.margin, c = t.vW + t.margin) : (l || n) && (h = -t.vH - t.margin, c = -t.vW - t.margin), r || a || l || e || n ? ("y" === t.swipeDirection ? t.setYPos(i, h) : "x" === t.swipeDirection && t.setXPos(i, c), o.show(i)) : o.hide(i)
            })
        }, showCurSlide: function () {
            var t = this, i = o.attr;
            this.trigger("beforeShowSlide", [s, this.curGroups]), this.showSlide(), this.curGroups.forEach(function (s) {
                var e = parseInt(o.attr(s, "gIndex"), 10);
                if (e === t.curGIndex) {
                    o.show(s);
                    var n = o.getByClsName(h.STATIC.animateCls, s);
                    n.forEach(t.setAnimationAttr), t.replay && n.forEach(t.removeAnimation), n.forEach(function (s) {
                        t.setAnimation(s, {
                            name: i(s, "in"),
                            duration: i(s, "duration") || ".5s",
                            tfunction: i(s, "tfunction") || "ease",
                            delay: i(s, "delay") || 0,
                            iteration: i(s, "iteration") || 1
                        })
                    }), t.trigger("showCurSlide", [s])
                } else o.hide(s)
            });
            var s = this.getCurAllowSwipe();
            this.trigger("slide-switchEnd", [s, this.curGroups])
        }, getCurAllowSwipe: function () {
            return o.attr(this.curGroups[this.curGIndex], "allowswipe")
        }, allowSwipeY: function (t) {
            this.allowSwipe(t, "y")
        }, allowSwipeX: function (t, i) {
            var s = this.subpptNum.indexOf(this.curIndex);
            return -1 !== s && o.contain(i, h.Subppt.STATIC.imgWrapCls) ? (this.subppt[s].move(t), void this.trigger("ppt-switchEnd")) : void this.allowSwipe(t, "x")
        }, allowSwipe: function (t, i) {
            var s = this.getCurAllowSwipe();
            s && "next" !== s && "prev" !== s || this.swipeDirection !== i || ("next" === s && 1 === t || "prev" === s && -1 === t || null === s) && this.move(t)
        }, move: function (t) {
            var i = {
                1: function () {
                    this.curGIndex < this.curGLen - 1 ? this.curGIndex++ : (this.curIndex++, this.curIndex >= this.slidesLen && (this.curIndex = 0), this.curIndex === this.slidesLen - 1 && (this.firstTime = !1), this.curGroups = o.getByClsName(h.STATIC.groupCls, this.slides[this.curIndex]), this.curGLen = this.curGroups.length, this.curGIndex = 0)
                }, "-1": function () {
                    this.curGIndex > 0 ? this.curGIndex-- : (this.curIndex--, this.curIndex < 0 && (this.curIndex = this.firstTime ? 0 : this.slidesLen - 1), this.curGroups = o.getByClsName(h.STATIC.groupCls, this.slides[this.curIndex]), this.curGLen = this.curGroups.length, this.curGIndex = this.curGLen - 1)
                }
            };
            i[t].call(this), this.showCurSlide()
        }, _click: function (t) {
            for (var i = t.target; i && i.parentNode && i !== this.wrapAll;) {
                var s;
                if (o.hasAttr(i, "goto")) {
                    t.stopPropagation();
                    var e = parseInt(o.attr(i, "goto"), 10);
                    this["goto"](e);
                    break
                }
                if (o.hasAttr(i, "flayerbtn")) {
                    t.stopPropagation(), s = o.$(o.attr(i, "layerid")), s && o.hide(s);
                    break
                }
                if (o.hasAttr(i, "flayer")) {
                    t.stopPropagation(), o.show(i);
                    break
                }
                if (o.hasAttr(i, "newhref")) {
                    t.stopPropagation();
                    var n = o.attr(i, "newhref");
                    window.open(n);
                    break
                }
                if (o.hasAttr(i, "layerid")) {
                    t.stopPropagation(), s = o.$(o.attr(i, "layerid")), s && o.show(s);
                    break
                }
                if (o.hasAttr(i, "musicctrl")) {
                    t.stopPropagation(), this.bgMusicSwitch();
                    break
                }
                if (o.hasClass(i, h.STATIC.flayerCls)) {
                    t.stopPropagation(), o.hide(i);
                    break
                }
                i = i.parentNode
            }
        }, "goto": function (t) {
            this.curIndex = t, this.curGroups = o.getByClsName(h.STATIC.groupCls, this.slides[this.curIndex]), this.curGLen = this.curGroups.length, this.curGIndex = 0, this.showCurSlide()
        }
    }, h.prototype = o.mixin(h.prototype, l.prototype), h.utils = o, t.EasySlide = h
}(window, document);