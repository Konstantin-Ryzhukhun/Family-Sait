/** @format */

(window.webpackJsonp = window.webpackJsonp || []).push([
  [13],
  {
    551: function (t, e, n) {
      var content = n(608);
      content.__esModule && (content = content.default),
        "string" == typeof content && (content = [[t.i, content, ""]]),
        content.locals && (t.exports = content.locals);
      (0, n(95).default)("7669d3be", content, !0, { sourceMap: !1 });
    },
    607: function (t, e, n) {
      "use strict";
      n(551);
    },
    608: function (t, e, n) {
      var o = n(94)(!1);
      o.push([
        t.i,
        '[data-v-3f930b6d]:export{maxWithLarge:1920px;fontSizeSmall:1vw;fontSizeMedium:.55vw;fontSizeLarge:1vw;viewportWidthSmall:375px;viewportWidthMedium:768px;viewportWidthLarge:1920px}@media (min-width:0){html[data-v-3f930b6d]:before{display:none;content:"small"}}@media (min-width:500px){html[data-v-3f930b6d]:before{display:none;content:"medium"}}@media (min-width:850px){html[data-v-3f930b6d]:before{display:none;content:"large"}}.home[data-v-3f930b6d]{position:relative;width:100%;height:100%;cursor:pointer}',
        "",
      ]),
        (t.exports = o);
    },
    668: function (t, e, n) {
      "use strict";
      n.r(e);
      n(30), n(23), n(56), n(63), n(27), n(64);
      var o = n(12),
        r = n(24),
        l = (n(15), n(72), n(73), n(109), n(7)),
        c = n(61),
        d = n(524),
        h = (n(25), n(175)),
        f = n(29),
        w = n(576),
        m = n(577),
        S = n(528),
        v = n(574),
        I = n(578),
        O = n(579);
      function C(object, t) {
        var e = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(object);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(object, t).enumerable;
            })),
            e.push.apply(e, n);
        }
        return e;
      }
      var T = {
          mixins: [d.a],
          data: function () {
            return { webglStateIndex: 0, isClickAllowed: !0 };
          },
          asyncData: function (t) {
            var e = [t.$api.getSingleDocumentByType("home")];
            return Promise.all(e).then(function (t) {
              return { data: Object(r.a)(t, 1)[0].data };
            });
          },
          computed: (function (t) {
            for (var i = 1; i < arguments.length; i++) {
              var source = null != arguments[i] ? arguments[i] : {};
              i % 2
                ? C(Object(source), !0).forEach(function (e) {
                    Object(o.a)(t, e, source[e]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(source)
                  )
                : C(Object(source)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(source, e)
                    );
                  });
            }
            return t;
          })(
            {},
            Object(c.b)({
              isMenuOpen: "menu/isOpen",
              webglActiveLandscape: "/media/webgl/activeLandscape",
              isLandscapeTransitioningNone:
                "/media/webgl/isLandscapeTransitioningNone",
              isTheEndShowStarted: "/media/webgl/isTheEndShowStarted",
              isClickInteractionTriggered: "home/isClickInteractionTriggered",
              isMenuTriggeredWithScrollTriggered:
                "home/isMenuTriggeredWithScrollTriggered",
            })
          ),
          watch: {
            webglActiveLandscape: function () {
              this.webglStateIndex = 0;
            },
            isTheEndShowStarted: function (t) {
              t &&
                l.a.to(
                  this.$refs.tutorial.$el,
                  { duration: 1, alpha: 0, ease: "sine.inOut" },
                  0
                );
            },
            isMenuOpen: function (t) {
              this.$el.style.cursor = t ? "auto" : "pointer";
            },
          },
          mounted: function () {
            (this.interactionSounds = [
              "audio-interaction-a",
              "audio-interaction-c",
              "audio-interaction-d",
              "audio-interaction-e",
              "audio-interaction-f",
              "audio-interaction-g",
            ]),
              (this.interactionSoundsOffset = Math.round(1e3 * Math.random())),
              (this.interactionSoundsIndex =
                this.interactionSoundsOffset % this.interactionSounds.length);
          },
          methods: {
            transitionIn: function (t, e) {
              var n = new l.a.timeline({ onComplete: t });
              e.isLangSwitch
                ? this.isMenuTriggeredWithScrollTriggered &&
                  this.$refs.scrollContainer.animateIn()
                : n.call(this.showActiveWebglView, null, 0),
                n.add(this.showArrow(), 0),
                this.$refs.cursors &&
                  n.add(this.$refs.cursors.transitionIn(), 0),
                this.$refs.buttonMenu &&
                  n.add(this.$refs.buttonMenu.transitionIn(), 0),
                n.call(this.waitForClickInteraction, null, e.previous ? 2 : 0);
            },
            transitionOut: function (t, e) {
              var n;
              null === (n = this.tutorialsSecondShowDelayedCall) ||
                void 0 === n ||
                n.kill();
              var o = new l.a.timeline({ onComplete: t });
              o.add(this.hideArrow(), 0),
                o.add(this.$refs.sectionHome.transitionOut(), 0),
                o.add(this.$refs.buttonMenu.transitionOut(), 0),
                o.to(
                  this.$root.webglApp.landscapeManager.active.camera,
                  { duration: 1.5, scrollProgress: 0, ease: "sine.inOut" },
                  0
                ),
                o.add(this.$refs.cursors.transitionOut(), 0),
                o.add(this.$refs.tutorial.hide(), 0),
                e.isLangSwitch || o.call(this.hideActiveWebglView, null, 0.3);
            },
            showArrow: function () {
              var t = new l.a.timeline();
              return (
                this.$refs.scrollIndicator &&
                  t.add(this.$refs.scrollIndicator.show(), 1),
                t
              );
            },
            hideArrow: function () {
              var t = new l.a.timeline();
              return (
                this.$refs.scrollIndicator &&
                  t.add(this.$refs.scrollIndicator.hide(), 0),
                t
              );
            },
            showActiveWebglView: function () {
              this.$root.webglApp.viewManager.show("Home");
            },
            hideActiveWebglView: function () {
              this.$root.webglApp.viewManager.hide("Home");
            },
            waitForClickInteraction: function () {
              var t = this;
              this.isClickInteractionTriggered ||
                (this.clickInteractionTimeout = setTimeout(function () {
                  t.isClickInteractionTriggered ||
                    ((t.timelineClickInteractionTimeout = new l.a.timeline()),
                    t.$refs.tutorial &&
                      t.timelineClickInteractionTimeout.add(
                        t.$refs.tutorial.show(),
                        0
                      ));
                }, 0));
            },
            clickHandler: function (t) {
              var e = this;
              if (
                !this.isMenuOpen &&
                !this.$refs.scrollContainer.isFreeScroll &&
                this.isLandscapeTransitioningNone &&
                this.isClickAllowed
              ) {
                (this.isClickAllowed = !1),
                  clearTimeout(this.debounceTimeout),
                  (this.debounceTimeout = setTimeout(
                    this.debouncedClickHandler,
                    3e3
                  )),
                  (this.webglStateIndex += 1),
                  (this.webglStateIndex = h.a.modulo(this.webglStateIndex, 3)),
                  this.$root.webglApp.landscapeManager.active.setState(
                    this.webglStateIndex
                  ),
                  this.$refs.cursors.clickHandler(),
                  (this.interactionSoundsIndex =
                    (this.interactionSoundsIndex + 1) %
                    this.interactionSounds.length);
                var n,
                  o = this.interactionSounds[this.interactionSoundsIndex];
                if (
                  (f.a.playLandscapeEffect(o),
                  clearTimeout(this.clickInteractionTimeout),
                  this.tutorialsSecondShowDelayedCall &&
                    (this.tutorialsSecondShowDelayedCall.kill(),
                    this.$refs.tutorial.hide()),
                  !this.isClickInteractionTriggered)
                )
                  this.$store.dispatch("home/setClickInteractionTriggered", !0),
                    null === (n = this.timelineClickInteractionTimeout) ||
                      void 0 === n ||
                      n.kill(),
                    this.$refs.tutorial.hide(),
                    (this.tutorialsSecondShowDelayedCall = l.a.delayedCall(
                      7,
                      function () {
                        e.$refs.tutorial.show();
                      }
                    ));
              }
            },
            debouncedClickHandler: function () {
              this.isClickAllowed = !0;
            },
          },
          components: {
            ScrollIndicator: w.a,
            Tutorial: m.a,
            ButtonMenu: S.a,
            CursorsHome: v.a,
            ScrollContainerHome: I.a,
            SectionHome: O.a,
          },
        },
        $ = (n(607), n(71)),
        component = Object($.a)(
          T,
          function () {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              { staticClass: "page home" },
              [
                n("CursorsHome", {
                  ref: "cursors",
                  attrs: { data: t.data.interactions },
                }),
                t._v(" "),
                n("Tutorial", {
                  ref: "tutorial",
                  attrs: { data: t.data.interaction_indication },
                }),
                t._v(" "),
                n(
                  "ScrollContainerHome",
                  { ref: "scrollContainer" },
                  [
                    n("SectionHome", {
                      ref: "sectionHome",
                      staticClass: "section-home",
                      attrs: { data: t.data },
                      nativeOn: {
                        click: function (e) {
                          return t.clickHandler.apply(null, arguments);
                        },
                      },
                    }),
                  ],
                  1
                ),
                t._v(" "),
                n("ScrollIndicator", { ref: "scrollIndicator" }),
                t._v(" "),
                n("ButtonMenu", { ref: "buttonMenu" }),
              ],
              1
            );
          },
          [],
          !1,
          null,
          "3f930b6d",
          null
        );
      e.default = component.exports;
    },
  },
]);
