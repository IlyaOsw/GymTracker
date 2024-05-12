"use strict";(self.webpackChunkgymtracker=self.webpackChunkgymtracker||[]).push([[852],{1907:(e,t,s)=>{s.d(t,{V:()=>x});var c=s(1210),r=s(7356),n=s(7615),l=(s(5043),s(446)),a=s.n(l),i=s(4117);const o="Calendar_dateField__6KRfc";var d=s(579);const x=e=>{let{className:t}=e;const{t:s}=(0,i.Bd)();return(0,d.jsx)(r.Ay,{theme:{components:{DatePicker:{colorBgContainer:"#141414",colorFillSecondary:"#141414",colorTextPlaceholder:"#818181",colorBgElevated:"#141414",colorTextHeading:"#ffffff",colorText:"#ffffff",colorIcon:"#ffffff",colorIconHover:"#1677ff"}}},children:(0,d.jsx)(n.A,{className:"".concat(o," ").concat(t),placeholder:s("selectDate"),suffixIcon:(0,d.jsx)(c.A,{}),inputReadOnly:!0,allowClear:!1,disabledDate:e=>e&&e>=a()().endOf("day")})})}},9868:(e,t,s)=>{s.d(t,{w:()=>d});var c=s(4395),r=s(5578),n=(s(5043),s(4117));const l="CustomInput_inputWrapper__wz8SN",a="CustomInput_inputLabel__b-QWx",i="CustomInput_inputField__baNtE";var o=s(579);const d=e=>{let{name:t,text:s,type:d,placeholder:x,isRequired:h=!0,className:f}=e;const{t:_}=(0,n.Bd)();return(0,o.jsx)("div",{className:l,children:(0,o.jsx)(c.A.Item,{label:(0,o.jsx)("span",{className:a,children:_(s)}),name:t,rules:[{required:h}],children:(0,o.jsx)(r.A,{type:d,placeholder:x,className:"".concat(i," ").concat(f),allowClear:!0})})})}},1499:(e,t,s)=>{s.d(t,{B:()=>l});s(5043);var c=s(4117);const r={descriptionTitle:"DescriptionTitle_descriptionTitle__E-lRw",start:"DescriptionTitle_start__FSu7h",center:"DescriptionTitle_center__eJvMJ",end:"DescriptionTitle_end__uV+MA"};var n=s(579);const l=e=>{let{text:t,textAlign:s="start",className:l}=e;const{t:a}=(0,c.Bd)();return(0,n.jsx)("h2",{className:"".concat(r.descriptionTitle," ").concat(r[s]," ").concat(l),children:a(t)})}},9752:(e,t,s)=>{s.d(t,{f:()=>n});s(5043);var c=s(579);const r={maxWidth:"1200px",margin:"0 auto"},n=e=>{let{children:t}=e;return(0,c.jsx)("div",{style:r,children:t})}},9589:(e,t,s)=>{s.d(t,{t:()=>n});s(5043);const c="SubTitle_subTitle__6A8PN";var r=s(579);const n=e=>{let{children:t}=e;return(0,r.jsx)("p",{className:c,children:t})}},2852:(e,t,s)=>{s.r(t),s.d(t,{default:()=>V});var c=s(5043),r=s(1499),n=s(9752),l=s(9472),a=s(8354),i=s(7356),o=s(3994),d=s(1966),x=s(5337),h=s(682),f=s(3390),_=s(4117),m=s(3963),j=s(9589);const p="ExerciseTable_table__gqYvK",u="ExerciseTable_tableTitle__nWHV1",A="ExerciseTable_date__+kHp7",g="ExerciseTable_tableFooter__8lrF-",y="ExerciseTable_deleteIcon__A-mPX";var N=s(579);const v=[{key:"1",weight:60,set:1,reps:10,icon:(0,N.jsx)(d.A,{className:y})},{key:"2",weight:80,set:2,reps:8,icon:(0,N.jsx)(d.A,{className:y})},{key:"3",weight:100,set:3,reps:6,icon:(0,N.jsx)(d.A,{className:y})},{key:"4",weight:110,set:4,reps:3,icon:(0,N.jsx)(d.A,{className:y})}],b=()=>{const{t:e}=(0,_.Bd)(),[t,s]=(0,c.useState)(v),r=[{title:"".concat(e("set")),dataIndex:"set",width:"30%"},{title:"".concat(e("weight")),dataIndex:"weight",width:"40%"},{title:"".concat(e("reps")),dataIndex:"reps",width:"30%"},{title:"",dataIndex:"icon",render:(e,c)=>(0,N.jsx)(d.A,{className:y,onClick:()=>(e=>{const c=t.filter((t=>t.key!==e));s(c)})(c.key)})}];return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(a.A,{style:{backgroundColor:"#0097B2"}}),(0,N.jsxs)("div",{className:u,children:[(0,N.jsx)(j.t,{children:"Bench press"}),(0,N.jsxs)("div",{className:A,children:[e("date"),"02.04.2024"]})]}),(0,N.jsxs)(i.Ay,{theme:{components:{Table:{headerBg:"#1A1A1A",headerColor:"#ffffff",headerSortHoverBg:"#282828",bodySortBg:"#282828",cellFontSize:16,colorBgContainer:"#282828",colorText:"#ffffff",colorPrimary:"#ffffff",headerBorderRadius:0,rowHoverBg:"#464646",borderColor:"#535353",fontWeightStrong:700,headerSplitColor:"#535353",colorTextDisabled:"red"}}},children:[(0,N.jsx)(o.A,{columns:r,dataSource:t,pagination:!1,className:p,locale:{emptyText:()=>(0,N.jsx)(l.A,{image:l.A.PRESENTED_IMAGE_SIMPLE,description:(0,N.jsx)("span",{style:{color:"#ffffff"},children:e("noData")})})}}),(0,N.jsx)(m.S,{onClick:()=>{const e=[...t];let c=0;e.length>0&&(c=parseInt(e[e.length-1].key));const r={key:(c+1).toString(),weight:0,set:c+1,reps:0,icon:(0,N.jsx)(d.A,{className:y})};e.push(r),s(e)},icon:(0,N.jsx)(x.A,{}),children:e("addRow")}),(0,N.jsxs)("div",{className:g,children:[(0,N.jsx)(m.S,{icon:(0,N.jsx)(h.A,{}),children:e("previous")}),(0,N.jsx)(m.S,{icon:(0,N.jsx)(f.A,{}),children:e("save")})]})]})]})};var E=s(4395),w=s(9868),T=s(1907);const k="AddExercise_addExercise__7FNxa",B="AddExercise_inputLabel__JSVE3",S=()=>{const{t:e}=(0,_.Bd)(),[t]=E.A.useForm();return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(j.t,{children:e("addAnExercise")}),(0,N.jsx)(E.A,{form:t,initialValues:{remember:!0},layout:"vertical",children:(0,N.jsxs)("div",{className:k,children:[(0,N.jsx)(w.w,{name:"Exercise",text:e("exerciseName"),placeholder:e("typeExercise"),isRequired:!0}),(0,N.jsx)(E.A.Item,{name:"Enter date",label:(0,N.jsx)("span",{className:B,children:e("enterDate")}),children:(0,N.jsx)(T.V,{})}),(0,N.jsx)(m.S,{icon:(0,N.jsx)(x.A,{}),children:e("addExerciseBtn")})]})})]})};var C=s(3586),I=s(3727);const F="RecentlyUsed_recentlyUsed__E9XoK",D="RecentlyUsed_usedItem__Z3XGN",R="RecentlyUsed_deleteIcon__MudNZ",P=e=>{let{text:t}=e;return(0,N.jsx)("span",{style:{color:"#0097B2",fontWeight:"700"},children:t})},L=[{title:"Bench press",content:"Last set: 100 \u0445 10"},{title:"Cable Fly",content:"Last set: 20 \u0445 10"},{title:"Pec Deck",content:"Last set: 30 \u0445 10"},{title:"Push ups",content:"Last set: 50"}],H=()=>{const{t:e}=(0,_.Bd)(),[t,s]=(0,c.useState)(L);return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(j.t,{children:e("recentlyUsed")}),(0,N.jsx)("div",{className:F,children:t.map(((e,c)=>(0,N.jsx)(C.A,{title:(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(P,{text:e.title}),(0,N.jsx)(I.A,{className:R,onClick:()=>(e=>{const c=[...t];c.splice(e,1),s(c)})(c)})]}),className:D,bordered:!1,children:e.content},c)))})]})},V=()=>((0,c.useEffect)((()=>{window.scroll(0,0)}),[]),(0,N.jsxs)(n.f,{children:[(0,N.jsx)(r.B,{text:"Chest workout",textAlign:"center"}),(0,N.jsx)(S,{}),(0,N.jsx)(H,{}),(0,N.jsx)(b,{})]}))}}]);
//# sourceMappingURL=852.352b44ef.chunk.js.map