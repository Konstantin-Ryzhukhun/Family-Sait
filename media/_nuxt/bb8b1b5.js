/** @format */

(window.webpackJsonp = window.webpackJsonp || []).push([
  [16],
  {
    524: function (t, e, n) {
      "use strict";
      var o = n(12),
        r =
          (n(17),
          n(70),
          n(108),
          n(30),
          n(23),
          n(56),
          n(63),
          n(27),
          n(64),
          n(61)),
        c = n(78),
        d = "page";
      function m(view) {
        if (view.$options) {
          if (view.$options.type === d) return view;
          for (var t, e = view.$children, i = 0, n = e.length; i < n; i++) {
            if (e[i].$options.type === d) {
              t = e[i];
              break;
            }
            if ("object" === Object(c.a)(e[i].$children))
              return m(e[i].$children);
          }
          return t;
        }
      }
      function h(object, t) {
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
      function l(t) {
        var e = null,
          n = null,
          o = null,
          r = null;
        return (
          !(!t.current || !t.previous) &&
          !(!t.current.name || !t.previous.name) &&
          (t.current &&
            ((e = t.current.name.split("___")[0]),
            (n = t.current.name.split("___")[1])),
          t.previous &&
            ((o = t.previous.name.split("___")[0]),
            (r = t.previous.name.split("___")[1])),
          e === o && n !== r)
        );
      }
      e.a = {
        type: "page",
        computed: (function (t) {
          for (var i = 1; i < arguments.length; i++) {
            var source = null != arguments[i] ? arguments[i] : {};
            i % 2
              ? h(Object(source), !0).forEach(function (e) {
                  Object(o.a)(t, e, source[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(
                  t,
                  Object.getOwnPropertyDescriptors(source)
                )
              : h(Object(source)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(source, e)
                  );
                });
          }
          return t;
        })({}, Object(r.b)({ isCompleted: "preloader/isCompleted" })),
        watch: {
          isCompleted: function (t) {
            t && this.__transitionIn();
          },
        },
        methods: {
          __transitionIn: function () {
            var t = {
              previous: this.$store.state.router.previous,
              current: this.$store.state.router.current,
              isLangSwitch: !1,
            };
            (t.isLangSwitch = l(t)),
              this.transitionIn && this.transitionIn(null, t);
          },
        },
        transition: {
          appear: !0,
          mode: "out-in",
          css: !1,
          beforeEnter: function (t) {
            var e = m(t.__vue__);
            this.$i18n.finalizePendingLocaleChange(),
              e && e.transitionInit && e.transitionInit();
          },
          enter: function (t, e) {
            var n = {
              previous: this.$store.state.router.previous,
              current: this.$store.state.router.current,
              isLangSwitch: !1,
            };
            if (((n.isLangSwitch = l(n)), n.previous)) {
              var o = m(t.__vue__);
              o && o.transitionIn ? o.transitionIn(e, n) : e();
            } else e();
          },
          leave: function (t, e) {
            var n = {
              previous: this.$store.state.router.previous,
              current: this.$store.state.router.current,
              isLangSwitch: !1,
            };
            n.isLangSwitch = l(n);
            var o = m(t.__vue__);
            o && o.transitionOut ? o.transitionOut(e, n) : e();
          },
        },
        head: function () {
          if (this.data)
            return {
              title: this.data.seo_meta_title,
              meta: [
                {
                  hid: "description",
                  name: "description",
                  property: "description",
                  content: this.data.seo_meta_description,
                },
                {
                  hid: "og:title",
                  name: "og:title",
                  property: "og:title",
                  content: this.data.seo_meta_title,
                },
                {
                  hid: "og:description",
                  name: "og:description",
                  property: "og:description",
                  content: this.data.seo_meta_description,
                },
                {
                  hid: "og:type",
                  name: "og:type",
                  property: "og:type",
                  content: "website",
                },
                {
                  hid: "og:url",
                  name: "og:url",
                  property: "og:url",
                  content: "https://rkediplom.s3files.ru/".concat(
                    this.$route.path
                  ),
                },
                {
                  hid: "og:image",
                  name: "og:image",
                  property: "og:image",
                  content: this.data.seo_og_image
                    ? this.data.seo_og_image.url
                    : "",
                },
                {
                  hid: "og:image:width",
                  name: "og:image:width",
                  property: "og:image:width",
                  content:
                    this.data.seo_og_image && this.data.seo_og_image.dimensions
                      ? this.data.seo_og_image.dimensions.width
                      : "",
                },
                {
                  hid: "og:image:height",
                  name: "og:image:height",
                  property: "og:image:height",
                  content:
                    this.data.seo_og_image && this.data.seo_og_image.dimensions
                      ? this.data.seo_og_image.dimensions.height
                      : "",
                },
                {
                  hid: "twitter:card",
                  name: "twitter:card",
                  property: "twitter:card",
                  content: "summary_large_image",
                },
                {
                  hid: "twitter:title",
                  name: "twitter:title",
                  property: "twitter:title",
                  content: this.data.seo_meta_title,
                },
                {
                  hid: "twitter:description",
                  name: "twitter:description",
                  property: "twitter:description",
                  content: this.data.seo_meta_description,
                },
                {
                  hid: "twitter:image",
                  name: "twitter:image",
                  property: "twitter:image",
                  content: this.data.seo_og_image
                    ? this.data.seo_og_image.url
                    : "",
                },
              ],
            };
        },
      };
    },
    560: function (t, e, n) {
      var content = n(627);
      content.__esModule && (content = content.default),
        "string" == typeof content && (content = [[t.i, content, ""]]),
        content.locals && (t.exports = content.locals);
      (0, n(95).default)("23b0c801", content, !0, { sourceMap: !1 });
    },
    626: function (t, e, n) {
      "use strict";
      n(560);
    },
    627: function (t, e, n) {
      var o = n(94)(!1);
      o.push([
        t.i,
        '[data-v-0d330c11]:export{maxWithLarge:1920px;fontSizeSmall:1vw;fontSizeMedium:.55vw;fontSizeLarge:1vw;viewportWidthSmall:375px;viewportWidthMedium:768px;viewportWidthLarge:1920px}@media (min-width:0){html[data-v-0d330c11]:before{display:none;content:"small"}}@media (min-width:500px){html[data-v-0d330c11]:before{display:none;content:"medium"}}@media (min-width:850px){html[data-v-0d330c11]:before{display:none;content:"large"}}.page-not-supported[data-v-0d330c11]{opacity:0;position:fixed;top:0;left:0;width:100%;height:100%}.container[data-v-0d330c11]{display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%}.heading[data-v-0d330c11]{width:80rem;font-size:6.66667rem;text-align:center}@media (min-width:850px){.heading[data-v-0d330c11]{width:52.08333rem;font-size:4.16667rem}}.button[data-v-0d330c11]{opacity:.5;margin-top:13.33333rem;font-size:4.53333rem;text-transform:uppercase;transition:opacity .3s cubic-bezier(.12,0,.39,0)}@media (min-width:850px){.button[data-v-0d330c11]{margin-top:5.20833rem;font-size:1.14583rem}}.button[data-v-0d330c11]:hover{opacity:1}',
        "",
      ]),
        (t.exports = o);
    },
    672: function (t, e, n) {
      "use strict";
      n.r(e);
      var o = n(7),
        r = n(115),
        c = {
          mixins: [n(524).a, r.a],
          methods: {
            transitionIn: function (t, e) {
              new o.a.timeline({ onComplete: t }).to(this.$el, {
                duration: 1,
                alpha: 1,
                ease: "sine.inOut",
              });
            },
            transitionOut: function (t, e) {
              new o.a.timeline({ onComplete: t }).to(this.$el, {
                duration: 1,
                alpha: 0,
                ease: "sine.inOut",
              });
            },
          },
        },
        d = (n(626), n(71)),
        component = Object(d.a)(
          c,
          function () {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("div", { staticClass: "page-not-supported" }, [
              n("div", { staticClass: "container" }, [
                n("div", { staticClass: "heading" }, [
                  t._v(
                    "\n\n            " +
                      t._s(t.localeCopy.notSupported.message) +
                      "\n\n        "
                  ),
                ]),
              ]),
            ]);
          },
          [],
          !1,
          null,
          "0d330c11",
          null
        );
      e.default = component.exports;
    },
  },
]);
