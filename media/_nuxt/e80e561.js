(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{557:function(t,e,n){var content=n(621);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(95).default)("3912c060",content,!0,{sourceMap:!1})},620:function(t,e,n){"use strict";n(557)},621:function(t,e,n){var o=n(94)(!1);o.push([t.i,'[data-v-deb2de74]:export{maxWithLarge:1920px;fontSizeSmall:1vw;fontSizeMedium:.55vw;fontSizeLarge:1vw;viewportWidthSmall:375px;viewportWidthMedium:768px;viewportWidthLarge:1920px}@media (min-width:0){html[data-v-deb2de74]:before{display:none;content:"small"}}@media (min-width:500px){html[data-v-deb2de74]:before{display:none;content:"medium"}}@media (min-width:850px){html[data-v-deb2de74]:before{display:none;content:"large"}}.about[data-v-deb2de74]{opacity:0;overflow:hidden}.page-title[data-v-deb2de74]{display:none;position:absolute;width:100%;padding-top:5.33333rem;font-weight:400;font-size:10px;letter-spacing:.1em;-webkit-font-smoothing:auto;-khtml-font-smoothing:auto;-apple-font-smoothing:auto;font-smooth:auto;-moz-osx-font-smoothing:grayscale;text-align:center;text-transform:uppercase;pointer-events:none}@media (min-width:850px){.page-title[data-v-deb2de74]{display:block;padding-top:2.08333rem;font-size:13px}}.section-intro[data-v-deb2de74]{margin-bottom:53.33333rem;padding-top:26.66667rem}@media (min-width:850px){.section-intro[data-v-deb2de74]{margin-bottom:23.4375rem;padding-top:15.6901rem}}@media (min-width:850px){.section-companies[data-v-deb2de74]{margin-top:0;margin-bottom:18.22917rem}}.section-contact[data-v-deb2de74]{margin-top:26.66667rem;margin-bottom:26.66667rem}@media (min-width:850px){.section-contact[data-v-deb2de74]{margin-top:0;margin-bottom:0}}',""]),t.exports=o},669:function(t,e,n){"use strict";n.r(e);var o=n(12),r=n(24),d=(n(15),n(72),n(73),n(30),n(23),n(56),n(63),n(27),n(64),n(524)),c=n(115),l=n(61),m=n(7),h=n(29),f=n(532),v=n(528),w=n(530),O=n(580),$=n(575),y=n(581),C=n(582);function x(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var S={mixins:[d.a,c.a],asyncData:function(t){var e=[t.$api.getSingleDocumentByType("about")];return Promise.all(e).then((function(t){return{data:Object(r.a)(t,1)[0].data}}))},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?x(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):x(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(l.b)({isMenuOpen:"menu/isOpen"})),watch:{isMenuOpen:function(t){if(t){var e=new m.a.timeline;e.to(this.$refs.pageTitle,{duration:1,alpha:0,ease:"sine.inOut"},0),e.to(this.$refs.sectionIntro.$el,{duration:1,alpha:0,ease:"sine.inOut"},0),e.to(this.$refs.sectionCompanies.$el,{duration:1,alpha:0,ease:"sine.inOut"},0),e.to(this.$refs.sectionContact.$el,{duration:1,alpha:0,ease:"sine.inOut"},0),e.add(this.$refs.buttonHome.transitionOut(),0)}else{var n=new m.a.timeline({delay:1});n.to(this.$refs.pageTitle,{duration:1.7,alpha:1,ease:"sine.inOut"},0),n.to(this.$refs.sectionIntro.$el,{duration:1.7,alpha:1,ease:"sine.inOut"},0),n.to(this.$refs.sectionCompanies.$el,{duration:1.7,alpha:1,ease:"sine.inOut"},0),n.to(this.$refs.sectionContact.$el,{duration:1.7,alpha:1,ease:"sine.inOut"},0),n.add(this.$refs.buttonHome.menuIn(),0)}}},methods:{transitionIn:function(t){var e=new m.a.timeline({onComplete:t});e.to(h.a,{duration:2,lowPassFrequency:1e3},0),e.to(this.$el,{duration:2,alpha:1,ease:"sine.inOut"},0),e.add(this.$refs.buttonHome.transitionIn(),0),e.add(this.$refs.buttonMenu.transitionIn(),0),e.add(this.$refs.sectionIntro.transitionIn(),.2),e.call(this.showActiveWebglView,null,0)},transitionOut:function(t){var e=new m.a.timeline({onComplete:t});e.to(this.$el,{duration:1.5,alpha:0,ease:"sine.inOut"},0),e.add(this.$refs.buttonHome.transitionOut(1.5),0),e.add(this.$refs.buttonMenu.transitionOut(),0),e.add(this.$refs.sectionIntro.transitionOut(),0),e.call(this.hideActiveWebglView,null,0)},showActiveWebglView:function(){this.$root.webglApp.viewManager.show("About")},hideActiveWebglView:function(){this.$root.webglApp.viewManager.hide("About")}},components:{ScrollContainer:w.a,SectionIntro:O.a,SectionCompanies:$.a,SectionContact:y.a,SectionCredits:C.a,ButtonHome:f.a,ButtonMenu:v.a}},j=(n(620),n(71)),component=Object(j.a)(S,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page about"},[n("ScrollContainer",{ref:"scrollContainer"},[n("div",{ref:"pageTitle",staticClass:"page-title"},[t._v("\n            "+t._s(t.localeCopy.routes.about.name)+"\n        ")]),t._v(" "),n("SectionIntro",{ref:"sectionIntro",staticClass:"section-intro",attrs:{data:{title:t.data.title,description:t.data.description}}}),t._v(" "),n("SectionCompanies",{ref:"sectionCompanies",staticClass:"section-companies",attrs:{data:t.data.companies}}),t._v(" "),n("SectionContact",{ref:"sectionContact",staticClass:"section-contact",attrs:{data:t.data.contacts}}),t._v(" "),n("SectionCredits",{ref:"sectionCredits",staticClass:"section-credits"}),t._v(" "),n("ButtonHome",{ref:"buttonHome"}),t._v(" "),n("ButtonMenu",{ref:"buttonMenu"})],1)],1)}),[],!1,null,"deb2de74",null);e.default=component.exports}}]);