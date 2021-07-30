import{r as e,R as t,A as a,I as n,F as r,C as l,M as s,a as i,L as m,D as o,B as p,J as c,q as h,b as u}from"./vendor.f47ae751.js";const d={"askul-56249":{id:"askul-56249",name:"アスクル 65面",sku:[["46670 強粘着","https://www.askul.co.jp/p/1979588/"],["56249 再剥離","https://www.askul.co.jp/p/1979677/"]],headerPosition:"right",marginTop:"10.92mm",marginLeft:"4.75mm",labelWidth:"38.1mm",labelHeight:"21.2mm",labelPadding:"4mm",gapX:"2.5mm",gapY:"0",labelCountX:5,labelCountY:13,borderRadius:"2mm",url:"https://www.askul.co.jp/p/1979588/",linkText:"商品情報"},"kihara-606906":{id:"kihara-606906",name:"キハラ 36面",sku:[["606-906 20シート","https://www.kihara-lib.co.jp/wp-content/uploads/kihara-catalogue-search/320.pdf"]],headerPosition:"left",marginTop:"15mm",marginLeft:"14mm",labelWidth:"44mm",labelHeight:"26mm",labelPadding:"4mm",gapX:"2mm",gapY:"4mm",labelCountX:4,labelCountY:9,borderRadius:"3mm"},"aone-28368":{id:"aone-28368",name:"エーワン 44面",sku:[["28388 レーザー用 20シート","https://www.a-one.co.jp/product/search/detail.php?id=28388"],["28368 レーザー用 100シート","https://www.a-one.co.jp/product/search/detail.php?id=28368"],["28648 レーザー用 500シート","https://www.a-one.co.jp/product/search/detail.php?id=28648"],["31165 レーザー用 1000シート","https://www.a-one.co.jp/product/search/detail.php?id=31165"],["28943 インクジェット用 20シート","https://www.a-one.co.jp/product/search/detail.php?id=28943"],["28944 インクジェット用 100シート","https://www.a-one.co.jp/product/search/detail.php?id=28944"],["28946 インクジェット用 500シート","https://www.a-one.co.jp/product/search/detail.php?id=28946"]],headerPosition:"right",marginTop:"8.8mm",marginLeft:"8.2mm",labelWidth:"48.3mm",labelHeight:"25.4mm",labelPadding:"4mm",gapX:"0",gapY:"0",labelCountX:4,labelCountY:11,borderRadius:"0"},"aone-72295":{id:"aone-72295",name:"エーワン 95面",sku:[["73295 100シート","https://www.a-one.co.jp/product/search/detail.php?id=73295"],["72295 10シート","https://www.a-one.co.jp/product/search/detail.php?id=72295"]],headerPosition:"right",marginTop:"16.5mm",marginLeft:"13.5mm",labelWidth:"35mm",labelHeight:"12mm",labelPadding:"1.5mm",gapX:"2mm",gapY:"2mm",labelCountX:5,labelCountY:19,borderRadius:"2mm"}};class b extends e.exports.Component{constructor(e){super(e),this.handleClick=(e,t)=>{const{index:a}=t,{activeIndex:n}=this.state,r=n===a?-1:a;this.setState({activeIndex:r})},this.state={activeIndex:0}}render(){const{activeIndex:e}=this.state;let c=0,h=!1;return Object.values(d).forEach((e=>{e.id===this.props.templateName&&(c=e.labelCountX*e.labelCountY,parseInt(e.labelHeight)>20&&(h=!0))})),t.createElement("div",{className:"settings"},t.createElement(a,{fluid:!0},t.createElement(a.Title,{active:0===e,index:0,onClick:this.handleClick},t.createElement(n,{name:"dropdown"}),"ラベル用紙を選ぶ"),t.createElement(a.Content,{active:0===e},t.createElement(r,null,t.createElement(r.Group,{grouped:!0},Object.values(d).map((e=>t.createElement(r.Field,{key:e.id},t.createElement(l,{radio:!0,label:e.name,name:"template",value:e.id,checked:e.id===this.props.templateName,onChange:(e,{value:t})=>this.props.onSelectTemplate(t)}))))),t.createElement(s,{size:"small"},t.createElement("div",null,"以下の用紙に対応しています。",t.createElement("ul",null,Object.values(d).map((e=>{if(e.id===this.props.templateName)return Object.values(e.sku).map((e=>t.createElement("li",{key:e[0]},t.createElement("a",{href:e[1],target:"_blank"},e[0]," ",t.createElement(n,{name:"external"})))))}))))))),t.createElement(a.Title,{active:1===e,index:1,onClick:this.handleClick},t.createElement(n,{name:"dropdown"}),"内容を決める"),t.createElement(a.Content,{active:1===e},t.createElement(r,null,t.createElement(s,{size:"small"},t.createElement("div",null,t.createElement("ul",{style:{paddingLeft:"10px"}},t.createElement("li",null,"6桁～10桁程度が一般的です"),t.createElement("li",null,"最後にCを入力するとチェックデジットを付与します"),t.createElement("li",null,"先頭に0を入力すると「ゼロ埋め」ができます"),t.createElement("li",null,"エクセルなどで扱いやすくするたに「100000」などのようにゼロ埋めを不要とするのがおすすめです")))),t.createElement(r.Field,null,t.createElement("label",null,"開始番号"),t.createElement(i,{placeholder:"000000...",className:"startnum",value:this.props.startNumber,maxLength:14,required:!0,onChange:(e,t)=>{e.target.value.toUpperCase().match(/^[A-Z]*?[0-9]+C?$/)?this.props.changeStartNumber(e.target.value.toUpperCase()):e.target.value=this.props.startNumber}})),t.createElement(r.Field,null,t.createElement("label",null,"図書館名"),t.createElement(i,{placeholder:"カーリル図書館",value:this.props.libName,maxLength:16,onChange:(e,t)=>this.props.setLibName(e.target.value)}),0==h&&this.props.libName.length>0?t.createElement(m,{pointing:!0},"ラベルが小さいため印刷されません"):null))),t.createElement(a.Title,{active:2===e,index:2,onClick:this.handleClick},t.createElement(n,{name:"dropdown"}),"枚数を決める"),t.createElement(a.Content,{active:2===e},t.createElement(r,null,t.createElement(r.Field,null,t.createElement("label",null,"印刷するシート数"),t.createElement(i,{className:"countNumber",type:"number",value:this.props.countNumber,min:"1",max:"300",required:!0,onChange:(e,t)=>this.props.changeCountNumber(e.target.value)}))))),t.createElement(o,null),t.createElement("div",{style:{marginTop:"10px",textAlign:"center"}},t.createElement("p",{style:{marginBottom:"10px"}},"合計 ",parseInt(this.props.countNumber)*c," 個のバーコード"),t.createElement(p,{primary:!0,icon:!0,loading:this.props.printing,size:"big",labelPosition:"right",onClick:this.props.print},"印刷する",t.createElement(n,{name:"print"})),t.createElement("br",null),t.createElement("span",{className:"poweredby"})),t.createElement("span",{className:"cppyLink",onClick:this.props.copyUrl},t.createElement("i",{className:"copy outline icon"}),"設定をURLとしてコピー"))}}const g=a=>{const{number:n,libName:r,template:l,checkDigit:s,univStartAlphabet:i}=a,m=e.exports.useRef(null);let o=n;null!==i&&(o=i+n);const p=parseInt(l.labelHeight)>20;e.exports.useEffect((()=>{c(m.current,o,{format:null!==i?"code39":"codabar",width:2.25,height:p?52:26,displayValue:!1,text:null===s?o:o+"-"+s.toString(),textMargin:0,fontSize:p?20:15,font:'"Conv_OCRB",Sans-Serif',margin:0})}),[l,o]);const h=""!==r&&p;return t.createElement("div",{className:"barcode",style:{display:"inline-flex",flexDirection:"column",boxSizing:"border-box",justifyContent:"center",alignItems:"center",width:l.labelWidth,height:l.labelHeight,borderRadius:l.borderRadius,padding:h?parseInt(l.labelPadding)/2+"mm":l.labelPadding,paddingTop:h?parseInt(l.labelPadding)/3+"mm":l.labelPadding,border:"1px solid #CCCCCC"}},h?t.createElement("div",{className:"libName",style:{fontFamily:'"Noto Sans JP"',fontSize:r.length<10?"3mm":"1.5mm",marginBottom:"1mm",lineHeight:(r.length,"3.5mm")}},r):null,t.createElement("svg",{ref:m,xmlns:"http://www.w3.org/2000/svg",version:"1.1"}),t.createElement("div",{style:{fontFamily:'"Conv_OCRB",Sans-Serif',fontSize:p?"3.5mm":"1.5mm",marginTop:p?"1mm":"0.5mm",lineHeight:p?"3.5mm":"2.5mm"}},o,null!==s?t.createElement("span",{style:{textDecoration:"underline"}},s):null))},N=(e,t,a)=>{let n="";if(t){const t=a.replace(/[A-Z]/g,"").length-String(e).length;Array.from({length:t}).forEach((()=>n+="0"))}return n+String(e)};class E extends e.exports.Component{constructor(e){super(e);const t=localStorage.getItem("state"),a=JSON.parse(t);this.state={templateName:t?a.templateName:"",libName:t?a.libName:"",perPage:0,startNumber:t?a.startNumber:"100000",isStartZero:!1,countNumber:"1",splitNumbers:[],checkDigit:!1,univStartAlphabet:null,printing:!1}}componentDidMount(){if(""===location.hash)this.setTemplate("aone-28368",!1),this.setStartNumber(this.state.startNumber);else{const e=h.parse(location.hash);let t=e.template;t&&d[t]&&this.setTemplate(t,!1);let a=e.startNumber;a?this.setState({startNumber:a},(()=>this.setStartNumber(this.state.startNumber))):this.setStartNumber(this.state.startNumber);let n=e.countNumber;n&&this.setCountNumber(n);let r=e.libName;r&&this.setLibName(decodeURIComponent(r)),"true"===e.print&&this.print()}window.addEventListener("afterprint",(e=>{this.setState({printing:!1})}))}setTemplate(e,t=!0){let a=d[e].labelCountX*d[e].labelCountY;this.setState({perPage:a,templateName:e},(()=>{this.renderBarCodes(),this.saveState()}))}setStartNumber(e){if(""===e)return;const t=!!e.match(/^[A-Z]*?0+[0-9]+/);let a=null;if(e.match(/^[A-Z]+[0-9]+C?$/)){let t=e.match(/^[A-Z]+/);t&&(a=t[0])}const n=!!e.match(/C$/);this.setState({startNumber:e,isStartZero:t,checkDigit:n,univStartAlphabet:a},(()=>{this.renderBarCodes(),this.saveState()}))}setCountNumber(e){this.setState({countNumber:e},this.renderBarCodes.bind(this))}setLibName(e){this.setState({libName:e},this.saveState.bind(this))}saveState(){const e={templateName:this.state.templateName,libName:this.state.libName,startNumber:this.state.startNumber};localStorage.setItem("state",JSON.stringify(e))}renderBarCodes(){const e=parseInt(this.state.startNumber.replace(/[A-Z]/g,"")),t=parseInt(this.state.countNumber)*this.state.perPage,a=[];let n=e;Array.from({length:t}).forEach((()=>{let e=N(n,this.state.isStartZero,this.state.startNumber);a.push(e),n+=1}));const r=((e,t)=>{const a=[];for(let n=0;n<e.length;n+=t){const r=e.slice(n,n+t);a.push(r)}return a})(a,this.state.perPage);return this.setState({splitNumbers:r}),!0}print(){this.setState({printing:!0},(()=>{setTimeout((()=>{print()}),300)}))}copyUrl(){const e=location.href+"#"+h.stringify({template:this.state.templateName,startNumber:this.state.startNumber,countNumber:this.state.countNumber,libName:encodeURIComponent(this.state.libName)}),t=a=>{a.clipboardData.setData("text/plain",e),a.preventDefault(),document.removeEventListener("copy",t)};document.addEventListener("copy",t),document.execCommand("copy")}render(){return t.createElement(t.Fragment,null,t.createElement("header",null,t.createElement("h1",null,"カーリルToolBox : バーコード連番印刷")),t.createElement("div",{className:"container"},t.createElement(b,{templateName:this.state.templateName,onSelectTemplate:this.setTemplate.bind(this),startNumber:this.state.startNumber,countNumber:this.state.countNumber,changeStartNumber:this.setStartNumber.bind(this),changeCountNumber:this.setCountNumber.bind(this),libName:this.state.libName,setLibName:this.setLibName.bind(this),renderBarCodes:this.renderBarCodes.bind(this),printing:this.state.printing,print:this.print.bind(this),copyUrl:this.copyUrl.bind(this)}),t.createElement("div",{className:"sheets"},this.state.splitNumbers.map(((e,a)=>{const n=d[this.state.templateName];return t.createElement(C,{key:a,index:a,numbers:e,template:n,startNumber:this.state.startNumber,perPage:this.state.perPage,libName:this.state.libName,univStartAlphabet:this.state.univStartAlphabet,checkDigit:this.state.checkDigit,isStartZero:this.state.isStartZero,printing:this.state.printing})})),this.state.splitNumbers.length>5?t.createElement("p",{className:"nopreview"},"6枚目以降はプレビューされません"):null)))}}const C=e=>{const{index:a,numbers:n,template:r,startNumber:l,perPage:s,libName:i,univStartAlphabet:m,checkDigit:o,isStartZero:p,printing:c}=e;if(!1===c&&a>=5)return null;const h=N(parseInt(l.replace(/[A-Z]/g,""))+s*a,p,l),u=N(parseInt(l.replace(/[A-Z]/g,""))-1+s*(a+1),p,l);return t.createElement("section",{className:"sheet",style:{paddingTop:r.marginTop,paddingLeft:r.marginLeft,display:"grid",gridTemplateColumns:`repeat(${r.labelCountX}, ${r.labelWidth})`,gridTemplateRows:`repeat(${r.labelCountY}, ${r.labelHeight})`,columnGap:r.gapX,rowGap:r.gapY}},t.createElement("p",{style:{position:"absolute",top:parseFloat(r.marginTop)-4.5>0?parseFloat(r.marginTop)-4.5+"mm":"0",right:"right"===r.headerPosition?parseInt(r.marginLeft)+parseInt(r.gapX)+"mm":"auto",left:"left"===r.headerPosition?parseInt(r.marginLeft)+parseInt(r.gapX)+"mm":"auto",fontSize:"3mm",lineHeight:"3mm"}},h,"-",u," / ",null!==m?"CODE39":"NW-7",o?" (M10W21)":""," / ",a+1,"枚目"),n.map((e=>{let a=null;return o&&(a=(e=>{const t=e.split("").reverse().map(((e,t)=>{const a=parseInt(e);return t%2==0?(2*a).toString().split("").reduce(((e,t)=>e+parseInt(t)),0):a})).reduce(((e,t)=>e+t),0);return t%10==0?0:10-t%10})(e.replace(/[A-Z]/g,""))),t.createElement(g,{number:e,checkDigit:a,univStartAlphabet:m,libName:i,template:r,key:e})})),t.createElement("img",{src:"./assets/calil.svg",alt:"カーリル",className:"logo",style:{position:"absolute",bottom:parseFloat(r.marginTop)-7>0?parseFloat(r.marginTop)-7+"mm":"0",left:parseInt(r.marginLeft)+parseInt(r.gapX)+"mm",fontSize:"3mm"}}))};u.render(t.createElement(t.StrictMode,null,t.createElement(E,null)),document.getElementById("root"));
