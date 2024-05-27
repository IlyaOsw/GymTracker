"use strict";(self.webpackChunkgymtracker=self.webpackChunkgymtracker||[]).push([[149],{1907:(e,t,s)=>{s.d(t,{V:()=>x});var n=s(1210),r=s(8732),a=s(7615),c=(s(5043),s(446)),i=s.n(c),l=s(4117);const o="Calendar_dateField__6KRfc";var d=s(579);const x=e=>{let{className:t,onChange:s}=e;const{t:c}=(0,l.Bd)();return(0,d.jsx)(r.Ay,{theme:{components:{DatePicker:{colorBgContainer:"#141414",colorFillSecondary:"#141414",colorTextPlaceholder:"#818181",colorBgElevated:"#141414",colorTextHeading:"#ffffff",colorText:"#ffffff",colorIcon:"#ffffff",colorIconHover:"#1677ff"}}},children:(0,d.jsx)(a.A,{className:"".concat(o," ").concat(t),placeholder:c("selectDate"),suffixIcon:(0,d.jsx)(n.A,{}),inputReadOnly:!0,allowClear:!1,disabledDate:e=>e&&e>=i()().endOf("day"),onChange:e=>{s&&s(e)}})})}},9868:(e,t,s)=>{s.d(t,{w:()=>d});var n=s(4e3),r=s(5578),a=(s(5043),s(4117));const c="CustomInput_inputWrapper__wz8SN",i="CustomInput_inputLabel__b-QWx",l="CustomInput_inputField__baNtE";var o=s(579);const d=e=>{let{name:t,text:s,type:d,placeholder:x,isRequired:h=!0,className:f,onChange:m}=e;const{t:_}=(0,a.Bd)();return(0,o.jsx)("div",{className:c,children:(0,o.jsx)(n.A.Item,{label:(0,o.jsx)("span",{className:i,children:_(s)}),name:t,rules:[{required:h}],children:(0,o.jsx)(r.A,{type:d,placeholder:x,className:"".concat(l," ").concat(f),allowClear:!0,onChange:e=>{const{value:t}=e.target;m&&m(t)},autoComplete:"username"})})})}},1499:(e,t,s)=>{s.d(t,{B:()=>l});var n=s(1984),r=s(4117),a=s(5459);const c={descriptionTitle:"DescriptionTitle_descriptionTitle__E-lRw",start:"DescriptionTitle_start__FSu7h",center:"DescriptionTitle_center__eJvMJ",end:"DescriptionTitle_end__uV+MA"};var i=s(579);const l=e=>{let{text:t,textAlign:s="start",className:l}=e;const{t:o}=(0,r.Bd)(),{ref:d,controls:x}=(0,a.F)();return(0,i.jsx)(n.P.h2,{ref:d,className:"".concat(c.descriptionTitle," ").concat(c[s]," ").concat(l),initial:"hidden",animate:x,variants:{hidden:{opacity:0,y:100},visible:{opacity:1,y:0,transition:{duration:.5}}},children:o(t)})}},9752:(e,t,s)=>{s.d(t,{f:()=>a});s(5043);var n=s(579);const r={maxWidth:"1200px",margin:"0 auto"},a=e=>{let{children:t}=e;return(0,n.jsx)("div",{style:r,children:t})}},9589:(e,t,s)=>{s.d(t,{t:()=>i});s(5043);var n=s(1984),r=s(5459);const a="SubTitle_subTitle__6A8PN";var c=s(579);const i=e=>{let{children:t,className:s}=e;const{ref:i,controls:l}=(0,r.F)();return(0,c.jsx)(n.P.p,{ref:i,className:"".concat(a," ").concat(s),initial:"hidden",animate:l,variants:{hidden:{opacity:0,y:100},visible:{opacity:1,y:0,transition:{duration:.5}}},children:t})}},5459:(e,t,s)=>{s.d(t,{F:()=>c});var n=s(9927),r=s(5246),a=s(5043);const c=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.1,t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],s=arguments.length>2?arguments[2]:void 0;const c=(0,n.s)(),[i,l]=(0,r.Wx)({threshold:e,triggerOnce:t});return(0,a.useEffect)((()=>{l&&c.start("visible")}),[c,l]),{ref:i,controls:c,animationVariants:s}}},1149:(e,t,s)=>{s.r(t),s.d(t,{default:()=>V});var n=s(5043),r=s(1499),a=s(9752),c=s(9472),i=s(2481),l=s(8354),o=s(8732),d=s(5743),x=s(1966),h=s(5337),f=s(682),m=s(3390),_=s(4117),j=s(3963),p=s(9589);const u={table:"ExerciseTable_table__gqYvK",tableTitle:"ExerciseTable_tableTitle__nWHV1",date:"ExerciseTable_date__+kHp7",tableFooter:"ExerciseTable_tableFooter__8lrF-"};var v=s(579);const g=[{key:"1",weight:60,set:1,reps:10,icon:(0,v.jsx)(x.A,{className:u.deleteIcon})},{key:"2",weight:80,set:2,reps:8,icon:(0,v.jsx)(x.A,{className:u.deleteIcon})},{key:"3",weight:100,set:3,reps:6,icon:(0,v.jsx)(x.A,{className:u.deleteIcon})},{key:"4",weight:110,set:4,reps:3,icon:(0,v.jsx)(x.A,{className:u.deleteIcon})}],A=()=>{const{t:e}=(0,_.Bd)(),[t,s]=(0,n.useState)(g),r=[{title:"".concat(e("set")),dataIndex:"set",sorter:(e,t)=>e.set-t.set,width:"30%"},{title:"".concat(e("weight")),dataIndex:"weight",width:"40%"},{title:"".concat(e("reps")),dataIndex:"reps",width:"30%"},{title:"",dataIndex:"icon",render:(n,r)=>(0,v.jsx)(i.A,{title:e("deleteRow"),children:(0,v.jsx)(x.A,{className:u.deleteIcon,onClick:()=>(e=>{const n=t.filter((t=>t.key!==e));s(n)})(r.key)})})}];return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(l.A,{style:{backgroundColor:"#0097B2"}}),(0,v.jsxs)("div",{className:u.tableTitle,children:[(0,v.jsx)(p.t,{children:"Bench press"}),(0,v.jsxs)("div",{className:u.date,children:[e("date"),"02.04.2024"]})]}),(0,v.jsxs)(o.Ay,{theme:{components:{Table:{headerBg:"#1A1A1A",headerColor:"#ffffff",headerSortHoverBg:"#282828",bodySortBg:"#282828",cellFontSize:16,colorBgContainer:"#282828",colorText:"#ffffff",colorPrimary:"#ffffff",headerBorderRadius:0,rowHoverBg:"#464646",borderColor:"#535353",fontWeightStrong:700,headerSplitColor:"#535353",headerSortActiveBg:"282828"}}},children:[(0,v.jsx)(d.A,{columns:r,dataSource:t,pagination:!1,className:u.table,locale:{emptyText:()=>(0,v.jsx)(c.A,{image:c.A.PRESENTED_IMAGE_SIMPLE,description:(0,v.jsx)("span",{style:{color:"#ffffff"},children:e("noData")})})}}),(0,v.jsx)(j.S,{onClick:()=>{const e=[...t];let n=0;e.length>0&&(n=parseInt(e[e.length-1].key));const r={key:(n+1).toString(),weight:0,set:n+1,reps:0,icon:(0,v.jsx)(x.A,{})};e.push(r),s(e)},icon:(0,v.jsx)(h.A,{}),children:e("addRow")}),(0,v.jsxs)("div",{className:u.tableFooter,children:[(0,v.jsx)(j.S,{icon:(0,v.jsx)(f.A,{}),children:e("previous")}),(0,v.jsx)(j.S,{icon:(0,v.jsx)(m.A,{}),children:e("save")})]})]})]})};var y=s(4e3),b=s(9868),E=s(1907);const N="AddExercise_addExercise__7FNxa",I="AddExercise_inputLabel__JSVE3",w=()=>{const{t:e}=(0,_.Bd)(),[t]=y.A.useForm();return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(p.t,{children:e("addAnExercise")}),(0,v.jsx)(y.A,{form:t,initialValues:{remember:!0},layout:"vertical",children:(0,v.jsxs)("div",{className:N,children:[(0,v.jsx)(b.w,{name:"Exercise",text:e("exerciseName"),placeholder:e("typeExercise"),isRequired:!0}),(0,v.jsx)(y.A.Item,{name:"Enter date",label:(0,v.jsx)("span",{className:I,children:e("enterDate")}),children:(0,v.jsx)(E.V,{})}),(0,v.jsx)(j.S,{icon:(0,v.jsx)(h.A,{}),children:e("addExerciseBtn")})]})})]})};var C=s(3586),F=s(3727),T=s(7407);const k="FavoriteExercises_title__HHdaO",B="FavoriteExercises_favoriteExercises__LU+I9",S="FavoriteExercises_usedItem__QKL2-",D="FavoriteExercises_deleteIcon__ltIYi",L="FavoriteExercises_editIcon__+L-ZU",P=e=>{let{text:t}=e;return(0,v.jsx)("span",{style:{color:"#0097B2",fontWeight:"700"},children:t})},R=[{title:"Bench press",content:"Last set: 100 \u0445 10"},{title:"Cable Fly",content:"Last set: 20 \u0445 10"},{title:"Pec Deck",content:"Last set: 30 \u0445 10"},{title:"Push ups",content:"Last set: 50"}],H=()=>{const{t:e}=(0,_.Bd)(),[t,s]=(0,n.useState)(R);return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(p.t,{children:e("favoriteExercises"),className:k}),(0,v.jsx)("div",{className:B,children:t.map(((n,r)=>(0,v.jsxs)(C.A,{title:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(P,{text:n.title}),(0,v.jsx)(i.A,{title:e("deleteExercise"),children:(0,v.jsx)(F.A,{className:D,onClick:()=>(e=>{const n=[...t];n.splice(e,1),s(n)})(r)})})]}),className:S,bordered:!1,children:[n.content,(0,v.jsx)(i.A,{title:e("editExercise"),children:(0,v.jsx)("div",{className:L,children:(0,v.jsx)(T.A,{})})})]},r)))})]})},V=()=>((0,n.useEffect)((()=>{window.scroll(0,0)}),[]),(0,v.jsxs)(a.f,{children:[(0,v.jsx)(r.B,{text:"Chest workout",textAlign:"center"}),(0,v.jsx)(w,{}),(0,v.jsx)(H,{}),(0,v.jsx)(A,{})]}))}}]);
//# sourceMappingURL=149.230a8dd0.chunk.js.map