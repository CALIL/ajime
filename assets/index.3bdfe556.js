import{r as e,R as t,A as a,I as r,F as l,C as n,M as i,a as s,L as m,D as o,B as p,J as c,q as h,b as u}from"./vendor.f47ae751.js";const d={"askul-56249":{id:"askul-56249",name:"アスクル 65面",sku:[["46670 強粘着","https://www.askul.co.jp/p/1979588/"],["56249 再剥離","https://www.askul.co.jp/p/1979677/"]],headerPosition:"right",marginTop:"10.92mm",marginLeft:"4.75mm",labelWidth:"38.1mm",labelHeight:"21.2mm",labelPadding:"4mm",gapX:"2.5mm",gapY:"0",labelCountX:5,labelCountY:13,borderRadius:"2mm",url:"https://www.askul.co.jp/p/1979588/",linkText:"商品情報"},"kihara-606906":{id:"kihara-606906",name:"キハラ 36面",sku:[["606-906 20シート","https://www.kihara-lib.co.jp/wp-content/uploads/kihara-catalogue-search/320.pdf"]],headerPosition:"left",marginTop:"15mm",marginLeft:"14mm",labelWidth:"44mm",labelHeight:"26mm",labelPadding:"4mm",gapX:"2mm",gapY:"4mm",labelCountX:4,labelCountY:9,borderRadius:"3mm"},"aone-28368":{id:"aone-28368",name:"エーワン 44面",sku:[["28388 レーザー用 20シート","https://www.a-one.co.jp/product/search/detail.php?id=28388"],["28368 レーザー用 100シート","https://www.a-one.co.jp/product/search/detail.php?id=28368"],["28648 レーザー用 500シート","https://www.a-one.co.jp/product/search/detail.php?id=28648"],["31165 レーザー用 1000シート","https://www.a-one.co.jp/product/search/detail.php?id=31165"],["28943 インクジェット用 20シート","https://www.a-one.co.jp/product/search/detail.php?id=28943"],["28944 インクジェット用 100シート","https://www.a-one.co.jp/product/search/detail.php?id=28944"],["28946 インクジェット用 500シート","https://www.a-one.co.jp/product/search/detail.php?id=28946"]],headerPosition:"right",marginTop:"8.8mm",marginLeft:"8.4mm",labelWidth:"48.3mm",labelHeight:"25.4mm",labelPadding:"4mm",gapX:"0",gapY:"0",labelCountX:4,labelCountY:11,borderRadius:"0"},"aone-72295":{id:"aone-72295",name:"エーワン 95面",sku:[["73295 100シート","https://www.a-one.co.jp/product/search/detail.php?id=73295"],["72295 10シート","https://www.a-one.co.jp/product/search/detail.php?id=72295"]],headerPosition:"right",marginTop:"16.5mm",marginLeft:"13.5mm",labelWidth:"35mm",labelHeight:"12mm",labelPadding:"1.5mm",gapX:"2mm",gapY:"2mm",labelCountX:5,labelCountY:19,borderRadius:"2mm"}};class b extends e.exports.Component{constructor(e){super(e),this.handleClick=(e,t)=>{const{index:a}=t,{activeIndex:r}=this.state,l=r===a?-1:a;this.setState({activeIndex:l})},this.state={activeIndex:0}}render(){const{activeIndex:e}=this.state;let c=0,h=!1;return Object.values(d).forEach((e=>{e.id===this.props.templateName&&(c=e.labelCountX*e.labelCountY,parseInt(e.labelHeight)>20&&(h=!0))})),t.createElement("div",{className:"settings"},t.createElement("div",null,t.createElement("div",{className:"setting"},t.createElement(a,{fluid:!0},t.createElement(a.Title,{active:0===e,index:0,onClick:this.handleClick},t.createElement(r,{name:"dropdown"}),"ラベル用紙を選ぶ"),t.createElement(a.Content,{active:0===e},t.createElement(l,null,t.createElement(l.Group,{grouped:!0},Object.values(d).map((e=>t.createElement(l.Field,{key:e.id},t.createElement(n,{radio:!0,label:e.name,name:"template",value:e.id,checked:e.id===this.props.templateName,onChange:(e,{value:t})=>this.props.onSelectTemplate(t)}))))),t.createElement(i,{size:"small"},t.createElement("div",null,"以下の用紙に対応しています。",t.createElement("ul",null,Object.values(d).map((e=>{if(e.id===this.props.templateName)return Object.values(e.sku).map((e=>t.createElement("li",{key:e[0]},t.createElement("a",{href:e[1],target:"_blank"},e[0]," ",t.createElement(r,{name:"external"})))))}))))))),t.createElement(a.Title,{active:1===e,index:1,onClick:this.handleClick},t.createElement(r,{name:"dropdown"}),"内容を決める"),t.createElement(a.Content,{active:1===e},t.createElement(l,null,t.createElement(i,{size:"small"},t.createElement("div",null,t.createElement("ul",{style:{paddingLeft:"10px"}},t.createElement("li",null,"6桁～10桁程度が一般的です"),t.createElement("li",null,"最後にCを入力するとチェックデジットを付与します"),t.createElement("li",null,"先頭に0を入力すると「ゼロ埋め」ができます"),t.createElement("li",null,"エクセルなどで扱いやすくするたに「100000」などのようにゼロ埋めを不要とするのがおすすめです")))),t.createElement(l.Field,null,t.createElement("label",null,"開始番号"),t.createElement(s,{placeholder:"000000...",className:"startnum",value:this.props.startNumber,maxLength:14,required:!0,onChange:e=>{e.target.value.toUpperCase().match(/^[A-Z]*?[0-9]+C?$/)?this.props.changeStartNumber(e.target.value.toUpperCase()):e.target.value=this.props.startNumber}})),t.createElement(l.Field,null,t.createElement("label",null,"図書館名"),t.createElement(s,{placeholder:"カーリル図書館",value:this.props.libName,maxLength:16,onChange:e=>this.props.setLibName(e.target.value)}),0==h&&this.props.libName.length>0?t.createElement(m,{pointing:!0},"ラベルが小さいため印刷されません"):null))),t.createElement(a.Title,{active:2===e,index:2,onClick:this.handleClick},t.createElement(r,{name:"dropdown"}),"枚数を決める"),t.createElement(a.Content,{active:2===e},t.createElement(l,null,t.createElement(l.Field,null,t.createElement("label",null,"印刷するシートの枚数"),t.createElement(s,{className:"countNumber",type:"number",value:this.props.countNumber,min:"1",max:"300",required:!0,onChange:e=>this.props.changeCountNumber(e.target.value)}))))),t.createElement(o,null),t.createElement("div",{style:{marginTop:"10px",textAlign:"center"}},t.createElement("p",{style:{marginBottom:"10px"}},"合計 ",parseInt(this.props.countNumber)*c," 個のバーコード"),t.createElement(p,{primary:!0,icon:!0,loading:this.props.printing,size:"big",labelPosition:"right",onClick:this.props.print},"印刷する",t.createElement(r,{name:"print"})))),t.createElement("div",{className:"cppyLink"},t.createElement("div",{onClick:this.props.copyUrl},t.createElement("i",{className:"copy outline icon"}),t.createElement("span",null,"設定をURLとしてコピー")))))}}const g=a=>{const{number:r,libName:l,template:n,checkDigit:i,prefixAlphabet:s}=a,m=e.exports.useRef(null);let o=r;""!==s&&(o=s+r);const p=parseInt(n.labelHeight)>20;e.exports.useEffect((()=>{c(m.current,o,{format:""!==s?"code39":"codabar",width:2.25,height:p?40:26,displayValue:!1,margin:0})}),[n,o]);const h=""!==l&&p;return t.createElement("div",{className:"barcode",style:{display:"inline-flex",flexDirection:"column",boxSizing:"border-box",justifyContent:"center",alignItems:"center",width:n.labelWidth,height:n.labelHeight,borderRadius:n.borderRadius,padding:h?parseInt(n.labelPadding)/2+"mm":n.labelPadding,paddingTop:h?parseInt(n.labelPadding)/3+"mm":n.labelPadding,border:"1px solid #CCCCCC"}},h?t.createElement("div",{className:"libName",style:{fontFamily:'"Noto Sans JP"',fontSize:l.length<10?"3mm":"1.5mm",fontWeight:400,marginBottom:"1mm",lineHeight:"3.8mm"}},l):null,t.createElement("svg",{ref:m,xmlns:"http://www.w3.org/2000/svg",version:"1.1"}),t.createElement("div",{style:{fontFamily:'"Conv_OCRB",Sans-Serif',fontSize:p?"3.5mm":"1.5mm",marginTop:p?"1.3mm":"0.5mm",lineHeight:p?"3.5mm":"2.5mm"}},o,null!==i?t.createElement("span",{style:{textDecoration:"underline"}},i):null))},N=(e,t,a)=>{let r="";if(t){const t=a.replace(/[A-Z]/g,"").length-String(e).length;Array.from({length:t}).forEach((()=>r+="0"))}return r+String(e)};class E extends e.exports.Component{constructor(e){super(e);const t=JSON.parse(localStorage.getItem("state"));this.state={templateName:t.templateName?t.templateName:"aone-28368",libName:t.libName?t.libName:"",perPage:0,startNumber:t.startNumber?t.startNumber:"100000",prefixZero:!1,countNumber:"1",splitNumbers:[],suffixCheckDigit:!1,prefixAlphabet:"",printing:!1}}componentDidMount(){const e=h.parse(location.hash);let t=e.template;t&&d[t]?this.setTemplate(t):this.setTemplate(this.state.templateName);let a=e.start;a?this.setState({startNumber:a},(()=>this.setStartNumber(this.state.startNumber))):this.setStartNumber(this.state.startNumber);let r=e.sheet;r&&this.setCountNumber(r);let l=e.library;l&&this.setLibName(decodeURIComponent(l)),"true"===e.print&&this.print(),window.addEventListener("afterprint",(e=>{this.setState({printing:!1})}))}setTemplate(e){let t=d[e].labelCountX*d[e].labelCountY;this.setState({perPage:t,templateName:e},(()=>{this.renderBarCodes(),this.saveState()}))}setStartNumber(e){if(""===e)return;const t=!!e.match(/^[A-Z]*?0+[0-9]+/);let a="";if(e.match(/^[A-Z]+[0-9]+C?$/)){let t=e.match(/^[A-Z]+/);t&&(a=t[0])}const r=!!e.match(/C$/);this.setState({startNumber:e,prefixZero:t,suffixCheckDigit:r,prefixAlphabet:a},(()=>{this.renderBarCodes(),this.saveState()}))}setCountNumber(e){this.setState({countNumber:e},this.renderBarCodes.bind(this))}setLibName(e){this.setState({libName:e},this.saveState.bind(this))}saveState(){const e={templateName:this.state.templateName,libName:this.state.libName,startNumber:this.state.startNumber};localStorage.setItem("state",JSON.stringify(e))}renderBarCodes(){const e=parseInt(this.state.startNumber.replace(/[A-Z]/g,"")),t=parseInt(this.state.countNumber)*this.state.perPage,a=[];let r=e;Array.from({length:t}).forEach((()=>{let e=N(r,this.state.prefixZero,this.state.startNumber);a.push(e),r+=1}));const l=((e,t)=>{const a=[];for(let r=0;r<e.length;r+=t){const l=e.slice(r,r+t);a.push(l)}return a})(a,this.state.perPage);return this.setState({splitNumbers:l}),!0}print(){this.setState({printing:!0},(()=>{setTimeout((()=>{print()}),300)}))}copyUrl(){const e=location.protocol+"//"+location.host+location.pathname+"#"+h.stringify({template:this.state.templateName,start:this.state.startNumber,library:encodeURIComponent(this.state.libName),sheet:this.state.countNumber}),t=a=>{a.clipboardData.setData("text/plain",e),a.preventDefault(),document.removeEventListener("copy",t)};document.addEventListener("copy",t),document.execCommand("copy")}render(){return t.createElement(t.Fragment,null,t.createElement("header",null,t.createElement("h1",null,"カーリルToolBox : バーコード連番印刷")),t.createElement("div",{className:"container"},t.createElement(b,{templateName:this.state.templateName,onSelectTemplate:this.setTemplate.bind(this),startNumber:this.state.startNumber,countNumber:this.state.countNumber,changeStartNumber:this.setStartNumber.bind(this),changeCountNumber:this.setCountNumber.bind(this),libName:this.state.libName,setLibName:this.setLibName.bind(this),renderBarCodes:this.renderBarCodes.bind(this),printing:this.state.printing,print:this.print.bind(this),copyUrl:this.copyUrl.bind(this)}),t.createElement("div",{className:"sheets"},this.state.splitNumbers.map(((e,a)=>{const r=d[this.state.templateName];return t.createElement(f,{key:a,index:a,numbers:e,template:r,startNumber:this.state.startNumber,perPage:this.state.perPage,libName:this.state.libName,countNumber:this.state.countNumber,prefixAlphabet:this.state.prefixAlphabet,suffixCheckDigit:this.state.suffixCheckDigit,prefixZero:this.state.prefixZero,printing:this.state.printing})})),this.state.splitNumbers.length>5?t.createElement("p",{className:"nopreview"},"6枚目以降はプレビューされません"):null)))}}const f=e=>{const{index:a,numbers:r,template:l,startNumber:n,perPage:i,libName:s,prefixAlphabet:m,suffixCheckDigit:o,prefixZero:p,printing:c,countNumber:h}=e;if(!1===c&&a>=5)return null;const u=N(parseInt(n.replace(/[A-Z]/g,""))+i*a,p,n),d=N(parseInt(n.replace(/[A-Z]/g,""))+i*h-1,p,n);return t.createElement("section",{className:"sheet",style:{paddingTop:l.marginTop,paddingLeft:l.marginLeft,display:"grid",gridTemplateColumns:`repeat(${l.labelCountX}, ${l.labelWidth})`,gridTemplateRows:`repeat(${l.labelCountY}, ${l.labelHeight})`,columnGap:l.gapX,rowGap:l.gapY}},t.createElement("p",{style:{position:"absolute",top:parseFloat(l.marginTop)-4.5>0?parseFloat(l.marginTop)-4.5+"mm":"0",right:"right"===l.headerPosition?parseInt(l.marginLeft)+parseInt(l.gapX)+"mm":"auto",left:"left"===l.headerPosition?parseInt(l.marginLeft)+parseInt(l.gapX)+"mm":"auto",fontSize:"3mm",lineHeight:"3mm"}},m,u,o?"C":"","～",m,d,o?"C":""," 【",null!==m?"CODE39":"NW-7",o?" (M10W21)":"","】 ",a+1,"/",h,"シート"),r.map((e=>{let a=null;return o&&(a=(e=>{const t=e.split("").reverse().map(((e,t)=>{const a=parseInt(e);return t%2==0?(2*a).toString().split("").reduce(((e,t)=>e+parseInt(t)),0):a})).reduce(((e,t)=>e+t),0);return t%10==0?0:10-t%10})(e.replace(/[A-Z]/g,""))),t.createElement(g,{number:e,checkDigit:a,prefixAlphabet:m,libName:s,template:l,key:e})})),t.createElement("img",{src:"./assets/calil.svg",alt:"カーリル",className:"logo",style:{position:"absolute",bottom:parseFloat(l.marginTop)-7>0?parseFloat(l.marginTop)-7+"mm":"0",left:parseInt(l.marginLeft)+parseInt(l.gapX)+"mm",fontSize:"3mm"}}))};u.render(t.createElement(t.StrictMode,null,t.createElement(E,null)),document.getElementById("root"));
