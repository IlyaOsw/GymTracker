"use strict";(self.webpackChunkgymtracker=self.webpackChunkgymtracker||[]).push([[402],{1907:(e,t,s)=>{s.d(t,{V:()=>u});var r=s(1210),a=s(7356),c=s(7615),n=(s(5043),s(446)),l=s.n(n),i=s(4117);const d="Calendar_dateField__6KRfc";var o=s(579);const u=e=>{let{className:t}=e;const{t:s}=(0,i.Bd)();return(0,o.jsx)(a.Ay,{theme:{components:{DatePicker:{colorBgContainer:"#141414",colorFillSecondary:"#141414",colorTextPlaceholder:"#818181",colorBgElevated:"#141414",colorTextHeading:"#ffffff",colorText:"#ffffff",colorIcon:"#ffffff",colorIconHover:"#1677ff"}}},children:(0,o.jsx)(c.A,{className:"".concat(d," ").concat(t),placeholder:s("selectDate"),suffixIcon:(0,o.jsx)(r.A,{}),inputReadOnly:!0,allowClear:!1,disabledDate:e=>e&&e>=l()().endOf("day")})})}},9868:(e,t,s)=>{s.d(t,{w:()=>o});var r=s(4395),a=s(5578),c=(s(5043),s(4117));const n="CustomInput_inputWrapper__wz8SN",l="CustomInput_inputLabel__b-QWx",i="CustomInput_inputField__baNtE";var d=s(579);const o=e=>{let{name:t,text:s,type:o,placeholder:u,isRequired:p=!0,className:m}=e;const{t:x}=(0,c.Bd)();return(0,d.jsx)("div",{className:n,children:(0,d.jsx)(r.A.Item,{label:(0,d.jsx)("span",{className:l,children:x(s)}),name:t,rules:[{required:p}],children:(0,d.jsx)(a.A,{type:o,placeholder:u,className:"".concat(i," ").concat(m),allowClear:!0})})})}},1499:(e,t,s)=>{s.d(t,{B:()=>n});s(5043);var r=s(4117);const a={descriptionTitle:"DescriptionTitle_descriptionTitle__E-lRw",start:"DescriptionTitle_start__FSu7h",center:"DescriptionTitle_center__eJvMJ",end:"DescriptionTitle_end__uV+MA"};var c=s(579);const n=e=>{let{text:t,textAlign:s="start",className:n}=e;const{t:l}=(0,r.Bd)();return(0,c.jsx)("h2",{className:"".concat(a.descriptionTitle," ").concat(a[s]," ").concat(n),children:l(t)})}},9752:(e,t,s)=>{s.d(t,{f:()=>c});s(5043);var r=s(579);const a={maxWidth:"1200px",margin:"0 auto"},c=e=>{let{children:t}=e;return(0,r.jsx)("div",{style:a,children:t})}},9589:(e,t,s)=>{s.d(t,{t:()=>c});s(5043);const r="SubTitle_subTitle__6A8PN";var a=s(579);const c=e=>{let{children:t}=e;return(0,a.jsx)("p",{className:r,children:t})}},5402:(e,t,s)=>{s.r(t),s.d(t,{default:()=>h});var r=s(5043),a=s(4395),c=s(8223),n=s(5337),l=s(1499),i=s(9752),d=s(9589),o=s(9868),u=s(1907),p=s(7384);const m={test:"Workout_test__TYkjS",addExercise:"Workout_addExercise__8nqMH",input:"Workout_input__2nHSb",inputLabel:"Workout_inputLabel__Gl3Po",exerciseDescription:"Workout_exerciseDescription__G5H8c",addBtn:"Workout_addBtn__hDl8s",recentlyUsed:"Workout_recentlyUsed__Rsbx8",usedItem:"Workout_usedItem__gZrBb"};var x=s(579);const h=()=>{const[e]=a.A.useForm();return(0,r.useEffect)((()=>{window.scroll(0,0)}),[]),(0,x.jsx)(i.f,{children:(0,x.jsxs)("div",{className:m.test,children:[(0,x.jsx)(l.B,{text:"Your chest workout",textAlign:"center"}),(0,x.jsx)(d.t,{children:"Indicate your weight and reps"}),(0,x.jsx)(a.A,{form:e,initialValues:{remember:!0},layout:"vertical",children:(0,x.jsxs)("div",{className:m.addExercise,children:[(0,x.jsx)("div",{className:m.name,children:(0,x.jsx)(o.w,{name:"Exercise",text:"Type your exercise",placeholder:"Exercise name",isRequired:!0,className:m.input})}),(0,x.jsxs)("div",{className:m.date,children:[(0,x.jsx)("div",{className:m.exerciseDescription}),(0,x.jsx)(a.A.Item,{name:"Enter date",label:(0,x.jsx)("span",{className:m.inputLabel,children:"Enter date"}),children:(0,x.jsx)(u.V,{className:m.input})})]}),(0,x.jsx)(p.S,{icon:(0,x.jsx)(n.A,{}),className:m.addBtn,children:"Add"})]})}),(0,x.jsx)(d.t,{children:"Recently used"}),(0,x.jsxs)("div",{className:m.recentlyUsed,children:[(0,x.jsx)(c.Ay,{shape:"round",type:"primary",size:"large",className:m.usedItem,children:"Bench press"}),(0,x.jsx)(c.Ay,{shape:"round",type:"primary",size:"large",className:m.usedItem,children:"Cable Fly"}),(0,x.jsx)(c.Ay,{shape:"round",type:"primary",size:"large",className:m.usedItem,children:"Pec Deck"}),(0,x.jsx)(c.Ay,{shape:"round",type:"primary",size:"large",className:m.usedItem,children:"Push ups"})]})]})})}},5337:(e,t,s)=>{s.d(t,{A:()=>i});var r=s(8168),a=s(5043);const c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"};var n=s(2172),l=function(e,t){return a.createElement(n.A,(0,r.A)({},e,{ref:t,icon:c}))};const i=a.forwardRef(l)}}]);
//# sourceMappingURL=402.872408e9.chunk.js.map