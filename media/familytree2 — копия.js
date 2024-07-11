/** @format */

var FamilyTree = function (e, t) {
  var i = this;
  if (
    (("string" == typeof e || e instanceof String) &&
      (e = document.querySelector(e)),
    (this.element = e),
    (this.config = FamilyTree.mergeDeep(FamilyTree._defaultConfig(t), t)),
    (this._layoutConfigs = {
      base: {
        orientation: this.config.orientation,
        levelSeparation: this.config.levelSeparation,
        mixedHierarchyNodesSeparation:
          this.config.mixedHierarchyNodesSeparation,
        assistantSeparation: this.config.assistantSeparation,
        subtreeSeparation: this.config.subtreeSeparation,
        siblingSeparation: this.config.siblingSeparation,
        layout: this.config.layout,
        columns: this.config.columns,
        collapse: this.config.collapse,
        partnerNodeSeparation: this.config.partnerNodeSeparation,
      },
    }),
    this.config.tags)
  )
    for (var r in this.config.tags) {
      var a = this.config.tags[r];
      null != a.subTreeConfig &&
        (this._layoutConfigs[r] = {
          orientation:
            null != a.subTreeConfig.orientation
              ? a.subTreeConfig.orientation
              : this.config.orientation,
          levelSeparation:
            null != a.subTreeConfig.levelSeparation
              ? a.subTreeConfig.levelSeparation
              : this.config.levelSeparation,
          mixedHierarchyNodesSeparation:
            null != a.subTreeConfig.mixedHierarchyNodesSeparation
              ? a.subTreeConfig.mixedHierarchyNodesSeparation
              : this.config.mixedHierarchyNodesSeparation,
          assistantSeparation:
            null != a.subTreeConfig.assistantSeparation
              ? a.subTreeConfig.assistantSeparation
              : this.config.assistantSeparation,
          subtreeSeparation:
            null != a.subTreeConfig.subtreeSeparation
              ? a.subTreeConfig.subtreeSeparation
              : this.config.subtreeSeparation,
          siblingSeparation:
            null != a.subTreeConfig.siblingSeparation
              ? a.subTreeConfig.siblingSeparation
              : this.config.siblingSeparation,
          layout:
            null != a.subTreeConfig.layout
              ? a.subTreeConfig.layout
              : this.config.layout,
          columns:
            null != a.subTreeConfig.columns
              ? a.subTreeConfig.columns
              : this.config.columns,
          collapse:
            null != a.subTreeConfig.collapse
              ? a.subTreeConfig.collapse
              : this.config.collapse,
          partnerNodeSeparation:
            null != a.subTreeConfig.partnerNodeSeparation
              ? a.subTreeConfig.partnerNodeSeparation
              : this.config.partnerNodeSeparation,
        });
    }
  (this._event_id = FamilyTree._guid()),
    FamilyTree._validateConfig(this.config) &&
      ((this._vScroll = {}),
      this.config.ui || (this.ui = FamilyTree.ui),
      this.config.editUI
        ? (this.editUI = this.config.editUI)
        : (this.editUI = new FamilyTree.editUI()),
      this.editUI.init(this),
      this.config.filterUI
        ? (this.filterUI = this.config.filterUI)
        : (this.filterUI = new FamilyTree.filterUI()),
      this.filterUI.init(this),
      (this.manager = new FamilyTree.manager(this)),
      this.config.searchUI
        ? (this.searchUI = this.config.searchUI)
        : (this.searchUI = new FamilyTree.searchUI()),
      this.config.nodeMenuUI
        ? (this.nodeMenuUI = this.config.nodeMenuUI)
        : (this.nodeMenuUI = new FamilyTree.menuUI()),
      this.nodeMenuUI.init(this, this.config.nodeMenu),
      this.config.nodeCircleMenuUI
        ? (this.nodeCircleMenuUI = this.config.nodeCircleMenuUI)
        : (this.nodeCircleMenuUI = new FamilyTree.circleMenuUI()),
      this.nodeCircleMenuUI.init(this, this.config.nodeCircleMenu),
      this.config.nodeContextMenuUI
        ? (this.nodeContextMenuUI = this.config.nodeContextMenuUI)
        : (this.nodeContextMenuUI = new FamilyTree.menuUI()),
      this.nodeContextMenuUI.init(this, this.config.nodeContextMenu),
      this.config.toolbarUI
        ? (this.toolbarUI = this.config.toolbarUI)
        : (this.toolbarUI = new FamilyTree.toolbarUI()),
      this.config.notifierUI
        ? (this.notifierUI = this.config.notifierUI)
        : (this.notifierUI = new FamilyTree.notifierUI()),
      this.notifierUI.init(this),
      this.config.menuUI
        ? (this.menuUI = this.config.menuUI)
        : (this.menuUI = new FamilyTree.menuUI()),
      this.menuUI.init(this, this.config.menu),
      this.config.xScrollUI ||
        (this.xScrollUI = new FamilyTree.xScrollUI(
          this.element,
          this.config,
          function () {
            return {
              boundary: i.response.boundary,
              scale: i.getScale(),
              viewBox: i.getViewBox(),
              padding: i.config.padding,
            };
          },
          function (e) {
            i.setViewBox(e);
          },
          function () {
            i._draw(!0, FamilyTree.action.xScroll);
          }
        )),
      this.config.yScrollUI ||
        (this.yScrollUI = new FamilyTree.yScrollUI(
          this.element,
          this.config,
          function () {
            return {
              boundary: i.response.boundary,
              scale: i.getScale(),
              viewBox: i.getViewBox(),
              padding: i.config.padding,
            };
          },
          function (e) {
            i.setViewBox(e);
          },
          function () {
            i._draw(!0, FamilyTree.action.xScroll);
          }
        )),
      this.config.undoRedoUI
        ? (this.undoRedoUI = this.config.undoRedoUI)
        : (this.undoRedoUI = new FamilyTree.undoRedoUI()),
      this.element.classList.add("bft-" + this.config.mode),
      (this._gragStartedId = null),
      (this._timeout = null),
      (this._touch = null),
      (this._initialized = !1),
      (this._loaded = !1),
      (this._moveInterval = null),
      (this._movePosition = null),
      (this.response = null),
      (this.nodes = null),
      (this.isVisible = null),
      FamilyTree._intersectionObserver(this.element, function (e) {
        (i.isVisible = e),
          !1 !== FamilyTree.events.publish("visibility-change", [i]) &&
            FamilyTree.LAZY_LOADING &&
            i.isVisible &&
            (i._loaded
              ? i._draw(!1, FamilyTree.action.update)
              : (i._setInitialSizeIfNotSet(),
                i._draw(!1, FamilyTree.action.init)));
      }));
};
(FamilyTree._defaultConfig = function (e) {
  return {
    interactive: !0,
    mode: "light",
    lazyLoading: !0,
    enableDragDrop: !1,
    enableSearch: !0,
    enableTouch: !1,
    enablePan: !0,
    keyNavigation: !1,
    miniMap: !1,
    nodeMenu: null,
    nodeCircleMenu: null,
    nodeContextMenu: null,
    menu: null,
    toolbar: !1,
    sticky: !0,
    nodeMouseClick: FamilyTree.action.details,
    nodeMouseDbClick: FamilyTree.none,
    mouseScrool: FamilyTree.action.zoom,
    showXScroll: FamilyTree.none,
    showYScroll: FamilyTree.none,
    template: "ana",
    tags: {},
    min: !1,
    nodeBinding: {},
    linkBinding: {},
    searchFields: null,
    searchDisplayField: null,
    searchFieldsWeight: null,
    searchFieldsAbbreviation: null,
    nodes: [],
    clinks: [],
    slinks: [],
    groupDottedLines: [],
    dottedLines: [],
    undoRedoStorageName: null,
    levelSeparation: 60,
    siblingSeparation: 20,
    subtreeSeparation: 40,
    mixedHierarchyNodesSeparation: 15,
    assistantSeparation: 100,
    minPartnerSeparation: 50,
    partnerChildrenSplitSeparation: 20,
    partnerNodeSeparation: 15,
    columns: 10,
    padding: 30,
    orientation: FamilyTree.orientation.top,
    layout: FamilyTree.layout.normal,
    layoutGridColumns: "dynamic",
    scaleInitial: 1,
    movable: null,
    scaleMin: 0.1,
    scaleMax: 5,
    orderBy: null,
    editUI: null,
    filterUI: null,
    searchUI: null,
    xScrollUI: null,
    yScrollUI: null,
    nodeMenuUI: null,
    nodeCircleMenuUI: null,
    nodeContextMenuUI: null,
    toolbarUI: null,
    notifierUI: null,
    menuUI: null,
    undoRedoUI: null,
    exportUrl: "https://balkan.app/export",
    collapse: {},
    expand: {},
    align: FamilyTree.CENTER,
    UI: null,
    anim: { func: FamilyTree.anim.outPow, duration: 200 },
    zoom: { speed: 120, smooth: 12 },
    roots: null,
    state: null,
    editForm: {
      readOnly: !1,
      titleBinding: "name",
      photoBinding: "img",
      addMore: "Add more fields",
      addMoreBtn: "Add",
      addMoreFieldName: "Field name",
      saveAndCloseBtn: "Save and close",
      cancelBtn: "Cancel",
      generateElementsFromFields: !0,
      focusBinding: null,
      buttons: {
        edit: {
          icon: FamilyTree.icon.edit(24, 24, "#fff"),
          text: "Edit",
          hideIfEditMode: !0,
          hideIfDetailsMode: !1,
        },
        share: { icon: FamilyTree.icon.share(24, 24, "#fff"), text: "Share" },
        pdf: { icon: FamilyTree.icon.pdf(24, 24, "#fff"), text: "Save as PDF" },
        remove: {
          icon: FamilyTree.icon.remove(24, 24, "#fff"),
          text: "Remove",
          hideIfDetailsMode: !0,
        },
      },
      elements: [],
    },
  };
}),
  (FamilyTree.prototype.load = function (e, t) {
    var i = this;
    return (
      (this.config.nodes = e),
      this._draw(!1, FamilyTree.action.init, void 0, function () {
        i.filterUI.update(), t && t();
      }),
      this
    );
  }),
  (FamilyTree.prototype.loadXML = function (e, t) {
    var i = FamilyTree._xml2json(e);
    return this.load(i, t);
  }),
  (FamilyTree.prototype.getXML = function () {
    return FamilyTree._json2xml(this.config.nodes);
  }),
  (FamilyTree.prototype.on = function (e, t) {
    return FamilyTree.events.on(e, t, this._event_id), this;
  }),
  (FamilyTree.prototype.removeListener = function (e, t) {
    return FamilyTree.events.remove(e, t, this._event_id);
  }),
  (FamilyTree.prototype.draw = function (e, t, i) {
    null == e && (e = FamilyTree.action.update), this._draw(!1, e, t, i);
  }),
  (FamilyTree.prototype._draw = function (e, t, i, r) {
    var a = this;
    if (!FamilyTree.LAZY_LOADING || this.isVisible)
      if (
        FamilyTree.LAZY_LOADING ||
        this._initialized ||
        (this._setInitialSizeIfNotSet(),
        0 != this.width() && 0 != this.height())
      ) {
        this._hideBeforeAnimationCompleted = !1;
        var n = t == FamilyTree.action.init ? null : this.getViewBox();
        this.manager.read(
          e,
          this.width(),
          this.height(),
          n,
          t,
          i,
          function (e) {
            if (!a.notifierUI.show(e.notif)) {
              t != FamilyTree.action.exporting &&
                ((a.nodes = e.nodes),
                (a.visibleNodeIds = e.visibleNodeIds),
                (a.roots = e.roots)),
                (a.editUI.fields = e.allFields);
              var n = { defs: "" };
              FamilyTree.events.publish("renderdefs", [a, n]);
              var o = a.ui.defs(n.defs),
                l = a.getScale(e.viewBox);
              o += a.ui.pointer(a.config, t, l);
              var s = a.getViewBox(),
                d = e.viewBox;
              n = { content: o, res: e };
              FamilyTree.events.publish("prerender", [a, n]), (o = n.content);
              var c = [];
              if (FamilyTree.RENDER_LINKS_BEFORE_NODES)
                for (var m = 0; m < e.visibleNodeIds.length; m++) {
                  var h = e.nodes[e.visibleNodeIds[m]];
                  FamilyTree.getRootOf(h).stParent
                    ? c.push(h.id)
                    : (o += a.ui.link(
                        h,
                        a,
                        l,
                        e.bordersByRootIdAndLevel,
                        e.nodes,
                        t
                      ));
                }
              for (m = 0; m < e.visibleNodeIds.length; m++) {
                h = e.nodes[e.visibleNodeIds[m]];
                var p = a._get(h.id);
                FamilyTree.RENDER_LINKS_BEFORE_NODES &&
                  c.includes(h.id) &&
                  (o += a.ui.link(
                    h,
                    a,
                    l,
                    e.bordersByRootIdAndLevel,
                    e.nodes,
                    t
                  )),
                  (o += a.ui.node(
                    h,
                    p,
                    e.animations,
                    a.config,
                    void 0,
                    void 0,
                    void 0,
                    t,
                    l,
                    a
                  ));
              }
              for (m = 0; m < e.visibleNodeIds.length; m++) {
                h = e.nodes[e.visibleNodeIds[m]];
                FamilyTree.RENDER_LINKS_BEFORE_NODES ||
                  (o += a.ui.link(
                    h,
                    a,
                    l,
                    e.bordersByRootIdAndLevel,
                    e.nodes,
                    t
                  )),
                  (o += a.ui.expandCollapseBtn(a, h, a._layoutConfigs, t, l));
              }
              n = { content: o, res: e };
              if (
                (FamilyTree.events.publish("render", [a, n]),
                (o = n.content),
                (e = n.res),
                (o += a.ui.lonely(a.config)),
                t !== FamilyTree.action.exporting)
              ) {
                (t !== FamilyTree.action.centernode &&
                  t !== FamilyTree.action.insert &&
                  t !== FamilyTree.action.expand &&
                  t !== FamilyTree.action.collapse &&
                  t !== FamilyTree.action.update) ||
                  (d = s),
                  t === FamilyTree.action.init && null != s && (d = s),
                  (a.response = e);
                F = a.ui.svg(a.width(), a.height(), d, a.config, o);
                if (a._initialized) {
                  var f = a.getSvg(),
                    u = f.parentNode;
                  u.removeChild(f),
                    u.insertAdjacentHTML("afterbegin", F),
                    a._attachEventHandlers(),
                    a.xScrollUI.addListener(a.getSvg()),
                    a.yScrollUI.addListener(a.getSvg()),
                    a.xScrollUI.setPosition(),
                    a.yScrollUI.setPosition();
                } else
                  (a.element.innerHTML =
                    a.ui.css() + F + a.ui.menuButton(a.config)),
                    a._attachInitEventHandlers(),
                    a._attachEventHandlers(),
                    a.xScrollUI.create(a.width(), a.config.padding),
                    a.xScrollUI.setPosition(),
                    a.xScrollUI.addListener(a.getSvg()),
                    a.yScrollUI.create(a.height(), a.config.padding),
                    a.yScrollUI.setPosition(),
                    a.yScrollUI.addListener(a.getSvg()),
                    a.config.enableSearch && a.searchUI.init(a),
                    a.toolbarUI.init(a, a.config.toolbar),
                    a.undoRedoUI.init(a);
                var y = !1,
                  g = a.response.animations;
                if (g[0].length > 0) {
                  a._hideBeforeAnimation(g[0].length);
                  for (m = 0; m < g[0].length; m++)
                    g[0][m] = a.getNodeElement(g[0][m]);
                  FamilyTree.animate(
                    g[0],
                    g[1],
                    g[2],
                    a.config.anim.duration,
                    a.config.anim.func,
                    function () {
                      y ||
                        (r && r(),
                        FamilyTree.events.publish("redraw", [a]),
                        a._showAfterAnimation(),
                        (y = !0));
                    }
                  );
                }
                t === FamilyTree.action.centerNode
                  ? FamilyTree.animate(
                      a.getSvg(),
                      { viewbox: s },
                      { viewbox: a.response.viewBox },
                      a.config.anim.duration,
                      a.config.anim.func,
                      function () {
                        a.ripple(i.options.rippleId),
                          y ||
                            (r && r(),
                            FamilyTree.events.publish("redraw", [a]),
                            a._showAfterAnimation(),
                            (y = !0));
                      },
                      function () {
                        a.xScrollUI.setPosition(), a.yScrollUI.setPosition();
                      }
                    )
                  : !s ||
                    !a.response ||
                    (s[0] == a.response.viewBox[0] &&
                      s[1] == a.response.viewBox[1] &&
                      s[2] == a.response.viewBox[2] &&
                      s[3] == a.response.viewBox[3]) ||
                    (t !== FamilyTree.action.insert &&
                      t !== FamilyTree.action.expand &&
                      t !== FamilyTree.action.collapse &&
                      t !== FamilyTree.action.update &&
                      t !== FamilyTree.action.init)
                  ? 0 == g[0].length &&
                    (y ||
                      (r && r(),
                      FamilyTree.events.publish("redraw", [a]),
                      (y = !0)))
                  : FamilyTree.animate(
                      a.getSvg(),
                      { viewbox: s },
                      { viewbox: a.response.viewBox },
                      2 * a.config.anim.duration,
                      a.config.anim.func,
                      function () {
                        a.xScrollUI.setPosition(),
                          a.yScrollUI.setPosition(),
                          y ||
                            (r && r(),
                            FamilyTree.events.publish("redraw", [a]),
                            (y = !0));
                      }
                    ),
                  a._initialized ||
                    ((a._initialized = !0),
                    a.filterUI.update(),
                    FamilyTree.events.publish("init", [a])),
                  !a._loaded &&
                    e &&
                    e.nodes &&
                    Object.keys(e.nodes).length &&
                    (a._loaded = !0);
              } else {
                var v = e.boundary,
                  T = v.maxX - v.minX,
                  b = v.maxY - v.minY,
                  F = a.ui.svg(T, b, [v.minX, v.minY, T, b], a.config, o, l);
                r(F, e);
              }
            }
          },
          function (e) {
            FamilyTree.events.publish("ready", [a, e]);
          }
        );
      } else
        console.error(
          "Cannot load the family with size 0! If you are using the FamilyTree within tabs set FamilyTree.LAZY_LOADING to true! "
        );
  }),
  (FamilyTree.prototype._setInitialSizeIfNotSet = function () {
    (this.element.style.overflow = "hidden"),
      (this.element.style.position = "relative"),
      0 == this.element.offsetHeight &&
        ((this.element.style.height = "100%"),
        0 == this.element.offsetHeight &&
          (this.element.style.height = "700px")),
      0 == this.element.offsetWidth &&
        ((this.element.style.width = "100%"),
        0 == this.element.offsetWidth && (this.element.style.width = "700px"));
  }),
  (FamilyTree.prototype.width = function () {
    return this.element.offsetWidth;
  }),
  (FamilyTree.prototype.height = function () {
    return this.element.offsetHeight;
  }),
  (FamilyTree.prototype.getViewBox = function () {
    var e = this.getSvg();
    return FamilyTree._getViewBox(e);
  }),
  (FamilyTree.prototype.setViewBox = function (e) {
    this.getSvg().setAttribute("viewBox", e.toString());
  }),
  (FamilyTree.prototype.getScale = function (e) {
    return (
      e || (e = this.getViewBox()),
      FamilyTree.getScale(
        e,
        this.width(),
        this.height(),
        this.config.scaleInitial,
        this.config.scaleMax,
        this.config.scaleMin
      )
    );
  }),
  (FamilyTree.prototype.setScale = function (e) {
    e > this.config.scaleMax && (e = this.config.scaleMax),
      e < this.config.scaleMin && (e = this.config.scaleMin);
    var t = this.getViewBox().slice(0),
      i = this.width(),
      r = this.height(),
      a = i / t[2],
      n = r / t[3],
      o = a > n ? n : a,
      l = t,
      s = t[2],
      d = t[3];
    return (
      (t[2] = t[2] / (e / o)),
      (t[3] = t[3] / (e / o)),
      (t[0] = l[0] - (t[2] - s) / 2),
      (t[1] = l[1] - (t[3] - d) / 2),
      this.setViewBox(t),
      FamilyTree.events.publish("redraw", [this]),
      e
    );
  }),
  (FamilyTree.prototype.ripple = function (e, t, i) {
    var r = this.getNode(e);
    if (null != r) {
      var a = this.getNodeElement(e);
      if (null != a) {
        var n = this.getScale(),
          o = r.w / 2,
          l = r.h / 2;
        if (void 0 !== t && void 0 !== i) {
          var s = a.getBoundingClientRect();
          (o = t / n - s.left / n), (l = i / n - s.top / n);
        }
        var d = r.w,
          c = r.h,
          m = d - o > o ? d - o : o,
          h = c - l > l ? c - l : l,
          p = m > h ? m : h,
          f = document.createElementNS("http://www.w3.org/2000/svg", "g"),
          u = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "clipPath"
          ),
          y = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
          g = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
          v = FamilyTree.randomId();
        u.setAttribute("id", v);
        var T = {
          ripple: FamilyTree.t(r.templateName, r.min, this.getScale()).ripple,
          node: r,
        };
        FamilyTree.events.publish("ripple", [this, T]),
          y.setAttribute("x", T.ripple.rect ? T.ripple.rect.x : 0),
          y.setAttribute("y", T.ripple.rect ? T.ripple.rect.y : 0),
          y.setAttribute("width", T.ripple.rect ? T.ripple.rect.width : r.w),
          y.setAttribute("height", T.ripple.rect ? T.ripple.rect.height : r.h),
          y.setAttribute("rx", T.ripple.radius),
          y.setAttribute("ry", T.ripple.radius),
          g.setAttribute("clip-path", "url(#" + v + ")"),
          g.setAttribute("cx", o),
          g.setAttribute("cy", l),
          g.setAttribute("r", 0),
          g.setAttribute("fill", T.ripple.color),
          g.setAttribute("class", "bft-ripple"),
          u.appendChild(y),
          f.appendChild(u),
          f.appendChild(g),
          a.appendChild(f),
          FamilyTree.animate(
            g,
            { r: 0, opacity: 1 },
            { r: p, opacity: 0 },
            500,
            FamilyTree.anim.outPow,
            function () {
              a.removeChild(f);
            }
          );
      }
    }
  }),
  (FamilyTree.prototype.center = function (e, t, i) {
    var r,
      a,
      n = e,
      o = !0,
      l = !0;
    t && null != t.parentState && (r = t.parentState),
      t && null != t.childrenState && (a = t.childrenState),
      t && null != t.rippleId && (n = t.rippleId),
      t && null != t.vertical && (o = t.vertical),
      t && null != t.horizontal && (l = t.horizontal);
    var s = {
      parentState: r,
      childrenState: a,
      rippleId: n,
      vertical: o,
      horizontal: l,
    };
    this._draw(!1, FamilyTree.action.centerNode, { id: e, options: s }, i);
  }),
  (FamilyTree.prototype.fit = function (e) {
    (this.config.scaleInitial = FamilyTree.match.boundary),
      this._draw(!0, FamilyTree.action.init, { method: "fit" }, e);
  }),
  (FamilyTree.prototype.toggleFullScreen = function () {
    var e = document.querySelector(
      "[" + FamilyTree.attr.tlbr + "r='fullScreen']"
    );
    document.fullscreenElement == this.element ||
    document.webkitFullscreenElement == this.element ||
    document.mozFullScreenElement == this.element ||
    document.msFullscreenElement == this.element
      ? (document.exitFullscreen
          ? document.exitFullscreen()
          : document.mozCancelFullScreen
          ? document.mozCancelFullScreen()
          : document.webkitExitFullscreen
          ? document.webkitExitFullscreen()
          : document.msExitFullscreen && document.msExitFullscreen(),
        e && (e.innerHTML = FamilyTree.toolbarUI.openFullScreenIcon))
      : (this.element.requestFullscreen
          ? this.element.requestFullscreen()
          : this.element.mozRequestFullScreen
          ? this.element.mozRequestFullScreen()
          : this.element.webkitRequestFullscreen
          ? this.element.webkitRequestFullscreen()
          : this.element.msRequestFullscreen &&
            this.element.msRequestFullscreen(),
        e && (e.innerHTML = FamilyTree.toolbarUI.closeFullScreenIcon));
  }),
  (FamilyTree.prototype.getNode = function (e) {
    return this.nodes[e];
  }),
  (FamilyTree.prototype.setLayout = function (e, t) {
    t || (t = "base"),
      (this._layoutConfigs[t].layout = e),
      "base" == t && (this.config.layout = e),
      this._draw(!1, FamilyTree.action.update);
  }),
  (FamilyTree.prototype.setOrientation = function (e, t, i) {
    var r = this;
    t || (t = "base"),
      (this._layoutConfigs[t].orientation = e),
      "base" == t && (this.config.orientation = e),
      this._draw(!1, FamilyTree.action.update, void 0, function () {
        FamilyTree._moveToBoundaryArea(
          r.getSvg(),
          r.getViewBox(),
          r.response.boundary,
          function () {
            r._draw(!0, FamilyTree.action.pan), i && i();
          }
        );
      });
  }),
  (FamilyTree.prototype.search = function (e, t, i) {
    return (
      FamilyTree.isNEU(t) && (t = this.searchUI._searchFields),
      FamilyTree.isNEU(i) && (i = t),
      FamilyTree._search.search(
        this.config.nodes,
        e,
        t,
        i,
        this.config.searchDisplayField,
        this.config.searchFieldsWeight,
        this.searchUI._searchFieldsAbbreviation
      )
    );
  }),
  (FamilyTree.prototype._hideBeforeAnimation = function (e) {
    if (
      1 != this._hideBeforeAnimationCompleted &&
      !(e && e < FamilyTree.ANIM_THRESHOLD)
    ) {
      var t = this.element.getElementsByTagName("text");
      if (t.length > FamilyTree.TEXT_THRESHOLD)
        for (var i = 0; i < t.length; i++) t[i].style.display = "none";
      var r = this.element.getElementsByTagName("image");
      if (r.length > FamilyTree.IMAGES_THRESHOLD)
        for (i = 0; i < r.length; i++) r[i].style.display = "none";
      var a = this.element.querySelectorAll(
        "[" + FamilyTree.attr.link_id + "]"
      );
      if (a.length > FamilyTree.LINKS_THRESHOLD)
        for (i = 0; i < a.length; i++) a[i].style.display = "none";
      var n = this.element.querySelectorAll(
        "[" + FamilyTree.attr.control_expcoll_id + "]"
      );
      if (n.length > FamilyTree.BUTTONS_THRESHOLD)
        for (i = 0; i < n.length; i++) n[i].style.display = "none";
      var o = this.element.querySelectorAll(
        "[" + FamilyTree.attr.control_up_id + "]"
      );
      if (o.length > FamilyTree.BUTTONS_THRESHOLD)
        for (i = 0; i < o.length; i++) o[i].style.display = "none";
      this._hideBeforeAnimationCompleted = !0;
    }
  }),
  (FamilyTree.prototype._showAfterAnimation = function () {
    for (
      var e = this.element.getElementsByTagName("text"), t = 0;
      t < e.length;
      t++
    )
      e[t].style.display = "";
    var i = this.element.getElementsByTagName("image");
    for (t = 0; t < i.length; t++) i[t].style.display = "";
    var r = this.element.querySelectorAll("[" + FamilyTree.attr.link_id + "]");
    for (t = 0; t < r.length; t++) r[t].style.display = "";
    var a = this.element.querySelectorAll(
      "[" + FamilyTree.attr.control_expcoll_id + "]"
    );
    for (t = 0; t < a.length; t++) a[t].style.display = "";
    var n = this.element.querySelectorAll(
      "[" + FamilyTree.attr.control_up_id + "]"
    );
    for (t = 0; t < n.length; t++) n[t].style.display = "";
    this._hideBeforeAnimationCompleted = !1;
  }),
  (FamilyTree.prototype.isChild = function (e, t) {
    for (var i = this.getNode(t); i; ) {
      if (i.id == e) return !0;
      i = i.parent ? i.parent : i.stParent;
    }
    return !1;
  }),
  (FamilyTree.prototype.getCollapsedIds = function (e) {
    for (var t = [], i = 0; i < e.childrenIds.length; i++) {
      var r = this.getNode(e.childrenIds[i]);
      1 == r.collapsed && t.push(r.id);
    }
    return t;
  }),
  (FamilyTree.prototype.stateToUrl = function () {
    if (this.manager.state) {
      var e = {};
      return (
        (e.exp = this.manager.state.exp.join("*")),
        (e.min = this.manager.state.min.join("*")),
        (e.adjustify =
          this.manager.state.adjustify.x +
          "*" +
          this.manager.state.adjustify.y),
        (e.scale = this.manager.state.scale),
        (e.y = this.manager.state.x),
        (e.x = this.manager.state.y),
        new URLSearchParams(e).toString()
      );
    }
    return "";
  }),
  (FamilyTree.prototype.generateId = function () {
    for (;;) {
      var e =
        "_" +
        ("0000" + ((Math.random() * Math.pow(36, 4)) | 0).toString(36)).slice(
          -4
        );
      if (null == this.nodes || !this.nodes.hasOwnProperty(e)) return e;
    }
  }),
  (FamilyTree.prototype.moveNodesToVisibleArea = function (e, t) {
    for (
      var i = this,
        r = this.getSvg(),
        a = this.getViewBox(),
        n = null,
        o = null,
        l = null,
        s = null,
        d = 0;
      d < e.length;
      d++
    ) {
      var c = this.nodes[e[d]];
      (null === n || n < c.x + c.w) && (n = c.x + c.w),
        (null === o || o < c.y + c.h) && (o = c.y + c.h),
        (null === l || l > c.x) && (l = c.x),
        (null === s || s > c.y) && (s = c.y);
    }
    var m = this.width(),
      h = this.height(),
      p = m / (v = n - l + 2 * this.config.padding),
      f = h / (T = o - s + 2 * this.config.padding),
      u = p > f ? f : p,
      y = Math.ceil(m / u),
      g = Math.ceil(h / u),
      v = 0,
      T = 0;
    if (y - 2 * this.config.padding >= n - l) v = (n + l) / 2 - y / 2;
    else
      switch (
        ((v =
          firstRoot.x -
          y / 2 +
          FamilyTree.manager._getNodeWidth(firstRoot, this.config) / 2),
        this.config.orientation)
      ) {
        case FamilyTree.orientation.right:
        case FamilyTree.orientation.right_top:
          (v = -(y / 2 - (l - n) / 2)) < this.config.padding - y &&
            (v = this.config.padding - y);
          break;
        case FamilyTree.orientation.left:
        case FamilyTree.orientation.bottom_left:
        case FamilyTree.orientation.top_left:
        case FamilyTree.orientation.left_top:
          (v = -(y / 2 - (n - l) / 2)) > -this.config.padding &&
            (v = -this.config.padding);
      }
    if (g - 2 * this.config.padding >= o - s) T = (o + s) / 2 - g / 2;
    else
      switch (
        ((T = -(g / 2 - (o - s) / 2)) > -this.config.padding &&
          (T = -this.config.padding),
        this.config.orientation)
      ) {
        case FamilyTree.orientation.bottom:
        case FamilyTree.orientation.bottom_left:
          (T = -(g / 2 - (s - o) / 2)) < this.config.padding - g &&
            (T = this.config.padding - g);
          break;
        case FamilyTree.orientation.left:
        case FamilyTree.orientation.right:
          T =
            firstRoot.y -
            g / 2 +
            FamilyTree.manager._getNodeWidth(firstRoot, this.config) / 2;
      }
    var b = [v, T, y, g];
    a[0] !== b[0] || a[1] !== b[1]
      ? FamilyTree.animate(
          r,
          { viewBox: a },
          { viewBox: b },
          this.config.anim.duration,
          this.config.anim.func,
          function () {
            i.draw(FamilyTree.action.update, void 0, t);
          }
        )
      : t && t();
  }),
  (FamilyTree.prototype._nodeHasHiddenParent = function (e) {
    return !e.parent && !FamilyTree.isNEU(e.pid) && this.getNode(e.pid);
  }),
  (FamilyTree.prototype.destroy = function () {
    this._removeEvent(window, "resize"),
      FamilyTree.events.removeForEventId(this._event_id),
      (this.element.innerHTML = null);
  }),
  (FamilyTree.__defaultConfig = FamilyTree._defaultConfig),
  (FamilyTree._defaultConfig = function (e) {
    var t = FamilyTree.__defaultConfig();
    return (
      (t.nodeTreeMenu = null),
      (t.template = "tommy"),
      (t.mode = "light"),
      (t.minPartnerSeparation = 30),
      (t.partnerChildrenSplitSeparation = 10),
      (t.siblingSeparation = 35),
      (t.tags["children-group"] = {
        template: "cgroup",
        subTreeConfig: { siblingSeparation: 7, columns: 1 },
      }),
      e && e.template
        ? ((t.tags.male = { template: e.template + "_male" }),
          (t.tags.female = { template: e.template + "_female" }))
        : ((t.tags.male = { template: t.template + "_male" }),
          (t.tags.female = { template: t.template + "_female" })),
      t
    );
  }),
  (FamilyTree.prototype.getRecentRootsByNodeId = function (e) {
    this.recentRoots || (this.recentRoots = []);
    var t = this.recentRoots,
      i = this.getNode(e);
    return i
      ? (i.rids.sort(function (e, i) {
          var r = t.indexOf(e),
            a = t.indexOf(i);
          return -1 == r ? 1e3 : -1 == a ? -1e3 : r - a;
        }),
        i.rids)
      : [];
  }),
  (FamilyTree.prototype._nodeHasHiddenParent = function (e) {
    return (
      !(e.parent || FamilyTree.isNEU(e.pid) || !this.getNode(e.pid)) ||
      !(!e.isPartner || FamilyTree.isNEU(e.mid) || !this.getNode(e.mid)) ||
      !(!e.isPartner || FamilyTree.isNEU(e.fid) || !this.getNode(e.fid)) ||
      !!(e.isPartner && e.pids.length > 1)
    );
  }),
  (FamilyTree.prototype._center = FamilyTree.prototype.center),
  (FamilyTree.prototype.center = function (e, t, i) {
    var r = this.getRecentRootsByNodeId(e);
    Array.isArray(this.config.roots) || (roots = []),
      FamilyTree._changeRootOption(this.config.roots, r, this.manager.rootList),
      this._center(e, t, i);
  }),
  (FamilyTree.localStorage = {}),
  (FamilyTree.localStorage.getItem = function (e) {
    var t = localStorage.getItem("to_date");
    if (t) {
      if ((t = new Date(t)) < new Date()) {
        for (var i = 0, r = localStorage.length; i < r; ++i) {
          var a = localStorage.key(i);
          a &&
            a.startsWith &&
            a.startsWith('{"n"') &&
            localStorage.removeItem(a);
        }
        localStorage.removeItem("to_date");
      }
    } else
      (t = new Date()).setDate(t.getDate() + 5),
        (t = t.toISOString()),
        localStorage.setItem("to_date", t);
    return localStorage.getItem(e);
  }),
  (FamilyTree.localStorage.setItem = function (e, t) {
    try {
      localStorage.setItem(e, t);
    } catch (e) {
      e.code == e.QUOTA_EXCEEDED_ERR
        ? (console.warn("Local storage quota exceeded"), localStorage.clear())
        : (console.error("Local storage error code:" + e.code),
          console.error(e));
    }
  }),
  (FamilyTree.prototype.canUpdateLink = function (e, t) {
    if (null == t || null == t) return !1;
    if (null == e || null == e) return !1;
    if (e == t) return !1;
    var i = this.getNode(t),
      r = this.getNode(e);
    return (
      !(
        i &&
        r &&
        (i.isPartner ||
          (i.hasPartners && r.isAssistant) ||
          (i.hasAssistants && r.isPartner))
      ) && !this.isChild(e, t)
    );
  }),
  (FamilyTree.prototype._canUpdateLink = FamilyTree.prototype.canUpdateLink),
  (FamilyTree.prototype.updateNode = function (e, t, i) {
    var r = this,
      a = this.get(e.id);
    if (!0 === i && !1 === FamilyTree.events.publish("update", [this, a, e]))
      return !1;
    this.update(e),
      FamilyTree.events.publish("updated", [this]),
      this.filterUI.update();
    var n = this.getNode(e.id),
      o = n.pid;
    null == o && (o = n.stpid),
      this._draw(!1, FamilyTree.action.update, { id: o }, function () {
        r.ripple(e.id), t && t();
      });
  }),
  (FamilyTree.prototype.update = function (e) {
    for (var t = 0; t < this.config.nodes.length; t++)
      if (this.config.nodes[t].id == e.id) {
        this._putInUndoStack(), this.clearRedo(), (this.config.nodes[t] = e);
        break;
      }
    return this;
  }),
  (FamilyTree.prototype.removeNode = function (e, t, i) {
    var r = this;
    if (!this.canRemove(e)) return !1;
    var a = this._getNewPidsAndStpidsForIds(e);
    if (!0 === i && !1 === FamilyTree.events.publish("remove", [this, e, a]))
      return !1;
    return (
      this.remove(e),
      FamilyTree.events.publish("updated", [this]),
      this.filterUI.update(),
      this._draw(!1, FamilyTree.action.update, null, function () {
        r.config.sticky &&
          FamilyTree._moveToBoundaryArea(
            r.getSvg(),
            r.getViewBox(),
            r.response.boundary
          ),
          t && t();
      }),
      !0
    );
  }),
  (FamilyTree.prototype.remove = function (e) {
    var t = this.get(e);
    if (t) {
      this._putInUndoStack(), this.clearRedo();
      for (var i = this.config.nodes.length - 1; i >= 0; i--)
        (this.config.nodes[i].pid != e && this.config.nodes[i].stpid != e) ||
          ((this.config.nodes[i].pid = t.pid),
          (this.config.nodes[i].stpid = t.stpid)),
          this.config.nodes[i].id == e && this.config.nodes.splice(i, 1);
    }
    return this;
  }),
  (FamilyTree.prototype._getNewPidsAndStpidsForIds = function (e) {
    var t = this.get(e),
      i = {},
      r = {};
    if (t)
      for (var a = this.config.nodes.length - 1; a >= 0; a--)
        this.config.nodes[a].pid == e
          ? (i[this.config.nodes[a].id] = t.pid)
          : this.config.nodes[a].stpid == e &&
            (r[this.config.nodes[a].id] = t.stpid);
    return { newPidsForIds: i, newStpidsForIds: r };
  }),
  (FamilyTree.prototype.addNode = function (e, t, i) {
    var r = this;
    if (!0 === i && !1 === FamilyTree.events.publish("add", [this, e]))
      return !1;
    this.add(e),
      FamilyTree.events.publish("updated", [this]),
      this.filterUI.update(),
      r._draw(
        !1,
        FamilyTree.action.insert,
        { id: e.pid, insertedNodeId: e.id },
        function () {
          r.ripple(e.id), t && t();
        }
      );
  }),
  (FamilyTree.prototype.add = function (e) {
    if (
      (null == e.id && console.error("Call addNode without id"),
      this._putInUndoStack(),
      this.clearRedo(),
      this.config.movable && !FamilyTree.isNEU(e.pid))
    ) {
      var t = this._get(e.pid);
      t &&
        (null != t.movex && (e.movex = t.movex),
        null != t.movey && (e.movey = t.movey));
    }
    return this.config.nodes.push(e), this;
  }),
  (FamilyTree.prototype.replaceIds = function (e, t) {
    this._replaceIds(e), this._draw(!1, FamilyTree.action.update, void 0, t);
  }),
  (FamilyTree.prototype._replaceIds = function (e) {
    for (
      var t = function (t) {
          for (var i = 0; i < t.length; i++) {
            var r = t[i];
            for (var a in e) {
              var n = e[a];
              r.from == a && (r.from = n), r.to == a && (r.to = n);
            }
          }
        },
        i = 0;
      i < this.config.nodes.length;
      i++
    ) {
      var r = this.config.nodes[i];
      for (var a in e) {
        var n = e[a];
        r.id == a && (r.id = n),
          r.pid == a && (r.pid = n),
          r.stpid == a && (r.stpid = n),
          r.ppid == a && (r.ppid = n);
      }
    }
    if (Array.isArray(this.config.roots))
      for (i = 0; i < this.config.roots.length; i++)
        FamilyTree.isNEU(e[this.config.roots[i]]) ||
          (this.config.roots[i] = e[this.config.roots[i]]);
    if (this.nodes)
      for (var o in this.nodes)
        if (!FamilyTree.isNEU(e[o])) {
          n = e[o];
          ((l = this.nodes[o]).id = n), (this.nodes[n] = l);
        }
    if (this.manager.oldNodes)
      for (var o in this.manager.oldNodes)
        if (!FamilyTree.isNEU(e[o])) {
          n = e[o];
          ((l = this.manager.oldNodes[o]).id = n),
            (this.manager.oldNodes[n] = l);
        }
    if (this.roots)
      for (var o in this.roots)
        if (!FamilyTree.isNEU(e[o])) {
          var l;
          n = e[o];
          ((l = this.roots[o]).id = n), (this.roots[n] = l);
        }
    t(this.config.clinks),
      t(this.config.slinks),
      t(this.config.groupDottedLines),
      t(this.config.dottedLines);
  }),
  (FamilyTree.prototype._get = function (e) {
    var t = this.__get(e);
    if (t) return t;
    if (
      (this.config.groupDottedLines.length || this.config.dottedLines.length) &&
      !FamilyTree.isNEU(e) &&
      "string" == typeof e &&
      (-1 != e.indexOf("balkan_group_dotted_") ||
        -1 != e.indexOf("balkan_dotted_"))
    ) {
      var i = (e = (e = e.replace("balkan_group_dotted_", "")).replace(
        "balkan_dotted_",
        ""
      )).indexOf("_balkan_id_");
      if (((e = e.substring(i + "_balkan_id_".length)), (t = this.__get(e))))
        return t;
    }
    return null;
  }),
  (FamilyTree.prototype.__get = function (e) {
    for (var t = 0; t < this.config.nodes.length; t++)
      if (this.config.nodes[t].id == e) return this.config.nodes[t];
    return null;
  }),
  (FamilyTree.prototype.get = function (e) {
    var t = this._get(e);
    return null == t ? null : JSON.parse(JSON.stringify(t));
  }),
  (FamilyTree.prototype.canRemove = function (e) {
    var t = this.getNode(e);
    return !!t && !t.hasPartners && !t.hasAssistants;
  }),
  (FamilyTree.prototype.addChildNode = function (e, t, i) {
    this.hideTreeMenu(!1);
    var r = this;
    if (!e || (FamilyTree.isNEU(e.mid) && FamilyTree.isNEU(e.fid)))
      console.error("addSonNode invalid data");
    else {
      FamilyTree.isNEU(e.id) && (e.id = this.generateId());
      var a = { addNodesData: [e], updateNodesData: [], removeNodeId: null };
      if (!0 === i)
        if (!1 === FamilyTree.events.publish("update", [this, a])) return !1;
      r._fireUpdate_addUpdateRemove(a, i);
      var n = "";
      FamilyTree.isNEU(a.addNodesData[0].pid)
        ? FamilyTree.isNEU(a.addNodesData[0].mid)
          ? FamilyTree.isNEU(a.addNodesData[0].fid) ||
            (n = a.addNodesData[0].fid)
          : (n = a.addNodesData[0].mid)
        : (n = a.addNodesData[0].pid),
        r._draw(
          !1,
          FamilyTree.action.insert,
          { id: n, insertedNodeId: a.addNodesData[0].id },
          function () {
            r.ripple(a.addNodesData[0].id),
              t && t(),
              !0 === i && FamilyTree.events.publish("updated", [r, a]),
              r.filterUI.update();
          }
        );
    }
  }),
  (FamilyTree.prototype.addChildAndPartnerNodes = function (e, t, i, r, a) {
    this.hideTreeMenu(!1);
    var n = this;
    if (!t || (FamilyTree.isNEU(t.mid) && FamilyTree.isNEU(t.fid)))
      console.error("addChildAndPartnerNodes invalid childData");
    else if (i) {
      FamilyTree.isNEU(t.id) && (t.id = this.generateId()),
        FamilyTree.isNEU(i.id) && (i.id = this.generateId()),
        "_ft_partner" == t.mid
          ? (t.mid = i.id)
          : "_ft_partner" == t.fid && (t.fid = i.id);
      var o = [],
        l = null;
      Array.isArray(i.pids) &&
        (1 != i.pids.length &&
          console.error(
            "addChildAndPartnerNodes partnerData.pids has to have one partner"
          ),
        (l = this.get(i.pids[0])),
        Array.isArray(l.pids) || (l.pids = []),
        l.pids.push(i.id),
        o.push(l));
      var s = { addNodesData: [t, i], updateNodesData: o, removeNodeId: null };
      if (!0 === a)
        if (!1 === FamilyTree.events.publish("update", [this, s])) return !1;
      n._fireUpdate_addUpdateRemove(s, a);
      var d = n.getRecentRootsByNodeId(e);
      FamilyTree._changeRootOption(n.config.roots, d, n.manager.rootList);
      var c = "";
      l
        ? (c = l.id)
        : FamilyTree.isNEU(t.pid)
        ? FamilyTree.isNEU(t.mid)
          ? FamilyTree.isNEU(t.fid) || (c = t.fid)
          : (c = t.mid)
        : (c = t.pid),
        n._draw(!1, FamilyTree.action.update, { id: c }, function () {
          n.ripple(t.id),
            n.ripple(i.id),
            r && r(),
            !0 === a && FamilyTree.events.publish("updated", [n, s]),
            n.filterUI.update();
        }),
        !0 === a && FamilyTree.events.publish("updating", [n, s]);
    } else console.error("addChildAndPartnerNodes invalid data");
  }),
  (FamilyTree.prototype.addPartnerAndParentNodes = function (e, t, i, r, a) {
    this.hideTreeMenu(!1);
    var n = this;
    if (!FamilyTree.isNEU(t) && t.length)
      if (i) {
        FamilyTree.isNEU(i.id) && (i.id = this.generateId());
        for (var o = [], l = 0; l < t.length; l++) {
          var s = this.get(t[l]);
          if (!FamilyTree.isNEU(s.mid) && !FamilyTree.isNEU(s.fid))
            return void console.error(
              "father id (fid) or mather id (mid) has to be null or undefined"
            );
          FamilyTree.isNEU(s.mid)
            ? (s.mid = i.id)
            : FamilyTree.isNEU(s.mid) || (s.fid = i.id),
            o.push(s);
        }
        var d = null;
        Array.isArray(i.pids) &&
          (1 != i.pids.length &&
            console.error(
              "addChildAndPartnerNodes partnerData.pids has to have one partner"
            ),
          (d = this.get(i.pids[0])),
          Array.isArray(d.pids) || (d.pids = []),
          d.pids.push(i.id),
          o.push(d));
        var c = { addNodesData: [i], updateNodesData: o, removeNodeId: null };
        if (!0 === a)
          if (!1 === FamilyTree.events.publish("update", [this, c])) return !1;
        n._fireUpdate_addUpdateRemove(c, a);
        var m = n.getRecentRootsByNodeId(e);
        FamilyTree._changeRootOption(n.config.roots, m, n.manager.rootList);
        var h = "";
        d && (h = d.id),
          n._draw(!1, FamilyTree.action.update, { id: h }, function () {
            n.ripple(i.id),
              r && r(),
              !0 === a && FamilyTree.events.publish("updated", [n, c]),
              n.filterUI.update();
          }),
          !0 === a && FamilyTree.events.publish("updating", [n, c]);
      } else console.error("addPartnerAndParentNodes invalid data");
    else console.error("addPartnerAndParentNodes invalid data");
  }),
  (FamilyTree.prototype.addPartnerNode = function (e, t, i) {
    this.hideTreeMenu(!1);
    var r = this;
    if (e && Array.isArray(e.pids) && 1 == e.pids.length) {
      FamilyTree.isNEU(e.id) && (e.id = this.generateId());
      var a = this.get(e.pids[0]);
      Array.isArray(a.pids) || (a.pids = []), a.pids.push(e.id);
      var n = { removeNodeId: null, updateNodesData: [a], addNodesData: [e] };
      if (!0 === i)
        if (!1 === FamilyTree.events.publish("update", [this, n])) return !1;
      r._fireUpdate_addUpdateRemove(n, i);
      var o = r.getRecentRootsByNodeId(n.updateNodesData[0].id);
      FamilyTree._changeRootOption(r.config.roots, o, r.manager.rootList);
      var l = n.updateNodesData[0].id;
      r._draw(
        !1,
        FamilyTree.action.insert,
        { id: l, insertedNodeId: n.addNodesData[0].id },
        function () {
          r.ripple(n.addNodesData[0].id),
            t && t(),
            !0 === i && FamilyTree.events.publish("updated", [r, n]),
            r.filterUI.update();
        }
      ),
        !0 === i && FamilyTree.events.publish("updating", [r, n]);
    } else console.error("addPartnerNode invalid data");
  }),
  (FamilyTree.prototype.addParentNode = function (e, t, i, r, a) {
    this.hideTreeMenu(!1);
    var n = this;
    if (i) {
      if (["mid", "fid"].has(t))
        if (FamilyTree.isNEU(e)) console.error("addParentNode invalid childId");
        else {
          FamilyTree.isNEU(i.id) && (i.id = this.generateId());
          var o = [],
            l = this.get(e);
          (l[t] = i.id), o.push(l);
          var s = null;
          Array.isArray(i.pids) &&
            (1 != i.pids.length &&
              console.error("addParentNode: data has to have one partner"),
            (s = this.get(i.pids[0])),
            Array.isArray(s.pids) || (s.pids = []),
            s.pids.push(i.id),
            o.push(s));
          var d = { removeNodeId: null, updateNodesData: o, addNodesData: [i] };
          if (!0 === a)
            if (!1 === FamilyTree.events.publish("update", [this, d]))
              return !1;
          n._fireUpdate_addUpdateRemove(d, a);
          var c = e;
          (n.config.roots = [d.addNodesData[0].id]),
            n._draw(
              !1,
              FamilyTree.action.insert,
              { id: c, insertedNodeId: d.addNodesData[0].id },
              function () {
                n.ripple(d.addNodesData[0].id),
                  r && r(),
                  !0 === a && FamilyTree.events.publish("updated", [n, d]),
                  n.filterUI.update();
              }
            ),
            !0 === a && FamilyTree.events.publish("updating", [n, d]);
        }
      else console.error("addParentNode invalid type");
    } else console.error("addParentNode invalid data");
  }),
  (FamilyTree.prototype.canRemove = function (e) {
    var t = this.getNode(e);
    if (!t) return !1;
    var i = this.getNode(t.mid),
      r = this.getNode(t.fid),
      a = t.ftChildrenIds.length > 0,
      n = !1,
      o = t.pids.length > 0,
      l = t.pids.length > 1;
    if (1 == t.pids.length) {
      var s = this.getNode(t.pids[0]);
      n = t.ftChildrenIds.compare(s.ftChildrenIds);
    }
    return (
      !((!i && !r) || a || o) ||
      !(i || r || a || l || !o || n) ||
      !(i || r || !a || !n) ||
      !(i || r || !a || n) ||
      !(i || r || a || !n)
    );
  }),
  (FamilyTree.prototype.removeNode = function (e, t, i) {
    var r = this;
    if (this.canRemove(e)) {
      var a = this.getNode(e),
        n = [];
      if (Array.isArray(a.pids))
        for (var o = 0; o < a.pids.length; o++) {
          var l = this.get(a.pids[o]);
          if (l)
            -1 != (d = l.pids.indexOf(a.id)) &&
              (l.pids.splice(d, 1), n.push(l));
        }
      if (Array.isArray(a.ftChildrenIds))
        for (o = 0; o < a.ftChildrenIds.length; o++) {
          var s = this.get(a.ftChildrenIds[o]);
          s &&
            (s.mid == a.id
              ? ((s.mid = void 0), n.push(s))
              : s.fid == a.id && ((s.fid = void 0), n.push(s)));
        }
      var d,
        c = { removeNodeId: e, updateNodesData: n, addNodesData: [] };
      if (!0 === i)
        if (!1 === FamilyTree.events.publish("update", [this, c])) return !1;
      r._fireUpdate_addUpdateRemove(c, i),
        -1 != (d = r.config.roots.indexOf(e)) && r.config.roots.splice(d, 1),
        r._draw(!1, FamilyTree.action.update, null, function () {
          r.config.sticky &&
            FamilyTree._moveToBoundaryArea(
              r.getSvg(),
              r.getViewBox(),
              r.response.boundary
            ),
            t && t(),
            !0 === i && FamilyTree.events.publish("updated", [r, c]),
            r.filterUI.update();
        }),
        !0 === i && FamilyTree.events.publish("updating", [r, c]);
    }
  }),
  (FamilyTree.prototype.updateNode = function (e, t, i) {
    var r = this,
      a = this.getNode(e.id);
    e.pids || (e.pids = []);
    var n = [];
    n.push(e);
    for (var o = 0; o < a.pids.length; o++) {
      if (!e.pids.has(a.pids[o]))
        if ((s = this._get(a.pids[o])) && s.pids) {
          var l = s.pids.indexOf(e.id);
          -1 != l && (s.pids.splice(l, 1), n.push(e)),
            a.pids.splice(o, 1),
            n.push(s);
        }
    }
    for (o = 0; o < e.pids.length; o++) {
      var s;
      if (!a.pids || !a.pids.has(e.pids[o]))
        (s = this._get(e.pids[o])).pids || (s.pids = []),
          s.pids.push(e.pids[o]),
          n.push(s);
    }
    var d = { removeNodeId: null, updateNodesData: n, addNodesData: [] };
    if (!0 === i && !1 === FamilyTree.events.publish("update", [this, d]))
      return !1;
    r._fireUpdate_addUpdateRemove(d, i),
      r._draw(!1, FamilyTree.action.update, null, function () {
        r.config.sticky &&
          FamilyTree._moveToBoundaryArea(
            r.getSvg(),
            r.getViewBox(),
            r.response.boundary
          ),
          t && t(),
          !0 === i && FamilyTree.events.publish("updated", [r, d]),
          r.filterUI.update();
      });
  }),
  (FamilyTree.prototype._fireUpdate_addUpdateRemove = function (e, t) {
    for (var i = 0; i < e.addNodesData.length; i++) this.add(e.addNodesData[i]);
    for (i = 0; i < e.updateNodesData.length; i++)
      this.update(e.updateNodesData[i]);
    FamilyTree.isNEU(e.removeNodeId) || this.remove(e.removeNodeId),
      !0 === t && FamilyTree.events.publish("updating", [this, e]);
  }),
  (FamilyTree.prototype.__replaceIds = FamilyTree.prototype._replaceIds),
  (FamilyTree.prototype._replaceIds = function (e) {
    this.__replaceIds(e);
    for (var t = 0; t < this.config.nodes.length; t++) {
      var i = this.config.nodes[t];
      for (var r in e) {
        var a = e[r];
        if (
          (i.fid == r && (i.fid = a),
          i.mid == r && (i.mid = a),
          Array.isArray(i.pids))
        )
          for (var n = 0; n < i.pids.length; n++)
            i.pids[n] == r && (i.pids[n] = a);
      }
    }
  }),
  void 0 === FamilyTree && (FamilyTree = {}),
  (FamilyTree._ajax = function (e, t, i, r, a) {
    null == r && (r = "arraybuffer");
    var n = new XMLHttpRequest();
    (n.onload = function (e) {
      4 == n.readyState &&
        200 === this.status &&
        (null == e.target ? a(this.response) : a(e.target.response));
    }),
      (n.onerror = function (e) {
        a({ error: e });
      }),
      n.open(t, e),
      (n.responseType = r),
      n.setRequestHeader("Content-Type", "application/json"),
      null == i ? n.send() : n.send(i);
  }),
  void 0 === FamilyTree && (FamilyTree = {}),
  (FamilyTree.animate = function (e, t, i, r, a, n, o) {
    var l,
      s = 10,
      d = 1,
      c = r / s + 1;
    document.getElementsByTagName("g");
    return (
      Array.isArray(e) || (e = [e]),
      Array.isArray(t) || (t = [t]),
      Array.isArray(i) || (i = [i]),
      (l = setInterval(function () {
        for (var m = 0; m < e.length; m++)
          for (var h in i[m]) {
            var p = FamilyTree._arrayContains(
              ["top", "left", "right", "bottom", "width", "height"],
              h.toLowerCase()
            )
              ? "px"
              : "";
            switch (h.toLowerCase()) {
              case "d":
                var f =
                    a((d * s - s) / r) * (i[m][h][0] - t[m][h][0]) + t[m][h][0],
                  u =
                    a((d * s - s) / r) * (i[m][h][1] - t[m][h][1]) + t[m][h][1];
                e[m].setAttribute(
                  "d",
                  e[m].getAttribute("d") + " L" + f + " " + u
                );
                break;
              case "r":
                var y = a((d * s - s) / r) * (i[m][h] - t[m][h]) + t[m][h];
                e[m].setAttribute("r", y);
                break;
              case "x1":
                y = a((d * s - s) / r) * (i[m][h] - t[m][h]) + t[m][h];
                e[m].setAttribute("x1", y);
                break;
              case "x2":
                y = a((d * s - s) / r) * (i[m][h] - t[m][h]) + t[m][h];
                e[m].setAttribute("x2", y);
                break;
              case "y1":
                y = a((d * s - s) / r) * (i[m][h] - t[m][h]) + t[m][h];
                e[m].setAttribute("y1", y);
                break;
              case "y2":
                y = a((d * s - s) / r) * (i[m][h] - t[m][h]) + t[m][h];
                e[m].setAttribute("y2", y);
                break;
              case "rotate3d":
                if (i[m][h]) {
                  var g = t[m][h],
                    v = i[m][h],
                    T = [0, 0, 0, 0];
                  for (var b in g)
                    T[b] = a((d * s - s) / r) * (v[b] - g[b]) + g[b];
                  e[m].style.transform = "rotate3d(" + T.toString() + "deg)";
                }
                break;
              case "transform":
                if (i[m][h]) {
                  (g = t[m][h]), (v = i[m][h]), (T = [0, 0, 0, 0, 0, 0]);
                  for (var b in g)
                    T[b] = a((d * s - s) / r) * (v[b] - g[b]) + g[b];
                  e[m].hasAttribute("transform")
                    ? e[m].setAttribute(
                        "transform",
                        "matrix(" + T.toString() + ")"
                      )
                    : (e[m].style.transform = "matrix(" + T.toString() + ")");
                }
                break;
              case "viewbox":
                if (i[m][h]) {
                  (g = t[m][h]), (v = i[m][h]), (T = [0, 0, 0, 0]);
                  for (var b in g)
                    T[b] = a((d * s - s) / r) * (v[b] - g[b]) + g[b];
                  e[m].setAttribute("viewBox", T.toString());
                }
                break;
              case "margin":
                if (i[m][h]) {
                  (g = t[m][h]), (v = i[m][h]), (T = [0, 0, 0, 0]);
                  for (var b in g)
                    T[b] = a((d * s - s) / r) * (v[b] - g[b]) + g[b];
                  var F = "";
                  for (b = 0; b < T.length; b++) F += parseInt(T[b]) + "px ";
                  e[m] && e[m].style && (e[m].style[h] = F);
                }
                break;
              case "scrolly":
                y = a((d * s - s) / r) * (i[m][h] - t[m][h]) + t[m][h];
                e[m].scrollTo(0, y);
                break;
              default:
                y = a((d * s - s) / r) * (i[m][h] - t[m][h]) + t[m][h];
                e[m] && e[m].style && (e[m].style[h] = y + p);
            }
          }
        o && o(), (d += 1) > c + 1 && (clearInterval(l), n && n(e));
      }, s))
    );
  }),
  (FamilyTree.anim = {}),
  (FamilyTree.anim.inPow = function (e) {
    return e < 0 ? 0 : e > 1 ? 1 : Math.pow(e, 2);
  }),
  (FamilyTree.anim.outPow = function (e) {
    if (e < 0) return 0;
    if (e > 1) return 1;
    return -1 * (Math.pow(e - 1, 2) + -1);
  }),
  (FamilyTree.anim.inOutPow = function (e) {
    if (e < 0) return 0;
    if (e > 1) return 1;
    if ((e *= 2) < 1) return FamilyTree.anim.inPow(e, 2) / 2;
    return -0.5 * (Math.pow(e - 2, 2) + -2);
  }),
  (FamilyTree.anim.inSin = function (e) {
    return e < 0 ? 0 : e > 1 ? 1 : 1 - Math.cos(e * (Math.PI / 2));
  }),
  (FamilyTree.anim.outSin = function (e) {
    return e < 0 ? 0 : e > 1 ? 1 : Math.sin(e * (Math.PI / 2));
  }),
  (FamilyTree.anim.inOutSin = function (e) {
    return e < 0 ? 0 : e > 1 ? 1 : -0.5 * (Math.cos(Math.PI * e) - 1);
  }),
  (FamilyTree.anim.inExp = function (e) {
    return e < 0 ? 0 : e > 1 ? 1 : Math.pow(2, 10 * (e - 1));
  }),
  (FamilyTree.anim.outExp = function (e) {
    return e < 0 ? 0 : e > 1 ? 1 : 1 - Math.pow(2, -10 * e);
  }),
  (FamilyTree.anim.inOutExp = function (e) {
    return e < 0
      ? 0
      : e > 1
      ? 1
      : e < 0.5
      ? 0.5 * Math.pow(2, 10 * (2 * e - 1))
      : 0.5 * (2 - Math.pow(2, 10 * (-2 * e + 1)));
  }),
  (FamilyTree.anim.inCirc = function (e) {
    return e < 0 ? 0 : e > 1 ? 1 : -(Math.sqrt(1 - e * e) - 1);
  }),
  (FamilyTree.anim.outCirc = function (e) {
    return e < 0 ? 0 : e > 1 ? 1 : Math.sqrt(1 - (e - 1) * (e - 1));
  }),
  (FamilyTree.anim.inOutCirc = function (e) {
    return e < 0
      ? 0
      : e > 1
      ? 1
      : e < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (2 * e - 2) * (2 * e - 2)) + 1);
  }),
  (FamilyTree.anim.rebound = function (e) {
    return e < 0
      ? 0
      : e > 1
      ? 1
      : e < 1 / 2.75
      ? 1 - 7.5625 * e * e
      : e < 2 / 2.75
      ? 1 - (7.5625 * (e - 1.5 / 2.75) * (e - 1.5 / 2.75) + 0.75)
      : e < 2.5 / 2.75
      ? 1 - (7.5625 * (e - 2.25 / 2.75) * (e - 2.25 / 2.75) + 0.9375)
      : 1 - (7.5625 * (e - 2.625 / 2.75) * (e - 2.625 / 2.75) + 0.984375);
  }),
  (FamilyTree.anim.inBack = function (e) {
    return e < 0 ? 0 : e > 1 ? 1 : e * e * (2.70158 * e - 1.70158);
  }),
  (FamilyTree.anim.outBack = function (e) {
    return e < 0
      ? 0
      : e > 1
      ? 1
      : (e - 1) * (e - 1) * (2.70158 * (e - 1) + 1.70158) + 1;
  }),
  (FamilyTree.anim.inOutBack = function (e) {
    return e < 0
      ? 0
      : e > 1
      ? 1
      : e < 0.5
      ? 4 * e * e * (7.1898 * e - 2.5949) * 0.5
      : 0.5 * ((2 * e - 2) * (2 * e - 2) * (3.5949 * (2 * e - 2) + 2.5949) + 2);
  }),
  (FamilyTree.anim.impulse = function (e) {
    var t = 2 * e;
    return t * Math.exp(1 - t);
  }),
  (FamilyTree.anim.expPulse = function (e) {
    return Math.exp(-2 * Math.pow(e, 2));
  }),
  void 0 === FamilyTree && (FamilyTree = {}),
  (FamilyTree.prototype._attachInitEventHandlers = function (e) {
    this._addEvent(window, "resize", this._resizeHandler);
  }),
  (FamilyTree.prototype._attachEventHandlers = function (e) {
    if (this.config.interactive) {
      e = this.getSvg();
      this.config.enableTouch || FamilyTree.isMobile()
        ? (this._addEvent(e, "touchstart", this._globalMouseDownHandler),
          this._addEvent(e, "touchend", this._globalClickHandler))
        : (this._addEvent(e, "mousedown", this._globalMouseDownHandler),
          this._addEvent(e, "click", this._globalClickHandler),
          this._addEvent(e, "contextmenu", this._globalContextHandler),
          this._addEvent(e, "dblclick", this._globalDbClickHandler),
          this.config.mouseScrool != FamilyTree.action.none &&
            this._addEvent(e, "wheel", this._mouseScrollHandler));
      var t = this.getMenuButton();
      t && this._addEvent(t, "click", this._menuClickHandler);
    }
  }),
  (FamilyTree.prototype._addEvent = function (e, t, i, r) {
    var a, n;
    (r || (r = ""),
    e.getListenerList || (e.getListenerList = {}),
    e.getListenerList[t + r]) ||
      ((a = this),
      (n = i),
      (i = function () {
        if (n) return n.apply(a, [this, arguments[0]]);
      }),
      e.addEventListener
        ? "mousewheel" == t
          ? e.addEventListener(t, o, { passive: !1 })
          : e.addEventListener(t, o, !1)
        : e.attachEvent("on" + t, function () {
            var t = i.call(e, window.event);
            return (
              !1 === t &&
                ((window.event.returnValue = !1),
                (window.event.cancelBubble = !0)),
              t
            );
          }),
      (e.getListenerList[t + r] = o));
    function o(e) {
      var t = i.apply(this, arguments);
      return !1 === t && (e.stopPropagation(), e.preventDefault()), t;
    }
  }),
  (FamilyTree.prototype._removeEvent = function (e, t) {
    if (e.getListenerList[t]) {
      var i = e.getListenerList[t];
      e.removeEventListener(t, i, !1), delete e.getListenerList[t];
    }
  }),
  void 0 === FamilyTree && (FamilyTree = {}),
  (FamilyTree.VERSION = "8.15.33"),
  (FamilyTree.orientation = {}),
  (FamilyTree.orientation.top = 0),
  (FamilyTree.orientation.bottom = 1),
  (FamilyTree.orientation.right = 2),
  (FamilyTree.orientation.left = 3),
  (FamilyTree.orientation.top_left = 4),
  (FamilyTree.orientation.bottom_left = 5),
  (FamilyTree.orientation.right_top = 6),
  (FamilyTree.orientation.left_top = 7),
  (FamilyTree.align = {}),
  (FamilyTree.align.center = FamilyTree.CENTER = 8),
  (FamilyTree.align.orientation = FamilyTree.ORIENTATION = 9),
  (FamilyTree.attr = {}),
  (FamilyTree.attr.l = "data-l"),
  (FamilyTree.attr.id = "data-id"),
  (FamilyTree.attr.sl = "data-sl"),
  (FamilyTree.attr.lbl = "data-lbl"),
  (FamilyTree.attr.val = "data-val"),
  (FamilyTree.attr.tlbr = "data-tlbr"),
  (FamilyTree.attr.item = "data-item"),
  (FamilyTree.attr.layout = "data-layout"),
  (FamilyTree.attr.node_id = "data-n-id"),
  (FamilyTree.attr.link_id = "data-l-id"),
  (FamilyTree.attr.field_name = "data-f-name"),
  (FamilyTree.attr.c_link_to = "data-c-l-to"),
  (FamilyTree.attr.c_link_from = "data-c-l-from"),
  (FamilyTree.attr.s_link_to = "data-s-l-to"),
  (FamilyTree.attr.s_link_from = "data-s-l-from"),
  (FamilyTree.attr.control_add = "data-ctrl-add"),
  (FamilyTree.attr.control_expcoll_id = "data-ctrl-ec-id"),
  (FamilyTree.attr.control_up_id = "data-ctrl-up-id"),
  (FamilyTree.attr.control_export_menu = "data-ctrl-menu"),
  (FamilyTree.attr.control_node_menu_id = "data-ctrl-n-menu-id"),
  (FamilyTree.attr.control_node_circle_menu_id = "data-ctrl-n-c-menu-id"),
  (FamilyTree.attr.control_node_circle_menu_name = "data-ctrl-n-c-menu-name"),
  (FamilyTree.attr.control_node_circle_menu_wrraper_id =
    "data-ctrl-n-c-menu-wrapper-id"),
  (FamilyTree.attr.width = "data-width"),
  (FamilyTree.attr.text_overflow = "data-text-overflow"),
  (FamilyTree.ID = "id"),
  (FamilyTree.PID = "pid"),
  (FamilyTree.STPID = "stpid"),
  (FamilyTree.TAGS = "tags"),
  (FamilyTree.NODES = "nodes"),
  (FamilyTree.ELASTIC = "elastic"),
  (FamilyTree.ASSISTANT = "Assistant"),
  (FamilyTree.action = {}),
  (FamilyTree.action.expand = 0),
  (FamilyTree.action.collapse = 1),
  (FamilyTree.action.maximize = 101),
  (FamilyTree.action.minimize = 102),
  (FamilyTree.action.expandCollapse = 501),
  (FamilyTree.action.edit = 1),
  (FamilyTree.action.zoom = 2),
  (FamilyTree.action.ctrlZoom = 22),
  (FamilyTree.action.scroll = 41),
  (FamilyTree.action.xScroll = 3),
  (FamilyTree.action.yScroll = 4),
  (FamilyTree.action.none = 5),
  (FamilyTree.action.init = 6),
  (FamilyTree.action.update = 7),
  (FamilyTree.action.move = 70),
  (FamilyTree.action.pan = 8),
  (FamilyTree.action.centerNode = 9),
  (FamilyTree.action.resize = 10),
  (FamilyTree.action.insert = 11),
  (FamilyTree.action.insertfirst = 12),
  (FamilyTree.action.details = 13),
  (FamilyTree.action.exporting = 14),
  (FamilyTree.none = 400001),
  (FamilyTree.scroll = {}),
  (FamilyTree.scroll.visible = !0),
  (FamilyTree.scroll.smooth = 12),
  (FamilyTree.scroll.speed = 120),
  (FamilyTree.scroll.safari = { smooth: 12, speed: 250 }),
  (FamilyTree.match = {}),
  (FamilyTree.match.height = 100001),
  (FamilyTree.match.width = 100002),
  (FamilyTree.match.boundary = 100003),
  (FamilyTree.movable = {}),
  (FamilyTree.movable.node = "node"),
  (FamilyTree.movable.tree = "tree"),
  (FamilyTree.movable.detachTree = "detachTree"),
  (FamilyTree.layout = {}),
  (FamilyTree.layout.normal = FamilyTree.normal = 0),
  (FamilyTree.layout.mixed = FamilyTree.mixed = 1),
  (FamilyTree.layout.tree = FamilyTree.tree = 2),
  (FamilyTree.layout.treeLeftOffset = FamilyTree.treeLeftOffset = 3),
  (FamilyTree.layout.treeRightOffset = FamilyTree.treeRightOffset = 4),
  (FamilyTree.layout.treeLeft = 5),
  (FamilyTree.layout.treeRight = 6),
  (FamilyTree.layout.grid = -1),
  (FamilyTree.nodeOpenTag =
    "<g " +
    FamilyTree.attr.node_id +
    '="{id}" style="opacity: {opacity}" transform="matrix(1,0,0,1,{x},{y})" class="{class}" ' +
    FamilyTree.attr.sl +
    '="{sl}" ' +
    FamilyTree.attr.l +
    "={level} {lcn}>"),
  (FamilyTree.linkOpenTag =
    "<g " + FamilyTree.attr.link_id + '="[{id}][{child-id}]" class="{class}">'),
  (FamilyTree.expcollOpenTag =
    "<g " +
    FamilyTree.attr.control_expcoll_id +
    '="{id}" transform="matrix(1,0,0,1,{x},{y})"  style="cursor:pointer;">'),
  (FamilyTree.upOpenTag =
    "<g " +
    FamilyTree.attr.control_up_id +
    '="{id}" transform="matrix(1,0,0,1,{x},{y})" style="cursor:pointer;">'),
  (FamilyTree.linkFieldsOpenTag =
    '<g transform="matrix(1,0,0,1,{x},{y}) rotate({rotate})">'),
  (FamilyTree.grCloseTag = "</g>"),
  (FamilyTree.A5w = 420),
  (FamilyTree.A5h = 595),
  (FamilyTree.A4w = 595),
  (FamilyTree.A4h = 842),
  (FamilyTree.A3w = 842),
  (FamilyTree.A3h = 1191),
  (FamilyTree.A2w = 1191),
  (FamilyTree.A2h = 1684),
  (FamilyTree.A1w = 1684),
  (FamilyTree.A1h = 2384),
  (FamilyTree.Letterw = 612),
  (FamilyTree.Letterh = 791),
  (FamilyTree.Legalw = 612),
  (FamilyTree.Legalh = 1009),
  (FamilyTree.COLLAPSE_PARENT_NEIGHBORS = 1),
  (FamilyTree.COLLAPSE_SUB_CHILDRENS = 2),
  (FamilyTree.COLLAPSE_PARENT_SUB_CHILDREN_EXCEPT_CLICKED = 3),
  (FamilyTree.TEXT_THRESHOLD = 400),
  (FamilyTree.IMAGES_THRESHOLD = 100),
  (FamilyTree.LINKS_THRESHOLD = 200),
  (FamilyTree.BUTTONS_THRESHOLD = 70),
  (FamilyTree.ANIM_THRESHOLD = 50),
  (FamilyTree.IT_IS_LONELY_HERE =
    '<g transform="translate(-100, 0)" style="cursor:pointer;"  ' +
    FamilyTree.attr.control_add +
    '="control-add"><text fill="#039be5">{link}</text></g>'),
  (FamilyTree.RES = {}),
  (FamilyTree.RES.IT_IS_LONELY_HERE_LINK =
    "It's lonely here, add your first node"),
  (FamilyTree.FIRE_DRAG_NOT_CLICK_IF_MOVE = 3),
  (FamilyTree.STRING_TAGS = !1),
  (FamilyTree.MAX_NODES_MESS =
    "The trial has expired or 200 nodes limit was reached! <br /><a style='color: #039BE5;' target='_blank' href='https://balkan.app/FamilyTreeJS/Docs/Evaluation'>See more</a>"),
  (FamilyTree.OFFLINE_MESS =
    "The evaluation version requires internet connection! <br /><a style='color: #039BE5;' target='_blank' href='https://balkan.app/FamilyTreeJS/Docs/Evaluation'>See more</a>"),
  (FamilyTree.SEARCH_PLACEHOLDER = "Search... type ? to get help."),
  (FamilyTree.SEARCH_HELP_SYMBOL = "?"),
  (FamilyTree.SEARCH_CLOSE_RESULT_ON_ESCAPE_OR_CLICKOUTSIDE = !1),
  (FamilyTree.SEARCH_RESULT_LIMIT = 10),
  (FamilyTree.IMPORT_MESSAGE =
    "Choose the columns (fields) in your data file that contain the required information."),
  (FamilyTree.FIXED_POSITION_ON_CLICK = !1),
  (FamilyTree.RENDER_LINKS_BEFORE_NODES = !1),
  (FamilyTree.RENDER_CLINKS_BEFORE_NODES = !1),
  (FamilyTree.MIXED_LAYOUT_ALL_NODES = !0),
  (FamilyTree.MIXED_LAYOUT_FOR_NODES_WITH_COLLAPSED_CHILDREN = !1),
  (FamilyTree.MIXED_LAYOUT_IF_NUMBER_OF_CHILDREN_IS_MORE_THEN = 1),
  (FamilyTree.LINK_ROUNDED_CORNERS = 5),
  (FamilyTree.MOVE_STEP = 5),
  (FamilyTree.CLINK_CURVE = 1),
  (FamilyTree.MAX_DEPTH = 200),
  (FamilyTree.SCALE_FACTOR = 1.44),
  (FamilyTree.LAZY_LOADING_FACTOR = 500),
  (FamilyTree.HIDE_EDIT_FORM_ON_PAN = !0),
  (FamilyTree.LAZY_LOADING = !0),
  (FamilyTree.ARRAY_FIELDS = ["tags"]),
  (FamilyTree.CSV_DELIMITER = ","),
  (FamilyTree.EDITFORM_CLOSE_BTN =
    '<svg data-edit-from-close class="bft-edit-form-close"><path style="fill:#ffffff;" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111 C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587 c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"></path></svg>'),
  (FamilyTree.ESCAPE_HTML = !1),
  (FamilyTree.VERTICAL_CHILDREN_ASSISTANT = !1),
  (FamilyTree.EXPORT_PAGES_CUT_NODES = !1),
  (FamilyTree.RESET_MOVABLE_ONEXPANDCOLLAPSE = !1),
  "undefined" != typeof module && (module.exports = FamilyTree),
  (FamilyTree.OC_VERSION = FamilyTree.VERSION),
  (FamilyTree.VERSION = "1.09.35"),
  (FamilyTree.RENDER_LINKS_BEFORE_NODES = !0),
  (FamilyTree.ARRAY_FIELDS = ["tags", "pids"]),
  (FamilyTree._intersects = function (e, t, i) {
    var r = e.x - i.siblingSeparation / 4,
      a = e.y,
      n = e.x + e.w + i.siblingSeparation / 4,
      o = e.y;
    switch (i.orientation) {
      case FamilyTree.orientation.right:
      case FamilyTree.orientation.right_top:
      case FamilyTree.orientation.left:
      case FamilyTree.orientation.left_top:
        (r = e.x),
          (a = e.y - i.siblingSeparation / 4),
          (n = e.x),
          (o = e.y + e.h + i.siblingSeparation / 4);
    }
    var l,
      s,
      d,
      c = t.p,
      m = t.q,
      h = t.r,
      p = t.s;
    return (
      0 !== (l = (n - r) * (p - m) - (h - c) * (o - a)) &&
      ((s = ((a - o) * (h - r) + (n - r) * (p - a)) / l),
      0 < (d = ((p - m) * (h - r) + (c - h) * (p - a)) / l) &&
        d < 1 &&
        0 < s &&
        s < 1)
    );
  }),
  (FamilyTree._addPoint = function (e, t, i, r, a) {
    switch (i.orientation) {
      case FamilyTree.orientation.top:
      case FamilyTree.orientation.top_left:
        return FamilyTree._addPointTop(e, t, i, r, a);
      case FamilyTree.orientation.bottom:
      case FamilyTree.orientation.bottom_left:
        return FamilyTree._addPointBottom(e, t, i, r, a);
      case FamilyTree.orientation.left:
      case FamilyTree.orientation.left_top:
        return FamilyTree._addPointLeft(e, t, i, r, a);
      case FamilyTree.orientation.right:
      case FamilyTree.orientation.right_top:
        return FamilyTree._addPointRight(e, t, i, r, a);
    }
  }),
  (FamilyTree._addPointTop = function (e, t, i, r, a) {
    var n, o, l;
    return (
      "left" == a
        ? (n = e.leftNeighbor
            ? e.x + (e.leftNeighbor.x + e.leftNeighbor.w - e.x) / 2
            : e.x - i.siblingSeparation / 2)
        : "right" == a &&
          (n = e.rightNeighbor
            ? e.x + e.w + (e.rightNeighbor.x - (e.x + e.w)) / 2
            : e.x + e.w + i.siblingSeparation / 2),
      t.push([n, t[t.length - 1][1]]),
      t.push([n, e.y - i.levelSeparation / 3]),
      (o = t[t.length - 1][1]),
      (l = n),
      (r.p = n),
      (r.q = o),
      (r.r = l),
      r
    );
  }),
  (FamilyTree._addPointBottom = function (e, t, i, r, a) {
    var n, o, l;
    return (
      "left" == a
        ? (n = e.leftNeighbor
            ? e.x + (e.leftNeighbor.x + e.leftNeighbor.w - e.x) / 2
            : e.x - i.siblingSeparation / 2)
        : "right" == a &&
          (n = e.rightNeighbor
            ? e.x + e.w + (e.rightNeighbor.x - (e.x + e.w)) / 2
            : e.x + e.w + i.siblingSeparation / 2),
      t.push([n, t[t.length - 1][1]]),
      t.push([n, e.y + e.h + i.levelSeparation / 3]),
      (o = t[t.length - 1][1]),
      (l = n),
      (r.p = n),
      (r.q = o),
      (r.r = l),
      r
    );
  }),
  (FamilyTree._addPointLeft = function (e, t, i, r, a) {
    var n,
      o = t[t.length - 1][0];
    "bottom" == a
      ? (n = e.rightNeighbor
          ? e.y + e.h + (e.rightNeighbor.y - (e.y + e.h)) / 2
          : e.y + e.h + i.siblingSeparation / 2)
      : "top" == a &&
        (n = e.leftNeighbor
          ? e.y + (e.leftNeighbor.y + e.leftNeighbor.h - e.y) / 2
          : e.y - i.siblingSeparation / 2),
      t.push([t[t.length - 1][0], n]),
      t.push([e.x - i.levelSeparation / 3, n]),
      (o = t[t.length - 1][0]);
    var l = n;
    return (r.p = o), (r.q = n), (r.s = l), r;
  }),
  (FamilyTree._addPointRight = function (e, t, i, r, a) {
    var n,
      o = t[t.length - 1][0];
    "bottom" == a
      ? (n = e.rightNeighbor
          ? e.y + e.h + (e.rightNeighbor.y - (e.y + e.h)) / 2
          : e.y + e.h + i.siblingSeparation / 2)
      : "top" == a &&
        (n = e.leftNeighbor
          ? e.y + (e.leftNeighbor.y + e.leftNeighbor.h - e.y) / 2
          : e.y - i.siblingSeparation / 2),
      t.push([t[t.length - 1][0], n]),
      t.push([e.x + e.w + i.levelSeparation / 3, n]),
      (o = t[t.length - 1][0]);
    var l = n;
    return (r.p = o), (r.q = n), (r.s = l), r;
  }),
  (FamilyTree.editUI = function () {}),
  (FamilyTree.editUI.prototype.init = function (e) {
    (this.obj = e), (this.fields = null), (this._event_id = FamilyTree._guid());
  }),
  (FamilyTree.editUI.prototype.on = function (e, t) {
    return FamilyTree.events.on(e, t, this._event_id), this;
  }),
  (FamilyTree.editUI.prototype.show = function (e, t, i) {
    if ((this.hide(), !1 === FamilyTree.events.publish("show", [this, e])))
      return !1;
    var r = this,
      a = this.content(e, t, i);
    this.obj.element.appendChild(a.element),
      FamilyTree.input.init(this.obj.element),
      i
        ? t || this._focusElement(a.focusId)
        : (this.interval = FamilyTree.animate(
            a.element,
            { right: -20, opacity: 0 },
            { right: 0, opacity: 1 },
            300,
            FamilyTree.anim.outSin,
            function () {
              t || r._focusElement(a.focusId);
            }
          )),
      this.obj.element
        .querySelector("[data-edit-from-close]")
        .addEventListener("click", function (t) {
          t.preventDefault(),
            !1 !== FamilyTree.events.publish("cancel", [r, { id: e }]) &&
              r.hide();
        }),
      this.obj.element
        .querySelector("[data-edit-from-cancel]")
        .addEventListener("click", function (t) {
          t.preventDefault(),
            !1 !== FamilyTree.events.publish("cancel", [r, { id: e }]) &&
              r.hide();
        }),
      this.obj.element
        .querySelector("[data-edit-from-save]")
        .addEventListener("click", function (t) {
          t.preventDefault();
          var i = FamilyTree.input.validateAndGetData(a.element);
          if (!1 !== i) {
            var n = r.obj.get(e),
              o = { data: FamilyTree.mergeDeep(n, i) };
            if (!1 === FamilyTree.events.publish("save", [r, o])) return;
            r.obj.updateNode(o.data, null, !0), r.hide();
          }
        });
    for (
      var n = this.obj.element.querySelectorAll("[data-input-btn]"), o = 0;
      o < n.length;
      o++
    ) {
      n[o].addEventListener("click", function (t) {
        t.preventDefault(),
          FamilyTree.events.publish("element-btn-click", [
            r,
            {
              input: this.parentNode.querySelector("input"),
              nodeId: e,
              event: t,
            },
          ]);
      });
    }
    this.obj.element
      .querySelector("[data-add-more-fields-btn]")
      .addEventListener("click", function (e) {
        e.stopPropagation(), e.preventDefault();
        var t = this,
          i = FamilyTree.elements.textbox(
            {},
            {
              type: "textbox",
              label: r.obj.config.editForm.addMoreFieldName,
              btn: r.obj.config.editForm.addMoreBtn,
            },
            "280px"
          );
        t.parentNode.insertAdjacentHTML("beforebegin", i.html),
          (t.style.display = "none"),
          FamilyTree.input.init(t.parentNode.previousSibling);
        var a = document.getElementById(i.id);
        a.focus(),
          a.nextElementSibling.addEventListener("click", function (e) {
            e.stopPropagation(), e.preventDefault();
            var i = a.value,
              n = r.obj.element.querySelector(
                '[data-binding="' +
                  FamilyTree._escapeDoubleQuotes(a.value) +
                  '"]'
              );
            if (FamilyTree.isNEU(i) || n) a.focus();
            else {
              var o = FamilyTree.elements.textbox(
                {},
                { type: "textbox", label: i, binding: i },
                "280px"
              );
              a.parentNode.parentNode.parentNode.removeChild(
                a.parentNode.parentNode
              ),
                t.parentNode.insertAdjacentHTML("beforebegin", o.html),
                (t.style.display = ""),
                FamilyTree.input.init(t.parentNode.previousSibling),
                document.getElementById(o.id).focus();
            }
          });
      }),
      this.obj.element
        .querySelector("[data-bft-edit-from-btns]")
        .addEventListener("click", function (t) {
          for (
            var i = t.target;
            i && i.hasAttribute && !i.hasAttribute("data-edit-from-btn");

          )
            i = i.parentNode;
          if (i && i.hasAttribute) {
            var n = i.getAttribute("data-edit-from-btn"),
              o = {
                button: r.obj.config.editForm.buttons[n],
                name: n,
                nodeId: e,
                event: t,
              };
            if (!1 === FamilyTree.events.publish("button-click", [r, o]))
              return !1;
            switch (n) {
              case "edit":
                r.obj.editUI.show(e, !1, !0);
                break;
              case "pdf":
                r.obj.exportPDFProfile({ id: e, filename: a.title }), r.hide();
                break;
              case "png":
                r.obj.exportPNGProfile({ id: e, filename: a.title }), r.hide();
                break;
              case "share":
                r.obj.shareProfile(e);
                break;
              case "remove":
                r.obj.removeNode(e, null, !0), r.hide();
            }
          }
        });
  }),
  (FamilyTree.editUI.prototype._focusElement = function (e) {
    var t = null;
    FamilyTree.isNEU(this.obj.config.editForm.focusBinding)
      ? FamilyTree.isNEU(e) || (t = document.getElementById(e))
      : (t = this.obj.element.querySelector(
          '[data-binding="' + this.obj.config.editForm.focusBinding + '"]'
        )),
      t &&
        (t.value &&
          t.value.length &&
          t.setSelectionRange(t.value.length, t.value.length),
        t.focus());
  }),
  (FamilyTree.editUI.prototype.setAvatar = function (e) {
    var t = this.obj.element.querySelector("#bft-avatar");
    FamilyTree.isNEU(e)
      ? (t.innerHTML = FamilyTree.icon.user(150, 150, "#8C8C8C", 0, 0))
      : (t.innerHTML = `<img style="width: 100%;height:100%;object-fit:cover;border-radius: 50%;" src="${e}"></img>`);
  }),
  (FamilyTree.editUI.prototype.content = function (e, t, i, r, a) {
    var n,
      o = this.obj.config.editForm.readOnly,
      l = JSON.parse(JSON.stringify(this.obj.config.editForm.elements)),
      s = this.obj.config.editForm.addMore,
      d = this.obj.config.editForm.saveAndCloseBtn,
      c = this.obj.config.editForm.cancelBtn,
      m = this.obj.config.editForm.buttons,
      h = this.obj.config.editForm.titleBinding,
      p = this.obj.config.editForm.photoBinding,
      f = this.obj.getNode(e),
      u = this.obj._get(e),
      y = FamilyTree.t(f.templateName, f.min, this.obj.getScale()),
      g = u[h],
      v = u[p];
    if (this.obj.config.editForm.generateElementsFromFields)
      for (var T = 0; T < this.fields.length; T++) {
        var b = this.fields[T];
        if ("tags" != b) {
          for (var F = !1, x = 0; x < l.length; x++) {
            if (Array.isArray(l[x])) {
              for (var _ = 0; _ < l[x].length; _++)
                if (b == l[x][_].binding) {
                  F = !0;
                  break;
                }
            } else if (b == l[x].binding) {
              F = !0;
              break;
            }
            if (F) break;
          }
          F || l.push({ type: "textbox", label: b, binding: b });
        }
      }
    FamilyTree.isNEU(g) && (g = ""),
      (v = FamilyTree.isNEU(v)
        ? FamilyTree.icon.user(150, 150, "#8C8C8C", 0, 0)
        : `<img style="width: 100%;height:100%;border-radius: 50%;object-fit:cover;" src="${v}"></img>`);
    var w = !t,
      k = t ? "display:none;" : "",
      S = t || !s ? "display:none;" : "",
      C = y.editFormHeaderColor
        ? `style="background-color:${y.editFormHeaderColor};"`
        : "",
      I = document.createElement("form");
    if (
      (I.setAttribute("data-bft-edit-form", ""),
      I.classList.add("bft-edit-form"),
      I.classList.add(this.obj.config.mode),
      I.classList.add(f.templateName),
      I.classList.add(FamilyTree.ui._defsIds[f.templateName]),
      Array.isArray(f.tags) && f.tags.length)
    )
      for (T = 0; T < f.tags.length; T++) I.classList.add(f.tags[T]);
    (I.style.display = "flex"),
      (I.style.opacity = i ? 1 : 0),
      (I.style.right = i ? 0 : "-20px"),
      r && (I.style.width = r);
    var N = [],
      A = a ? "" : FamilyTree.EDITFORM_CLOSE_BTN;
    return (
      (I.innerHTML = `<div>\n                        <div class="bft-edit-form-header" ${C}>\n                            ${A}\n                            ${FamilyTree.editUI.renderHeaderContent(
        g,
        v,
        f,
        u
      )}\n                        </div>\n                        <div data-bft-edit-from-btns class="bft-edit-form-instruments">\n                        ${(function () {
        if (a) return "";
        var e = "";
        for (var i in m) {
          var r = m[i];
          FamilyTree.isNEU(r) ||
            (w && r.hideIfEditMode) ||
            (t && r.hideIfDetailsMode) ||
            (o && "Edit" == r.text) ||
            (e += `<div data-edit-from-btn='${i}' class="bft-img-button" ${C} title="${r.text}">${r.icon}</div>`);
        }
        return e;
      })()}    \n                        </div>\n                    </div>\n                    <div class="bft-edit-form-fields">\n                        <div class="bft-edit-form-fields-inner">\n                            <div class="bft-form-fieldset">\n                                ${(function () {
        for (var e = "", i = 0; i < l.length; i++) {
          var r = l[i];
          if (Array.isArray(r)) {
            e += '<div class="bft-form-field-100 bft-form-fieldset">';
            for (var a = 0; a < r.length; a++) {
              var o = r[a],
                s = FamilyTree.elements[o.type](u, o, "unset", t);
              !FamilyTree.isNEU(s.id) &&
                FamilyTree.isNEU(n) &&
                FamilyTree.isNEU(s.value) &&
                (n = s.id),
                FamilyTree.isNEU(s.value) || N.push(`${o.label}: ${s.value}`),
                (e += s.html);
            }
            e += "</div>";
          } else {
            s = FamilyTree.elements[r.type](u, r, "280px", t);
            !FamilyTree.isNEU(s.id) &&
              FamilyTree.isNEU(n) &&
              FamilyTree.isNEU(s.value) &&
              (n = s.id),
              FamilyTree.isNEU(s.value) || N.push(`${r.label}: ${s.value}`),
              (e += s.html);
          }
        }
        return e;
      })()}\n\n                                <div class="bft-form-field" style="min-width: 280px; text-align:center; ${S}">\n                                    <a data-add-more-fields-btn href="#" class="bft-link">${s}</a>\n                                </div>\n                            </div>        \n                        </div>\n                    </div>\n                    <div class="bft-form-fieldset" style="padding: 14px 10px; ${k}">\n                        <div class="bft-form-field" style="min-width: initial;">\n                            <button data-edit-from-cancel type="button" class="bft-button transparent">${c}</button>\n                        </div>\n                        <div class="bft-form-field" style="min-width: initial;">\n                            <button type="submit" data-edit-from-save type="button" class="bft-button">${d}</button>\n                        </div>\n                    </div>`),
      { element: I, focusId: n, title: g, shareText: N.join("\n") }
    );
  }),
  (FamilyTree.editUI.prototype.hide = function () {
    if (!1 === FamilyTree.events.publish("hide", [this])) return !1;
    FamilyTree.isNEU(this.interval) &&
      (clearInterval(this.interval), (this.interval = null));
    var e = this.obj.element.querySelector("[data-bft-edit-form]");
    e && e.parentNode && e.parentNode.removeChild(e);
  }),
  (FamilyTree.editUI.renderHeaderContent = function (e, t, i, r) {
    return `<h1 class="bft-edit-form-title">${FamilyTree._escapeGreaterLessSign(
      e
    )}</h1>\n                <div id="bft-avatar" class="bft-edit-form-avatar">${t}</div>`;
  }),
  (FamilyTree.prototype.getSvg = function () {
    var e = this.element.getElementsByTagName("svg");
    return e && e.length ? e[0] : null;
  }),
  (FamilyTree.prototype.getPointerElement = function () {
    return this.element.querySelector("g[data-pointer]");
  }),
  (FamilyTree.prototype.getNodeElement = function (e) {
    return this.element.querySelector(
      "[" + FamilyTree.attr.node_id + "='" + e + "']"
    );
  }),
  (FamilyTree.prototype.getMenuButton = function () {
    return this.element.querySelector(
      "[" + FamilyTree.attr.control_export_menu + "]"
    );
  }),
  (FamilyTree.menuUI = function () {}),
  (FamilyTree.menuUI.prototype.init = function (e, t) {
    (this.obj = e),
      (this.wrapper = null),
      (this.menu = t),
      (this._event_id = FamilyTree._guid());
  }),
  (FamilyTree.menuUI.prototype.showStickIn = function (e, t, i, r) {
    this._show(e, null, t, i, r);
  }),
  (FamilyTree.menuUI.prototype.show = function (e, t, i, r, a) {
    this._show(e, t, i, r, a);
  }),
  (FamilyTree.menuUI.prototype._show = function (e, t, i, r, a) {
    var n = this;
    this.hide();
    var o = "";
    a || (a = this.menu);
    var l = { firstNodeId: i, secondNodeId: r, menu: a };
    if (!1 === FamilyTree.events.publish("show", [this, l])) return !1;
    for (var s in (a = l.menu)) {
      var d = a[s].icon,
        c = a[s].text;
      void 0 === d &&
        (d = FamilyTree.icon[s] ? FamilyTree.icon[s](24, 24, "#7A7A7A") : ""),
        "function" == typeof c && (c = c()),
        "function" == typeof d && (d = d()),
        (o +=
          "<div " +
          FamilyTree.attr.item +
          '="' +
          s +
          '">' +
          d +
          "<span>&nbsp;&nbsp;" +
          c +
          "</span></div>");
    }
    if ("" != o) {
      if (
        ((this.wrapper = document.createElement("div")),
        (this.wrapper.className = "bft-family-menu"),
        (this.wrapper.style.left = "-99999px"),
        (this.wrapper.style.top = "-99999px"),
        (this.wrapper.innerHTML = o),
        this.obj.element.appendChild(this.wrapper),
        null == t)
      ) {
        var m = FamilyTree._menuPosition(e, this.wrapper, this.obj.getSvg());
        (e = m.x), (t = m.y);
      }
      var h = e + 45;
      (this.wrapper.style.left = h + "px"),
        (this.wrapper.style.top = t + "px"),
        (this.wrapper.style.left = h - this.wrapper.offsetWidth + "px");
      var p = e - this.wrapper.offsetWidth;
      FamilyTree.animate(
        this.wrapper,
        { opacity: 0, left: h - this.wrapper.offsetWidth },
        { opacity: 1, left: p },
        300,
        FamilyTree.anim.inOutPow
      );
      for (
        var f = this.wrapper.getElementsByTagName("div"), u = 0;
        u < f.length;
        u++
      ) {
        (s = f[u]).addEventListener("click", function (e) {
          var t,
            o = this.getAttribute(FamilyTree.attr.item);
          if (void 0 === a[o].onClick)
            if ("add" === o) {
              var l = { id: n.obj.generateId(), pid: i };
              n.obj.addNode(l, null, !0);
            } else if ("edit" === o) {
              var s = n.obj.getNode(i);
              n.obj.editUI.show(s.id);
            } else if ("details" === o) {
              s = n.obj.getNode(i);
              n.obj.editUI.show(s.id, !0);
            } else
              "remove" === o
                ? n.obj.removeNode(i, null, !0)
                : "svg" === o
                ? n.obj.exportSVG({
                    filename: "FamilyTree.svg",
                    expandChildren: !1,
                    nodeId: i,
                  })
                : "pdf" === o
                ? n.obj.exportPDF({
                    filename: "FamilyTree.pdf",
                    expandChildren: !1,
                    nodeId: i,
                  })
                : "png" === o
                ? n.obj.exportPNG({
                    filename: "FamilyTree.png",
                    expandChildren: !1,
                    nodeId: i,
                  })
                : "csv" === o
                ? n.obj.exportCSV({ nodeId: i })
                : "xml" === o
                ? n.obj.exportXML({ nodeId: i })
                : "json" === o && n.obj.exportJSON({ nodeId: i });
          else t = a[o].onClick.call(n.obj, i, r);
          0 != t && n.hide();
        });
      }
    }
  }),
  (FamilyTree.menuUI.prototype.isVisible = function () {
    return null != this.wrapper;
  }),
  (FamilyTree.menuUI.prototype.hide = function () {
    null != this.wrapper &&
      (this.obj.element.removeChild(this.wrapper), (this.wrapper = null));
  }),
  (FamilyTree.menuUI.prototype.on = function (e, t) {
    return FamilyTree.events.on(e, t, this._event_id), this;
  }),
  (FamilyTree.circleMenuUI = function () {}),
  (FamilyTree.circleMenuUI.prototype.init = function (e, t) {
    (this.obj = e),
      (this.menu = t),
      (this._menu = null),
      (this._buttonsInterval = []),
      (this._linesInterval = []),
      (this._event_id = FamilyTree._guid());
  }),
  (FamilyTree.circleMenuUI.prototype.show = function (e, t) {
    this._show(e, t);
  }),
  (FamilyTree.circleMenuUI.prototype._show = function (e, t) {
    var i = this,
      r = this.obj.getNode(e),
      a = FamilyTree.t(r.templateName, r.min, this.obj.getScale());
    if (!FamilyTree.isNEU(a.nodeCircleMenuButton)) {
      var n = this.obj.getSvg(),
        o = this.obj.element.querySelector(
          "[" + FamilyTree.attr.control_node_circle_menu_id + '="' + e + '"]'
        ),
        l = this.obj.getNodeElement(e),
        s = FamilyTree._getTransform(o),
        d = FamilyTree._getTransform(l),
        c = s[4] + d[4],
        m = s[5] + d[5],
        h = o.querySelectorAll("line"),
        p = this.obj.element.querySelector(
          "[" + FamilyTree.attr.control_node_circle_menu_wrraper_id + "]"
        );
      if (
        FamilyTree.isNEU(p) ||
        p.getAttribute(FamilyTree.attr.control_node_circle_menu_wrraper_id) != e
      ) {
        this.hide(), t || (t = this.menu);
        var f = { nodeId: e, menu: t },
          u = FamilyTree.events.publish("show", [this, f]);
        if (((this._menu = t), !1 === u)) return !1;
        for (
          var y = 0,
            g = Object.keys(f.menu).length,
            v = 2 * a.nodeCircleMenuButton.radius + 4,
            T = 2 * Math.PI * v,
            b = T / g - (2 * a.nodeCircleMenuButton.radius + 2);
          b < 0;

        )
          (v += 8),
            (b =
              (T = 2 * Math.PI * v) / g -
              (2 * a.nodeCircleMenuButton.radius + 2));
        for (var F in ((p = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        )).setAttribute(FamilyTree.attr.control_node_circle_menu_wrraper_id, e),
        p.setAttribute("transform", "matrix(1,0,0,1," + c + "," + m + ")"),
        n.appendChild(p),
        f.menu)) {
          var x = f.menu[F].icon,
            _ = f.menu[F].color,
            w = f.menu[F].text;
          "function" == typeof x && (x = x()),
            "function" == typeof _ && (_ = _()),
            "function" == typeof w && (w = w());
          var k = document.createElementNS("http://www.w3.org/2000/svg", "g");
          k.setAttribute("transform", "matrix(1,0,0,1,0,0)"),
            k.setAttribute(FamilyTree.attr.control_node_circle_menu_name, F),
            (k.style.cursor = "pointer");
          var S = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "title"
          );
          FamilyTree.isNEU(w) || (S.innerHTML = w);
          var C = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          C.setAttribute("cx", 0),
            C.setAttribute("cy", 0),
            C.setAttribute("r", a.nodeCircleMenuButton.radius),
            C.setAttribute("fill", _),
            C.setAttribute("stroke-width", "1"),
            C.setAttribute("stroke", a.nodeCircleMenuButton.stroke),
            k.appendChild(C),
            k.appendChild(S),
            (k.innerHTML += x),
            p.appendChild(k);
          var I = k.getElementsByTagName("svg")[0];
          if ((I.setAttribute("pointer-events", "none"), I)) {
            var N = parseInt(I.getAttribute("width")),
              A = parseInt(I.getAttribute("height"));
            I.setAttribute("x", -N / 2), I.setAttribute("y", -A / 2);
          }
          var L = (y * Math.PI) / (g / 2);
          y++;
          var E = Math.cos(L) * v,
            M = Math.sin(L) * v;
          this._buttonsInterval.push(
            FamilyTree.animate(
              k,
              { transform: [1, 0, 0, 1, 0, 0] },
              { transform: [1, 0, 0, 1, E, M] },
              250,
              FamilyTree.anim.outBack,
              function (e) {
                var t = e[0].getAttribute(
                    FamilyTree.attr.control_node_circle_menu_name
                  ),
                  r = e[0].parentNode.getAttribute(
                    FamilyTree.attr.control_node_circle_menu_wrraper_id
                  );
                e[0].addEventListener("mouseenter", function (e) {
                  FamilyTree.events.publish("mouseenter", [
                    i,
                    { from: r, menuItem: f.menu[t], menuItemName: t, event: e },
                  ]);
                }),
                  e[0].addEventListener("mouseout", function (e) {
                    FamilyTree.events.publish("mouseout", [
                      i,
                      {
                        from: r,
                        menuItem: f.menu[t],
                        menuItemName: t,
                        event: e,
                      },
                    ]);
                  });
              }
            )
          );
        }
        this._linesInterval.push(
          FamilyTree.animate(
            h[0],
            {
              x1: -a.nodeCircleMenuButton.radius / 2,
              y1: -6,
              x2: a.nodeCircleMenuButton.radius / 2,
              y2: -6,
            },
            { x1: -7, y1: -7, x2: 7, y2: 7 },
            500,
            FamilyTree.anim.inOutSin
          )
        ),
          this._linesInterval.push(
            FamilyTree.animate(
              h[1],
              {
                x1: -a.nodeCircleMenuButton.radius / 2,
                y1: 0,
                x2: a.nodeCircleMenuButton.radius / 2,
                y2: 0,
              },
              { x1: 0, y1: 0, x2: 0, y2: 0 },
              500,
              FamilyTree.anim.inOutSin
            )
          ),
          this._linesInterval.push(
            FamilyTree.animate(
              h[2],
              {
                x1: -a.nodeCircleMenuButton.radius / 2,
                y1: 6,
                x2: a.nodeCircleMenuButton.radius / 2,
                y2: 6,
              },
              { x1: -7, y1: 7, x2: 7, y2: -7 },
              500,
              FamilyTree.anim.inOutSin
            )
          );
      } else this.hide();
    }
  }),
  (FamilyTree.circleMenuUI.prototype.hide = function () {
    for (var e = this._buttonsInterval.length - 1; e >= 0; e--)
      clearInterval(this._buttonsInterval[e]),
        this._buttonsInterval.splice(e, 1);
    this._buttonsInterval = [];
    for (e = this._linesInterval.length - 1; e >= 0; e--)
      clearInterval(this._linesInterval[e]), this._linesInterval.splice(e, 1);
    this._linesInterval = [];
    var t = this.obj.element.querySelector(
      "[" + FamilyTree.attr.control_node_circle_menu_wrraper_id + "]"
    );
    if (null != t) {
      var i = t.getAttribute(
          FamilyTree.attr.control_node_circle_menu_wrraper_id
        ),
        r = this.obj.getNode(i),
        a = FamilyTree.t(r.templateName, r.min, this.obj.getScale()),
        n = this.obj.element
          .querySelector(
            "[" + FamilyTree.attr.control_node_circle_menu_id + '="' + i + '"]'
          )
          .querySelectorAll("line");
      n[0].setAttribute("x1", -a.nodeCircleMenuButton.radius / 2),
        n[0].setAttribute("x2", a.nodeCircleMenuButton.radius / 2),
        n[0].setAttribute("y1", -6),
        n[0].setAttribute("y2", -6),
        n[1].setAttribute("x1", -a.nodeCircleMenuButton.radius / 2),
        n[1].setAttribute("x2", a.nodeCircleMenuButton.radius / 2),
        n[1].setAttribute("y1", 0),
        n[1].setAttribute("y2", 0),
        n[2].setAttribute("x1", -a.nodeCircleMenuButton.radius / 2),
        n[2].setAttribute("x2", a.nodeCircleMenuButton.radius / 2),
        n[2].setAttribute("y1", 6),
        n[2].setAttribute("y2", 6),
        t.parentElement.removeChild(t),
        (t = null);
    }
  }),
  (FamilyTree.circleMenuUI.prototype.on = function (e, t) {
    return FamilyTree.events.on(e, t, this._event_id), this;
  }),
  void 0 === FamilyTree && (FamilyTree = {}),
  (FamilyTree.idb = {
    version: 1,
    dbName: "BALKAN",
    tableName: "familytree-js",
    keyPath: "id",
  }),
  (FamilyTree.idb.db = null),
  (FamilyTree.idb._open = function (e) {
    if (FamilyTree._browser().msie) e && e(!1);
    else if (
      (navigator.userAgent.toLowerCase().indexOf("safari") > 0 ||
        navigator.userAgent.toLowerCase().indexOf("firefox") > 0) &&
      window.location !== window.parent.location
    )
      e && e(!1);
    else {
      if (!window.indexedDB)
        return (
          console.error(
            "Your browser doesn't support a stable version of IndexedDB."
          ),
          void (e && e(!1))
        );
      if (null == FamilyTree.idb.db) {
        var t = indexedDB.open(FamilyTree.idb.dbName, FamilyTree.idb.version);
        (t.onerror = function (t) {
          console.error("Cannot open database!"), e && e(!1);
        }),
          (t.onsuccess = function (t) {
            (FamilyTree.idb.db = t.target.result), e && e(!0);
          }),
          (t.onupgradeneeded = function (e) {
            var t = e.target.result;
            t.objectStoreNames.contains(FamilyTree.idb.tableName) &&
              t.deleteObjectStore(FamilyTree.idb.tableName);
            t.createObjectStore(FamilyTree.idb.tableName, {
              keyPath: FamilyTree.idb.keyPath,
            });
          });
      } else e && e(!0);
    }
  }),
  (FamilyTree.idb.read = function (e, t) {
    FamilyTree.idb._open(function (i) {
      if (i) {
        var r = FamilyTree.idb.db
          .transaction([FamilyTree.idb.tableName])
          .objectStore(FamilyTree.idb.tableName)
          .get(e);
        (r.onerror = function (e) {
          console.error("Unable to retrieve data from database!"), t && t(!1);
        }),
          (r.onsuccess = function (e) {
            r.result ? t && t(!0, r.result) : t && t(null);
          });
      } else t && t(!1);
    });
  }),
  (FamilyTree.idb.write = function (e, t) {
    FamilyTree.idb.read(e.id, function (i) {
      if (null == i) {
        var r = FamilyTree.idb.db
          .transaction([FamilyTree.idb.tableName], "readwrite")
          .objectStore(FamilyTree.idb.tableName)
          .add(e);
        (r.onerror = function (e) {
          console.error("Unable to add data to database!"), t && t(!1);
        }),
          (r.onsuccess = function (e) {
            t && t(!0);
          });
      } else t && t(i);
    });
  }),
  (FamilyTree.idb.put = function (e, t) {
    FamilyTree.idb._open(function (i) {
      if (i) {
        var r = FamilyTree.idb.db
          .transaction([FamilyTree.idb.tableName], "readwrite")
          .objectStore(FamilyTree.idb.tableName)
          .put(e);
        (r.onerror = function (e) {
          console.error("Unable to put data to database!"), t && t(!1);
        }),
          (r.onsuccess = function (e) {
            t && t(!0);
          });
      } else t && t(!1);
    });
  }),
  (FamilyTree.idb.delete = function (e, t) {
    FamilyTree.idb._open(function (i) {
      if (i) {
        var r = FamilyTree.idb.db
          .transaction([FamilyTree.idb.tableName], "readwrite")
          .objectStore(FamilyTree.idb.tableName)
          .delete(e);
        (r.onerror = function (e) {
          console.error("Unable to retrieve data from database!"), t && t(!1);
        }),
          (r.onsuccess = function (e) {
            r.error ? t && t(!1) : t && t(!0);
          });
      } else t && t(!1);
    });
  }),
  (FamilyTree.toolbarUI = function () {}),
  (FamilyTree.toolbarUI.expandAllIcon =
    '<svg style="margin-bottom:7px;box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#757575" /></marker><line x1="11" y1="11" x2="6" y2="6" stroke="#757575" stroke-width="2" marker-end="url(#arrow)" /><line x1="21" y1="11" x2="26" y2="6" stroke="#757575" stroke-width="2" marker-end="url(#arrow)" /><line x1="21" y1="21" x2="26" y2="26" stroke="#757575" stroke-width="2" marker-end="url(#arrow)" /><line x1="11" y1="21" x2="6" y2="26" stroke="#757575" stroke-width="2" marker-end="url(#arrow)" /><rect x="12" y="12" width="8" height="8" fill="#757575"></rect></svg>'),
  (FamilyTree.toolbarUI.fitIcon =
    '<svg  style="margin-bottom:7px;box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><path stroke-width="3" fill="none" stroke="#757575" d="M4,11 L4,4 L11,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,11 L28,4 L21,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,21 L28,28 L21,28"></path><path stroke-width="3" fill="none" stroke="#757575" d="M4,21 L4,28 L11,28"></path><circle cx="16" cy="16" r="5" fill="#757575"></circle></svg>'),
  (FamilyTree.toolbarUI.openFullScreenIcon =
    '<svg  style="margin-bottom:7px;box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><path stroke-width="3" fill="none" stroke="#757575" d="M4,11 L4,4 L11,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,11 L28,4 L21,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,21 L28,28 L21,28"></path><path stroke-width="3" fill="none" stroke="#757575" d="M4,21 L4,28 L11,28"></path><line x1="5" y1="5" x2="27" y2="27" stroke-width="3" stroke="#757575"></line><line x1="5" y1="27" x2="27" y2="5" stroke-width="3" stroke="#757575"></line></svg>'),
  (FamilyTree.toolbarUI.closeFullScreenIcon =
    '<svg  style="margin-bottom:7px;box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><path stroke-width="3" fill="none" stroke="#757575" d="M4,11 L4,4 L11,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,11 L28,4 L21,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,21 L28,28 L21,28"></path><path stroke-width="3" fill="none" stroke="#757575" d="M4,21 L4,28 L11,28"></path><rect x="11" y="11" width="10" height="10" stroke-width="3" fill="none" stroke="#757575" ></rect></svg>'),
  (FamilyTree.toolbarUI.zoomInIcon =
    '<svg style="box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border-left: 1px solid #cacaca; border-right: 1px solid #cacaca; border-top: 1px solid #cacaca; background-color: #f9f9f9;display: block; cursor: pointer;" width="32px" height="32px" ><g><rect fill="#f9f9f9" x="0" y="0" width="32" height="32" ></rect><line x1="8" y1="16" x2="24" y2="16" stroke-width="3" stroke="#757575"></line><line x1="16" y1="8" x2="16" y2="24" stroke-width="3" stroke="#757575"></line></g><line x1="4" y1="32" x2="28" y2="32" stroke-width="1" stroke="#cacaca"></line></svg>'),
  (FamilyTree.toolbarUI.zoomOutIcon =
    '<svg style="box-shadow: 0px 1px 4px rgba(0,0,0,0.3); margin-bottom:7px; border-left: 1px solid #cacaca; border-right: 1px solid #cacaca; border-bottom: 1px solid #cacaca; background-color: #f9f9f9;display: block; cursor: pointer;" width="32px" height="32px" ><g><rect fill="#f9f9f9" x="0" y="0" width="32" height="32" ></rect><line x1="8" y1="16" x2="24" y2="16" stroke-width="3" stroke="#757575"></line></g></svg>'),
  (FamilyTree.toolbarUI.layoutIcon =
    "<svg " +
    FamilyTree.attr.tlbr +
    '="layout" style="box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><path stroke-width="3" fill="none" stroke="#757575" d="M8,24 L16,14 L24,24"></path><path stroke-width="3" fill="none" stroke="#757575" d="M8,16 L16,8 L24,16"></path></svg>'),
  (FamilyTree.toolbarUI.prototype.init = function (e, t) {
    if (t) {
      (this.obj = e),
        (this.toolbar = t),
        (this._visible = !1),
        (this.div = document.createElement("div")),
        this.div.classList.add("bft-toolbar-container"),
        Object.assign(this.div.style, {
          position: "absolute",
          padding: "3px",
          right: this.obj.config.padding - 10 + "px",
          bottom: this.obj.config.padding - 10 + "px",
        }),
        t.expandAll &&
          (this.div.innerHTML +=
            "<div " +
            FamilyTree.attr.tlbr +
            '="expand">' +
            FamilyTree.toolbarUI.expandAllIcon +
            "</div>"),
        t.fit &&
          (this.div.innerHTML +=
            "<div " +
            FamilyTree.attr.tlbr +
            '="fit">' +
            FamilyTree.toolbarUI.fitIcon +
            "</div>"),
        t.zoom &&
          ((this.div.innerHTML +=
            "<div " +
            FamilyTree.attr.tlbr +
            '="plus">' +
            FamilyTree.toolbarUI.zoomInIcon +
            "</div>"),
          (this.div.innerHTML +=
            "<div " +
            FamilyTree.attr.tlbr +
            '="minus">' +
            FamilyTree.toolbarUI.zoomOutIcon +
            "</div>")),
        t.layout &&
          ((this.div.innerHTML +=
            "<div " +
            FamilyTree.attr.tlbr +
            '="layout">' +
            FamilyTree.toolbarUI.layoutIcon +
            "</div>"),
          (this.layouts = document.createElement("div")),
          this.layouts.classList.add("bft-toolbar-layout"),
          (this.layouts.innerHTML =
            '<svg data-layout="normal" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="41" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="35" stroke-width="1"></line><line stroke="#000000" x1="32" x2="88" y1="35" y2="35" stroke-width="1"></line><line stroke="#000000" x1="32" x2="32" y1="35" y2="41" stroke-width="1"></line><line stroke="#000000" x1="88" x2="88" y1="35" y2="41" stroke-width="1"></line></svg>\n            <svg data-layout="treeRightOffset" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="40" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="40" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="35" stroke-width="1"></line><line stroke="#000000" x1="60" x2="35" y1="35" y2="35" stroke-width="1"></line><line stroke="#000000" x1="35" x2="35" y1="35" y2="86" stroke-width="1"></line><line stroke="#000000" x1="35" x2="40" y1="86" y2="86" stroke-width="1"></line><line stroke="#000000" x1="35" x2="40" y1="54" y2="54" stroke-width="1"></line></svg>\n            <svg data-layout="treeLeftOffset" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="30" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="30" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="35" stroke-width="1"></line><line stroke="#000000" x1="60" x2="85" y1="35" y2="35" stroke-width="1"></line><line stroke="#000000" x1="85" x2="85" y1="35" y2="86" stroke-width="1"></line><line stroke="#000000" x1="80" x2="85" y1="86" y2="86" stroke-width="1"></line><line stroke="#000000" x1="80" x2="85" y1="54" y2="54" stroke-width="1"></line></svg>\n            <svg data-layout="mixed" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="35" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="35" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="41" stroke-width="1"></line><line stroke="#000000" x1="60" x2="60" y1="68" y2="73" stroke-width="1"></line></svg>\n            <svg data-layout="tree" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="35" y="73" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="41" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="73" stroke-width="1"></line><line stroke="#000000" x1="57" x2="63" y1="54" y2="54" stroke-width="1"></line></svg>\n            <svg data-layout="grid" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="73" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="71" stroke-width="1"></line><line stroke="#000000" x1="32" x2="88" y1="39" y2="39" stroke-width="1"></line><line stroke="#000000" x1="32" x2="88" y1="71" y2="71" stroke-width="1"></line><line stroke="#000000" x1="32" x2="32" y1="71" y2="73" stroke-width="1"></line><line stroke="#000000" x1="88" x2="88" y1="71" y2="73" stroke-width="1"></line><line stroke="#000000" x1="32" x2="32" y1="39" y2="41" stroke-width="1"></line><line stroke="#000000" x1="88" x2="88" y1="39" y2="41" stroke-width="1"></line></svg>'),
          this.obj.element.appendChild(this.layouts)),
        t.fullScreen &&
          (this.div.innerHTML +=
            "<div " +
            FamilyTree.attr.tlbr +
            '="fullScreen">' +
            FamilyTree.toolbarUI.openFullScreenIcon +
            "</div>"),
        this.obj.element.appendChild(this.div),
        (this.layoutBtn = this.div.querySelector(
          "[" + FamilyTree.attr.tlbr + '="layout"]'
        ));
      var i = this.div.querySelector("[" + FamilyTree.attr.tlbr + '="plus"]'),
        r = this.div.querySelector("[" + FamilyTree.attr.tlbr + '="minus"]'),
        a = this.div.querySelector("[" + FamilyTree.attr.tlbr + '="fit"]'),
        n = this.div.querySelector(
          "[" + FamilyTree.attr.tlbr + '="fullScreen"]'
        ),
        o = this.div.querySelector("[" + FamilyTree.attr.tlbr + '="expand"]'),
        l = this;
      i &&
        i.addEventListener("click", function () {
          l.obj.zoom(!0, null, !0);
        }),
        r &&
          r.addEventListener("click", function () {
            l.obj.zoom(!1, null, !0);
          }),
        a &&
          a.addEventListener("click", function () {
            l.obj.fit();
          }),
        n &&
          n.addEventListener("click", function () {
            l.obj.toggleFullScreen();
          }),
        o &&
          o.addEventListener("click", function () {
            l.obj.expand(null, "all");
          }),
        this.layoutBtn &&
          this.layoutBtn.addEventListener("click", function () {
            l._visible ? l.hideLayout() : l.showLayout();
          }),
        this.layouts &&
          this.layouts.addEventListener("click", function (e) {
            for (var t = e.target; t; ) {
              if (t.hasAttribute && t.hasAttribute(FamilyTree.attr.layout)) {
                (t = t.getAttribute(FamilyTree.attr.layout)),
                  l.obj.setLayout(FamilyTree.layout[t]);
                break;
              }
              t = t.parentNode;
            }
          });
    }
  }),
  (FamilyTree.toolbarUI.prototype.showLayout = function () {
    (this._visible = !0),
      (this.layoutBtn.style.transform =
        "rotate(180deg) translateX(0px) translateY(0px)"),
      FamilyTree.animate(
        this.div,
        { bottom: this.obj.config.padding - 10 },
        { bottom: this.obj.config.padding + 135 },
        this.obj.config.anim.duration,
        this.obj.config.anim.func
      ),
      FamilyTree.animate(
        this.layouts,
        { bottom: -145 },
        { bottom: 0 },
        this.obj.config.anim.duration,
        this.obj.config.anim.func
      );
  }),
  (FamilyTree.toolbarUI.prototype.hideLayout = function () {
    (this._visible = !1),
      (this.layoutBtn.style.transform =
        "rotate(0deg) translateX(0px) translateY(0px)"),
      FamilyTree.animate(
        this.div,
        { bottom: this.obj.config.padding + 135 },
        { bottom: this.obj.config.padding - 10 },
        this.obj.config.anim.duration,
        this.obj.config.anim.func
      ),
      FamilyTree.animate(
        this.layouts,
        { bottom: 0 },
        { bottom: -145 },
        this.obj.config.anim.duration,
        this.obj.config.anim.func
      );
  }),
  (FamilyTree.notifierUI = function () {}),
  (FamilyTree.notifierUI.prototype.init = function (e) {
    this.obj = e;
  }),
  (FamilyTree.notifierUI.prototype.show = function (e, t) {
    if (null == e) return !1;
    1 == e && ((e = FamilyTree.MAX_NODES_MESS), (t = "#FFCA28")),
      2 == e && ((e = FamilyTree.OFFLINE_MESS), (t = "#FFCA28"));
    var i = document.createElement("div");
    (i.innerHTML = e),
      Object.assign(i.style, {
        position: "absolute",
        "background-color": t,
        color: "#ffffff",
        padding: "15px",
        "border-radius": "40px",
        opacity: 0,
        overflow: "hidden",
        "white-space": "nowrap",
        "text-align": "center",
      }),
      this.obj.element.appendChild(i);
    var r = this.obj.width() / 2 - i.offsetWidth / 2,
      a = this.obj.height() / 2 - i.offsetHeight / 2;
    (i.style.left = r + "px"), (i.style.top = a + "px");
    var n = i.offsetWidth;
    return (
      (i.style.width = "20px"),
      FamilyTree.animate(
        i,
        { opacity: 0, width: 10 },
        { opacity: 1, width: n },
        this.obj.config.anim.duration,
        this.obj.config.anim.func
      ),
      !0
    );
  }),
  void 0 === FamilyTree && (FamilyTree = {}),
  (FamilyTree._validateConfig = function (e) {
    return !!e || (console.error("config is not defined"), !1);
  }),
  (FamilyTree._arrayContains = function (e, t) {
    if (e && Array.isArray(e))
      for (var i = e.length; i--; ) if (e[i] === t) return !0;
    return !1;
  }),
  (FamilyTree._interceptions = function (e, t) {
    if (!e) return [];
    if (!t) return [];
    var i = [];
    if (Array.isArray(e) && Array.isArray(t))
      for (var r in e) for (var a in t) e[r] == t[a] && i.push(e[r]);
    else if (Array.isArray(e) && !Array.isArray(t))
      for (var r in e) for (var a in t) e[r] == a && i.push(e[r]);
    else if (!Array.isArray(e) && Array.isArray(t))
      for (var r in e) for (var a in t) r == t[a] && i.push(t[a]);
    return i;
  }),
  (FamilyTree._getTags = function (e) {
    return e.tags && !Array.isArray(e.tags)
      ? e.tags.split(",")
      : e.tags && Array.isArray(e.tags)
      ? e.tags
      : [];
  }),
  (FamilyTree._centerPointInPercent = function (e, t, i) {
    var r = e.getBoundingClientRect(),
      a = t - r.left,
      n = i - r.top;
    return [a / (r.width / 100), n / (r.height / 100)];
  }),
  (FamilyTree._trim = function (e) {
    return e.replace(/^\s+|\s+$/g, "");
  }),
  (FamilyTree._getTransform = function (e) {
    var t = e.getAttribute("transform");
    return (
      (t = t.replace("matrix", "").replace("(", "").replace(")", "")),
      FamilyTree._browser().msie && (t = t.replace(/ /g, ",")),
      (t = "[" + (t = FamilyTree._trim(t)) + "]"),
      (t = JSON.parse(t))
    );
  }),
  (FamilyTree.getScale = function (e, t, i, r, a, n, o, l) {
    var s = 1;
    if (e || r !== FamilyTree.match.boundary)
      if (e || r !== FamilyTree.match.width)
        if (e || r !== FamilyTree.match.height)
          if (e) {
            var d, c;
            s = (d = t / e[2]) > (c = i / e[3]) ? c : d;
          } else s = r;
        else s = i / l;
      else s = t / o;
    else s = (d = t / o) > (c = i / l) ? c : d;
    return s && s > a && (s = a), s && s < n && (s = n), s;
  }),
  (FamilyTree.isObject = function (e) {
    return e && "object" == typeof e && !Array.isArray(e) && null !== e;
  }),
  (FamilyTree.fileUploadDialog = function (e) {
    var t = document.createElement("INPUT");
    t.setAttribute("type", "file"),
      (t.style.display = "none"),
      (t.onchange = function () {
        var t = this.files[0];
        e(t);
      }),
      document.body.appendChild(t),
      t.click();
  }),
  (FamilyTree.mergeDeep = function (e, t) {
    if (FamilyTree.isObject(e) && FamilyTree.isObject(t))
      for (var i in t)
        FamilyTree.isObject(t[i])
          ? (e[i] || Object.assign(e, { [i]: {} }),
            FamilyTree.mergeDeep(e[i], t[i]))
          : Object.assign(e, { [i]: t[i] });
    return e;
  }),
  (FamilyTree._lblIsImg = function (e, t) {
    return !(
      !e.nodeBinding ||
      "string" != typeof t ||
      -1 == t.indexOf("img") ||
      !e.nodeBinding[t]
    );
  }),
  (FamilyTree._getFistImgField = function (e) {
    if (e.nodeBinding)
      for (var t in e.nodeBinding)
        if (-1 != t.indexOf("img")) return e.nodeBinding[t];
    return !1;
  }),
  (FamilyTree._fieldIsImg = function (e, t) {
    if (e.nodeBinding)
      for (var i in e.nodeBinding)
        if (e.nodeBinding[i] == t) return FamilyTree._lblIsImg(e, i);
    return !1;
  }),
  (FamilyTree._guid = function () {
    function e() {
      return Math.floor(65536 * (1 + Math.random()))
        .toString(16)
        .substring(1);
    }
    return (
      e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    );
  }),
  (FamilyTree.htmlRipple = function (e) {
    var t = document.createElement("style");
    (t.type = "text/css"),
      (t.innerHTML =
        " .bft-ripple-container {position: absolute; top: 0; right: 0; bottom: 0; left: 0; } .bft-ripple-container span {transform: scale(0);border-radius:100%;position:absolute;opacity:0.75;background-color:#fff;animation: bft-ripple 1000ms; }@-moz-keyframes bft-ripple {to {opacity: 0;transform: scale(2);}}@-webkit-keyframes bft-ripple {to {opacity: 0;transform: scale(2);}}@-o-keyframes bft-ripple {to {opacity: 0;transform: scale(2);}}@keyframes bft-ripple {to {opacity: 0;transform: scale(2);}}"),
      document.head.appendChild(t);
    var i,
      r,
      a,
      n = document.createElement("div");
    (n.className = "bft-ripple-container"),
      e.addEventListener("mousedown", function (t) {
        var i, r, a, n, o;
        return (
          this,
          (r = document.createElement("span")),
          (a = this.offsetWidth),
          (i = this.getBoundingClientRect()),
          (o = t.pageX - i.left - a / 2),
          (n =
            "top:" +
            (t.pageY - i.top - a / 2) +
            "px; left: " +
            o +
            "px; height: " +
            a +
            "px; width: " +
            a +
            "px;"),
          e.rippleContainer.appendChild(r),
          r.setAttribute("style", n)
        );
      }),
      e.addEventListener(
        "mouseup",
        ((i = function () {
          for (; this.rippleContainer.firstChild; )
            this.rippleContainer.removeChild(this.rippleContainer.firstChild);
        }),
        (r = 2e3),
        (a = void 0),
        function () {
          var e, t;
          return (
            (t = this),
            (e = arguments),
            clearTimeout(a),
            (a = setTimeout(function () {
              return i.apply(t, e);
            }, r))
          );
        })
      ),
      (e.rippleContainer = n),
      e.appendChild(n);
  }),
  (FamilyTree._moveToBoundaryArea = function (e, t, i, r) {
    var a = t.slice(0);
    t[0] < i.left &&
      t[0] < i.right &&
      (a[0] = i.left > i.right ? i.right : i.left),
      t[0] > i.right &&
        t[0] > i.left &&
        (a[0] = i.left > i.right ? i.left : i.right),
      t[1] < i.top &&
        t[1] < i.bottom &&
        (a[1] = i.top > i.bottom ? i.bottom : i.top),
      t[1] > i.bottom &&
        t[1] > i.top &&
        (a[1] = i.top > i.bottom ? i.top : i.bottom),
      t[0] !== a[0] || t[1] !== a[1]
        ? FamilyTree.animate(
            e,
            { viewBox: t },
            { viewBox: a },
            300,
            FamilyTree.anim.outPow,
            function () {
              r && r();
            }
          )
        : r && r();
  }),
  (FamilyTree.randomId = function () {
    return (
      "_" +
      ("0000" + ((Math.random() * Math.pow(36, 4)) | 0).toString(36)).slice(-4)
    );
  }),
  (FamilyTree._getClientXY = function (e) {
    return -1 == e.type.indexOf("touch")
      ? { x: e.clientX, y: e.clientY }
      : e.changedTouches.length
      ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
      : void 0;
  }),
  (FamilyTree._getClientTouchesXY = function (e, t) {
    return -1 != e.type.indexOf("touch")
      ? e.touches.length < t + 1
        ? { x: null, y: null }
        : { x: e.touches[t].clientX, y: e.touches[t].clientY }
      : { x: e.clientX, y: e.clientY };
  }),
  (FamilyTree._getOffset = function (e, t) {
    e &&
      ((t.x += e.offsetLeft),
      (t.y += e.offsetTop),
      FamilyTree._getOffset(e.offsetParent, t));
  }),
  (FamilyTree._getTopLeft = function (e) {
    var t = { x: 0, y: 0 };
    return FamilyTree._getOffset(e, t), t;
  }),
  (FamilyTree._getOffsetXY = function (e, t) {
    if (-1 == t.type.indexOf("touch")) return { x: t.offsetX, y: t.offsetY };
    if (t.touches.length) {
      var i = FamilyTree._getTopLeft(e);
      return { x: t.touches[0].pageX - i.x, y: t.touches[0].pageY - i.y };
    }
    if (t.changedTouches.length) {
      i = FamilyTree._getTopLeft(e);
      return {
        x: t.changedTouches[0].pageX - i.x,
        y: t.changedTouches[0].pageY - i.y,
      };
    }
  }),
  (FamilyTree._pinchMiddlePointInPercent = function (e, t, i, r) {
    var a = FamilyTree._getTopLeft(e),
      n = r.touches[0].pageX - a.x,
      o = r.touches[0].pageY - a.y,
      l = r.touches[1].pageX - a.x,
      s = r.touches[1].pageY - a.y;
    return [((n - l) / 2 + l) / (t / 100), ((o - s) / 2 + s) / (i / 100)];
  }),
  (FamilyTree._browser = function () {
    var e =
        (!!window.opr && !!window.opr.addons) ||
        !!window.opera ||
        navigator.userAgent.indexOf(" OPR/") >= 0,
      t = "undefined" != typeof InstallTrigger,
      i =
        /constructor/i.test(window.HTMLElement) ||
        "[object SafariRemoteNotification]" ===
          (
            !window.safari ||
            (void 0 !== window.safari && safari.pushNotification)
          ).toString(),
      r = !!document.documentMode,
      a = !r && !!window.StyleMedia,
      n = !(
        !window.chrome ||
        (!window.chrome.webstore && !window.chrome.runtime)
      );
    return {
      opera: e,
      firefox: t,
      safari: i,
      msie: r,
      edge: a,
      chrome: n,
      blink: (n || e) && !!window.CSS,
    };
  }),
  (FamilyTree._menuPosition = function (e, t, i) {
    var r = e.getBoundingClientRect(),
      a = i.getBoundingClientRect(),
      n = t.getBoundingClientRect(),
      o = r.left - a.left,
      l = r.top - a.top;
    return (
      r.top + n.height > a.top + a.height && (l -= n.height),
      r.left - n.width < a.left && (o += n.width),
      { x: o, y: l }
    );
  }),
  (FamilyTree._getTemplate = function (e, t, i) {
    if (Array.isArray(e))
      for (var r = 0; r < e.length; r++) {
        var a = t[e[r]];
        if (a && a.template) return a.template;
      }
    return i;
  }),
  (FamilyTree._getMin = function (e, t) {
    if (e.tags && e.tags.length && t.tags)
      for (var i = 0; i < e.tags.length; i++) {
        var r = t.tags[e.tags[i]];
        if (r && !0 === r.min) return !0;
      }
    return t.min;
  }),
  (FamilyTree._getSubLevels = function (e, t) {
    if (e && e.length)
      for (var i = 0; i < e.length; i++) {
        var r = t[e[i]];
        if (r && r.subLevels) return r.subLevels;
      }
    return 0;
  }),
  (FamilyTree._isHTML = function (e) {
    var t = new DOMParser().parseFromString(e, "text/html");
    return Array.from(t.body.childNodes).some((e) => 1 === e.nodeType);
  }),
  (FamilyTree._getTestDiv = function () {
    var e = document.getElementById("orgfamily_js_test_div");
    return (
      e ||
        (((e = document.createElement("div")).id = "orgfamily_js_test_div"),
        (e.style.position = "fixed"),
        (e.style.top = "-10000px"),
        (e.style.left = "-10000px"),
        document.body.appendChild(e)),
      e
    );
  }),
  (FamilyTree._getLabelSize = function (e) {
    var t = FamilyTree._getTestDiv();
    return (
      (t.innerHTML = "<svg>" + e + "</svg>"),
      t.querySelector("text").getBoundingClientRect()
    );
  }),
  (FamilyTree.wrapText = function (e, t) {
    var i = t.toLowerCase();
    if (-1 == i.indexOf("<text")) return FamilyTree._escapeHtml(e);
    if (-1 == i.indexOf(FamilyTree.attr.width))
      return FamilyTree._escapeHtml(e);
    if (-1 != i.indexOf("foreignobject")) return FamilyTree._escapeHtml(e);
    if (-1 == t.indexOf(FamilyTree.attr.width))
      return FamilyTree._escapeHtml(e);
    if (
      FamilyTree.ESCAPE_HTML &&
      "string" == typeof str &&
      FamilyTree._isHTML(e)
    )
      return FamilyTree._escapeHtml(e);
    if (!FamilyTree.ESCAPE_HTML && FamilyTree._isHTML(e)) return e;
    var r = FamilyTree._getTestDiv();
    (t = t.replaceAll("{cw}", 0)), (r.innerHTML = "<svg>" + t + "</svg>");
    var a,
      n,
      o = new DOMParser()
        .parseFromString(t, "text/xml")
        .getElementsByTagName("text")[0],
      l = parseFloat(o.getAttribute("x")),
      s = parseFloat(o.getAttribute("y")),
      d = o.getAttribute("text-anchor"),
      c = o.getAttribute(FamilyTree.attr.width),
      m = o.getAttribute(FamilyTree.attr.text_overflow),
      h = "http://www.w3.org/2000/svg",
      p = r.getElementsByTagName("svg")[0].getElementsByTagName("text")[0];
    m || (m = "ellipsis");
    var f = m.split("-");
    if (
      (f.length > 1 &&
        ((a = parseInt(m.split("-")[1])),
        f.length > 2 && "ellipsis" == f[2] && (n = !0)),
      !c)
    )
      return FamilyTree._escapeHtml(e);
    if (
      ((c = parseFloat(c)),
      l || (l = 0),
      s || (s = 0),
      l || (d = "start"),
      "ellipsis" == m)
    ) {
      p.removeChild(p.firstChild), (p.textContent = e);
      for (var u = p.getComputedTextLength(), y = 2; u > c; )
        (p.textContent = e.substring(0, e.length - y)),
          (p.textContent += "..."),
          (u = p.getComputedTextLength()),
          y++;
      return y > 2
        ? `<title>${FamilyTree._escapeHtml(e)}</title>${p.textContent}`
        : FamilyTree._escapeHtml(e);
    }
    if (-1 != m.indexOf("multiline")) {
      var g = e.split(" "),
        v = p.getBBox().height;
      p.textContent = "";
      var T = document.createElementNS(h, "tspan"),
        b = document.createTextNode(g[0]);
      T.setAttributeNS(null, "x", l),
        T.setAttributeNS(null, "y", s),
        T.setAttributeNS(null, "text-anchor", d),
        T.appendChild(b),
        p.appendChild(T);
      y = 1;
      for (var F = 1, x = !1, _ = 1; _ < g.length; _++) {
        var w = T.firstChild.data.length;
        if (
          ((T.firstChild.data += " " + g[_]), T.getComputedTextLength() > c)
        ) {
          if (
            ((T.firstChild.data = T.firstChild.data.slice(0, w)),
            F++,
            a && F > a)
          ) {
            if (n && p.children.length == a) {
              var k = p.children[a - 1].textContent;
              (p.children[a - 1].textContent =
                k.substring(0, k.length - 3) + "..."),
                (x = !0);
            }
            break;
          }
          (T = document.createElementNS(h, "tspan")).setAttributeNS(
            null,
            "x",
            l
          ),
            T.setAttributeNS(null, "y", s + v * y),
            T.setAttributeNS(null, "text-anchor", d),
            (b = document.createTextNode(g[_])),
            T.appendChild(b),
            p.appendChild(T),
            y++;
        }
      }
      var S = "";
      if (null != p.innerHTML) (S = p.innerHTML), (p.innerHTML = "");
      else {
        var C = "";
        for (_ = p.childNodes.length - 1; _ >= 0; _--)
          (C = XMLSerializer().serializeToString(p.childNodes[_]) + C),
            p.removeChild(p.childNodes[_]);
        S = C;
      }
      return x ? `<title>${FamilyTree._escapeHtml(e)}</title>${S}` : S;
    }
  }),
  (FamilyTree._downloadFile = function (e, t, i, r, a) {
    var n = new Blob([t], { type: e });
    if (1 == r) {
      var o = URL.createObjectURL(n);
      window.open(o, "_blank").focus();
    } else if (navigator.msSaveBlob) navigator.msSaveBlob(n, i);
    else {
      var l = document.createElement("a");
      if (void 0 !== l.download) {
        o = URL.createObjectURL(n);
        l.setAttribute("href", o);
        var s = i;
        s.toLowerCase().endsWith(a.toLowerCase()) || (s = s + "." + a),
          l.setAttribute("download", s),
          (l.style.visibility = "hidden"),
          document.body.appendChild(l),
          l.click(),
          document.body.removeChild(l);
      }
    }
  }),
  (FamilyTree._getPosition = function (e, t, i, r) {
    var a = { x: t.x, y: t.y };
    if ((null != i && (a.x = i), null != r && (a.y = i), e && 3 == e.length)) {
      var n = e[0].indexOf(t.id);
      -1 != n &&
        null != e[1][n].transform &&
        (null == i && (a.x = e[1][n].transform[4]),
        null == r && (a.y = e[1][n].transform[5]));
    }
    return a;
  }),
  (FamilyTree._getOpacity = function (e, t) {
    var i = 1;
    if (e && 3 == e.length) {
      var r = e[0].indexOf(t.id);
      -1 != r && null != e[1][r].opacity && (i = e[1][r].opacity);
    }
    return i;
  }),
  (FamilyTree.t = function (e, t, i) {
    var r = FamilyTree.templates[e];
    null == r && console.error(`Template "${e}" does not exist!`);
    var a = null;
    if (null != i && r.scaleLessThen) {
      var n = [];
      for (var o in r.scaleLessThen) {
        var l = parseFloat(o);
        i < l && n.push(l);
      }
      if (n.length > 0) {
        n.sort(function (e, t) {
          return e - t;
        });
        var s = r.scaleLessThen[n[0]];
        for (var d in s) null == a && (a = Object.assign({}, r)), (a[d] = s[d]);
      }
    }
    return t
      ? null == a
        ? r.min
          ? r.min
          : r
        : a.min
        ? a.min
        : a
      : null == a
      ? r
      : a;
  }),
  (FamilyTree.setNodeSize = function (e) {
    var t = FamilyTree.t(e.templateName, e.min);
    (e.w = t && t.size ? t.size[0] : 0), (e.h = t && t.size ? t.size[1] : 0);
  }),
  (FamilyTree._imgs2base64 = function (e, t, i, r) {
    var a = e.getElementsByTagName(t),
      n = a.length;
    0 == n && r();
    for (var o = 0; o < n; o++)
      !(function () {
        var e = o,
          t = a[e];
        FamilyTree._getDataUri(t.getAttribute(i), function (a) {
          a.success && t.setAttribute(i, a.result), e == n - 1 && r();
        });
      })();
  }),
  (FamilyTree._getDataUri = function (e, t) {
    if (-1 != e.indexOf("base64")) t({ success: !1 });
    else {
      var i = new XMLHttpRequest();
      i.open("GET", e),
        (i.responseType = "blob"),
        (i.onload = function () {
          200 === i.status
            ? r.readAsDataURL(i.response)
            : 404 === i.status && t({ success: !1, result: i.status });
        });
      var r = new FileReader();
      (r.onloadend = function () {
        t({ success: !0, result: r.result });
      }),
        i.send();
    }
  }),
  (FamilyTree._convertStringToArray = function (e, t) {
    return -1 != FamilyTree.ARRAY_FIELDS.indexOf(e)
      ? FamilyTree.isNEU(t)
        ? []
        : t.split(",")
      : t;
  }),
  (FamilyTree._convertArrayToString = function (e) {
    return !FamilyTree.isNEU(e) && Array.isArray(e) ? e.join() : e;
  }),
  (FamilyTree._csvToArray = function (e, t) {
    t = t || FamilyTree.CSV_DELIMITER;
    for (
      var i = new RegExp(
          "(\\" +
            t +
            '|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\' +
            t +
            "\\r\\n]*))",
          "gi"
        ),
        r = [[]],
        a = null;
      (a = i.exec(e));

    ) {
      var n,
        o = a[1];
      o.length && o !== t && r.push([]),
        (n = a[2] ? a[2].replace(new RegExp('""', "g"), '"') : a[3]),
        r[r.length - 1].push(n);
    }
    return r;
  }),
  (FamilyTree._json2xml = function (e) {
    for (
      var t = document.implementation.createDocument("", "", null),
        i = t.createElement("nodes"),
        r = 0;
      r < e.length;
      r++
    ) {
      var a = t.createElement("node"),
        n = e[r];
      for (var o in n) {
        var l = n[o];
        a.setAttribute(o, FamilyTree._convertArrayToString(l));
      }
      i.appendChild(a);
    }
    return (
      t.appendChild(i),
      '<?xml version="1.0" encoding="utf-8" ?>' +
        new XMLSerializer().serializeToString(t.documentElement)
    );
  }),
  (FamilyTree._xml2json = function (e) {
    for (
      var t = new DOMParser()
          .parseFromString(e, "text/xml")
          .getElementsByTagName("node"),
        i = [],
        r = 0;
      r < t.length;
      r++
    ) {
      for (var a = t[r], n = {}, o = 0; o < a.attributes.length; o++) {
        var l = a.attributes[o];
        n[l.name] = FamilyTree._convertStringToArray(l.name, l.value);
      }
      i.push(n);
    }
    return i;
  }),
  (FamilyTree.convertNodesToCsv = function (e) {
    return FamilyTree._json2csv(e);
  }),
  (FamilyTree._json2csv = function (e) {
    for (
      var t = [],
        i = function (e) {
          for (var i = "", r = 0; r < t.length; r++) {
            var a;
            (a =
              "reportsTo" == t[r]
                ? null
                : null == e[t[r]]
                ? ""
                : e[t[r]]) instanceof Date && (a = a.toLocaleString());
            var n = (a = null === a ? "" : a.toString()).replace(/"/g, '""'),
              o = new RegExp('("|;|\n)', "g");
            n.search(o) >= 0 && (n = '"' + n + '"'),
              r > 0 && (i += FamilyTree.CSV_DELIMITER),
              (i += n);
          }
          return i + "\n";
        },
        r = "",
        a = 0;
      a < e.length;
      a++
    )
      for (var n in e[a])
        FamilyTree._arrayContains(t, n) ||
          (t.push(n), (r += n + FamilyTree.CSV_DELIMITER));
    (r = r.substring(0, r.length - 1)), (r += "\n");
    for (a = 0; a < e.length; a++) r += i(e[a]);
    return (r = r.substring(0, r.length - 1));
  }),
  (FamilyTree.accentFold = function (e) {
    return (e = e.toString().toLowerCase()).replace(
      /([Ã Ã¡Ã¢Ã£Ã¤Ã¥])|([Ã§])|([Ã¨Ã©ÃªÃ«])|([Ã¬Ã­Ã®Ã¯])|([Ã±])|([Ã²Ã³Ã´ÃµÃ¶Ã¸])|([ÃŸ])|([Ã¹ÃºÃ»Ã¼])|([Ã¿])|([Ã¦])/g,
      function (e, t, i, r, a, n, o, l, s, d, c) {
        return t
          ? "a"
          : i
          ? "c"
          : r
          ? "e"
          : a
          ? "i"
          : n
          ? "n"
          : o
          ? "o"
          : l
          ? "s"
          : s
          ? "u"
          : d
          ? "y"
          : c
          ? "ae"
          : void 0;
      }
    );
  }),
  (FamilyTree.copy = function (e) {
    if (null === e || "object" != typeof e || "isActiveClone" in e) return e;
    if (e instanceof Date) var t = new e.constructor();
    else t = e.constructor();
    for (var i in e)
      Object.prototype.hasOwnProperty.call(e, i) &&
        ((e.isActiveClone = null),
        (t[i] = FamilyTree.copy(e[i])),
        delete e.isActiveClone);
    return t;
  }),
  (FamilyTree._getScrollSensitivity = function () {
    var e = FamilyTree._browser();
    return e.msie && FamilyTree.scroll.ie
      ? FamilyTree.scroll.ie
      : e.edge && FamilyTree.scroll.edge
      ? FamilyTree.scroll.edge
      : e.safari && FamilyTree.scroll.safari
      ? FamilyTree.scroll.safari
      : e.chrome && FamilyTree.scroll.chrome
      ? FamilyTree.scroll.chrome
      : e.firefox && FamilyTree.scroll.firefox
      ? FamilyTree.scroll.firefox
      : e.opera && FamilyTree.scroll.opera
      ? FamilyTree.scroll.opera
      : { smooth: FamilyTree.scroll.smooth, speed: FamilyTree.scroll.speed };
  }),
  (FamilyTree.isMobile = function () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }),
  (FamilyTree.isTrial = function () {
    return void 0 !== FamilyTree.remote;
  }),
  (FamilyTree.childrenCount = function (e, t) {
    for (var i = 0, r = 0; r < t.childrenIds.length; r++) {
      e.nodes[t.childrenIds[r]] && i++;
    }
    return i;
  }),
  (FamilyTree.childrenTotalCount = function (e, t) {
    for (var i = 0, r = 0; r < t.childrenIds.length; r++) {
      var a = e.nodes[t.childrenIds[r]];
      a && (i++, (i += FamilyTree.childrenTotalCount(e, a)));
    }
    return i;
  }),
  (FamilyTree.collapsedChildrenCount = function (e, t) {
    for (var i = 0, r = 0; r < t.childrenIds.length; r++) {
      var a = e.nodes[t.childrenIds[r]];
      a && !0 === a.collapsed && i++;
    }
    return i;
  }),
  (FamilyTree.collapsedChildrenTotalCount = function (e, t, i) {
    for (var r = 0, a = 0; a < t.childrenIds.length; a++) {
      var n = e.nodes[t.childrenIds[a]];
      n &&
        ((i || !0 === n.collapsed) && r++,
        (r += FamilyTree.collapsedChildrenTotalCount(e, n, !0)));
    }
    return r;
  }),
  (FamilyTree._setMinMaxXY = function (e, t) {
    (null == t.minX || (null != e.x && e.x < t.minX)) && (t.minX = e.x),
      (null == t.minY || (null != e.y && e.y < t.minY)) && (t.minY = e.y),
      (null == t.maxX || (null != e.x && e.x + e.w > t.maxX)) &&
        (t.maxX = e.x + e.w),
      (null == t.maxY || (null != e.y && e.y + e.h > t.maxY)) &&
        (t.maxY = e.y + e.h);
  }),
  (FamilyTree.getStParentNodes = function (e, t) {
    for (t || (t = []); e.parent; ) e = e.parent;
    return (
      e.stParent &&
        (t.push(e.stParent), FamilyTree.getStParentNodes(e.stParent, t)),
      t
    );
  }),
  (FamilyTree.getRootOf = function (e) {
    for (; e && e.parent; ) e = e.parent;
    return e;
  }),
  (FamilyTree._getViewBox = function (e) {
    var t = null;
    return e
      ? ((t = (t = "[" + (t = e.getAttribute("viewBox")) + "]").replace(
          /\ /g,
          ","
        )),
        (t = JSON.parse(t)))
      : null;
  }),
  (FamilyTree.isNEU = function (e) {
    return null == e || "" === e;
  }),
  (FamilyTree.gradientCircleForDefs = function (e, t, i, r) {
    function a(e, t, i, r) {
      var a = ((r - 90) * Math.PI) / 180;
      return { x: e + i * Math.cos(a), y: t + i * Math.sin(a) };
    }
    function n(e, t, i, r, n) {
      var o = a(e, t, i, n),
        l = a(e, t, i, r),
        s = n - r <= 180 ? "0" : "1";
      return ["M", o.x, o.y, "A", i, i, 0, s, 0, l.x, l.y].join(" ");
    }
    return (
      Array.isArray(t) || (t = [t, t, t, t, t, t]),
      `<linearGradient id="${e}_linearColors1" x1="0" y1="0" x2="1" y2="1">\n            <stop offset="0%" stop-color="${
        t[0]
      }"></stop>\n            <stop offset="100%" stop-color="${
        t[1]
      }"></stop>\n        </linearGradient>\n        <linearGradient id="${e}_linearColors2" x1="0.5" y1="0" x2="0.5" y2="1">\n            <stop offset="0%" stop-color="${
        t[1]
      }"></stop>\n            <stop offset="100%" stop-color="${
        t[2]
      }"></stop>\n        </linearGradient>\n        <linearGradient id="${e}_linearColors3" x1="1" y1="0" x2="0" y2="1">\n            <stop offset="0%" stop-color="${
        t[2]
      }"></stop>\n            <stop offset="100%" stop-color="${
        t[3]
      }"></stop>\n        </linearGradient>\n        <linearGradient id="${e}_linearColors4" x1="1" y1="1" x2="0" y2="0">\n            <stop offset="0%" stop-color="${
        t[3]
      }"></stop>\n            <stop offset="100%" stop-color="${
        t[4]
      }"></stop>\n        </linearGradient>\n        <linearGradient id="${e}_linearColors5" x1="0.5" y1="1" x2="0.5" y2="0">\n            <stop offset="0%" stop-color="${
        t[4]
      }"></stop>\n            <stop offset="100%" stop-color="${
        t[5]
      }"></stop>\n        </linearGradient>\n        <linearGradient id="${e}_linearColors6" x1="0" y1="1" x2="1" y2="0">\n            <stop offset="0%" stop-color="${
        t[5]
      }"></stop>\n            <stop offset="100%" stop-color="${
        t[0]
      }"></stop>\n        </linearGradient>        \n        <g id="${e}">\n            <path stroke-width="${r}" fill="none" stroke="url(#${e}_linearColors1)" d="${n(
        i,
        i,
        i,
        1,
        60
      )}"  />\n            <path stroke-width="${r}" fill="none" stroke="url(#${e}_linearColors2)" d="${n(
        i,
        i,
        i,
        60,
        120
      )}"/>\n            <path stroke-width="${r}" fill="none" stroke="url(#${e}_linearColors3)" d="${n(
        i,
        i,
        i,
        120,
        180
      )}" />\n            <path stroke-width="${r}" fill="none" stroke="url(#${e}_linearColors4)" d="${n(
        i,
        i,
        i,
        180,
        240
      )}" />\n            <path stroke-width="${r}" fill="none" stroke="url(#${e}_linearColors5)" d="${n(
        i,
        i,
        i,
        240,
        300
      )}" />\n            <path stroke-width="${r}" fill="none" stroke="url(#${e}_linearColors6)" d="${n(
        i,
        i,
        i,
        300,
        1
      )}"/>\n        </g>`
    );
  }),
  (FamilyTree._intersectionObserver = function (e, t) {
    "function" == typeof IntersectionObserver
      ? new IntersectionObserver(function (e, i) {
          e.forEach(function (e) {
            var i = e.intersectionRatio > 0;
            0 == e.intersectionRatio && (i = e.isIntersecting), t(i);
          });
        }).observe(e)
      : t(!0);
  }),
  (FamilyTree.convertCsvToNodes = function (e) {
    for (
      var t = FamilyTree._csvToArray(e), i = t[0], r = [], a = 1;
      a < t.length;
      a++
    ) {
      for (var n = {}, o = 0; o < t[a].length; o++) {
        var l = i[o],
          s = t[a][o];
        n[i[o]] = FamilyTree._convertStringToArray(l, s);
      }
      "" != n.id.trim() && r.push(n);
    }
    return r;
  }),
  (FamilyTree._escapeHtml = function (e) {
    return FamilyTree.ESCAPE_HTML && "string" == typeof e
      ? e
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
      : e;
  }),
  (FamilyTree._escapeDoubleQuotes = function (e) {
    return "string" == typeof e ? e.replace(/"/g, "&quot;") : e;
  }),
  (FamilyTree._escapeGreaterLessSign = function (e) {
    return "string" == typeof e
      ? e.replace(/</g, "&lt;").replace(/>/g, "&gt;")
      : e;
  }),
  (FamilyTree.roundPathCorners = function (e, t, i) {
    function r(e, t, i) {
      var r = t.x - e.x,
        n = t.y - e.y,
        o = Math.sqrt(r * r + n * n);
      return a(e, t, Math.min(1, i / o));
    }
    function a(e, t, i) {
      return { x: e.x + (t.x - e.x) * i, y: e.y + (t.y - e.y) * i };
    }
    function n(e, t) {
      e.length > 2 && ((e[e.length - 2] = t.x), (e[e.length - 1] = t.y));
    }
    function o(e) {
      return { x: parseFloat(e[e.length - 2]), y: parseFloat(e[e.length - 1]) };
    }
    Array.isArray(e) ||
      (e = (e = e.split(/[,\s]/).reduce(function (e, t) {
        var i = t.match("([a-zA-Z])(.+)");
        return i ? (e.push(i[1]), e.push(i[2])) : e.push(t), e;
      }, [])).reduce(function (e, t) {
        return (
          parseFloat(t) == t && e.length
            ? e[e.length - 1].push(t)
            : e.push([t]),
          e
        );
      }, []));
    var l = [];
    if (e.length > 1) {
      var s = o(e[0]),
        d = null;
      "Z" == e[e.length - 1][0] &&
        e[0].length > 2 &&
        ((d = ["L", s.x, s.y]), (e[e.length - 1] = d)),
        l.push(e[0]);
      for (var c = 1; c < e.length; c++) {
        var m = l[l.length - 1],
          h = e[c],
          p = h == d ? e[1] : e[c + 1];
        if (
          p &&
          m &&
          m.length > 2 &&
          "L" == h[0] &&
          p.length > 2 &&
          "L" == p[0]
        ) {
          var f,
            u,
            y = o(m),
            g = o(h),
            v = o(p);
          i
            ? ((f = a(g, m.origPoint || y, t)), (u = a(g, p.origPoint || v, t)))
            : ((f = r(g, y, t)), (u = r(g, v, t))),
            n(h, f),
            (h.origPoint = g),
            l.push(h);
          var T = a(f, g, 0.5),
            b = a(g, u, 0.5),
            F = ["C", T.x, T.y, b.x, b.y, u.x, u.y];
          (F.origPoint = g), l.push(F);
        } else l.push(h);
      }
      if (d) {
        var x = o(l[l.length - 1]);
        l.push(["Z"]), n(l[0], x);
      }
    } else l = e;
    return l.reduce(function (e, t) {
      return e + t.join(" ") + " ";
    }, "");
  }),
  (FamilyTree._isMoved = function (e) {
    return null != e.movex || null != e.movey;
  }),
  (FamilyTree._getDynamicGridCoulumns = function (e) {
    for (var t = 1; t < e && (e / t, !(e / t - t <= 0)); t++);
    return t % 2 != 0 && t > 2 && t--, t;
  }),
  (FamilyTree._changeRootOption = function (e, t, i) {
    for (var r = [], a = 0; a < t.length; a++)
      for (var n = 0; n < i.length; n++)
        if (i[n].has(t[a])) {
          r = i[n];
          break;
        }
    for (a = 0; a < r.length; a++) {
      var o = e.indexOf(r[a]);
      -1 != o && e.splice(o, 1);
    }
    t.length && e.push(t[0]);
  }),
  (FamilyTree._convertStringToArrayOnImport = function (e, t) {
    return "tags" == e || "pids" == e
      ? FamilyTree.isNEU(t)
        ? []
        : t.split(",")
      : t;
  }),
  void 0 === FamilyTree && (FamilyTree = {}),
  (FamilyTree.icon = {}),
  (FamilyTree.icon.png = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '" viewBox="0 0 550.801 550.801"><path fill="' +
      i +
      '" d="M146.747,276.708c0-13.998-9.711-22.352-26.887-22.352c-6.99,0-11.726,0.675-14.204,1.355v44.927 c2.932,0.676,6.539,0.896,11.52,0.896C135.449,301.546,146.747,292.28,146.747,276.708z"/><path fill="' +
      i +
      '" d="M488.426,197.019H475.2v-63.816c0-0.398-0.063-0.799-0.116-1.202c-0.021-2.534-0.827-5.023-2.562-6.995L366.325,3.694 c-0.032-0.031-0.063-0.042-0.085-0.076c-0.633-0.707-1.371-1.295-2.151-1.804c-0.231-0.155-0.464-0.285-0.706-0.419 c-0.676-0.369-1.393-0.675-2.131-0.896c-0.2-0.056-0.38-0.138-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.873v160.545 c0,17.043,13.824,30.87,30.873,30.87h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87v-160.54C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.513c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M234.344,335.86v45.831h-31.601V229.524h40.184 l31.611,55.759c9.025,16.031,18.064,34.983,24.825,52.154h0.675c-2.257-20.103-2.933-40.643-2.933-63.44v-44.473h31.614v152.167 h-36.117l-32.516-58.703c-9.049-16.253-18.971-35.892-26.438-53.727l-0.665,0.222C233.906,289.58,234.344,311.027,234.344,335.86z M71.556,381.691V231.56c10.613-1.804,25.516-3.159,46.506-3.159c21.215,0,36.353,4.061,46.509,12.192 c9.698,7.673,16.255,20.313,16.255,35.219c0,14.897-4.959,27.549-13.999,36.123c-11.738,11.063-29.123,16.031-49.441,16.031 c-4.522,0-8.593-0.231-11.736-0.675v54.411H71.556V381.691z M453.601,523.353H97.2V419.302h356.4V523.353z M485.652,374.688 c-10.61,3.607-30.713,8.585-50.805,8.585c-27.759,0-47.872-7.003-61.857-20.545c-13.995-13.1-21.684-32.97-21.452-55.318 c0.222-50.569,37.03-79.463,86.917-79.463c19.644,0,34.783,3.829,42.219,7.446l-7.214,27.543c-8.369-3.617-18.752-6.55-35.458-6.55 c-28.656,0-50.341,16.256-50.341,49.22c0,31.382,19.649,49.892,47.872,49.892c7.895,0,14.218-0.901,16.934-2.257v-31.835h-23.493 v-26.869h56.679V374.688z"/></svg>'
    );
  }),
  (FamilyTree.icon.pdf = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '" viewBox="0 0 550.801 550.801"><path fill="' +
      i +
      '" d="M160.381,282.225c0-14.832-10.299-23.684-28.474-23.684c-7.414,0-12.437,0.715-15.071,1.432V307.6 c3.114,0.707,6.942,0.949,12.192,0.949C148.419,308.549,160.381,298.74,160.381,282.225z"/><path fill="' +
      i +
      '" d="M272.875,259.019c-8.145,0-13.397,0.717-16.519,1.435v105.523c3.116,0.729,8.142,0.729,12.69,0.729 c33.017,0.231,54.554-17.946,54.554-56.474C323.842,276.719,304.215,259.019,272.875,259.019z"/><path fill="' +
      i +
      '" d="M488.426,197.019H475.2v-63.816c0-0.398-0.063-0.799-0.116-1.202c-0.021-2.534-0.827-5.023-2.562-6.995L366.325,3.694 c-0.032-0.031-0.063-0.042-0.085-0.076c-0.633-0.707-1.371-1.295-2.151-1.804c-0.231-0.155-0.464-0.285-0.706-0.419 c-0.676-0.369-1.393-0.675-2.131-0.896c-0.2-0.056-0.38-0.138-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.873v160.545 c0,17.043,13.824,30.87,30.873,30.87h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87v-160.54C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.513c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M362.359,309.023c0,30.876-11.243,52.165-26.82,65.333 c-16.971,14.117-42.82,20.814-74.396,20.814c-18.9,0-32.297-1.197-41.401-2.389V234.365c13.399-2.149,30.878-3.346,49.304-3.346 c30.612,0,50.478,5.508,66.039,17.226C351.828,260.69,362.359,280.547,362.359,309.023z M80.7,393.499V234.365 c11.241-1.904,27.042-3.346,49.296-3.346c22.491,0,38.527,4.308,49.291,12.928c10.292,8.131,17.215,21.534,17.215,37.328 c0,15.799-5.25,29.198-14.829,38.285c-12.442,11.728-30.865,16.996-52.407,16.996c-4.778,0-9.1-0.243-12.435-0.723v57.67H80.7 V393.499z M453.601,523.353H97.2V419.302h356.4V523.353z M484.898,262.127h-61.989v36.851h57.913v29.674h-57.913v64.848h-36.593 V232.216h98.582V262.127z"/></svg>'
    );
  }),
  (FamilyTree.icon.svg = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '" viewBox="0 0 550.801 550.801"><path fill="' +
      i +
      '" d="M488.426,197.019H475.2v-63.816c0-0.398-0.063-0.799-0.116-1.202c-0.021-2.534-0.827-5.023-2.562-6.995L366.325,3.694 c-0.032-0.031-0.063-0.042-0.085-0.076c-0.633-0.707-1.371-1.295-2.151-1.804c-0.231-0.155-0.464-0.285-0.706-0.419 c-0.676-0.369-1.393-0.675-2.131-0.896c-0.2-0.056-0.38-0.138-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.873v160.545 c0,17.043,13.824,30.87,30.873,30.87h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87v-160.54C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.513c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M338.871,225.672L284.545,386.96h-42.591 l-51.69-161.288h39.967l19.617,68.196c5.508,19.143,10.531,37.567,14.36,57.67h0.717c4.061-19.385,9.089-38.527,14.592-56.953 l20.585-68.918h38.77V225.672z M68.458,379.54l7.415-30.153c9.811,5.021,24.888,10.051,40.439,10.051 c16.751,0,25.607-6.935,25.607-17.465c0-10.052-7.662-15.795-27.05-22.734c-26.8-9.328-44.263-24.168-44.263-47.611 c0-27.524,22.971-48.579,61.014-48.579c18.188,0,31.591,3.823,41.159,8.131l-8.126,29.437c-6.465-3.116-17.945-7.657-33.745-7.657 c-15.791,0-23.454,7.183-23.454,15.552c0,10.296,9.089,14.842,29.917,22.731c28.468,10.536,41.871,25.365,41.871,48.094 c0,27.042-20.812,50.013-65.09,50.013C95.731,389.349,77.538,384.571,68.458,379.54z M453.601,523.353H97.2V419.302h356.4V523.353z M488.911,379.54c-11.243,3.823-32.537,9.103-53.831,9.103c-29.437,0-50.73-7.426-65.57-21.779 c-14.839-13.875-22.971-34.942-22.738-58.625c0.253-53.604,39.255-84.235,92.137-84.235c20.81,0,36.852,4.073,44.74,7.896 l-7.657,29.202c-8.859-3.829-19.849-6.95-37.567-6.95c-30.396,0-53.357,17.233-53.357,52.173c0,33.265,20.81,52.882,50.73,52.882 c8.375,0,15.072-0.96,17.94-2.395v-33.745h-24.875v-28.471h60.049V379.54L488.911,379.54z" /></svg>'
    );
  }),
  (FamilyTree.icon.csv = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '" viewBox="0 0 548.29 548.291" ><path fill="' +
      i +
      '" d="M486.2,196.121h-13.164V132.59c0-0.399-0.064-0.795-0.116-1.2c-0.021-2.52-0.824-5-2.551-6.96L364.656,3.677 c-0.031-0.034-0.064-0.044-0.085-0.075c-0.629-0.707-1.364-1.292-2.141-1.796c-0.231-0.157-0.462-0.286-0.704-0.419 c-0.672-0.365-1.386-0.672-2.121-0.893c-0.199-0.052-0.377-0.134-0.576-0.188C358.229,0.118,357.4,0,356.562,0H96.757 C84.893,0,75.256,9.649,75.256,21.502v174.613H62.093c-16.972,0-30.733,13.756-30.733,30.73v159.81 c0,16.966,13.761,30.736,30.733,30.736h13.163V526.79c0,11.854,9.637,21.501,21.501,21.501h354.777 c11.853,0,21.502-9.647,21.502-21.501V417.392H486.2c16.966,0,30.729-13.764,30.729-30.731v-159.81 C516.93,209.872,503.166,196.121,486.2,196.121z M96.757,21.502h249.053v110.006c0,5.94,4.818,10.751,10.751,10.751h94.973v53.861 H96.757V21.502z M258.618,313.18c-26.68-9.291-44.063-24.053-44.063-47.389c0-27.404,22.861-48.368,60.733-48.368 c18.107,0,31.447,3.811,40.968,8.107l-8.09,29.3c-6.43-3.107-17.862-7.632-33.59-7.632c-15.717,0-23.339,7.149-23.339,15.485 c0,10.247,9.047,14.769,29.78,22.632c28.341,10.479,41.681,25.239,41.681,47.874c0,26.909-20.721,49.786-64.792,49.786 c-18.338,0-36.449-4.776-45.497-9.77l7.38-30.016c9.772,5.014,24.775,10.006,40.264,10.006c16.671,0,25.488-6.908,25.488-17.396 C285.536,325.789,277.909,320.078,258.618,313.18z M69.474,302.692c0-54.781,39.074-85.269,87.654-85.269 c18.822,0,33.113,3.811,39.549,7.149l-7.392,28.816c-7.38-3.084-17.632-5.939-30.491-5.939c-28.822,0-51.206,17.375-51.206,53.099 c0,32.158,19.051,52.4,51.456,52.4c10.947,0,23.097-2.378,30.241-5.238l5.483,28.346c-6.672,3.34-21.674,6.919-41.208,6.919 C98.06,382.976,69.474,348.424,69.474,302.692z M451.534,520.962H96.757v-103.57h354.777V520.962z M427.518,380.583h-42.399 l-51.45-160.536h39.787l19.526,67.894c5.479,19.046,10.479,37.386,14.299,57.397h0.709c4.048-19.298,9.045-38.352,14.526-56.693 l20.487-68.598h38.599L427.518,380.583z" /></svg>'
    );
  }),
  (FamilyTree.icon.json = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '" viewBox="0 0 32 32" ><polygon fill="' +
      i +
      '"  points="31 11 31 21 29 21 27 15 27 21 25 21 25 11 27 11 29 17 29 11 31 11"/><path fill="' +
      i +
      '"  d="M21.3335,21h-2.667A1.6684,1.6684,0,0,1,17,19.3335v-6.667A1.6684,1.6684,0,0,1,18.6665,11h2.667A1.6684,1.6684,0,0,1,23,12.6665v6.667A1.6684,1.6684,0,0,1,21.3335,21ZM19,19h2V13H19Z"/><path fill="' +
      i +
      '"  d="M13.3335,21H9V19h4V17H11a2.002,2.002,0,0,1-2-2V12.6665A1.6684,1.6684,0,0,1,10.6665,11H15v2H11v2h2a2.002,2.002,0,0,1,2,2v2.3335A1.6684,1.6684,0,0,1,13.3335,21Z"/><path fill="' +
      i +
      '"  d="M5.3335,21H2.6665A1.6684,1.6684,0,0,1,1,19.3335V17H3v2H5V11H7v8.3335A1.6684,1.6684,0,0,1,5.3335,21Z"/><rect fill="' +
      i +
      '"  id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" style="fill: none;" width="32" height="32"/></svg>'
    );
  }),
  (FamilyTree.icon.excel = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '" viewBox="0 0 512 512"><path fill="#ECEFF1" d="M496,432.011H272c-8.832,0-16-7.168-16-16s0-311.168,0-320s7.168-16,16-16h224 c8.832,0,16,7.168,16,16v320C512,424.843,504.832,432.011,496,432.011z" /><path fill="' +
      i +
      '" d="M336,176.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,176.011,336,176.011z" /><path fill="' +
      i +
      '" d="M336,240.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,240.011,336,240.011z" /><path fill="' +
      i +
      '" d="M336,304.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,304.011,336,304.011z" /><path fill="' +
      i +
      '" d="M336,368.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,368.011,336,368.011z" /><path fill="' +
      i +
      '" d="M432,176.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,176.011,432,176.011z" /><path fill="' +
      i +
      '" d="M432,240.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,240.011,432,240.011z" /><path fill="' +
      i +
      '" d="M432,304.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,304.011,432,304.011z" /><path fill="' +
      i +
      '" d="M432,368.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,368.011,432,368.011z" /><path fill="' +
      i +
      '"  d="M282.208,19.691c-3.648-3.04-8.544-4.352-13.152-3.392l-256,48C5.472,65.707,0,72.299,0,80.011v352 c0,7.68,5.472,14.304,13.056,15.712l256,48c0.96,0.192,1.952,0.288,2.944,0.288c3.712,0,7.328-1.28,10.208-3.68 c3.68-3.04,5.792-7.584,5.792-12.32v-448C288,27.243,285.888,22.731,282.208,19.691z" /><path fill="#FAFAFA" d="M220.032,309.483l-50.592-57.824l51.168-65.792c5.44-6.976,4.16-17.024-2.784-22.464 c-6.944-5.44-16.992-4.16-22.464,2.784l-47.392,60.928l-39.936-45.632c-5.856-6.72-15.968-7.328-22.56-1.504 c-6.656,5.824-7.328,15.936-1.504,22.56l44,50.304L83.36,310.187c-5.44,6.976-4.16,17.024,2.784,22.464 c2.944,2.272,6.432,3.36,9.856,3.36c4.768,0,9.472-2.112,12.64-6.176l40.8-52.48l46.528,53.152 c3.168,3.648,7.584,5.504,12.032,5.504c3.744,0,7.488-1.312,10.528-3.968C225.184,326.219,225.856,316.107,220.032,309.483z" /></svg>'
    );
  }),
  (FamilyTree.icon.edit = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '" viewBox="0 0 528.899 528.899"><path fill="' +
      i +
      '" d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z" /></svg>'
    );
  }),
  (FamilyTree.icon.details = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '" viewBox="0 0 512 512"><path fill="' +
      i +
      '" d="M447.933,103.629c-0.034-3.076-1.224-6.09-3.485-8.352L352.683,3.511c-0.004-0.004-0.007-0.005-0.011-0.008 C350.505,1.338,347.511,0,344.206,0H89.278C75.361,0,64.04,11.32,64.04,25.237v461.525c0,13.916,11.32,25.237,25.237,25.237 h333.444c13.916,0,25.237-11.32,25.237-25.237V103.753C447.96,103.709,447.937,103.672,447.933,103.629z M356.194,40.931 l50.834,50.834h-49.572c-0.695,0-1.262-0.567-1.262-1.262V40.931z M423.983,486.763c0,0.695-0.566,1.261-1.261,1.261H89.278 c-0.695,0-1.261-0.566-1.261-1.261V25.237c0-0.695,0.566-1.261,1.261-1.261h242.94v66.527c0,13.916,11.322,25.239,25.239,25.239 h66.527V486.763z"/><path fill="' +
      i +
      '" d="M362.088,164.014H149.912c-6.62,0-11.988,5.367-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175 c6.62,0,11.988-5.368,11.988-11.988C374.076,169.381,368.707,164.014,362.088,164.014z"/><path fill="' +
      i +
      '" d="M362.088,236.353H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175 c6.62,0,11.988-5.368,11.988-11.988C374.076,241.721,368.707,236.353,362.088,236.353z"/><path fill="' +
      i +
      '" d="M362.088,308.691H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988h212.175 c6.62,0,11.988-5.367,11.988-11.988C374.076,314.06,368.707,308.691,362.088,308.691z"/><path fill="' +
      i +
      '" d="M256,381.031H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988H256 c6.62,0,11.988-5.367,11.988-11.988C267.988,386.398,262.62,381.031,256,381.031z"/></svg>'
    );
  }),
  (FamilyTree.icon.remove = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '"  viewBox="0 0 900.5 900.5"><path fill="' +
      i +
      '" d="M176.415,880.5c0,11.046,8.954,20,20,20h507.67c11.046,0,20-8.954,20-20V232.487h-547.67V880.5L176.415,880.5z M562.75,342.766h75v436.029h-75V342.766z M412.75,342.766h75v436.029h-75V342.766z M262.75,342.766h75v436.029h-75V342.766z"/><path fill="' +
      i +
      '" d="M618.825,91.911V20c0-11.046-8.954-20-20-20h-297.15c-11.046,0-20,8.954-20,20v71.911v12.5v12.5H141.874 c-11.046,0-20,8.954-20,20v50.576c0,11.045,8.954,20,20,20h34.541h547.67h34.541c11.046,0,20-8.955,20-20v-50.576 c0-11.046-8.954-20-20-20H618.825v-12.5V91.911z M543.825,112.799h-187.15v-8.389v-12.5V75h187.15v16.911v12.5V112.799z"/></svg>'
    );
  }),
  (FamilyTree.icon.add = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '"   viewBox="0 0 922 922"><path fill="' +
      i +
      '" d="M922,453V81c0-11.046-8.954-20-20-20H410c-11.045,0-20,8.954-20,20v149h318c24.812,0,45,20.187,45,45v198h149 C913.046,473.001,922,464.046,922,453z" /><path fill="' +
      i +
      '" d="M557,667.001h151c11.046,0,20-8.954,20-20v-174v-198c0-11.046-8.954-20-20-20H390H216c-11.045,0-20,8.954-20,20v149h194 h122c24.812,0,45,20.187,45,45v4V667.001z" /><path fill="' +
      i +
      '" d="M0,469v372c0,11.046,8.955,20,20,20h492c11.046,0,20-8.954,20-20V692v-12.501V667V473v-4c0-11.046-8.954-20-20-20H390H196 h-12.5H171H20C8.955,449,0,457.955,0,469z" /></svg>'
    );
  }),
  (FamilyTree.icon.search = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 485.213 485.213"><path fill="' +
      i +
      '" d="M471.882,407.567L360.567,296.243c-16.586,25.795-38.536,47.734-64.331,64.321l111.324,111.324 c17.772,17.768,46.587,17.768,64.321,0C489.654,454.149,489.654,425.334,471.882,407.567z" /><path fill="' +
      i +
      '" d="M363.909,181.955C363.909,81.473,282.44,0,181.956,0C81.474,0,0.001,81.473,0.001,181.955s81.473,181.951,181.955,181.951 C282.44,363.906,363.909,282.437,363.909,181.955z M181.956,318.416c-75.252,0-136.465-61.208-136.465-136.46 c0-75.252,61.213-136.465,136.465-136.465c75.25,0,136.468,61.213,136.468,136.465 C318.424,257.208,257.206,318.416,181.956,318.416z" /><path fill="' +
      i +
      '" d="M75.817,181.955h30.322c0-41.803,34.014-75.814,75.816-75.814V75.816C123.438,75.816,75.817,123.437,75.817,181.955z" /></svg>'
    );
  }),
  (FamilyTree.icon.xml = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '" viewBox="0 0 550.801 550.801"><path fill="' +
      i +
      '"  d="M488.426,197.019H475.2v-63.816c0-0.401-0.063-0.799-0.116-1.205c-0.021-2.534-0.827-5.023-2.562-6.992L366.325,3.691 c-0.032-0.031-0.063-0.042-0.085-0.073c-0.633-0.707-1.371-1.298-2.151-1.804c-0.231-0.158-0.464-0.287-0.706-0.422 c-0.676-0.366-1.393-0.675-2.131-0.896c-0.2-0.053-0.38-0.135-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.87v160.542 c0,17.044,13.824,30.876,30.873,30.876h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87V227.89C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.51c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M369.531,374.53h-32.058l-2.156-55.519 c-0.644-17.434-1.298-38.518-1.298-59.611h-0.633c-4.514,18.516-10.547,39.166-16.137,56.162l-17.645,56.601h-25.618 l-15.494-56.157c-4.725-16.996-9.671-37.658-13.123-56.6h-0.43c-0.854,19.585-1.508,41.961-2.586,60.038l-2.576,55.086h-30.343 l9.26-145.035h43.677l14.207,48.421c4.517,16.774,9.041,34.847,12.258,51.843h0.654c4.081-16.77,9.038-35.923,13.774-52.064 l15.493-48.199h42.82L369.531,374.53z M69.992,374.53l41.955-73.385l-40.444-71.65h37.655l12.688,26.465 c4.316,8.828,7.533,15.928,10.99,24.092h0.422c3.438-9.242,6.23-15.694,9.893-24.092l12.274-26.465h37.434l-40.89,70.796 l43.044,74.239h-37.866l-13.134-26.257c-5.376-10.108-8.817-17.639-12.909-26.04h-0.433c-3.009,8.401-6.674,15.932-11.19,26.04 l-12.042,26.257H69.992z M453.601,523.353H97.2V419.302h356.4V523.353z M485.325,374.53h-90.608V229.495h32.933v117.497h57.682 v27.538H485.325z"/></svg>'
    );
  }),
  (FamilyTree.icon.link = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '" viewBox="0 0 512.092 512.092"  ><path fill="' +
      i +
      '" d="M312.453,199.601c-6.066-6.102-12.792-11.511-20.053-16.128c-19.232-12.315-41.59-18.859-64.427-18.859 c-31.697-0.059-62.106,12.535-84.48,34.987L34.949,308.23c-22.336,22.379-34.89,52.7-34.91,84.318 c-0.042,65.98,53.41,119.501,119.39,119.543c31.648,0.11,62.029-12.424,84.395-34.816l89.6-89.6 c1.628-1.614,2.537-3.816,2.524-6.108c-0.027-4.713-3.87-8.511-8.583-8.484h-3.413c-18.72,0.066-37.273-3.529-54.613-10.581 c-3.195-1.315-6.867-0.573-9.301,1.877l-64.427,64.512c-20.006,20.006-52.442,20.006-72.448,0 c-20.006-20.006-20.006-52.442,0-72.448l108.971-108.885c19.99-19.965,52.373-19.965,72.363,0 c13.472,12.679,34.486,12.679,47.957,0c5.796-5.801,9.31-13.495,9.899-21.675C322.976,216.108,319.371,206.535,312.453,199.601z" /><path fill="' +
      i +
      '" d="M477.061,34.993c-46.657-46.657-122.303-46.657-168.96,0l-89.515,89.429c-2.458,2.47-3.167,6.185-1.792,9.387 c1.359,3.211,4.535,5.272,8.021,5.205h3.157c18.698-0.034,37.221,3.589,54.528,10.667c3.195,1.315,6.867,0.573,9.301-1.877 l64.256-64.171c20.006-20.006,52.442-20.006,72.448,0c20.006,20.006,20.006,52.442,0,72.448l-80.043,79.957l-0.683,0.768 l-27.989,27.819c-19.99,19.965-52.373,19.965-72.363,0c-13.472-12.679-34.486-12.679-47.957,0 c-5.833,5.845-9.35,13.606-9.899,21.845c-0.624,9.775,2.981,19.348,9.899,26.283c9.877,9.919,21.433,18.008,34.133,23.893 c1.792,0.853,3.584,1.536,5.376,2.304c1.792,0.768,3.669,1.365,5.461,2.048c1.792,0.683,3.669,1.28,5.461,1.792l5.035,1.365 c3.413,0.853,6.827,1.536,10.325,2.133c4.214,0.626,8.458,1.025,12.715,1.195h5.973h0.512l5.12-0.597 c1.877-0.085,3.84-0.512,6.059-0.512h2.901l5.888-0.853l2.731-0.512l4.949-1.024h0.939c20.961-5.265,40.101-16.118,55.381-31.403 l108.629-108.629C523.718,157.296,523.718,81.65,477.061,34.993z" /></svg>'
    );
  }),
  (FamilyTree.icon.happy = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '" viewBox="0 0 512 512"><path fill="' +
      i +
      '" d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,480 C132.288,480,32,379.712,32,256S132.288,32,256,32s224,100.288,224,224S379.712,480,256,480z"/><path fill="' +
      i +
      '" d="M176,176c17.673,0,32,14.327,32,32h32c0-35.346-28.654-64-64-64c-35.346,0-64,28.654-64,64h32 C144,190.327,158.327,176,176,176z"/><path fill="' +
      i +
      '" d="M336,144c-35.346,0-64,28.654-64,64h32c0-17.673,14.327-32,32-32c17.673,0,32,14.327,32,32h32 C400,172.654,371.346,144,336,144z"/><path fill="' +
      i +
      '" d="M256,368c-53.019,0-96-42.981-96-96h-32c0,70.692,57.308,128,128,128s128-57.308,128-128h-32 C352,325.019,309.019,368,256,368z"/></svg>'
    );
  }),
  (FamilyTree.icon.sad = function (e, t, i) {
    return (
      '<svg width="' +
      e +
      '" height="' +
      t +
      '" viewBox="0 0 512 512"><path fill="' +
      i +
      '" d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,480 C132.288,480,32,379.712,32,256S132.288,32,256,32s224,100.288,224,224S379.712,480,256,480z"/><path fill="' +
      i +
      '" d="M336,192c-17.673,0-32-14.327-32-32h-32c0,35.346,28.654,64,64,64c35.346,0,64-28.654,64-64h-32 C368,177.673,353.673,192,336,192z"/><path fill="' +
      i +
      '" d="M176,224c35.346,0,64-28.654,64-64h-32c0,17.673-14.327,32-32,32s-32-14.327-32-32h-32C112,195.346,140.654,224,176,224z "/><path fill="' +
      i +
      '" d="M256,256c-70.692,0-128,57.308-128,128h32c0-53.019,42.981-96,96-96s96,42.981,96,96h32C384,313.308,326.692,256,256,256 z"/></svg>'
    );
  }),
  (FamilyTree.icon.share = function (e, t, i, r, a) {
    return (
      null == r && (r = 0),
      null == a && (a = 0),
      `<svg width="${e}" height="${t}" x="${r}" y="${a}" viewBox="0 0 512 512">\n                <path fill="${i}" d="M406,332c-29.641,0-55.761,14.581-72.167,36.755L191.99,296.124c2.355-8.027,4.01-16.346,4.01-25.124\n                    c0-11.906-2.441-23.225-6.658-33.636l148.445-89.328C354.307,167.424,378.589,180,406,180c49.629,0,90-40.371,90-90\n                    c0-49.629-40.371-90-90-90c-49.629,0-90,40.371-90,90c0,11.437,2.355,22.286,6.262,32.358l-148.887,89.59\n                    C156.869,193.136,132.937,181,106,181c-49.629,0-90,40.371-90,90c0,49.629,40.371,90,90,90c30.13,0,56.691-15.009,73.035-37.806\n                    l141.376,72.395C317.807,403.995,316,412.75,316,422c0,49.629,40.371,90,90,90c49.629,0,90-40.371,90-90\n                    C496,372.371,455.629,332,406,332z"/>\n                </svg>`
    );
  }),
  (FamilyTree.icon.user = function (e, t, i, r, a) {
    return (
      FamilyTree.isNEU(r) && (r = 0),
      FamilyTree.isNEU(a) && (a = 0),
      `<svg width="${e}" height="${t}" x="${r}" y="${a}" viewBox="0 0 24 24">\n                <path fill="${i}" d="M12 11.796C14.7189 11.796 16.9231 9.60308 16.9231 6.89801C16.9231 4.19294 14.7189 2.00005 12 2.00005C9.28106 2.00005 7.07692 4.19294 7.07692 6.89801C7.07692 9.60308 9.28106 11.796 12 11.796Z" fill="#030D45"/>\n                <path fill="${i}" d="M14.5641 13.8369H9.4359C6.46154 13.8369 4 16.2859 4 19.245C4 19.9593 4.30769 20.5716 4.92308 20.8777C5.84615 21.3879 7.89744 22.0001 12 22.0001C16.1026 22.0001 18.1538 21.3879 19.0769 20.8777C19.5897 20.5716 20 19.9593 20 19.245C20 16.1838 17.5385 13.8369 14.5641 13.8369Z" fill="#030D45"/>\n            </svg>`
    );
  }),
  (FamilyTree.icon.close = function (e, t, i, r, a) {
    return (
      null == r && (r = 0),
      null == a && (a = 0),
      `<svg width="${e}" height="${t}" x="${r}" y="${a}" viewBox="0 0 512 512">\n    <path fill="${i}" d="m256 0c-141.49 0-256 114.5-256 256 0 141.49 114.5 256 256 256 141.49 0 256-114.5 256-256 0-141.49-114.5-256-256-256zm-12.284 317.397-58.121 58.132c-6.565 6.553-15.283 10.166-24.557 10.166-19.196 0-34.734-15.526-34.734-34.734 0-9.274 3.612-17.992 10.166-24.557l58.132-58.121c6.785-6.784 6.785-17.783 0-24.568l-58.132-58.121c-6.553-6.565-10.166-15.283-10.166-24.557 0-19.196 15.526-34.734 34.734-34.734 9.274 0 17.992 3.613 24.557 10.166l58.121 58.132c6.785 6.773 17.784 6.773 24.568 0l58.121-58.132c6.565-6.553 15.283-10.166 24.557-10.166 19.196 0 34.734 15.526 34.734 34.734 0 9.274-3.612 17.992-10.166 24.557l-58.132 58.121c-6.785 6.784-6.785 17.783 0 24.568l58.132 58.121c6.553 6.565 10.166 15.283 10.166 24.557 0 19.196-15.526 34.734-34.734 34.734-9.274 0-17.992-3.613-24.557-10.166l-58.121-58.132c-6.784-6.784-17.784-6.773-24.568 0z"/>\n    </svg>`
    );
  }),
  (FamilyTree.icon.undo = function (e, t, i, r, a) {
    return (
      null == r && (r = 0),
      null == a && (a = 0),
      `<svg width="${e}" height="${t}" x="${r}" y="${a}" viewBox="0 0 24 24">\n    <path fill-rule="evenodd" clip-rule="evenodd" fill="${i}" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.7141 22 12C22 7.28598 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM9.25871 7.97395C9.56308 7.693 9.58205 7.21851 9.3011 6.91414C9.02015 6.60978 8.54565 6.5908 8.24129 6.87175L5.99129 8.94867C5.83748 9.09065 5.75 9.29045 5.75 9.49977C5.75 9.7091 5.83748 9.9089 5.99129 10.0509L8.24129 12.1278C8.54565 12.4088 9.02015 12.3898 9.3011 12.0854C9.58205 11.781 9.56308 11.3065 9.25871 11.0256L8.41824 10.2498H14.0385C14.7376 10.2498 15.2069 10.2506 15.5652 10.2862C15.9116 10.3205 16.0724 10.3813 16.1787 10.4501C16.3272 10.5461 16.4537 10.6726 16.5497 10.8211C16.6184 10.9274 16.6793 11.0882 16.7136 11.4345C16.7491 11.7929 16.75 12.2622 16.75 12.9613C16.75 13.6604 16.7491 14.1298 16.7136 14.4881C16.6793 14.8344 16.6185 14.9952 16.5497 15.1015C16.4537 15.2501 16.3272 15.3765 16.1787 15.4726C16.0724 15.5413 15.9116 15.6021 15.5652 15.6365C15.2069 15.672 14.7376 15.6729 14.0385 15.6729H9.5C9.08579 15.6729 8.75 16.0086 8.75 16.4229C8.75 16.8371 9.08579 17.1729 9.5 17.1729H14.0758C14.7279 17.1729 15.2721 17.1729 15.7133 17.1291C16.1748 17.0834 16.6038 16.9839 16.9931 16.7322C17.3199 16.5209 17.5981 16.2427 17.8094 15.916C18.0611 15.5266 18.1605 15.0976 18.2063 14.6361C18.25 14.195 18.25 13.6508 18.25 12.9987V12.924C18.25 12.2718 18.25 11.7276 18.2063 11.2865C18.1605 10.825 18.0611 10.396 17.8093 10.0067C17.5981 9.6799 17.3199 9.40169 16.9931 9.19042C16.6038 8.9387 16.1748 8.83927 15.7133 8.7935C15.2721 8.74975 14.7279 8.74976 14.0758 8.74977L8.41824 8.74977L9.25871 7.97395Z" />\n    <rect style="opacity: 0" x="2" y="2" width="20" height="20"></rect>\n    </svg>`
    );
  }),
  (FamilyTree.icon.redo = function (e, t, i, r, a) {
    return (
      null == r && (r = 0),
      null == a && (a = 0),
      `<svg width="${e}" height="${t}" x="${r}" y="${a}" viewBox="0 0 24 24" >\n    <path fill="#f9f9f9" fill-rule="evenodd" clip-rule="evenodd" fill="${i}" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.7141 22 12C22 7.28598 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM15.7587 6.87273C15.4543 6.59177 14.9799 6.61075 14.6989 6.91512C14.4179 7.21948 14.4369 7.69398 14.7413 7.97493L15.5818 8.75075H9.96155C7.63558 8.75075 5.75 10.6363 5.75 12.9623C5.75 15.2883 7.63557 17.1738 9.96154 17.1738H14.5C14.9142 17.1738 15.25 16.838 15.25 16.4238C15.25 16.0096 14.9142 15.6738 14.5 15.6738H9.96154C8.464 15.6738 7.25 14.4598 7.25 12.9623C7.25 11.4647 8.464 10.2508 9.96155 10.2508H15.5818L14.7413 11.0266C14.4369 11.3075 14.4179 11.782 14.6989 12.0864C14.9799 12.3908 15.4543 12.4097 15.7587 12.1288L18.0087 10.0519C18.1625 9.90987 18.25 9.71007 18.25 9.50075C18.25 9.29143 18.1625 9.09163 18.0087 8.94965L15.7587 6.87273Z"/>\n    <rect style="opacity: 0" x="2" y="2" width="20" height="20"></rect>    \n    </svg>`
    );
  }),
  (FamilyTree.icon.ft = function (e, t, i, r, a) {
    return `<svg width="${e}" height="${t}" x="${r}" y="${a}" viewBox="0 0 512 512"  >\n                <path fill="${i}" d="m336.061 377.731c-5.086-6.54-14.511-7.717-21.049-2.631l-44.012 34.231v-200.331c0-8.284-6.716-15-15-15s-15 6.716-15 15v200.331l-44.011-34.231c-6.538-5.086-15.962-3.908-21.049 2.631-5.086 6.539-3.908 15.963 2.631 21.049l62.429 48.556v49.664c0 8.284 6.716 15 15 15s15-6.716 15-15v-49.664l62.429-48.556c6.54-5.086 7.717-14.51 2.632-21.049z" />\n                <path fill="${i}" d="m271 497v-49.664l62.429-48.556c6.54-5.086 7.717-14.51 2.631-21.049-5.086-6.54-14.511-7.717-21.049-2.631l-44.011 34.231v-200.331c0-8.284-6.716-15-15-15v318c8.284 0 15-6.716 15-15z" />\n                <path fill="${i}" d="m320 512h-128c-8.284 0-15-6.716-15-15s6.716-15 15-15h128c8.284 0 15 6.716 15 15s-6.716 15-15 15z" />\n                <path fill="${i}" d="m320 482h-64v30h64c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />\n                <path fill="${i}" d="m400 439c-61.206 0-111-49.794-111-111s49.794-111 111-111 111 49.794 111 111-49.794 111-111 111z" />\n                <path fill="${i}" d="m112 439c-61.206 0-111-49.794-111-111s49.794-111 111-111 111 49.794 111 111-49.794 111-111 111z" />\n                <path fill="${i}" d="m256 222c-61.206 0-111-49.794-111-111s49.794-111 111-111 111 49.794 111 111-49.794 111-111 111z" />\n                <path fill="${i}" d="m367 111c0-61.206-49.794-111-111-111v222c61.206 0 111-49.794 111-111z" />\n            </svg>`;
  }),
  (FamilyTree.icon.addUser = function (e, t, i, r, a) {
    return (
      FamilyTree.isNEU(r) && (r = 0),
      FamilyTree.isNEU(a) && (a = 0),
      `<svg width="${e}" height="${t}" x="${r}" y="${a}" viewBox="0 0 512 512" >\n                <path fill="${i}" d="M300.434,257.599c-25.945,27.304-60.622,43.875-98.602,43.875c-37.979,0-72.656-16.571-98.602-43.875 c-45.617,28.738-77.826,76.818-85.092,132.736c-1.659,12.77,8.291,24.107,21.201,24.107h225.846 c0-53.371,32.011-99.402,77.838-119.914C330.812,280.165,316.452,267.69,300.434,257.599z"/>\n                <ellipse fill="${i}" cx="201.828" cy="133.868" rx="112.229" ry="133.868"/>\n                <path fill="${i}" d="M396.486,316.885c-53.794,0-97.558,43.764-97.558,97.558S342.693,512,396.486,512c53.792,0,97.557-43.764,97.557-97.558 S450.279,316.885,396.486,316.885z M435.199,431.315h-21.841v21.841c0,9.318-7.554,16.872-16.872,16.872 c-9.318,0-16.872-7.554-16.872-16.872v-21.841h-21.842c-9.318,0-16.872-7.554-16.872-16.872c0-9.319,7.554-16.872,16.872-16.872 h21.842v-21.841c0-9.318,7.554-16.872,16.872-16.872c9.318,0,16.872,7.554,16.872,16.872v21.841h21.841 c9.318,0,16.872,7.554,16.872,16.872C452.072,423.761,444.518,431.315,435.199,431.315z"/>\n            </svg>`
    );
  }),
  (FamilyTree.icon.daughter = function (e, t, i, r, a) {
    return (
      FamilyTree.isNEU(r) && (r = 0),
      FamilyTree.isNEU(a) && (a = 0),
      `<svg width="${e}" height="${t}" x="${r}" y="${a}" viewBox="0 0 512.879 512.879">\n                <path fill="${i}" d="M213.773,238.933c4.71,0,8.533-3.823,8.533-8.533v-5.615c0.546,0.529,0.922,0.964,0.964,1.024 c1.519,2.918,4.497,4.591,7.578,4.591c1.323,0,2.671-0.307,3.934-0.964c4.181-2.176,5.803-7.33,3.627-11.511 c-2.534-4.872-10.581-13.124-24.636-13.124c-14.054,0-22.101,8.252-24.636,13.124c-2.125,4.087-0.555,8.969,3.456,11.23 c4.011,2.287,9.156,0.811,11.563-3.123c0.077-0.128,0.495-0.623,1.084-1.195v5.564 C205.239,235.11,209.062,238.933,213.773,238.933z"/>\n                <path fill="${i}" d="M256.439,332.8c20.028,0,30.507-9.907,31.633-11.034c3.294-3.294,3.285-8.568,0.043-11.913 c-3.234-3.354-8.61-3.439-12.015-0.247c-0.265,0.247-6.699,6.127-19.661,6.127c-12.774,0-19.209-5.709-19.652-6.118 c-3.336-3.251-8.678-3.217-11.981,0.085c-3.337,3.337-3.337,8.73,0,12.066C225.933,322.893,236.412,332.8,256.439,332.8z"/>\n                <path fill="${i}" d="M365.666,293.547c-49.826-66.441-75.093-133.623-75.093-199.68c0-4.71-3.823-8.533-8.533-8.533s-8.533,3.823-8.533,8.533 c0,68.369,25.31,137.489,75.255,205.542c-12.228,21.623-50.483,76.058-92.322,76.058c-45.218,0-86.255-63.59-94.763-80.614 c-8.388-16.768-24.704-66.765-24.704-98.586v-25.754c20.378-0.572,73.404-3.405,121.813-17.246 c4.531-1.289,7.151-6.016,5.854-10.547c-1.289-4.531-6.008-7.159-10.547-5.854C196.254,153.387,129.114,153.6,128.439,153.6 c-4.71,0-8.533,3.823-8.533,8.533v34.133c0,34.935,17.254,87.723,26.496,106.214c0.452,0.905,46.797,90.052,110.037,90.052 s109.585-89.148,110.037-90.052C367.919,299.588,367.603,296.132,365.666,293.547z"/>\n                <path fill="${i}" d="M316.173,392.533c-4.71,0-8.533,3.823-8.533,8.533v17.067c0,0.06,0.034,0.111,0.034,0.171 c0,0.051-0.034,0.094-0.034,0.154c-0.034,5.205-1.749,50.876-51.2,50.876s-51.166-45.986-51.2-51.2v-17.067 c0-4.71-3.823-8.533-8.533-8.533s-8.533,3.823-8.533,8.533v8.687c-116.028,1.638-168.917,35.9-178.765,65.417l-8.533,25.6 c-1.493,4.471,0.93,9.301,5.402,10.795C7.172,511.863,8.085,512,8.973,512c3.575,0,6.903-2.261,8.098-5.837l8.533-25.6 c6.076-18.227,48.034-52.335,163.132-53.845c3.106,24.422,19.721,59.682,67.704,59.682c53.999,0,68.267-44.425,68.267-67.917 c0-0.06-0.034-0.111-0.034-0.171c0-0.068,0.034-0.119,0.034-0.179v-17.067C324.706,396.356,320.883,392.533,316.173,392.533z"/>\n                <path fill="${i}" d="M256.695,273.067h-0.085c-4.71,0-8.491,3.823-8.491,8.533c0,4.71,3.866,8.533,8.576,8.533 c4.719,0,8.533-3.823,8.533-8.533C265.229,276.89,261.414,273.067,256.695,273.067z"/>\n                <path fill="${i}" d="M512.004,501.641l-8.533-25.591c-4.659-13.978-22.34-28.228-49.792-40.141c-4.318-1.877-9.352,0.102-11.23,4.429 c-1.869,4.318,0.111,9.353,4.437,11.221c26.266,11.401,38.178,23.219,40.388,29.884l8.533,25.6 c1.195,3.575,4.523,5.837,8.098,5.837c0.887,0,1.801-0.145,2.697-0.444C511.074,510.942,513.498,506.112,512.004,501.641z"/>\n                <path fill="${i}" d="M256.439,0c-115.558,0-179.2,63.642-179.2,179.2V256c0,66.039-24.909,141.611-25.165,142.37 c-1.485,4.471,0.93,9.301,5.402,10.795c4.48,1.476,9.301-0.93,10.795-5.402c1.058-3.191,26.035-78.908,26.035-147.763v-76.8 c0-134.008,88.175-162.133,162.133-162.133c100.454,0,162.133,94.43,162.133,162.133v17.067 c0,34.458-21.111,74.163-41.532,112.572c-18.133,34.116-35.268,66.338-35.268,92.228c0,54.11,35.14,89.873,36.634,91.366 c1.596,1.604,3.772,2.5,6.033,2.5c2.261,0,4.437-0.896,6.033-2.5c1.493-1.493,36.634-37.257,36.634-91.366 c0-53.197-17.562-72.303-19.567-74.3c-3.285-3.285-8.559-3.285-11.904-0.051c-3.354,3.234-3.439,8.61-0.265,12.015 c0.145,0.154,14.669,16.256,14.669,62.336c0,33.937-16.444,60.16-25.617,72.149c-9.19-11.947-25.583-38.05-25.583-72.149 c0-21.632,16.162-52.036,33.271-84.215c21.402-40.252,43.529-81.869,43.529-120.585V179.2C435.639,94.438,362.04,0,256.439,0z"/>\n            </svg>`
    );
  }),
  (FamilyTree.icon.son = function (e, t, i, r, a) {
    return (
      FamilyTree.isNEU(r) && (r = 0),
      FamilyTree.isNEU(a) && (a = 0),
      `<svg width="${e}" height="${t}" x="${r}" y="${a}"  viewBox="0 0 512.002 512.002">\n                <path fill="${i}" d="M238.934,213.334c0-4.71-3.823-8.533-8.533-8.533h-34.133c-4.71,0-8.533,3.823-8.533,8.533 c0,4.71,3.823,8.533,8.533,8.533h8.533c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533h8.533 C235.111,221.867,238.934,218.044,238.934,213.334z"/>\n                <path fill="${i}" d="M121.601,255.19c4.565,13.466,17.178,49.98,24.371,64.358c13.551,27.11,51.977,72.986,110.029,72.986 s96.478-45.875,110.037-72.986c7.185-14.379,19.797-50.893,24.371-64.358c11.025-2.85,19.191-12.885,19.191-24.789v-34.133 c0-11.127-7.134-20.617-17.067-24.141v-44.126c0-33.69-17.741-95.923-83.354-101.931c-0.137-4.028-1.476-7.27-2.953-9.668 c-8.38-13.559-31.94-16.401-50.227-16.401c-151.842,0-153.6,143.616-153.6,145.067c0,4.71,3.814,8.525,8.525,8.525h0.009 c4.702,0,8.525-3.806,8.533-8.516c0.017-5.222,1.937-128.009,136.533-128.009c24.132,0,33.801,5.222,35.703,8.311 c0.282,0.435,0.998,1.604-0.666,4.941c-1.323,2.645-1.178,5.786,0.375,8.303c1.553,2.509,4.301,4.045,7.253,4.045 c75.656,0,76.791,81.86,76.8,85.333v51.2c0,4.71,3.823,8.533,8.533,8.533c4.702,0,8.533,3.831,8.533,8.533v34.133 c0,4.702-3.831,8.533-8.533,8.533c-3.669,0-6.929,2.347-8.098,5.837c-0.162,0.503-16.964,50.816-25.131,67.149 c-1.297,2.594-32.495,63.548-94.771,63.548s-93.466-60.954-94.763-63.548c-8.166-16.333-24.977-66.645-25.139-67.149 c-1.161-3.49-4.42-5.837-8.098-5.837c-4.702,0-8.533-3.831-8.533-8.533v-34.133c0-2.313,0.93-4.412,2.423-5.948 c3.396,7.62,10.607,14.481,23.177,14.481c3.234,0,6.187-1.826,7.637-4.719c7.535-15.061,15.283-30.575,17.399-46.652 c43.665-1.758,108.979-17.323,139.742-41.105c8.201,29.764,32.742,54.596,33.988,55.842c3.337,3.337,8.738,3.337,12.066,0 c3.337-3.336,3.337-8.73,0-12.066c-0.316-0.316-31.633-31.983-31.633-62.234c0-3.831-2.56-7.202-6.255-8.226 c-3.703-1.024-7.62,0.546-9.591,3.831c-14.549,24.243-94.746,47.061-146.287,47.061c-4.71,0-8.533,3.823-8.533,8.533 c0,13.295-6.127,27.102-13.286,41.6c-2.901-1.604-3.703-4.753-3.78-7.467c0-4.71-3.823-8.533-8.533-8.533 c-14.114,0-25.6,11.486-25.6,25.6v34.133C102.401,242.305,110.576,252.34,121.601,255.19z"/>\n                <path fill="${i}" d="M256.001,332.801c20.028,0,30.507-9.907,31.633-11.034c3.294-3.294,3.285-8.567,0.051-11.913 c-3.243-3.354-8.619-3.439-12.023-0.247c-0.265,0.247-6.699,6.127-19.661,6.127c-12.774,0-19.209-5.709-19.652-6.118 c-3.336-3.251-8.678-3.217-11.981,0.085c-3.328,3.337-3.328,8.73,0,12.066C225.503,322.893,235.982,332.801,256.001,332.801z"/>\n                <path fill="${i}" d="M264.79,281.601c0-4.71-3.814-8.533-8.533-8.533h-0.085c-4.71,0-8.491,3.823-8.491,8.533c0,4.71,3.866,8.533,8.576,8.533 C260.976,290.134,264.79,286.311,264.79,281.601z"/>\n                <path fill="${i}" d="M511.745,501.394l-8.713-34.756c-4.386-13.158-30.285-55.484-178.765-56.636v-8.934c0-4.71-3.823-8.533-8.533-8.533 s-8.533,3.823-8.533,8.533v17.067c0,0.06,0.034,0.111,0.034,0.171c0,0.051-0.034,0.094-0.034,0.154 c-0.034,5.205-1.749,50.876-51.2,50.876s-51.166-45.986-51.2-51.2v-17.067c0-4.71-3.823-8.533-8.533-8.533 s-8.533,3.823-8.533,8.533v8.619C77.168,410.556,21.786,428.203,8.79,467.26l-8.533,34.133 c-1.143,4.574,1.638,9.207,6.212,10.351c4.557,1.143,9.199-1.638,10.342-6.204l8.354-33.51 c9.916-29.739,63.309-44.595,163.132-45.338c3.098,24.431,19.712,59.708,67.704,59.708c47.983,0,64.597-35.063,67.703-59.366 c116.958,0.862,157.628,28.467,162.953,44.373l8.533,34.133c0.973,3.874,4.446,6.46,8.269,6.46c0.691,0,1.382-0.077,2.082-0.256 C510.115,510.601,512.888,505.968,511.745,501.394z"/>\n                <path fill="${i}" d="M298.668,230.401c4.71,0,8.533-3.823,8.533-8.533h8.533c4.71,0,8.533-3.823,8.533-8.533c0-4.71-3.823-8.533-8.533-8.533 h-34.133c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533h8.533 C290.134,226.578,293.957,230.401,298.668,230.401z"/>\n            </svg>`
    );
  }),
  (FamilyTree.icon.wife = function (e, t, i, r, a) {
    return (
      FamilyTree.isNEU(r) && (r = 0),
      FamilyTree.isNEU(a) && (a = 0),
      `<svg width="${e}" height="${t}" x="${r}" y="${a}" viewBox="0 0 512 512" >\n                <path fill="${i}" d="M128,307.2c4.719,0,8.533-3.823,8.533-8.533V281.6c0-4.71-3.814-8.533-8.533-8.533c-4.719,0-8.533,3.823-8.533,8.533 v17.067C119.467,303.377,123.281,307.2,128,307.2z"/>\n                <path fill="${i}" d="M384,273.067c-4.719,0-8.533,3.823-8.533,8.533v17.067c0,4.71,3.814,8.533,8.533,8.533c4.719,0,8.533-3.823,8.533-8.533 V281.6C392.533,276.89,388.719,273.067,384,273.067z"/>\n                <path fill="${i}" d="M392.183,433.109c-0.162-0.606-0.418-1.152-0.7-1.715c-0.162-0.299-0.196-0.64-0.384-0.93 c-0.094-0.128-0.23-0.196-0.324-0.324c-0.358-0.469-0.802-0.845-1.254-1.246c-0.418-0.375-0.819-0.742-1.306-1.016 c-0.145-0.094-0.23-0.23-0.392-0.316l-34.133-17.067c-2.748-1.357-6.008-1.161-8.55,0.538l-51.209,34.133 c-2.372,1.587-3.797,4.25-3.797,7.1v30.259c-5.077,4.062-17.545,12.407-34.133,12.407c-16.427,0-29.013-8.388-34.133-12.433 v-30.234c0-2.85-1.425-5.513-3.797-7.1l-51.2-34.133c-2.543-1.698-5.803-1.894-8.55-0.538l-34.133,17.067 c-0.154,0.077-0.239,0.213-0.375,0.299c-0.512,0.29-0.939,0.674-1.374,1.075c-0.435,0.384-0.853,0.734-1.186,1.178 c-0.102,0.137-0.256,0.213-0.35,0.35c-0.205,0.307-0.239,0.657-0.401,0.99c-0.265,0.529-0.521,1.05-0.674,1.63 c-0.137,0.529-0.179,1.05-0.205,1.596c-0.034,0.538-0.06,1.058,0.008,1.604c0.068,0.597,0.265,1.143,0.461,1.707 c0.119,0.341,0.111,0.7,0.273,1.024c0.077,0.154,0.222,0.247,0.307,0.393c0.282,0.495,0.666,0.913,1.058,1.348 c0.384,0.427,0.742,0.853,1.186,1.195c0.137,0.102,0.213,0.256,0.35,0.35l51.2,34.133c1.459,0.973,3.106,1.434,4.727,1.434 c2.756,0,5.47-1.331,7.108-3.797c2.62-3.925,1.562-9.225-2.364-11.836l-38.972-25.975l16.555-8.277l43.281,28.851V486.4 c0,2.261,0.896,4.437,2.5,6.033C208.102,493.235,227.2,512,256,512s47.898-18.765,48.7-19.567c1.604-1.596,2.5-3.772,2.5-6.033 v-29.568l43.29-28.851l16.546,8.277l-38.972,25.975c-3.925,2.611-4.983,7.91-2.364,11.836c1.638,2.466,4.352,3.797,7.108,3.797 c1.621,0,3.268-0.461,4.727-1.434l51.2-34.133c0.137-0.094,0.205-0.239,0.333-0.341c0.478-0.35,0.853-0.794,1.254-1.246 c0.358-0.427,0.725-0.811,0.998-1.289c0.085-0.154,0.239-0.247,0.324-0.41c0.171-0.35,0.171-0.725,0.29-1.084 c0.179-0.538,0.367-1.05,0.435-1.613c0.077-0.58,0.051-1.126,0.009-1.698C392.354,434.108,392.32,433.613,392.183,433.109z"/>\n                <path fill="${i}" d="M57.037,409.165c0.896,0.29,1.809,0.435,2.697,0.435c3.575,0,6.903-2.261,8.09-5.837 C68.89,400.572,93.867,324.855,93.867,256v-76.8C93.867,45.193,182.033,17.067,256,17.067c25.199,0,77.636,0,85.649,11.128 c0.333,0.452,0.828,1.135,0.128,3.243c-0.956,2.842-0.341,5.965,1.604,8.235c1.946,2.278,4.932,3.362,7.885,2.876 c10.863-1.792,20.412,0.93,29.184,8.354c22.895,19.396,37.683,69.76,37.683,128.299V256c0,77.457,25.071,145.22,26.138,148.062 c1.656,4.412,6.571,6.639,10.991,5.001c4.412-1.655,6.647-6.571,5.001-10.991C460.006,397.406,435.2,330.257,435.2,256v-76.8 c0-50.415-11.486-114.014-43.716-141.321c-9.745-8.243-20.932-12.621-32.836-12.902c-0.683-2.773-1.903-5.035-3.149-6.767 C343.356,1.374,303.258,0,256,0C140.442,0,76.8,63.642,76.8,179.2V256c0,66.039-24.909,141.611-25.156,142.37 C50.15,402.842,52.565,407.672,57.037,409.165z"/>\n                <path fill="${i}" d="M91.802,426.923C19.814,444.919,1.195,498.492,0.444,500.77c-1.493,4.471,0.922,9.301,5.393,10.795 C6.733,511.864,7.646,512,8.533,512c3.576,0,6.904-2.261,8.09-5.837c0.162-0.469,16.316-46.942,79.309-62.686 c4.574-1.143,7.356-5.777,6.212-10.351C101.001,428.561,96.367,425.771,91.802,426.923z"/>\n                <path fill="${i}" d="M213.333,238.933c4.719,0,8.533-3.823,8.533-8.533v-5.615c0.546,0.529,0.922,0.964,0.964,1.024 c1.519,2.918,4.497,4.591,7.578,4.591c1.323,0,2.671-0.307,3.934-0.964c4.173-2.176,5.803-7.33,3.627-11.511 c-2.534-4.873-10.59-13.124-24.636-13.124c-14.046,0-22.101,8.252-24.636,13.124c-2.125,4.087-0.546,8.969,3.456,11.23 c3.985,2.261,9.148,0.819,11.554-3.123c0.085-0.128,0.503-0.623,1.092-1.195v5.564C204.8,235.11,208.614,238.933,213.333,238.933 z"/>\n                <path fill="${i}" d="M511.556,500.77c-0.751-2.278-19.371-55.851-91.358-73.847c-4.574-1.161-9.199,1.638-10.342,6.204 c-1.143,4.574,1.638,9.207,6.212,10.351c62.524,15.633,78.66,60.809,79.309,62.686c1.186,3.576,4.514,5.837,8.09,5.837 c0.888,0,1.801-0.137,2.697-0.435C510.635,510.071,513.05,505.242,511.556,500.77z"/>\n                <path fill="${i}" d="M256,332.8c20.028,0,30.507-9.907,31.633-11.034c3.294-3.294,3.285-8.567,0.051-11.913 c-3.251-3.345-8.61-3.439-12.015-0.247c-0.273,0.247-6.707,6.127-19.669,6.127c-12.774,0-19.208-5.709-19.652-6.118 c-3.32-3.251-8.67-3.226-11.981,0.085c-3.337,3.337-3.337,8.73,0,12.066C225.493,322.893,235.972,332.8,256,332.8z"/>\n                <path fill="${i}" d="M298.667,238.933c4.719,0,8.533-3.823,8.533-8.533v-5.615c0.546,0.529,0.922,0.964,0.964,1.024 c1.519,2.918,4.497,4.591,7.578,4.591c1.323,0,2.671-0.307,3.934-0.964c4.173-2.176,5.803-7.33,3.627-11.511 c-2.534-4.873-10.59-13.124-24.636-13.124c-14.046,0-22.101,8.252-24.636,13.124c-2.125,4.087-0.546,8.969,3.456,11.23 c3.994,2.261,9.156,0.819,11.554-3.123c0.085-0.128,0.503-0.623,1.092-1.195v5.564 C290.133,235.11,293.948,238.933,298.667,238.933z"/>\n                <path fill="${i}" d="M389.129,189.449c-8.542-6.443-30.729-26.957-30.729-44.382c0-4.71-3.814-8.533-8.533-8.533s-8.533,3.823-8.533,8.533 c0,24.678,24.354,47.249,34.014,55.228c-1.835,33.476-24.917,95.223-33.118,111.625c-7.654,15.317-48.154,63.548-86.229,63.548 s-78.575-48.23-86.229-63.548c-8.542-17.084-33.237-83.379-33.237-115.652v-25.728c33.835-0.802,157.321-6.929,218.453-52.779 c3.772-2.825,4.54-8.175,1.707-11.947c-2.825-3.772-8.175-4.54-11.947-1.707C279.561,152.994,129.51,153.6,128,153.6 c-4.719,0-8.533,3.823-8.533,8.533v34.133c0,36.625,26.871,106.965,35.029,123.281c10.385,20.77,55.834,72.986,101.504,72.986 s91.119-52.216,101.504-72.986c8.158-16.316,35.029-86.656,35.029-123.281C392.533,193.587,391.27,191.061,389.129,189.449z"/>\n            </svg>`
    );
  }),
  (FamilyTree.icon.husband = function (e, t, i, r, a) {
    return (
      FamilyTree.isNEU(r) && (r = 0),
      FamilyTree.isNEU(a) && (a = 0),
      `<svg width="${e}" height="${t}" x="${r}" y="${a}" viewBox="0 0 512.007 512.007" >\n                <path fill="${i}" d="M121.835,255.249c6.229,16.196,26.803,68.42,41.737,90.82l1.348,2.039c10.957,16.614,29.295,44.425,91.085,44.425 c61.79,0,80.128-27.81,91.085-44.425l1.348-2.039c14.933-22.4,35.507-74.624,41.737-90.82c11.145-2.773,19.43-12.86,19.43-24.849 v-34.133c0-11.127-7.134-20.617-17.067-24.141V128c0-33.69-17.741-95.923-83.362-101.931c-0.128-4.028-1.459-7.27-2.944-9.668 C297.844,2.85,274.292,0,256.005,0c-151.842,0-153.6,143.616-153.6,145.067c0,4.71,3.814,8.525,8.516,8.525h0.017 c4.702,0,8.516-3.806,8.533-8.508c0.017-5.231,1.937-128.017,136.533-128.017c24.132,0,33.801,5.222,35.712,8.311 c0.265,0.435,0.99,1.604-0.683,4.941c-1.323,2.645-1.178,5.786,0.375,8.303c1.562,2.509,4.301,4.045,7.262,4.045 c75.657,0,76.791,81.86,76.8,85.333v51.2c0,4.71,3.814,8.533,8.533,8.533c4.71,0,8.533,3.831,8.533,8.533V230.4 c0,4.702-3.823,8.533-8.533,8.533c-3.558,0-6.741,2.21-7.996,5.538c-0.247,0.674-25.446,67.644-41.771,92.126l-1.399,2.116 c-10.223,15.514-24.235,36.753-76.834,36.753c-52.599,0-66.611-21.239-76.834-36.753l-1.399-2.116 c-16.324-24.482-41.523-91.452-41.771-92.126c-1.254-3.328-4.437-5.538-7.996-5.538c-4.71,0-8.533-3.831-8.533-8.533v-34.133 c0-2.313,0.922-4.412,2.423-5.948c3.089,6.955,9.421,13.21,20.053,14.268l29.193,21.897c2.27,16.623,16.418,29.517,33.664,29.517 h17.067c18.825,0,34.133-15.309,34.133-34.133c0,18.825,15.309,34.133,34.133,34.133h17.067 c17.237,0,31.394-12.894,33.664-29.517l31.189-23.39c3.772-2.825,4.54-8.175,1.707-11.947c-2.825-3.772-8.175-4.548-11.947-1.707 l-21.751,16.316c-3.251-10.402-12.86-18.022-24.329-18.022h-34.133c-14.114,0-25.6,11.486-25.6,25.6 c0-14.114-11.486-25.6-25.6-25.6h-34.133c-11.469,0-21.077,7.62-24.328,18.022l-16.282-12.211 c6.716-16.23,12.8-40.235,14.524-57.088c26.897-0.478,104.713-3.763,139.332-25.37c7.851,30.31,33.058,55.817,34.321,57.08 c3.336,3.336,8.73,3.336,12.066,0c3.336-3.337,3.336-8.73,0-12.066c-0.316-0.316-31.633-31.983-31.633-62.234 c0-3.831-2.56-7.202-6.255-8.226c-3.661-1.016-7.629,0.546-9.591,3.831c-12.425,20.693-93.022,29.995-146.287,29.995 c-4.719,0-8.533,3.823-8.533,8.533c0,13.858-6.554,41.515-13.508,58.539c-2.722-1.638-3.49-4.693-3.558-7.339 c0-4.71-3.814-8.533-8.533-8.533c-14.114,0-25.6,11.486-25.6,25.6V230.4C102.405,242.389,110.691,252.476,121.835,255.249z M273.071,213.333c0-4.702,3.823-8.533,8.533-8.533h34.133c4.71,0,8.533,3.831,8.533,8.533v8.533 c0,9.412-7.654,17.067-17.067,17.067h-17.067c-9.412,0-17.067-7.654-17.067-17.067V213.333z M187.738,213.333 c0-4.702,3.823-8.533,8.533-8.533h34.133c4.71,0,8.533,3.831,8.533,8.533v8.533c0,9.412-7.654,17.067-17.067,17.067h-17.067 c-9.412,0-17.067-7.654-17.067-17.067V213.333z"/>\n                <path fill="${i}" d="M298.663,307.226c0.009-4.702-3.797-8.533-8.499-8.559c-0.162,0-15.42-0.171-30.345-7.629 c-2.398-1.203-5.231-1.203-7.629,0c-14.925,7.458-30.182,7.629-30.319,7.629c-4.719,0-8.533,3.823-8.533,8.533 s3.814,8.533,8.533,8.533c0.725,0,16.853-0.094,34.133-7.646c17.28,7.552,33.408,7.646,34.133,7.646 C294.84,315.733,298.646,311.927,298.663,307.226z"/>\n                <path fill="${i}" d="M247.471,324.267c-4.719,0-8.533,3.823-8.533,8.533c0,4.71,3.814,8.533,8.533,8.533h17.067 c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533H247.471z"/>\n                <path fill="${i}" d="M511.749,501.393l-8.721-34.756c-12.706-38.135-73.114-56.687-184.67-56.687c-0.879,0-1.758,0-2.645,0.009 c-4.053,0.009-7.544,2.867-8.337,6.852l-17.067,84.975c-0.93,4.625,2.065,9.122,6.682,10.052 c4.608,0.896,9.114-2.074,10.044-6.69l15.693-78.114c97.724,0.452,154.436,15.957,163.934,44.373l8.533,34.133 c0.973,3.874,4.446,6.468,8.269,6.46c0.683,0,1.382-0.077,2.074-0.256C510.11,510.601,512.892,505.976,511.749,501.393z"/>\n                <path fill="${i}" d="M204.634,416.461c-0.794-3.994-4.292-6.861-8.363-6.861c-116.386,0-174.148,17.596-187.477,57.66l-8.533,34.133 c-1.152,4.582,1.638,9.207,6.212,10.351C7.164,511.923,7.864,512,8.547,512c3.823,0,7.296-2.586,8.269-6.46l8.346-33.51 c9.95-29.841,63.667-44.689,164.122-45.338l15.693,78.447c0.913,4.617,5.367,7.629,10.035,6.699 c4.617-0.93,7.62-5.427,6.69-10.044L204.634,416.461z"/>\n                <path fill="${i}" d="M256.005,409.6c-14.114,0-25.6,11.486-25.6,25.6c0,11.11,7.159,20.489,17.067,24.021v44.245 c0,4.71,3.814,8.533,8.533,8.533c4.719,0,8.533-3.823,8.533-8.533V459.23c9.907-3.541,17.067-12.919,17.067-24.03 C281.605,421.086,270.119,409.6,256.005,409.6z M256.005,443.733c-4.71,0-8.533-3.831-8.533-8.533 c0-4.702,3.823-8.533,8.533-8.533c4.71,0,8.533,3.831,8.533,8.533C264.538,439.902,260.715,443.733,256.005,443.733z"/>\n            </svg>`
    );
  }),
  (FamilyTree.icon.father = function (e, t, i, r, a) {
    return (
      FamilyTree.isNEU(r) && (r = 0),
      FamilyTree.isNEU(a) && (a = 0),
      `<svg width="${e}" height="${t}" x="${r}" y="${a}" viewBox="0 0 512.002 512.002" >\n                <path fill="${i}" d="M366.934,128.001c0-4.71-3.814-8.533-8.533-8.533c-2.091,0-51.2-0.683-51.2-59.733c0-4.71-3.814-8.533-8.533-8.533 s-8.533,3.823-8.533,8.533c0,75.921,67.584,76.8,68.267,76.8C363.12,136.534,366.934,132.711,366.934,128.001z"/>\n                <path fill="${i}" d="M256.001,196.268c0-14.114-11.486-25.6-25.6-25.6h-34.133c-11.46,0-21.069,7.62-24.329,18.022l-21.751-16.316 c-3.772-2.825-9.114-2.048-11.947,1.707c-2.825,3.772-2.065,9.122,1.707,11.947l31.189,23.39 c2.278,16.623,16.418,29.517,33.664,29.517h17.067c18.825,0,34.133-15.309,34.133-34.133c0,18.825,15.309,34.133,34.133,34.133 h17.067c17.237,0,31.394-12.894,33.664-29.517l31.189-23.39c3.772-2.825,4.54-8.175,1.707-11.947 c-2.825-3.772-8.175-4.548-11.947-1.707l-21.751,16.316c-3.251-10.402-12.86-18.022-24.329-18.022h-34.133 C267.487,170.668,256.001,182.153,256.001,196.268z M238.934,204.801c0,9.412-7.654,17.067-17.067,17.067h-17.067 c-9.412,0-17.067-7.654-17.067-17.067v-8.533c0-4.702,3.831-8.533,8.533-8.533h34.133c4.702,0,8.533,3.831,8.533,8.533V204.801z M324.268,196.268v8.533c0,9.412-7.654,17.067-17.067,17.067h-17.067c-9.412,0-17.067-7.654-17.067-17.067v-8.533 c0-4.702,3.823-8.533,8.533-8.533h34.133C320.445,187.734,324.268,191.566,324.268,196.268z"/>\n                <path fill="${i}" d="M298.659,307.226c0.009-4.702-3.797-8.533-8.499-8.559c-0.162,0-15.42-0.171-30.345-7.629 c-2.398-1.203-5.231-1.203-7.629,0c-14.925,7.458-30.191,7.629-30.319,7.629c-4.71,0-8.533,3.823-8.533,8.533 s3.823,8.533,8.533,8.533c0.725,0,16.845-0.094,34.133-7.646c17.28,7.552,33.408,7.646,34.133,7.646 C294.836,315.734,298.642,311.928,298.659,307.226z"/>\n                <path fill="${i}" d="M120.986,237.953c4.378,18.611,18.91,76.877,34.048,99.584c10.974,16.452,36.668,54.997,100.966,54.997 s89.993-38.545,100.966-54.997c15.138-22.707,29.67-80.973,34.048-99.584c10.718-3.055,18.586-12.937,18.586-24.619v-34.133 c0-11.127-7.134-20.617-17.067-24.141v-44.126c0-1.109-1.562-110.933-136.533-110.933c-151.842,0-153.6,126.72-153.6,128 c0,4.702,3.806,8.516,8.516,8.525h0.017c4.693,0,8.516-3.806,8.533-8.499c0.017-4.54,2.048-110.959,136.533-110.959 c117.581,0,119.441,90.061,119.467,93.867v51.2c0,4.71,3.814,8.533,8.533,8.533c4.71,0,8.533,3.831,8.533,8.533v34.133 c0,4.702-3.823,8.533-8.533,8.533c-4.002,0-7.458,2.782-8.337,6.682c-0.162,0.751-16.896,75.52-32.896,99.516 c-10.257,15.386-31.599,47.403-86.767,47.403s-76.51-32.017-86.767-47.403c-15.992-23.979-32.734-98.765-32.905-99.516 c-0.87-3.9-4.326-6.682-8.329-6.682c-4.702,0-8.533-3.831-8.533-8.533v-34.133c0-4.702,3.831-8.533,8.533-8.533 c1.323,0,2.637-0.307,3.814-0.896c2.978-1.493,72.986-37.333,72.986-110.037c0-4.71-3.823-8.533-8.533-8.533 s-8.533,3.823-8.533,8.533c0,56.678-52.523,88.636-62.08,93.978c-13.022,1.186-23.253,12.169-23.253,25.489v34.133 C102.401,225.016,110.269,234.898,120.986,237.953z"/>\n                <path fill="${i}" d="M196.097,416.462c-0.794-3.994-4.292-6.861-8.363-6.861c-140.399,0-168.892,27.409-178.944,57.66l-8.533,34.133 c-1.143,4.582,1.638,9.207,6.204,10.351c0.7,0.179,1.391,0.256,2.082,0.256c3.823,0,7.296-2.586,8.269-6.46l8.354-33.51 c7.339-22.025,31.718-44.527,155.58-45.338l15.693,78.447c0.913,4.617,5.393,7.603,10.035,6.699 c4.625-0.93,7.62-5.427,6.69-10.044L196.097,416.462z"/>\n                <path fill="${i}" d="M511.745,501.394l-8.721-34.756c-7.117-21.342-39.689-57.216-178.782-56.678c-4.062,0.009-7.544,2.867-8.337,6.852 l-17.067,84.975c-0.93,4.625,2.065,9.122,6.682,10.052c4.591,0.896,9.114-2.074,10.044-6.69l15.693-78.114 c103.714,0.674,148.412,23.484,155.401,44.373l8.533,34.133c0.973,3.874,4.446,6.468,8.269,6.46c0.683,0,1.382-0.077,2.074-0.256 C510.106,510.601,512.888,505.976,511.745,501.394z"/>\n                <path fill="${i}" d="M256.257,426.668h-0.085c-4.71,0-8.491,3.823-8.491,8.533s3.866,8.533,8.576,8.533c4.71,0,8.533-3.823,8.533-8.533 S260.967,426.668,256.257,426.668z"/>\n                <path fill="${i}" d="M256.257,494.934h-0.085c-4.71,0-8.491,3.823-8.491,8.533s3.866,8.533,8.576,8.533c4.71,0,8.533-3.823,8.533-8.533 S260.967,494.934,256.257,494.934z"/>\n                <path fill="${i}" d="M247.468,324.268c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533h17.067 c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533H247.468z"/>\n                <path fill="${i}" d="M256.257,460.801h-0.085c-4.71,0-8.491,3.823-8.491,8.533c0,4.71,3.866,8.533,8.576,8.533 c4.71,0,8.533-3.823,8.533-8.533C264.79,464.624,260.967,460.801,256.257,460.801z"/>\n            </svg>`
    );
  }),
  (FamilyTree.icon.mother = function (e, t, i, r, a) {
    return (
      FamilyTree.isNEU(r) && (r = 0),
      FamilyTree.isNEU(a) && (a = 0),
      `<svg width="${e}" height="${t}" x="${r}" y="${a}" viewBox="0 0 512.011 512.011" >\n                <path fill="${i}" d="M299.355,445.356c-1.621,1.536-2.56,3.755-2.56,5.973c0,2.304,0.939,4.437,2.56,6.059 c1.536,1.621,3.755,2.475,5.973,2.475c2.304,0,4.523-0.853,6.059-2.475c1.621-1.536,2.475-3.755,2.475-6.059 c0-2.219-0.853-4.437-2.475-5.973C308.23,442.113,302.512,442.199,299.355,445.356z"/>\n                <path fill="${i}" d="M276.23,458.668c-1.621,1.621-2.475,3.755-2.475,6.059c0,2.219,0.939,4.437,2.475,5.973 c1.621,1.621,3.84,2.56,6.059,2.56c2.219,0,4.437-0.939,5.973-2.56c1.621-1.536,2.56-3.755,2.56-5.973 c0-2.304-0.939-4.437-2.56-6.059C285.104,455.511,279.387,455.511,276.23,458.668z"/>\n                <path fill="${i}" d="M392.539,196.268c0-2.68-1.263-5.205-3.405-6.818c-8.55-6.443-30.729-26.957-30.729-44.382 c0-4.71-3.823-8.533-8.533-8.533s-8.533,3.823-8.533,8.533c0,24.678,24.354,47.249,34.014,55.228 c-1.835,33.476-24.917,95.223-33.118,111.625c-7.654,15.317-48.154,63.548-86.229,63.548s-78.575-48.23-86.229-63.548 c-8.542-17.084-33.237-83.379-33.237-115.652V170.54c33.835-0.802,157.321-6.929,218.453-52.779 c3.772-2.825,4.531-8.175,1.707-11.947c-2.825-3.763-8.166-4.531-11.947-1.707c-65.186,48.887-215.236,49.493-216.747,49.493 c-4.71,0-8.533,3.823-8.533,8.533v34.133c0,36.625,26.871,106.965,35.029,123.281c10.394,20.77,55.834,72.986,101.504,72.986 s91.11-52.215,101.504-72.986C365.668,303.233,392.539,232.893,392.539,196.268z"/>\n                <path fill="${i}" d="M249.947,463.276c-1.536,1.621-2.475,3.84-2.475,6.059c0,2.219,0.939,4.437,2.475,6.059 c1.621,1.536,3.84,2.475,6.059,2.475s4.437-0.939,6.059-2.475c1.536-1.621,2.475-3.84,2.475-6.059 c0-2.219-0.939-4.437-2.475-6.059C258.907,460.119,253.104,460.119,249.947,463.276z"/>\n                <path fill="${i}" d="M34.139,230.401c0,18.85,6.75,36.659,19.098,50.688c-1.348,5.76-2.031,11.648-2.031,17.579 c0,42.342,34.458,76.8,76.8,76.8c6.494,0,12.954-0.819,19.191-2.432c4.565-1.178,7.305-5.828,6.127-10.394 c-1.178-4.565-5.828-7.305-10.394-6.127c-4.847,1.254-9.865,1.886-14.925,1.886c-32.939,0-59.733-26.795-59.733-59.733 c0-5.922,0.879-11.793,2.603-17.459c0.922-3.021,0.102-6.298-2.133-8.525c-11.307-11.298-17.536-26.308-17.536-42.283 c0-19.251,9.421-37.453,25.199-48.674c3.78-2.688,4.719-7.893,2.116-11.742c-6.707-9.89-10.249-21.461-10.249-33.451 c0-28.843,20.591-53.53,48.947-58.701c2.432-0.452,4.557-1.929,5.811-4.053c18.987-32.137,40.892-56.713,133.888-56.713 c71.714,0,128.947,23.484,142.413,58.436c0.888,2.304,2.731,4.105,5.052,4.949c23.535,8.559,39.356,31.095,39.356,56.081 c0,11.989-3.541,23.561-10.249,33.451c-2.603,3.849-1.664,9.054,2.116,11.742c15.778,11.221,25.199,29.423,25.199,48.674 c0,15.974-6.229,30.984-17.536,42.283c-2.236,2.227-3.055,5.504-2.133,8.525c1.724,5.666,2.603,11.537,2.603,17.459 c0,32.939-26.795,59.733-59.733,59.733c-5.018,0-10.001-0.623-14.814-1.852c-4.574-1.186-9.207,1.579-10.377,6.144 c-1.169,4.574,1.587,9.216,6.153,10.385c6.195,1.587,12.595,2.389,19.038,2.389c42.342,0,76.8-34.458,76.8-76.8 c0-5.931-0.683-11.819-2.031-17.579c12.348-14.029,19.098-31.838,19.098-50.688c0-22.11-9.643-43.128-26.138-57.643 c5.956-11.102,9.071-23.475,9.071-36.224c0-30.865-18.748-58.82-47.044-70.733C395.475,25.704,334.598,0.001,256.919,0.001 c-90.172,0-121.984,21.7-146.62,61.85c-34.475,8.115-59.093,38.921-59.093,74.684c0,12.749,3.115,25.122,9.071,36.224 C43.782,187.274,34.139,208.291,34.139,230.401z"/>\n                <path fill="${i}" d="M316.507,424.876c-1.621,1.621-2.475,3.84-2.475,6.059c0,2.304,0.853,4.437,2.475,6.059 c1.621,1.536,3.755,2.475,5.973,2.475c2.304,0,4.437-0.939,6.059-2.475c1.621-1.621,2.475-3.755,2.475-6.059 c0-2.219-0.853-4.437-2.475-6.059C325.382,421.719,319.664,421.719,316.507,424.876z"/>\n                <path fill="${i}" d="M223.664,458.668c-1.536,1.621-2.475,3.755-2.475,6.059c0,2.219,0.939,4.437,2.475,6.059 c1.621,1.536,3.84,2.475,6.059,2.475c2.304,0,4.437-0.939,6.059-2.475c1.621-1.621,2.475-3.84,2.475-6.059 c0-2.219-0.853-4.437-2.475-6.059C232.624,455.511,226.907,455.511,223.664,458.668z"/>\n                <path fill="${i}" d="M337.67,411.905c1.621-1.621,2.475-3.755,2.475-6.059c0-2.219-0.853-4.437-2.475-6.059 c-3.157-3.157-8.875-3.072-12.032,0.085c-1.621,1.536-2.56,3.755-2.56,5.973c0,2.304,0.939,4.437,2.56,6.059 c1.536,1.621,3.755,2.475,5.973,2.475C333.915,414.38,336.048,413.527,337.67,411.905z"/>\n                <path fill="${i}" d="M213.339,238.935c4.71,0,8.533-3.823,8.533-8.533v-5.615c0.546,0.529,0.922,0.964,0.964,1.024 c1.519,2.918,4.497,4.591,7.578,4.591c1.323,0,2.671-0.307,3.934-0.964c4.181-2.176,5.803-7.33,3.627-11.511 c-2.534-4.873-10.581-13.124-24.636-13.124c-14.054,0-22.101,8.252-24.636,13.124c-2.125,4.087-0.555,8.969,3.456,11.23 c4.011,2.287,9.156,0.811,11.563-3.123c0.077-0.128,0.495-0.623,1.084-1.195v5.564 C204.806,235.112,208.629,238.935,213.339,238.935z"/>\n                <path fill="${i}" d="M256.006,332.801c20.028,0,30.507-9.907,31.633-11.034c3.294-3.294,3.285-8.567,0.043-11.913 c-3.234-3.345-8.61-3.439-12.015-0.247c-0.265,0.247-6.699,6.127-19.661,6.127c-12.774,0-19.208-5.709-19.652-6.118 c-3.336-3.251-8.678-3.217-11.981,0.085c-3.337,3.336-3.337,8.73,0,12.066C225.499,322.894,235.978,332.801,256.006,332.801z"/>\n                <path fill="${i}" d="M298.672,238.935c4.71,0,8.533-3.823,8.533-8.533v-5.615c0.546,0.529,0.922,0.964,0.964,1.024 c1.519,2.918,4.497,4.591,7.578,4.591c1.323,0,2.671-0.307,3.934-0.964c4.181-2.176,5.803-7.33,3.627-11.511 c-2.534-4.873-10.581-13.124-24.636-13.124s-22.101,8.252-24.636,13.124c-2.125,4.087-0.555,8.969,3.456,11.23 c4.011,2.287,9.165,0.811,11.563-3.123c0.077-0.128,0.495-0.623,1.084-1.195v5.564 C290.139,235.112,293.962,238.935,298.672,238.935z"/>\n                <path fill="${i}" d="M511.571,500.771l-8.533-25.6c-8.883-26.658-62.464-65.212-136.098-65.212c-3.482,0-6.613,2.116-7.919,5.333 c-0.316,0.802-33.015,79.642-103.014,79.642c-69.99,0-102.69-79.181-103.014-79.983c-1.306-3.226-4.437-5.35-7.919-5.35 c-106.001,0-130.97,50.185-136.098,65.57l-8.533,25.6c-1.493,4.471,0.93,9.301,5.402,10.795c4.48,1.502,9.301-0.93,10.795-5.402 l8.533-25.6c8.465-25.412,42.974-52.514,114.381-53.845c9.293,19.703,45.577,85.282,116.454,85.282 c70.827,0,107.102-65.229,116.437-84.898c64.051,1.835,108.339,35.294,114.398,53.461l8.533,25.6 c1.195,3.576,4.523,5.837,8.098,5.837c0.887,0,1.801-0.137,2.697-0.435C510.64,510.073,513.064,505.243,511.571,500.771z"/>\n                <path fill="${i}" d="M375.472,281.601v17.067c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533v-17.067 c0-4.71-3.823-8.533-8.533-8.533C379.295,273.068,375.472,276.891,375.472,281.601z"/>\n                <path fill="${i}" d="M188.934,405.847c0-2.219-0.939-4.437-2.56-5.973c-3.157-3.243-8.875-3.243-12.032,0 c-1.621,1.536-2.475,3.755-2.475,5.973c0,2.304,0.853,4.437,2.475,6.059s3.755,2.475,6.059,2.475 c2.219,0,4.437-0.853,5.973-2.475C187.995,410.284,188.934,408.151,188.934,405.847z"/>\n                <path fill="${i}" d="M189.531,439.468c2.219,0,4.437-0.939,5.973-2.475c1.621-1.621,2.475-3.755,2.475-6.059c0-2.219-0.853-4.437-2.475-6.059 c-3.157-3.157-8.875-3.157-12.032,0c-1.621,1.621-2.475,3.84-2.475,6.059c0,2.304,0.853,4.437,2.475,6.059 C185.008,438.529,187.227,439.468,189.531,439.468z"/>\n                <path fill="${i}" d="M200.624,445.356c-1.621,1.621-2.56,3.755-2.56,6.059c0,2.219,0.939,4.437,2.56,5.973c1.621,1.621,3.755,2.56,6.059,2.56 c2.219,0,4.437-0.939,5.973-2.56c1.621-1.536,2.475-3.755,2.475-5.973c0-2.304-0.853-4.523-2.475-6.059 C209.499,442.199,203.782,442.199,200.624,445.356z"/>\n                <path fill="${i}" d="M119.472,281.601v17.067c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-17.067 c0-4.71-3.823-8.533-8.533-8.533S119.472,276.891,119.472,281.601z"/>\n            </svg>`
    );
  }),
  (FamilyTree.icon.teddy = function (e, t, i, r, a) {
    return (
      FamilyTree.isNEU(r) && (r = 0),
      FamilyTree.isNEU(a) && (a = 0),
      `<svg width="${e}" height="${t}" x="${r}" y="${a}" viewBox="0 0 512 512">\n                <path fill="${i}" d="M234.513,246.613c9.378-1.929,16.555-9.02,21.487-15.863c4.932,6.844,12.109,13.935,21.487,15.863 c1.459,0.299,3.089,0.486,4.873,0.486c6.118,0,13.978-2.304,22.34-10.667c3.337-3.337,3.337-8.73,0-12.066s-8.73-3.337-12.066,0 c-4.361,4.369-8.337,6.212-11.699,5.53c-6.912-1.408-13.611-12.203-16.401-18.364c9.523-3.866,17.067-13.577,17.067-23.799 c0-9.353-9.566-14.933-25.6-14.933c-16.026,0-25.6,5.581-25.6,14.933c0,10.223,7.535,19.934,17.067,23.799 c-2.807,6.178-9.498,16.956-16.401,18.364c-3.405,0.666-7.339-1.178-11.699-5.53c-3.336-3.337-8.73-3.337-12.066,0 s-3.337,8.73,0,12.066C218.104,247.236,228.062,247.91,234.513,246.613z M263.748,190.669c-1.502,2.944-4.873,5.598-7.748,5.598\ts-6.246-2.654-7.748-5.598C251.793,189.833,260.207,189.833,263.748,190.669z"/>\n                <path fill="${i}" d="M390.033,53.7c1.621,1.613,2.5,3.755,2.5,6.033s-0.879,4.42-2.5,6.025c-3.337,3.337-3.337,8.738,0,12.075 c1.664,1.664,3.849,2.5,6.033,2.5s4.369-0.836,6.033-2.492c4.838-4.838,7.501-11.273,7.501-18.108s-2.662-13.269-7.501-18.099 c-9.984-9.984-26.214-9.984-36.198,0c-3.337,3.328-3.337,8.73,0,12.066s8.73,3.337,12.066,0 C381.303,50.372,386.697,50.372,390.033,53.7z"/>\n                <path fill="${i}" d="M311.467,136.533c7.057,0,12.8-5.743,12.8-12.8c0-7.057-5.743-12.8-12.8-12.8s-12.8,5.743-12.8,12.8 C298.667,130.79,304.41,136.533,311.467,136.533z"/>\n                <path fill="${i}" d="M200.533,136.533c7.057,0,12.8-5.743,12.8-12.8c0-7.057-5.743-12.8-12.8-12.8s-12.8,5.743-12.8,12.8 C187.733,130.79,193.476,136.533,200.533,136.533z"/>\n                <path fill="${i}" d="M115.934,80.333c2.185,0,4.369-0.836,6.042-2.5c3.328-3.337,3.328-8.738-0.009-12.075c-1.613-1.604-2.5-3.746-2.5-6.025 s0.887-4.42,2.509-6.033c3.209-3.226,8.841-3.226,12.058,0c3.328,3.337,8.738,3.328,12.066,0 c3.337-3.328,3.337-8.738,0.009-12.066c-9.677-9.677-26.539-9.668-36.207-0.009c-4.838,4.838-7.501,11.273-7.501,18.108 s2.662,13.269,7.501,18.108C111.565,79.497,113.749,80.333,115.934,80.333z"/>\n                <path fill="${i}" d="M498.552,286.191c-28.262-23.945-91.742-14.2-98.884-13.005c-4.651,0.768-7.791,5.171-7.014,9.813 c0.777,4.651,5.171,7.799,9.813,7.014c17.246-2.867,66.133-6.827,85.052,9.199c5.06,4.284,7.415,9.54,7.415,16.521 c0,3.977-1.476,6.946-4.779,9.626c-24.098,19.567-114.33,5.982-147.063-0.913c-3.703-0.776-7.441,0.981-9.242,4.275 c-1.801,3.311-1.212,7.424,1.434,10.095c0.12,0.119,8.499,8.755,12.493,19.951c-2.125-0.222-4.267-0.367-6.443-0.367 c-37.641,0-68.267,34.458-68.267,76.8c0,7.629,1.024,14.993,2.884,21.956c-3.823,1.715-10.197,3.644-19.951,3.644 c-10.052,0-16.367-2.082-19.908-3.814c1.826-6.912,2.842-14.217,2.842-21.786c0-42.342-30.626-76.8-68.267-76.8 c-2.176,0-4.318,0.145-6.443,0.367c3.994-11.196,12.373-19.831,12.476-19.934c2.671-2.671,3.268-6.775,1.468-10.095 c-1.792-3.319-5.521-5.069-9.259-4.292c-32.725,6.895-122.974,20.48-147.063,0.913c-3.302-2.68-4.779-5.649-4.779-9.626 c0-6.98,2.355-12.228,7.407-16.512c18.867-15.991,67.806-12.066,85.06-9.208c4.651,0.794,9.045-2.364,9.813-7.014 c0.776-4.651-2.364-9.045-7.006-9.813c-7.151-1.195-70.613-10.957-98.884,13.005C4.651,293.649,0,303.863,0,315.733 c0,9.079,3.831,16.998,11.093,22.886c27.179,22.05,102.818,12.783,140.535,6.426c-2.825,5.47-5.188,11.896-6.11,18.825 c-25.216,11.29-43.119,38.98-43.119,71.33c0,42.342,30.626,76.8,68.267,76.8c25.446,0,47.642-15.778,59.383-39.057 c5.743,2.56,14.174,4.924,25.95,4.924c11.674,0,20.164-2.287,26.035-4.77C293.794,496.29,315.938,512,341.333,512 c37.641,0,68.267-34.458,68.267-76.8c0-32.35-17.903-60.041-43.119-71.33c-0.922-6.929-3.277-13.355-6.101-18.825 c37.717,6.357,113.365,15.633,140.527-6.426c7.262-5.888,11.093-13.807,11.093-22.886 C512,303.863,507.349,293.649,498.552,286.191z M170.667,494.933c-28.237,0-51.2-26.795-51.2-59.733s22.963-59.733,51.2-59.733 s51.2,26.795,51.2,59.733S198.904,494.933,170.667,494.933z M392.533,435.2c0,32.939-22.963,59.733-51.2,59.733 c-20.983,0-39.04-14.814-46.942-35.942c-0.145-0.614-0.324-1.186-0.606-1.766c-2.338-6.818-3.652-14.242-3.652-22.025 c0-32.939,22.963-59.733,51.2-59.733C369.57,375.467,392.533,402.261,392.533,435.2z"/>\n                <path fill="${i}" d="M307.2,443.733c0,18.825,15.309,34.133,34.133,34.133c18.825,0,34.133-15.309,34.133-34.133 c0-18.825-15.309-34.133-34.133-34.133C322.509,409.6,307.2,424.909,307.2,443.733z M358.4,443.733 c0,9.412-7.654,17.067-17.067,17.067c-9.404,0-17.067-7.654-17.067-17.067c0-9.412,7.663-17.067,17.067-17.067 C350.746,426.667,358.4,434.321,358.4,443.733z"/>\n                <path fill="${i}" d="M115.541,118.161c-8.619,21.709-13.141,45.525-13.141,69.572c0,67.849,52.762,136.533,153.6,136.533 s153.6-68.685,153.6-136.533c0-24.491-4.412-47.846-13.107-69.581c26.957-5.76,47.24-29.764,47.24-58.419 C443.733,26.795,416.93,0,384,0c-24.67,0-46.14,14.916-55.108,36.745C307.115,23.859,282.368,17.067,256,17.067 c-26.615,0-51.2,6.716-73.259,19.925C174.08,14.754,153.088,0,128,0C95.061,0,68.267,26.795,68.267,59.733 C68.267,88.397,88.559,112.41,115.541,118.161z M128,17.067c19.226,0,35.021,12.177,40.115,30.054 c-11.085,8.61-21.163,18.816-29.901,30.592c-2.807,3.789-2.014,9.131,1.775,11.938c3.789,2.816,9.139,2.022,11.938-1.766 c8.9-12.006,19.26-22.281,30.788-30.507C204.288,41.95,228.949,34.133,256,34.133c41.429,0,78.396,19.098,104.098,53.786 c1.681,2.253,4.25,3.447,6.869,3.447c1.766,0,3.55-0.546,5.077-1.681c3.78-2.799,4.574-8.149,1.775-11.938 c-8.969-12.092-19.157-22.485-30.345-31.104c5.427-17.374,21.632-29.577,40.525-29.577c23.526,0,42.667,19.14,42.667,42.667 S407.526,102.4,384,102.4c-2.935,0-5.658,1.502-7.228,3.985c-1.553,2.483-1.732,5.589-0.461,8.243 c10.761,22.443,16.222,47.044,16.222,73.105C392.533,247.1,345.634,307.2,256,307.2s-136.533-60.1-136.533-119.467 c0-25.617,5.615-50.901,16.23-73.122c1.263-2.637,1.084-5.751-0.478-8.226c-1.562-2.483-4.292-3.985-7.219-3.985 c-23.526,0-42.667-19.14-42.667-42.667S104.474,17.067,128,17.067z"/>\n                <path fill="${i}" d="M256,290.133c47.053,0,85.333-30.626,85.333-68.267c0-36.258-36.489-76.8-85.333-76.8s-85.333,40.542-85.333,76.8 C170.667,259.507,208.947,290.133,256,290.133z M256,162.133c38.451,0,68.267,32.111,68.267,59.733 c0,28.237-30.626,51.2-68.267,51.2c-37.641,0-68.267-22.963-68.267-51.2C187.733,194.244,217.557,162.133,256,162.133z"/>\n                <path fill="${i}" d="M170.667,409.6c-18.825,0-34.133,15.309-34.133,34.133c0,18.825,15.309,34.133,34.133,34.133 s34.133-15.309,34.133-34.133C204.8,424.909,189.491,409.6,170.667,409.6z M170.667,460.8c-9.412,0-17.067-7.654-17.067-17.067 c0-9.412,7.654-17.067,17.067-17.067c9.412,0,17.067,7.654,17.067,17.067C187.733,453.146,180.079,460.8,170.667,460.8z"/>\n            </svg>`
    );
  }),
  (FamilyTree.prototype.exportPDFProfile = function (e, t) {
    (e = this._defaultExportProfileOptions(e, "pdf")),
      this._exportProfile(e, t);
  }),
  (FamilyTree.prototype.exportPDFPreview = function (e) {
    FamilyTree.pdfPrevUI.show(this, e);
  }),
  (FamilyTree.prototype.exportPNGProfile = function (e, t) {
    (e = this._defaultExportProfileOptions(e, "png")),
      this._exportProfile(e, t);
  }),
  (FamilyTree.prototype.shareProfile = function (e) {
    var t;
    "object" == typeof e
      ? (e = (t = e).focusId)
      : (t = this.editUI.content(e, !0, !0, "100%", !0));
    var i = new URL(window.location.href);
    i.searchParams.append("nodeId", e);
    var r = { title: t.title, text: t.shareText, url: i.href };
    try {
      navigator.share(r);
    } catch (e) {
      console.error("error: " + e);
    }
  }),
  (FamilyTree.prototype.exportPDF = function (e, t) {
    (e = this._defaultExportOptions(e, "pdf")), this._export(e, t);
  }),
  (FamilyTree.prototype.exportPNG = function (e, t) {
    (e = this._defaultExportOptions(e, "png")), this._export(e, t);
  }),
  (FamilyTree.prototype.exportSVG = function (e, t) {
    (e = this._defaultExportOptions(e, "svg")), this._export(e, t);
  }),
  (FamilyTree.prototype._defaultExportOptions = function (e, t) {
    return (
      null == e && (e = {}),
      "svg" == t
        ? ((e.ext = "svg"), (e.mime = "image/svg+xml"))
        : "pdf" == t
        ? ((e.mime = "application/pdf"), (e.ext = "pdf"))
        : "png" == t && ((e.mime = "image/png"), (e.ext = "png")),
      null == e.margin && (e.margin = [50, 40, 50, 40]),
      null == e.padding && (e.padding = 0),
      null == e.landscape && (e.landscape = !1),
      null == e.filename && (e.filename = "FamilyTree." + e.ext),
      null == e.scale && (e.scale = "fit"),
      null == e.format && (e.format = "fit"),
      null == e.header && (e.header = ""),
      "pdf" == t && null == e.footer
        ? (e.footer = "Page {current-page} of {total-pages}")
        : null == e.footer && (e.footer = ""),
      null == e.openInNewTab && (e.openInNewTab = !1),
      null == e.mode && (e.mode = "bft-" + this.config.mode),
      e
    );
  }),
  (FamilyTree.prototype._export = function (e, t) {
    var i = this,
      r = { id: e.nodeId, expandChildren: e.expandChildren, min: e.min };
    e.margin && e.margin[0] < 2 && (e.margin[0] = 2),
      e.margin && e.margin[1] < 2 && (e.margin[1] = 2),
      e.margin && e.margin[2] < 2 && (e.margin[2] = 2),
      e.margin && e.margin[3] < 2 && (e.margin[3] = 2),
      this._draw(!1, FamilyTree.action.exporting, r, function (r, a) {
        var n = document.createElement("div");
        if (((n.innerHTML = r), e.padding > 0)) {
          var o = n.querySelector("svg"),
            l = FamilyTree._getViewBox(o);
          (l[0] -= e.padding),
            (l[1] -= e.padding),
            (l[2] += 2 * e.padding),
            (l[3] += 2 * e.padding),
            o.setAttribute("viewBox", l.join()),
            o.setAttribute("width", l[2]),
            o.setAttribute("height", l[3]);
        }
        if ("svg" == e.ext)
          if (t) t(e, n.innerHTML);
          else {
            (o = n.querySelector("svg")).classList.add("bft-" + i.config.mode);
            var s = { content: n.innerHTML, options: e, styles: "" },
              d = FamilyTree.events.publish("exportstart", [i, s]),
              c = i.element.querySelector("[data-bft-styles]");
            if (
              (c && (s.styles += c.outerHTML),
              s.styles &&
                (n.childNodes[0].insertAdjacentHTML("afterbegin", s.styles),
                (s.content = n.innerHTML)),
              !1 === d)
            )
              return !1;
            if (!1 === (d = FamilyTree.events.publish("exportend", [i, s])))
              return !1;
            FamilyTree._downloadFile(
              e.mime,
              s.content,
              s.options.filename,
              s.options.openInNewTab,
              s.options.ext
            );
          }
        else
          i._pages(e, n.querySelector("svg"), a, function (r) {
            var a = { content: n.innerHTML, options: e, pages: r, styles: "" },
              o = FamilyTree.events.publish("exportstart", [i, a]),                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      