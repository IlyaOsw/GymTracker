/*! For license information please see 444.a656965f.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkgymtracker=self.webpackChunkgymtracker||[]).push([[444],{9868:(e,s,a)=>{a.d(s,{w:()=>d});var t=a(4e3),n=a(5578),r=(a(5043),a(4117));const c="CustomInput_inputWrapper__wz8SN",l="CustomInput_inputLabel__b-QWx",i="CustomInput_inputField__baNtE";var o=a(579);const d=e=>{let{name:s,text:a,type:d,placeholder:h,isRequired:u=!0,className:x,onChange:m}=e;const{t:_}=(0,r.Bd)();return(0,o.jsx)("div",{className:c,children:(0,o.jsx)(t.A.Item,{label:(0,o.jsx)("span",{className:l,children:_(a)}),name:s,rules:[{required:u}],children:(0,o.jsx)(n.A,{type:d,placeholder:h,className:"".concat(i," ").concat(x),allowClear:!0,onChange:e=>{const{value:s}=e.target;m&&m(s)},autoComplete:"username"})})})}},5369:(e,s,a)=>{a.d(s,{V:()=>o});a(5043);var t=a(4117);const n="Hexagon_wrapper__orCOo",r="Hexagon_hexagon__Lz5zU",c="Hexagon_imageContainer__CcV75",l="Hexagon_imageText__dxduD";var i=a(579);const o=e=>{let{text:s,className:a}=e;const{t:o}=(0,t.Bd)();return(0,i.jsx)("div",{className:n,children:(0,i.jsxs)("div",{className:c,children:[(0,i.jsx)("img",{src:"/GymTracker/assets/Icons/Hexagon/Hexagon.svg",alt:"Hexagon",className:r}),(0,i.jsx)("div",{className:"".concat(l," ").concat(a),children:o(s)})]})})}},9752:(e,s,a)=>{a.d(s,{f:()=>r});a(5043);var t=a(579);const n={maxWidth:"1200px",margin:"0 auto"},r=e=>{let{children:s}=e;return(0,t.jsx)("div",{style:n,children:s})}},9525:(e,s,a)=>{a.d(s,{U:()=>l});a(5043);var t=a(7021),n=a(5534);const r="ResetButton_reset__efwrw";var c=a(579);const l=e=>{let{onClick:s,children:a}=e;return(0,c.jsx)(t.Ay,{danger:!0,type:"primary",className:r,onClick:s,icon:(0,c.jsx)(n.A,{}),children:a})}},9589:(e,s,a)=>{a.d(s,{t:()=>l});a(5043);var t=a(1984),n=a(5459);const r="SubTitle_subTitle__6A8PN";var c=a(579);const l=e=>{let{children:s,className:a}=e;const{ref:l,controls:i}=(0,n.F)();return(0,c.jsx)(t.P.p,{ref:l,className:"".concat(r," ").concat(a),initial:"hidden",animate:i,variants:n.l,children:s})}},5459:(e,s,a)=>{a.d(s,{F:()=>c,l:()=>l});var t=a(9927),n=a(5246),r=a(5043);const c=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.1,s=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=arguments.length>2?arguments[2]:void 0;const c=(0,t.s)(),[l,i]=(0,n.Wx)({threshold:e,triggerOnce:s});return(0,r.useEffect)((()=>{i?c.start("visible"):c.start("hidden")}),[c,i]),{ref:l,controls:c,animationVariants:a}},l={hidden:{opacity:0},visible:{opacity:1,transition:{duration:1}}}},8444:(e,s,a)=>{a.r(s),a.d(s,{default:()=>ke});var t=a(5043),n=a(9752),r=a(5475),c=a(4117),l=a(1984),i=a(5369),o=a(9589),d=a(5459);const h={diaryWrapper:"Diary_diaryWrapper__9yUZ1",info:"Diary_info__8CHt1",hexagonWrapper:"Diary_hexagonWrapper__E3ely"};var u=a(579);const x=()=>{const{t:e}=(0,c.Bd)(),{ref:s,controls:a}=(0,d.F)();return(0,u.jsxs)("div",{className:h.diaryWrapper,children:[(0,u.jsx)(o.t,{children:e("trainingDiary")}),(0,u.jsx)(l.P.div,{ref:s,className:h.info,initial:"hidden",animate:a,variants:d.l,children:e("diaryChoose")}),(0,u.jsxs)("div",{className:h.hexagonWrapper,children:[(0,u.jsx)(r.N_,{to:"/workout",children:(0,u.jsx)(i.V,{text:e("arms"),className:h.link})}),(0,u.jsx)(r.N_,{to:"/workout",children:(0,u.jsx)(i.V,{text:e("shoulders"),className:h.link})}),(0,u.jsx)(r.N_,{to:"/workout",children:(0,u.jsx)(i.V,{text:e("chest"),className:h.link})}),(0,u.jsx)(r.N_,{to:"/workout",children:(0,u.jsx)(i.V,{text:e("back"),className:h.link})}),(0,u.jsx)(r.N_,{to:"/workout",children:(0,u.jsx)(i.V,{text:e("legs"),className:h.link})})]})]})};var m=a(8168);const _={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"minus",theme:"outlined"};var v=a(2172),j=function(e,s){return t.createElement(v.A,(0,m.A)({},e,{ref:s,icon:_}))};const f=t.forwardRef(j);var g=a(5337);const p={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M666.7 505.5l-246-178A8 8 0 00408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"}},{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}}]},name:"right-circle",theme:"outlined"};var N=function(e,s){return t.createElement(v.A,(0,m.A)({},e,{ref:s,icon:p}))};const C=t.forwardRef(N);var A=a(2019),w=a(5578),y=a(3963),b=a(9525);const k="Calculator_header__xoH1S",I="Calculator_info__-wCtb",E="Calculator_container__kROfH",S="Calculator_subtitle__YF11k",z="Calculator_calculator__ceher",B="Calculator_weight__Slu1o",H="Calculator_reps__HcH7B",F="Calculator_repsNumber__0feMt",M="Calculator_minus__IlWGa",R="Calculator_plus__7K3gF",V="Calculator_calculate__lC2zg",W="Calculator_result__Avxlt",U="Calculator_resultWeight__E5PuC",q=()=>{const{t:e}=(0,c.Bd)(),{ref:s,controls:a}=(0,d.F)(),[n,r]=(0,t.useState)(0),[i,h]=(0,t.useState)(1),[x,m]=(0,t.useState)(0),[_,v]=A.Ay.useMessage();return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(o.t,{children:e("weightCalculator"),className:k}),(0,u.jsx)(l.P.div,{ref:s,className:I,initial:"hidden",animate:a,variants:d.l,children:e("indicateWeightAndReps")}),(0,u.jsxs)("div",{className:E,children:[(0,u.jsxs)("div",{className:z,children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{className:S,children:e("workingWeight")}),(0,u.jsx)(w.A,{className:B,allowClear:!0,placeholder:e("weightKg"),value:0===n?"":n.toString(),type:"tel",onChange:e=>{const s=e.target.value;/^\d*$/.test(s)&&r(""===s?0:Number(s))}})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{className:S,children:e("repsNumber")}),(0,u.jsxs)("div",{className:H,children:[(0,u.jsx)("button",{className:M,onClick:()=>{i>1&&h(i-1)},children:(0,u.jsx)(f,{})}),(0,u.jsx)("div",{className:F,children:i}),(0,u.jsx)("button",{className:R,onClick:()=>{i<15&&h(i+1)},children:(0,u.jsx)(g.A,{})})]})]}),(0,u.jsx)(y.S,{children:e("calculate"),className:V,onClick:()=>{const e=n*(36/(37-i)),s=((Number(n*i/30+n)+Number(e))/2).toFixed(1);m(Number(s))},icon:(0,u.jsx)(C,{})})]}),(0,u.jsx)("div",{className:W,children:e("calcResult")}),(0,u.jsxs)("div",{className:U,children:[x," ",e("kg")]}),v,(0,u.jsx)(b.U,{children:e("reset"),onClick:()=>{r(0),h(1),m(0),_.open({type:"success",content:"".concat(e("reseted"))})}})]})]})};var P=a(7021);const T={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 248H728l-32.4-90.8a32.07 32.07 0 00-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 248H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V328c0-44.2-35.8-80-80-80zm8 536c0 4.4-3.6 8-8 8H160c-4.4 0-8-3.6-8-8V328c0-4.4 3.6-8 8-8h186.7l17.1-47.8 22.9-64.2h250.5l22.9 64.2 17.1 47.8H864c4.4 0 8 3.6 8 8v456zM512 384c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160-71.6-160-160-160zm0 256c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"}}]},name:"camera",theme:"outlined"};var D=function(e,s){return t.createElement(v.A,(0,m.A)({},e,{ref:s,icon:T}))};const O=t.forwardRef(D);var G=a(7407);const Q="Information_mainContainer__RREUw",L="Information_infoContainer__dNCgg",Y="Information_paper__ijiZ0",K="Information_avatar__sOFGa",Z="Information_editBtn__IbSXx",X="Information_buttonText__wP7GQ",J="Information_onlineIcon__h8P6L";var $=a(1966),ee=a(2481);const se="FavoriteExercises_exercises__3MEPO",ae="FavoriteExercises_exercisesBox__5YyYh",te="FavoriteExercises_exerciseName__hzxX8",ne="FavoriteExercises_exerciseResult__TeWwA",re="FavoriteExercises_deleteIcon__Y+H+R";var ce=a(8732),le=a(2918),ie=a(9868);const oe="AddExercise_modal__ZUb4E",de=e=>{let{setFavoriteExercisesArray:s,setShowAddModal:a,showAddModal:n}=e;const{t:r}=(0,c.Bd)(),[l,i]=A.Ay.useMessage(),[o,d]=(0,t.useState)({id:0,name:"",result:""});return(0,u.jsx)(ce.Ay,{theme:{components:{Modal:{contentBg:"#141414",colorIcon:"#0097B2",colorIconHover:"red"}}},children:(0,u.jsx)(le.A,{open:n,footer:null,onCancel:()=>a(!1),style:{marginTop:"50px"},children:(0,u.jsxs)("div",{className:oe,children:[(0,u.jsx)(ie.w,{text:r("exerciseName"),value:o.name,onChange:e=>{d((s=>({...s,name:e})))}}),(0,u.jsx)(ie.w,{text:r("yourBestResult"),value:o.result,onChange:e=>{d((s=>({...s,result:e})))}}),i,(0,u.jsx)(y.S,{onClick:()=>{o.name&&o.result&&(s((e=>[...e,{...o,id:e.length+1}])),d({id:0,name:"",result:""}),a(!1)),l.open({type:"error",content:"".concat(r("addExerciseError"))})},children:r("save")})]})})})},he=()=>{const{t:e}=(0,c.Bd)(),[s,a]=(0,t.useState)([{id:1,name:"Bench press",result:"125"},{id:2,name:"Squat",result:"155"},{id:3,name:"Deadlift",result:"180"}]),[n,r]=(0,t.useState)(!1);return(0,u.jsxs)("div",{className:se,children:[(0,u.jsx)(o.t,{children:e("favoriteExercises")}),s.map((s=>(0,u.jsxs)("div",{className:ae,children:[(0,u.jsx)("div",{className:te,children:s.name}),(0,u.jsxs)("div",{className:ne,children:[e("bestResult")," ",s.result," ",e("kg")]}),(0,u.jsx)(ee.A,{title:e("deleteRow"),children:(0,u.jsx)($.A,{className:re,onClick:()=>{return e=s.id,void a((s=>s.filter((s=>s.id!==e))));var e}})})]},s.id))),s.length<3&&(0,u.jsx)(y.S,{onClick:()=>{s.length<3&&r(!0)},icon:(0,u.jsx)(g.A,{}),children:e("addExerciseBtn")}),n&&(0,u.jsx)(de,{setFavoriteExercisesArray:a,setShowAddModal:r,showAddModal:n})]})};var ue=a(3722),xe=a(6011),me=a(1210);const _e={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"}}]},name:"message",theme:"outlined"};var ve=function(e,s){return t.createElement(v.A,(0,m.A)({},e,{ref:s,icon:_e}))};const je=t.forwardRef(ve);var fe=a(3390);const ge={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"}},{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}}]},name:"plus-circle",theme:"outlined"};var pe=function(e,s){return t.createElement(v.A,(0,m.A)({},e,{ref:s,icon:ge}))};const Ne=t.forwardRef(pe);var Ce=a(6032),Ae=a(8895);const we={personalInformation:"UserInfo_personalInformation__zvosi",userInfo:"UserInfo_userInfo__Ujxpu",icon:"UserInfo_icon__AkyUD",button:"UserInfo_button__TFS55"},ye=()=>{const{t:e}=(0,c.Bd)(),[s,a]=(0,t.useState)(null),[n,r]=(0,t.useState)(!1),l=()=>{r((e=>!e))};return(0,t.useEffect)((()=>{const e=(0,Ae.xI)(),s=(0,Ae.hg)(e,(async e=>{if(e){const s=await(async e=>{try{const s=(0,Ce.aU)(),a=(0,Ce.H9)(s,"users",e),t=await(0,Ce.x7)(a);return t.exists()?t.data():null}catch(s){return null}})(e.uid);a(s)}else a(null)}));return()=>s()}),[]),s?(0,u.jsxs)("div",{className:we.personalInformation,children:[(0,u.jsxs)("div",{className:we.userInfo,children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(ue.A,{className:we.icon}),s.firstName," ",s.lastName]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(xe.A,{className:we.icon}),s.location.country,", ",s.location.city]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(me.A,{className:we.icon}),s.age," years old"]})]}),(0,u.jsxs)("div",{className:we.buttons,children:[(0,u.jsx)(y.S,{className:we.button,icon:(0,u.jsx)(je,{}),children:e("message")}),n?(0,u.jsx)(y.S,{className:we.button,onClick:l,icon:(0,u.jsx)(fe.A,{}),children:e("followed")}):(0,u.jsx)(y.S,{className:we.button,onClick:l,icon:(0,u.jsx)(Ne,{}),children:e("follow")})]})]}):(0,u.jsx)("div",{className:we.personalInformation})},be=()=>{const{t:e}=(0,c.Bd)();return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:Q,children:[(0,u.jsxs)("div",{className:Y,children:[(0,u.jsx)("img",{src:"/GymTracker/assets/paper.jpg ",alt:"Paper"}),(0,u.jsx)(P.Ay,{icon:(0,u.jsx)(O,{}),className:Z,children:(0,u.jsx)("span",{className:X,children:e("editCoverPhoto")})})]}),(0,u.jsxs)("div",{className:K,children:[(0,u.jsx)("img",{src:"https://scontent.ftll3-2.fna.fbcdn.net/v/t1.15752-9/441948832_1641887679945902_7689976602008975630_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eSlEon3VATkQ7kNvgF_YmOM&_nc_ht=scontent.ftll3-2.fna&oh=03_Q7cD1QGe-zsvVnR-ln-faJ4LWFjvNdBQBbnkuIbyEKaD5KYlGQ&oe=66602397",alt:"Avatar"}),(0,u.jsx)("img",{src:"/GymTracker/assets/Icons/OnlineIcon/OnlineIcon.svg",alt:"Online",className:J})]})]}),(0,u.jsxs)("div",{className:L,children:[(0,u.jsx)(ye,{}),(0,u.jsx)(he,{}),(0,u.jsx)(P.Ay,{icon:(0,u.jsx)(G.A,{}),className:Z,children:(0,u.jsx)("span",{className:X,children:e("editProfile")})})]})]})},ke=()=>((0,t.useEffect)((()=>{window.scroll(0,0)}),[]),(0,u.jsxs)(n.f,{children:[(0,u.jsx)(be,{}),(0,u.jsx)(x,{}),(0,u.jsx)(q,{})]}))},5337:(e,s,a)=>{a.d(s,{A:()=>i});var t=a(8168),n=a(5043);const r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"};var c=a(2172),l=function(e,s){return n.createElement(c.A,(0,t.A)({},e,{ref:s,icon:r}))};const i=n.forwardRef(l)}}]);
//# sourceMappingURL=444.a656965f.chunk.js.map