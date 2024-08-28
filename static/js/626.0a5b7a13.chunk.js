"use strict";(self.webpackChunkgymtracker=self.webpackChunkgymtracker||[]).push([[626],{9868:(e,t,s)=>{s.d(t,{w:()=>d});var r=s(4e3),a=s(5578),n=(s(5043),s(4117));const c="CustomInput_inputWrapper__wz8SN",i="CustomInput_inputLabel__b-QWx",o="CustomInput_inputField__baNtE";var l=s(579);const d=e=>{let{name:t,text:s,type:d,placeholder:x,isRequired:u=!0,className:h,onChange:p,value:g}=e;const{t:m}=(0,n.Bd)();return(0,l.jsx)("div",{className:c,children:(0,l.jsx)(r.A.Item,{label:(0,l.jsx)("span",{className:i,children:m(s)}),name:t,rules:[{required:u}],children:(0,l.jsx)(a.A,{type:d,placeholder:x,className:"".concat(o," ").concat(h),allowClear:!0,onChange:e=>{const{value:t}=e.target;p&&p(t)},value:g,autoComplete:"off"})})})}},5556:(e,t,s)=>{s.d(t,{j:()=>i});var r=s(8732),a=s(2918),n=s(5043),c=s(579);const i=e=>{let{open:t,onCancel:s,footer:i=null,children:o}=e;return(0,n.useEffect)((()=>(document.body.style.overflow=t?"hidden":"auto",()=>{document.body.style.overflow="auto"})),[t]),(0,c.jsx)(r.Ay,{theme:{components:{Modal:{contentBg:"#141414",colorIcon:"lightgray",colorIconHover:"gray"}}},children:(0,c.jsx)(a.A,{open:t,onCancel:s,footer:i,style:{marginTop:"50px"},children:o})})}},1499:(e,t,s)=>{s.d(t,{B:()=>o});var r=s(1984),a=s(4117),n=s(5459);const c={descriptionTitle:"DescriptionTitle_descriptionTitle__E-lRw",start:"DescriptionTitle_start__FSu7h",center:"DescriptionTitle_center__eJvMJ",end:"DescriptionTitle_end__uV+MA"};var i=s(579);const o=e=>{let{text:t,textAlign:s="start",className:o}=e;const{t:l}=(0,a.Bd)(),{ref:d,controls:x}=(0,n.F)();return(0,i.jsx)(r.P.h2,{ref:d,className:"".concat(c.descriptionTitle," ").concat(c[s]," ").concat(o),initial:"hidden",animate:x,variants:n.l,children:l(t)})}},9752:(e,t,s)=>{s.d(t,{f:()=>n});s(5043);var r=s(579);const a={maxWidth:"1200px",margin:"0 auto"},n=e=>{let{children:t}=e;return(0,r.jsx)("div",{style:a,children:t})}},9525:(e,t,s)=>{s.d(t,{U:()=>c});s(5043);var r=s(7021);const a="ResetButton_reset__efwrw";var n=s(579);const c=e=>{let{onClick:t,children:s,icon:c}=e;return(0,n.jsx)(r.Ay,{className:a,onClick:t,icon:c,children:s})}},8204:(e,t,s)=>{s.d(t,{D:()=>c});var r=s(7021);s(5043);const a="SettingButton_btn__TNlVz";var n=s(579);const c=e=>{let{onClick:t,icon:s,children:c,className:i}=e;return(0,n.jsx)(r.Ay,{onClick:t,icon:s,className:"".concat(a," ").concat(i),children:c})}},9589:(e,t,s)=>{s.d(t,{t:()=>i});s(5043);var r=s(1984),a=s(5459);const n="SubTitle_subTitle__6A8PN";var c=s(579);const i=e=>{let{children:t,className:s}=e;const{ref:i,controls:o}=(0,a.F)();return(0,c.jsx)(r.P.p,{ref:i,className:"".concat(n," ").concat(s),initial:"hidden",animate:o,variants:a.l,children:t})}},5459:(e,t,s)=>{s.d(t,{F:()=>c,l:()=>i});var r=s(9927),a=s(5246),n=s(5043);const c=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.1,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=arguments.length>2?arguments[2]:void 0;const c=(0,r.s)(),[i,o]=(0,a.Wx)({threshold:e,triggerOnce:t});return(0,n.useEffect)((()=>{o?c.start("visible"):c.start("hidden")}),[c,o]),{ref:i,controls:c,animationVariants:s}},i={hidden:{opacity:0},visible:{opacity:1,transition:{duration:1}}}},3626:(e,t,s)=>{s.r(t),s.d(t,{default:()=>be});var r=s(5043),a=s(3216),n=s(1499),c=s(9752),i=s(2019),o=s(8354),l=s(8732),d=s(5743),x=s(3727),u=s(4117),h=s(8895),p=s(6032),g=s(1238),m=s(9589),v=s(9472),j=s(579);const _=()=>{const{t:e}=(0,u.Bd)();return(0,j.jsx)(v.A,{image:v.A.PRESENTED_IMAGE_SIMPLE,description:(0,j.jsx)("span",{style:{color:"#ffffff"},children:e("noData")})})},y="NumericInput_input__1SATw",f=(e,t)=>{let{value:s,onChange:r,onBlur:a}=e;return(0,j.jsx)("input",{ref:t,value:s,onChange:e=>{let t=e.target.value;t=t.replace(",","."),t.length>1&&t.startsWith("0")&&!t.startsWith("0.")&&(t=t.substring(1)),/^\d*\.?\d*$/.test(t)&&r(t)},onBlur:a,className:y,type:"text",inputMode:"decimal",pattern:"[0-9]*[.,]?[0-9]*"})},E=(0,r.forwardRef)(f),w=()=>setTimeout((()=>{window.scrollTo({left:0,top:document.body.scrollHeight,behavior:"smooth"})}),100),C="ExerciseTable_tableTitle__nWHV1",S="ExerciseTable_subtitle__dWB0y",N="ExerciseTable_dateAndDelete__Rghoq",k="ExerciseTable_table__gqYvK",A="ExerciseTable_editableDiv__lnIPx",D="ExerciseTable_repsAndDelete__sJi7S";var I=s(5337),b=s(3390),B=s(682),R=s(9905),T=s(3963),F=s(8204);const M="TableFooter_tableFooter__Vdj4o",U="TableFooter_saveBtn__CLumP",W=e=>{let{selectedExercise:t,data:s,setData:a,setEditWeight:n,saveExerciseData:c,onWorkoutDateChange:i,setCurrentWorkout:o,addRowBtn:l,setAddRowBtn:d,saveBtn:h,setSaveBtn:g,setDeleteBtn:m}=e;const{t:v}=(0,u.Bd)(),[_,y]=(0,r.useState)([]),[f,E]=(0,r.useState)([]),[w,C]=(0,r.useState)(-1),[S,N]=(0,r.useState)(!1);(0,r.useEffect)((()=>{N(!1),(async()=>{if(t){const s=(0,p.rJ)((0,p.aU)(),"sets"),r=(0,p.H9)(s,t.id);try{const e=await(0,p.x7)(r);if(e.exists()){const t=e.data(),s=(null===t||void 0===t?void 0:t.workouts)||[];if(Array.isArray(s)&&s.every((e=>Array.isArray(e.approaches)))){y(s.map((e=>e.approaches||[]))),E(s.map((e=>e.date)));const e=s.length-1;C(e),i(s[e].date)}else console.error("Workouts data format is incorrect.")}}catch(e){console.error("Error loading workouts:",e)}}})()}),[t]);const k=w===_.length-1;return(0,j.jsxs)(j.Fragment,{children:[l&&(0,j.jsx)(F.D,{onClick:()=>{if(!t)return;const e=[...s],r=e.length>0?e[e.length-1].set+1:1,c={key:r.toString(),weight:"",set:r,reps:"",icon:(0,j.jsx)(x.A,{})};e.push(c),a(e),n(c.key)},icon:(0,j.jsx)(I.A,{}),children:v("addRow")}),h&&(0,j.jsx)("div",{className:U,children:(0,j.jsx)(T.S,{onClick:c,icon:(0,j.jsx)(b.A,{}),children:v("saveTraining")})}),(0,j.jsxs)("div",{className:M,children:[!S&&w>0?(0,j.jsx)(T.S,{onClick:()=>{if(w>0){const e=w-1;C(e),a(_[e]||[]),i(f[e])}},icon:(0,j.jsx)(B.A,{}),children:v("previous")}):(0,j.jsx)("div",{}),!S&&!k&&(0,j.jsx)(T.S,{onClick:()=>{if(w<_.length-1){const e=w+1;C(e),a(_[e]||[]),i(f[e])}},icon:(0,j.jsx)(R.A,{}),children:v("next")}),!S&&k&&(0,j.jsxs)(T.S,{onClick:()=>{a([]),d(!0),g(!0),N(!0),o(!0),m(!1)},children:[v("newEntry"),(0,j.jsx)(R.A,{})]})]})]})};var O=s(7407),H=s(7326);const P="BestResult_collapse__pQyb-",L="BestResult_title__jsqEH",J="BestResult_wrapper__1-LYV",q="BestResult_editBtn__8ELAU",V=e=>{let{bestResult:t,selectedExercise:s,setBestResult:a}=e;const{t:n}=(0,u.Bd)(),c=(0,h.xI)().currentUser,[o,l]=i.Ay.useMessage(),[d,x]=(0,r.useState)(!1),[g,m]=(0,r.useState)((null===t||void 0===t?void 0:t.weight)||"0"),[v,_]=(0,r.useState)((null===t||void 0===t?void 0:t.reps)||"0");(0,r.useEffect)((()=>{m((null===t||void 0===t?void 0:t.weight)||"0"),_((null===t||void 0===t?void 0:t.reps)||"0")}),[t]);const y=()=>{(async e=>{if(c&&s){const r=(0,p.H9)((0,p.aU)(),"exercises",c.uid);try{const t=await(0,p.x7)(r);if(t.exists()){const n=t.data().exercises.map((t=>t.id===s.id?{...t,bestResult:e}:t));await(0,p.mZ)(r,{exercises:n}),a(e)}else o.open({type:"error",content:n("noExercisesFound")})}catch(t){o.open({type:"error",content:n("errorSavingBestResult")})}}})({weight:g,reps:v}),x(!1),o.open({type:"success",content:n("recordUpdated")})},f=[{key:"1",label:(0,j.jsx)("div",{className:L,children:n("bestExerciseResult")}),children:(0,j.jsx)(j.Fragment,{children:d?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{className:J,children:[(0,j.jsxs)("div",{children:[(0,j.jsx)(E,{value:g,onChange:m,onBlur:y}),(0,j.jsx)("span",{children:n("kg")})]}),(0,j.jsxs)("div",{children:[(0,j.jsx)(E,{value:v,onChange:_,onBlur:y}),(0,j.jsx)("span",{children:n("bestResultReps")})]})]}),(0,j.jsx)("div",{className:q,children:(0,j.jsx)(F.D,{icon:(0,j.jsx)(b.A,{}),onClick:y,children:(0,j.jsx)("span",{children:n("saveRecord")})})})]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{className:J,children:[(0,j.jsxs)("div",{children:[g," ",n("kg")]}),(0,j.jsxs)("div",{children:[v," ",n("bestResultReps")]})]}),(0,j.jsx)("div",{className:q,children:(0,j.jsx)(F.D,{icon:(0,j.jsx)(O.A,{}),onClick:()=>x(!0),children:(0,j.jsx)("span",{children:n("updateRecord")})})})]})}),extra:(0,j.jsx)("img",{src:"/GymTracker/assets/Icons/AdditionalIcons/trophy.png"})}];return(0,j.jsxs)("div",{className:P,children:[l,(0,j.jsx)(H.A,{size:"large",items:f,bordered:!1})]})};var Z=s(1966),z=s(9525),Y=s(5556),K=s(647);const Q="DeleteWorkout_deleteWorkout__T7qoY",G="DeleteWorkout_confirm__yTni8",X="DeleteWorkout_deleteBtn__u1SVc",$=e=>{let{workoutDate:t,selectedExercise:s,setData:a,setWorkoutDate:n,setSelectedExercise:c,setActiveCardId:o}=e;const{t:l}=(0,u.Bd)(),d=(0,h.xI)().currentUser,[x,g]=i.Ay.useMessage(),[m,v]=(0,r.useState)(!1);return(0,j.jsxs)(j.Fragment,{children:[g,(0,j.jsx)("div",{className:Q,children:(0,j.jsx)(z.U,{icon:(0,j.jsx)(Z.A,{}),onClick:()=>{t&&s?v(!0):x.open({type:"error",content:l("noDataToDelete")})},children:l("deleteWorkout")})}),(0,j.jsxs)(Y.j,{open:m,onCancel:e=>{v(!1)},footer:!1,children:[(0,j.jsx)("p",{className:G,children:l("confirmDeletingWorkout")}),(0,j.jsx)("div",{className:X,children:(0,j.jsx)(z.U,{children:l("delete"),onClick:e=>{e.stopPropagation(),(async()=>{if(!t||!s||!d)return;const e=(0,p.rJ)((0,p.aU)(),"sets"),r=(0,p.H9)(e,s.id);try{const e=await(0,p.x7)(r);if(e.exists()){const s=(e.data().workouts||[]).filter((e=>new Date(e.date).toLocaleString()!==t));await(0,p.mZ)(r,{workouts:s}),a([]),n(null),c(null),o(null),(0,K.e)(),v(!1),x.open({type:"success",content:l("workoutDeleted")})}}catch(i){x.open({type:"error",content:l("errorDeletingWorkout")})}})()},icon:(0,j.jsx)(Z.A,{})})})]})]})},ee=e=>{let{selectedExercise:t,setSelectedExercise:s,setActiveCardId:a}=e;const{t:n}=(0,u.Bd)(),[c,v]=i.Ay.useMessage(),[y,f]=(0,r.useState)([]),[I,b]=(0,r.useState)(null),[B,R]=(0,r.useState)(null),[T,F]=(0,r.useState)(null),[M,U]=(0,r.useState)(null),[O,H]=(0,r.useState)(!1),[P,L]=(0,r.useState)(!1),[J,q]=(0,r.useState)(!1),[Z,z]=(0,r.useState)(!0),Y=(0,r.useRef)(null),K=(0,r.useRef)(null),Q=(0,h.xI)().currentUser;(0,r.useEffect)((()=>{t?G():f([])}),[t]),(0,r.useEffect)((()=>{T&&K.current&&K.current.focus(),B&&Y.current&&Y.current.focus()}),[T,B]);const G=async()=>{if(Q&&t){const s=(0,p.rJ)((0,p.aU)(),"sets"),r=(0,p.H9)(s,t.id),a=(0,p.H9)((0,p.aU)(),"exercises",Q.uid);try{const[e,s]=await Promise.all([(0,p.x7)(r),(0,p.x7)(a)]);if(e.exists()){const r=e.data(),a=(null===r||void 0===r?void 0:r.workouts)||[];if(a.length>0){const e=a[a.length-1],t=new Date(e.date).toLocaleString();U(t);const s=(e.approaches||[]).map((e=>({key:e.id,set:e.set,weight:e.weight,reps:e.reps,icon:(0,j.jsx)(x.A,{})})));f(s),w()}else f([]),U(null),w();if(z(a.length>0),s.exists()){const e=s.data().exercises.find((e=>e.id===t.id));e&&b(e.bestResult)}L(!0),q(!0)}else f([]),U(null),w(),z(!1);L(!1),q(!1)}catch(e){alert(e)}}},X=[{title:"".concat(n("set")),dataIndex:"set",width:"20%"},{title:"".concat(n("weight")),dataIndex:"weight",width:"30%",render:(e,t)=>O?B===t.key?(0,j.jsx)(E,{ref:Y,value:t.weight,onChange:e=>((e,t)=>{const s=y.map((s=>s.key===e?{...s,weight:t}:s));f(s)})(t.key,e),onBlur:()=>R(null)}):(0,j.jsx)("div",{onClick:()=>R(t.key),className:A,children:t.weight||n("clickToEdit")}):(0,j.jsx)("div",{className:A,children:t.weight})},{title:"".concat(n("reps")),dataIndex:"reps",width:"25%",render:(e,t)=>O?T===t.key?(0,j.jsx)(E,{ref:K,value:t.reps,onChange:e=>((e,t)=>{const s=y.map((s=>s.key===e?{...s,reps:t}:s));f(s)})(t.key,e),onBlur:()=>F(null)}):(0,j.jsx)("div",{className:D,children:(0,j.jsx)("div",{onClick:()=>F(t.key),className:A,children:t.reps||n("clickToEdit")})}):(0,j.jsx)("div",{className:A,children:t.reps})}];return(0,j.jsxs)(j.Fragment,{children:[v,(0,j.jsx)(o.A,{style:{backgroundColor:"gray"}}),(0,j.jsx)("div",{className:C,children:(0,j.jsx)(m.t,{children:(null===t||void 0===t?void 0:t.name)||n("noExerciseSelected"),className:S})}),(0,j.jsx)(l.Ay,{theme:{components:{Table:{headerBg:"#1A1A1A",headerColor:"#ffffff",cellFontSize:18,colorBgContainer:"#282828",colorText:"#ffffff",borderColor:"#535353",cellPaddingBlock:13}}},children:t?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(V,{bestResult:I,selectedExercise:t,setBestResult:b}),O?(0,j.jsxs)("div",{className:N,children:[n("workoutDate"),": ",(new Date).toLocaleDateString()]}):(0,j.jsxs)("div",{className:N,children:[n("workoutDate"),": ",M||". . ."]}),(0,j.jsx)(d.A,{rowKey:e=>e.key,columns:X,dataSource:y,pagination:!1,className:k,locale:{emptyText:(0,j.jsx)(_,{})}}),(0,j.jsx)(W,{selectedExercise:t,data:y,setData:f,setEditWeight:R,saveExerciseData:async()=>{if(Q&&t){const s=y.filter((e=>Number(e.reps)>0&&Number(e.weight)>0));if(0===s.length)return void c.open({type:"error",content:n("noDataToSave")});const r=(0,p.rJ)((0,p.aU)(),"sets"),a=(0,p.H9)((0,p.aU)(),"exercises",Q.uid);try{const e=(0,p.wP)((0,p.aU)()),i=(0,p.H9)(r,t.id),o=await(0,p.x7)(i),l=o.exists()?o.data():{workouts:[]},d={id:(0,g.A)(),date:(new Date).toISOString(),approaches:s.map(((e,t)=>({id:(0,g.A)(),set:t+1,reps:e.reps,weight:e.weight})))};l.workouts.push(d),e.set(i,l);const x=await(0,p.x7)(a);if(x.exists()){const s=x.data().exercises.map((e=>e.id===t.id?{...e}:e));e.update(a,{exercises:s})}await e.commit(),H(!1),L(!1),q(!1),c.open({type:"success",content:n("exerciseDataSaved")})}catch(e){c.open({type:"error",content:n("errorSavingExerciseData")})}}},onWorkoutDateChange:e=>{const t=new Date(e),s=t.toLocaleString();isNaN(t.getTime())?console.error("Invalid date:",e):(U(s),H(!1))},setCurrentWorkout:H,addRowBtn:P,setAddRowBtn:L,saveBtn:J,setSaveBtn:q,setDeleteBtn:z}),Z&&(0,j.jsx)($,{workoutDate:M,selectedExercise:t,setData:f,setWorkoutDate:U,setSelectedExercise:s,setActiveCardId:a})]}):(0,j.jsx)(d.A,{columns:X,className:k,locale:{emptyText:(0,j.jsx)(_,{})}})})]})};var te=s(9868);const se="AddExercise_addExercise__7FNxa",re="AddExercise_button__mkO2c",ae=e=>{let{onAddExercise:t,category:s}=e;const{t:a}=(0,u.Bd)(),[n,c]=i.Ay.useMessage(),[o,l]=(0,r.useState)("");return(0,j.jsxs)(j.Fragment,{children:[c,(0,j.jsx)(m.t,{children:a("addAnExercise")}),(0,j.jsxs)("div",{className:se,children:[(0,j.jsx)(te.w,{value:o,onChange:e=>l(e),text:a("exerciseName"),placeholder:a("typeExercise")}),(0,j.jsx)(T.S,{className:re,icon:(0,j.jsx)(I.A,{}),onClick:async()=>{if(o)try{const e=(0,h.xI)().currentUser;if(e){const r=e.uid,c={id:(0,g.A)(),name:o,category:s,bestResult:{weight:"0",reps:"0"},isFavorite:!1},i=(0,p.H9)((0,p.aU)(),"exercises",r),d=await(0,p.x7)(i);d.exists()?await(0,p.mZ)(i,{exercises:[...d.data().exercises,c]}):await(0,p.mZ)(i,{exercises:[c]}),l(""),t(),n.open({type:"success",content:a("exerciseAdded")})}}catch(e){n.open({type:"error",content:a("errorAddingExercise")})}else n.open({type:"error",content:a("typeExercise")})},children:a("addExerciseBtn")})]})]})};var ne=s(7261);const ce="Exercises_title__ThgWQ",ie="Exercises_description__cykz7",oe="Exercises_cards__+xw7k";var le=s(1882);const de="CardOptions_options__F-aCP",xe="CardOptions_star__tS7rd",ue="CardOptions_active__E3ut+",he="CardOptions_editExercise__JcxiY",pe=e=>{let{item:t,category:s,setData:a,setCurrentEditingId:n,setNewName:c,setEditMode:o}=e;const{t:l}=(0,u.Bd)(),[d,x]=i.Ay.useMessage(),[g,m]=(0,r.useState)(!1);return(0,j.jsxs)("div",{className:de,children:[x,(0,j.jsx)(F.D,{icon:(0,j.jsx)(le.A,{}),onClick:e=>{e.stopPropagation(),(async(e,t)=>{try{const r=(0,h.xI)().currentUser;if(r){const n=r.uid,c=(0,p.H9)((0,p.aU)(),"exercises",n),i=await(0,p.x7)(c);if(i.exists()){const r=i.data(),n=r.exercises.filter((e=>e.isFavorite)).length;if(!t&&n>=3)return void d.open({type:"error",content:l("maxFavoritesReached")});let o=r.exercises.map((s=>s.id===e?{...s,isFavorite:!t}:s));await(0,p.mZ)(c,{exercises:o});const x=l("categories.".concat(s)),u=o.filter((e=>l("categories.".concat(e.category))===x));a(u)}t?d.open({type:"success",content:l("removedFromFavorite")}):d.open({type:"success",content:l("addedToFavorite")}),m(!g)}}catch(r){d.open({type:"error",content:l("errorUpdatingFavorite")})}})(t.id,t.isFavorite)},className:"".concat(xe," ").concat(t.isFavorite?ue:""),children:(0,j.jsx)("span",{children:l("favorite")})}),(0,j.jsx)(F.D,{icon:(0,j.jsx)(O.A,{}),onClick:e=>{var s,r;e.stopPropagation(),s=t.id,r=t.name,n(s),c(r),o(!0)},className:he,children:(0,j.jsx)("span",{children:l("editName")})})]})};var ge=s(2481);const me="DeleteIcon_deleteIconContainer__IWqYi",ve="DeleteIcon_exerciseNumber__Q9Zs7",je="DeleteIcon_deleteIcon__ntbKM",_e="DeleteIcon_confirm__0yMiT",ye="DeleteIcon_deleteSave__joWfR",fe=e=>{let{setLoading:t,setIsModalOpen:s,category:r,setData:a,isModalOpen:n,handleCancel:c,item:o,setConfirm:l,setSelectedExercise:d}=e;const{t:x}=(0,u.Bd)(),[g,m]=i.Ay.useMessage();return(0,j.jsxs)(Y.j,{open:n,onCancel:e=>{c(e),s(!1)},footer:!1,children:[m,(0,j.jsx)("p",{className:_e,children:x("confirmDeletingExercise")}),(0,j.jsx)("div",{className:ye,children:(0,j.jsx)(z.U,{children:x("delete"),onClick:e=>{e.stopPropagation(),(async e=>{t(!0);try{const n=(0,h.xI)().currentUser;if(n){const c=n.uid,i=(0,p.H9)((0,p.aU)(),"exercises",c),o=(0,p.H9)((0,p.aU)(),"sets",e),u=await(0,p.x7)(i);if(await(0,p.kd)(o),u.exists()){const t=u.data();let s=[];if(t&&t.exercises){s=t.exercises.filter((t=>t.id!==e)),await(0,p.mZ)(i,{exercises:s});const n=s.filter((e=>x("categories.".concat(e.category))===x("categories.".concat(r))));a(n),localStorage.setItem("exercisesData",JSON.stringify(n))}}l(!1),s(!1),t(!1),d(null),(0,K.e)(),g.open({type:"success",content:x("exerciseDeleted")})}}catch(n){g.open({type:"error",content:x("errorDeletingExercise")})}})(o.id)},icon:(0,j.jsx)(Z.A,{})})})]})},Ee=e=>{let{setLoading:t,setIsModalOpen:s,category:a,setData:n,isModalOpen:c,handleCancel:i,item:o,index:l,setSelectedExercise:d}=e;const{t:h}=(0,u.Bd)(),[p,g]=(0,r.useState)(!1);return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{className:me,children:[(0,j.jsxs)("div",{className:ve,children:[l+1,"."]}),(0,j.jsx)(ge.A,{title:h("deleteExercise"),children:(0,j.jsx)(x.A,{className:je,onClick:e=>{e.stopPropagation(),g(!0),s(!0)}})})]}),p&&(0,j.jsx)(fe,{setLoading:t,category:a,setData:n,isModalOpen:c,setIsModalOpen:s,handleCancel:i,item:o,setConfirm:g,setSelectedExercise:d})]})},we="EditInput_editInput__CnmRa",Ce=e=>{let{newName:t,editMode:s,currentEditingId:a,setCurrentEditingId:n,category:c,setData:o,setEditMode:l,setNewName:d}=e;const{t:x}=(0,u.Bd)(),[g,m]=i.Ay.useMessage(),v=(0,r.useRef)(null);(0,r.useEffect)((()=>{s&&v.current&&v.current.focus()}),[s]);const _=async(e,t)=>{try{const s=(0,p.aU)(),r=(0,h.xI)().currentUser;if(r){const a=r.uid,n=(0,p.H9)(s,"exercises",a),i=await(0,p.x7)(n);if(i.exists()){let s=i.data().exercises.map((s=>s.id===e?{...s,name:t}:s));await(0,p.mZ)(n,{exercises:s});const r=s.filter((e=>x("categories.".concat(e.category))===x("categories.".concat(c)))).map((e=>({id:e.id,name:x(e.name),category:e.category,bestResult:"".concat(x("lastSet"),": ").concat(e.bestResult),isFavorite:e.isFavorite})));localStorage.setItem("exercisesData",JSON.stringify(r)),o(r)}}}catch(s){g.open({type:"error",content:x("nameChangeFailed")})}};return(0,j.jsxs)(j.Fragment,{children:[m,(0,j.jsx)("input",{value:t,className:we,onChange:e=>d(e.target.value),onKeyDown:e=>{"Enter"===e.key&&a&&(_(a,t),l(!1),n(null))},onBlur:()=>{a&&(_(a,t),l(!1),n(null))},ref:v})]})},Se="ExerciseCard_cardItem__2AKct",Ne="ExerciseCard_active__7n1-4",ke="ExerciseCard_exerciseContainer__nXbmq",Ae="ExerciseCard_exerciseName__MCYS-",De=e=>{let{item:t,onSelectExercise:s,category:a,setData:n,setLoading:c,activeCardId:i,setActiveCardId:o,index:l,exercisesRef:d,setSelectedExercise:x}=e;const[u,h]=(0,r.useState)(!1),[p,g]=(0,r.useState)(""),[m,v]=(0,r.useState)(null),[_,y]=(0,r.useState)(!1);return(0,j.jsxs)("div",{className:"".concat(Se," ").concat(i===t.id?Ne:""),onClick:()=>(e=>{o(e.id),s(e)})(t),ref:d,children:[(0,j.jsx)(Ee,{setLoading:c,setIsModalOpen:h,category:a,setData:n,isModalOpen:u,handleCancel:e=>{e.stopPropagation(),h(!1)},item:t,index:l,setSelectedExercise:x}),m===t.id&&_?(0,j.jsx)(Ce,{newName:p,editMode:_,currentEditingId:m,setCurrentEditingId:v,category:a,setData:n,setEditMode:y,setNewName:g}):(0,j.jsx)("div",{className:ke,children:(0,j.jsx)("span",{className:Ae,children:t.name})}),(0,j.jsx)(pe,{item:t,category:a,setData:n,setCurrentEditingId:v,setNewName:g,setEditMode:y})]})},Ie=e=>{let{category:t,updateTrigger:s,onSelectExercise:a,exercisesRef:n,activeCardId:c,setActiveCardId:o,setSelectedExercise:l}=e;const{t:d}=(0,u.Bd)(),[x,g]=i.Ay.useMessage(),[v,y]=(0,r.useState)([]),[f,E]=(0,r.useState)(!0);return(0,r.useEffect)((()=>{const e=JSON.parse(localStorage.getItem("exercisesData")||"[]");e.length>0&&(y(e),E(!1))}),[t]),(0,r.useEffect)((()=>{(async()=>{E(!0);try{const e=(0,h.xI)().currentUser;if(e){const s=(0,p.H9)((0,p.aU)(),"exercises",e.uid),r=await(0,p.x7)(s);if(r.exists()){const e=r.data().exercises.filter((e=>d("categories.".concat(e.category))===d("categories.".concat(t)))).map((e=>({id:e.id,name:d(e.name),category:e.category,bestResult:e.bestResult,isFavorite:e.isFavorite})));localStorage.setItem("exercisesData",JSON.stringify(e)),y(e)}}E(!1)}catch(e){x.open({type:"error",content:d("errorFetchingExercises")})}})()}),[t,d,s]),(0,j.jsxs)(j.Fragment,{children:[g,f?(0,j.jsx)(ne.a,{}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(m.t,{children:d("exercises"),className:ce}),(0,j.jsx)("div",{className:ie,children:d("chooseExercise")})," BOM",(0,j.jsx)("div",{className:oe,children:v.length?v.map(((e,s)=>(0,j.jsx)(De,{item:e,onSelectExercise:a,category:t,setData:y,setLoading:E,activeCardId:c,setActiveCardId:o,index:s,exercisesRef:n,setSelectedExercise:l},e.id))):(0,j.jsx)(_,{})})]})]})},be=()=>{const e=(0,a.zy)().state,[t,s]=(0,r.useState)(0),[i,o]=(0,r.useState)(null),[l,d]=(0,r.useState)(null),x=(0,r.useRef)(null);(0,r.useEffect)((()=>{window.scroll(0,0)}),[]);return(0,j.jsx)(c.f,{children:(0,j.jsxs)("div",{style:{minHeight:"100vh"},children:[(0,j.jsx)(n.B,{text:e.title,textAlign:"center"}),(0,j.jsx)(ae,{category:null===e||void 0===e?void 0:e.title,onAddExercise:()=>{s((e=>e+1)),x.current&&x.current.scrollIntoView({behavior:"smooth"})}}),(0,j.jsx)(Ie,{category:null===e||void 0===e?void 0:e.title,updateTrigger:t,onSelectExercise:e=>o(e),exercisesRef:x,activeCardId:l,setActiveCardId:d,setSelectedExercise:o}),(0,j.jsx)(ee,{selectedExercise:i,setSelectedExercise:o,setActiveCardId:d})]})})}},647:(e,t,s)=>{s.d(t,{e:()=>r});const r=()=>setTimeout((()=>{window.scrollTo({left:0,top:0,behavior:"smooth"})}),100)}}]);
//# sourceMappingURL=626.0a5b7a13.chunk.js.map