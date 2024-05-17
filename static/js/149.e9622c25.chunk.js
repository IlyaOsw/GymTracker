"use strict";(self.webpackChunkgymtracker=self.webpackChunkgymtracker||[]).push([[149],{1907:(e,t,s)=>{s.d(t,{V:()=>x});var c=s(1210),r=s(7356),a=s(7615),n=(s(5043),s(446)),l=s.n(n),i=s(4117);const o="Calendar_dateField__6KRfc";var d=s(579);const x=e=>{let{className:t,onChange:s}=e;const{t:n}=(0,i.Bd)();return(0,d.jsx)(r.Ay,{theme:{components:{DatePicker:{colorBgContainer:"#141414",colorFillSecondary:"#141414",colorTextPlaceholder:"#818181",colorBgElevated:"#141414",colorTextHeading:"#ffffff",colorText:"#ffffff",colorIcon:"#ffffff",colorIconHover:"#1677ff"}}},children:(0,d.jsx)(a.A,{className:"".concat(o," ").concat(t),placeholder:n("selectDate"),suffixIcon:(0,d.jsx)(c.A,{}),inputReadOnly:!0,allowClear:!1,disabledDate:e=>e&&e>=l()().endOf("day"),onChange:e=>{s&&s(e)}})})}},9868:(e,t,s)=>{s.d(t,{w:()=>d});var c=s(4e3),r=s(5578),a=(s(5043),s(4117));const n="CustomInput_inputWrapper__wz8SN",l="CustomInput_inputLabel__b-QWx",i="CustomInput_inputField__baNtE";var o=s(579);const d=e=>{let{name:t,text:s,type:d,placeholder:x,isRequired:h=!0,className:_,onChange:f}=e;const{t:j}=(0,a.Bd)();return(0,o.jsx)("div",{className:n,children:(0,o.jsx)(c.A.Item,{label:(0,o.jsx)("span",{className:l,children:j(s)}),name:t,rules:[{required:h}],children:(0,o.jsx)(r.A,{type:d,placeholder:x,className:"".concat(i," ").concat(_),allowClear:!0,onChange:e=>{const{value:t}=e.target;f&&f(t)}})})})}},1499:(e,t,s)=>{s.d(t,{B:()=>n});s(5043);var c=s(4117);const r={descriptionTitle:"DescriptionTitle_descriptionTitle__E-lRw",start:"DescriptionTitle_start__FSu7h",center:"DescriptionTitle_center__eJvMJ",end:"DescriptionTitle_end__uV+MA"};var a=s(579);const n=e=>{let{text:t,textAlign:s="start",className:n}=e;const{t:l}=(0,c.Bd)();return(0,a.jsx)("h2",{className:"".concat(r.descriptionTitle," ").concat(r[s]," ").concat(n),children:l(t)})}},9752:(e,t,s)=>{s.d(t,{f:()=>a});s(5043);var c=s(579);const r={maxWidth:"1200px",margin:"0 auto"},a=e=>{let{children:t}=e;return(0,c.jsx)("div",{style:r,children:t})}},9589:(e,t,s)=>{s.d(t,{t:()=>a});s(5043);const c="SubTitle_subTitle__6A8PN";var r=s(579);const a=e=>{let{children:t,className:s}=e;return(0,r.jsx)("p",{className:"".concat(c," ").concat(s),children:t})}},1149:(e,t,s)=>{s.r(t),s.d(t,{default:()=>V});var c=s(5043),r=s(1499),a=s(9752),n=s(9472),l=s(6651),i=s(8354),o=s(7356),d=s(3994),x=s(1966),h=s(5337),_=s(682),f=s(3390),j=s(4117),m=s(3963),p=s(9589);const u={table:"ExerciseTable_table__gqYvK",tableTitle:"ExerciseTable_tableTitle__nWHV1",date:"ExerciseTable_date__+kHp7",tableFooter:"ExerciseTable_tableFooter__8lrF-"};var A=s(579);const g=[{key:"1",weight:60,set:1,reps:10,icon:(0,A.jsx)(x.A,{className:u.deleteIcon})},{key:"2",weight:80,set:2,reps:8,icon:(0,A.jsx)(x.A,{className:u.deleteIcon})},{key:"3",weight:100,set:3,reps:6,icon:(0,A.jsx)(x.A,{className:u.deleteIcon})},{key:"4",weight:110,set:4,reps:3,icon:(0,A.jsx)(x.A,{className:u.deleteIcon})}],v=()=>{const{t:e}=(0,j.Bd)(),[t,s]=(0,c.useState)(g),r=[{title:"".concat(e("set")),dataIndex:"set",sorter:(e,t)=>e.set-t.set,width:"30%"},{title:"".concat(e("weight")),dataIndex:"weight",width:"40%"},{title:"".concat(e("reps")),dataIndex:"reps",width:"30%"},{title:"",dataIndex:"icon",render:(c,r)=>(0,A.jsx)(l.A,{title:e("deleteRow"),children:(0,A.jsx)(x.A,{className:u.deleteIcon,onClick:()=>(e=>{const c=t.filter((t=>t.key!==e));s(c)})(r.key)})})}];return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(i.A,{style:{backgroundColor:"#0097B2"}}),(0,A.jsxs)("div",{className:u.tableTitle,children:[(0,A.jsx)(p.t,{children:"Bench press"}),(0,A.jsxs)("div",{className:u.date,children:[e("date"),"02.04.2024"]})]}),(0,A.jsxs)(o.Ay,{theme:{components:{Table:{headerBg:"#1A1A1A",headerColor:"#ffffff",headerSortHoverBg:"#282828",bodySortBg:"#282828",cellFontSize:16,colorBgContainer:"#282828",colorText:"#ffffff",colorPrimary:"#ffffff",headerBorderRadius:0,rowHoverBg:"#464646",borderColor:"#535353",fontWeightStrong:700,headerSplitColor:"#535353",headerSortActiveBg:"282828"}}},children:[(0,A.jsx)(d.A,{columns:r,dataSource:t,pagination:!1,className:u.table,locale:{emptyText:()=>(0,A.jsx)(n.A,{image:n.A.PRESENTED_IMAGE_SIMPLE,description:(0,A.jsx)("span",{style:{color:"#ffffff"},children:e("noData")})})}}),(0,A.jsx)(m.S,{onClick:()=>{const e=[...t];let c=0;e.length>0&&(c=parseInt(e[e.length-1].key));const r={key:(c+1).toString(),weight:0,set:c+1,reps:0,icon:(0,A.jsx)(x.A,{})};e.push(r),s(e)},icon:(0,A.jsx)(h.A,{}),children:e("addRow")}),(0,A.jsxs)("div",{className:u.tableFooter,children:[(0,A.jsx)(m.S,{icon:(0,A.jsx)(_.A,{}),children:e("previous")}),(0,A.jsx)(m.S,{icon:(0,A.jsx)(f.A,{}),children:e("save")})]})]})]})};var N=s(4e3),b=s(9868),E=s(1907);const y="AddExercise_addExercise__7FNxa",I="AddExercise_inputLabel__JSVE3",w=()=>{const{t:e}=(0,j.Bd)(),[t]=N.A.useForm();return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(p.t,{children:e("addAnExercise")}),(0,A.jsx)(N.A,{form:t,initialValues:{remember:!0},layout:"vertical",children:(0,A.jsxs)("div",{className:y,children:[(0,A.jsx)(b.w,{name:"Exercise",text:e("exerciseName"),placeholder:e("typeExercise"),isRequired:!0}),(0,A.jsx)(N.A.Item,{name:"Enter date",label:(0,A.jsx)("span",{className:I,children:e("enterDate")}),children:(0,A.jsx)(E.V,{})}),(0,A.jsx)(m.S,{icon:(0,A.jsx)(h.A,{}),children:e("addExerciseBtn")})]})})]})};var C=s(3586),T=s(3727),k=s(7407);const B="FavoriteExercises_title__HHdaO",F="FavoriteExercises_favoriteExercises__LU+I9",S="FavoriteExercises_usedItem__QKL2-",D="FavoriteExercises_deleteIcon__ltIYi",L="FavoriteExercises_editIcon__+L-ZU",R=e=>{let{text:t}=e;return(0,A.jsx)("span",{style:{color:"#0097B2",fontWeight:"700"},children:t})},H=[{title:"Bench press",content:"Last set: 100 \u0445 10"},{title:"Cable Fly",content:"Last set: 20 \u0445 10"},{title:"Pec Deck",content:"Last set: 30 \u0445 10"},{title:"Push ups",content:"Last set: 50"}],P=()=>{const{t:e}=(0,j.Bd)(),[t,s]=(0,c.useState)(H);return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(p.t,{children:e("favoriteExercises"),className:B}),(0,A.jsx)("div",{className:F,children:t.map(((c,r)=>(0,A.jsxs)(C.A,{title:(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(R,{text:c.title}),(0,A.jsx)(l.A,{title:e("deleteExercise"),children:(0,A.jsx)(T.A,{className:D,onClick:()=>(e=>{const c=[...t];c.splice(e,1),s(c)})(r)})})]}),className:S,bordered:!1,children:[c.content,(0,A.jsx)(l.A,{title:e("editExercise"),children:(0,A.jsx)("div",{className:L,children:(0,A.jsx)(k.A,{})})})]},r)))})]})},V=()=>((0,c.useEffect)((()=>{window.scroll(0,0)}),[]),(0,A.jsxs)(a.f,{children:[(0,A.jsx)(r.B,{text:"Chest workout",textAlign:"center"}),(0,A.jsx)(w,{}),(0,A.jsx)(P,{}),(0,A.jsx)(v,{})]}))}}]);
//# sourceMappingURL=149.e9622c25.chunk.js.map