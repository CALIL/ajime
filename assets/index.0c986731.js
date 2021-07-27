import{R as e,r as t,J as a,q as r,S as l,a as n}from"./vendor.ec8061c3.js";const s={"aone-28368":{id:"aone-28368",name:"エーワン 44面 [F44A4-1]",sku:["28388 レーザープリンタ 20シート","28368 レーザープリンタ 100シート","28648 レーザープリンタ 500シート","31165 レーザープリンタ 1000シート","28943 インクジェット用 20シート","28944 インクジェット用 100シート","28946 インクジェット用 500シート"],headerPosition:"right",marginTop:"8.8mm",marginLeft:"8.2mm",labelWidth:"48.3mm",labelHeight:"25.4mm",labelPadding:"4mm",gapX:"0",gapY:"0",labelCountX:4,labelCountY:11,borderRadius:"0",url:"https://www.a-one.co.jp/product/search/search.php?mentsuke=F44A4-1&type=mentsuke&limit=2",linkText:"商品情報"},"kihara-606906":{id:"kihara-606906",name:"キハラ 36面 [606-906]",sku:["606-906 20シート"],headerPosition:"left",marginTop:"15mm",marginLeft:"14mm",labelWidth:"44mm",labelHeight:"26mm",labelPadding:"4mm",gapX:"2mm",gapY:"4mm",labelCountX:4,labelCountY:9,borderRadius:"3mm",url:"https://www.kihara-lib.co.jp/wp-content/uploads/kihara-catalogue-search/320.pdf",linkText:"製品情報"},"askul-56249":{id:"askul-56249",name:"アスクル 65面",sku:["46670 強粘着","56249 再剥離"],headerPosition:"right",marginTop:"10.92mm",marginLeft:"4.75mm",labelWidth:"38.1mm",labelHeight:"21.2mm",labelPadding:"4mm",gapX:"2.5mm",gapY:"0",labelCountX:5,labelCountY:13,borderRadius:"2mm",url:"https://www.askul.co.jp/p/1979588/",linkText:"商品情報"},"aone-72295":{id:"aone-72295",name:"エーワン 95面 [F95A4-1]",sku:["73295 100シート","72295 10シート"],headerPosition:"right",marginTop:"16.5mm",marginLeft:"13.5mm",labelWidth:"35mm",labelHeight:"12mm",labelPadding:"2mm",gapX:"2mm",gapY:"2mm",labelCountX:5,labelCountY:19,borderRadius:"2mm",url:"https://www.a-one.co.jp/product/search/detail.php?id=73295",linkText:"商品情報"}},m=t=>e.createElement("ol",{className:"steps"},e.createElement("li",{className:1===t.currentStep?"current":""},"Step 1"),e.createElement("li",{className:2===t.currentStep?"current":""},"Step 2"),e.createElement("li",{className:3===t.currentStep?"current":""},"Step 3")),i=t=>e.createElement("div",{className:"step step1"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"印刷に使うラベルシールを選んでください"),e.createElement("ul",null,Object.values(s).map((a=>e.createElement("li",{key:a.id},e.createElement("input",{type:"radio",name:"template",id:a.id,value:a.id,checked:a.id===t.templateName,onChange:e=>t.onSelectTemplate(e.target.value)}),e.createElement("label",{htmlFor:a.id},a.name," (",e.createElement("a",{href:a.url,target:"_blank"},a.linkText),")"))))),e.createElement("nav",null,e.createElement("button",{onClick:t.nextStep,className:"active"},"次へ"))),o=t=>e.createElement("div",{className:"step step2"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"印刷するバーコードラベルを設定しましょう"),e.createElement("div",null,e.createElement("input",{type:"text",style:{width:"8rem"},value:t.startNumber,min:"1",max:"99999",maxLength:16,required:!0,onChange:e=>{e.target.value.toUpperCase().match(/^[A-Z]*?[0-9]+C?$/)?t.changeStartNumber(e.target.value.toUpperCase()):e.target.value=t.startNumber}}),"からスタートで",e.createElement("input",{type:"number",style:{width:"4rem"},defaultValue:t.countNumber,min:"1",max:"100",required:!0,onChange:e=>t.changeCountNumber(e.target.value)}),"ページ"),e.createElement("input",{type:"text",name:"libName",id:"libName",placeholder:"図書館名",defaultValue:t.libName,onChange:e=>t.setLibName(e.target.value)}),e.createElement("nav",null,e.createElement("button",{onClick:t.previousStep},"戻る"),e.createElement("button",{onClick:()=>{t.renderBarCodes()&&t.nextStep()},className:"active"},"次へ"))),p=t=>e.createElement("div",{className:"step step3"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"さあ、印刷しましょう！"),e.createElement("nav",null,e.createElement("button",{onClick:t.previousStep},"戻る"),e.createElement("button",{onClick:print,className:"active"},"印刷"))),u=r=>{const{number:l,libName:n,template:s,checkDigit:m,univStartAlphabet:i}=r,o=t.exports.useRef(null);let p=l;null!==i&&(p=i+l);const u=parseInt(s.labelHeight)>20;t.exports.useEffect((()=>{a(o.current,p,{format:null!==i?"code39":"codabar",width:2.25,height:u?52:26,displayValue:!1,text:null===m?p:p+"-"+m.toString(),textMargin:0,fontSize:u?20:15,font:'"Conv_OCRB",Sans-Serif',margin:0})}));const c=""!==n&&u;return e.createElement("div",{className:"barcode",style:{display:"inline-flex",flexDirection:"column",boxSizing:"border-box",justifyContent:"center",alignItems:"center",width:s.labelWidth,height:s.labelHeight,borderRadius:s.borderRadius,padding:c?parseInt(s.labelPadding)/2+"mm":s.labelPadding,paddingTop:c?parseInt(s.labelPadding)/3+"mm":s.labelPadding,border:"1px solid #CCCCCC"}},c?e.createElement("div",{className:"libName",style:{fontFamily:'"Noto Sans JP"',fontSize:n.length<10?"3mm":"1.5mm",marginBottom:"1mm"}},n):null,e.createElement("svg",{ref:o,xmlns:"http://www.w3.org/2000/svg",version:"1.1"}),e.createElement("div",{style:{fontFamily:'"Conv_OCRB",Sans-Serif',fontSize:u?"3.5mm":"1.5mm",marginTop:"1mm"}},p,null!==m?e.createElement("span",{style:{fontFamily:'"Conv_OCRB",Sans-Serif',textDecoration:"underline"}},m):null))};class c extends t.exports.Component{constructor(e){super(e);const t=localStorage.getItem("state"),a=JSON.parse(t);this.state={templateName:t?a.templateName:"",libName:t?a.libName:"",perPage:0,startNumber:t?a.startNumber:"10000",isStartZero:!1,countNumber:"1",splitNumbers:[],checkDigit:!1,univStartAlphabet:null}}componentDidMount(){if(""===location.hash)this.setTemplate("aone-28368",!1),this.setStartNumber(this.state.startNumber);else{const e=r.parse(location.hash);let t=e.template;t&&s[t]&&this.setTemplate(t,!1);let a=e.startNumber;a?this.setState({startNumber:a},(()=>this.setStartNumber(this.state.startNumber))):this.setStartNumber(this.state.startNumber)}}setTemplate(e,t=!0){let a=s[e].labelCountX*s[e].labelCountY;this.setState({perPage:a,templateName:e},(()=>{this.renderBarCodes(),this.saveState()})),t&&(location.hash=r.stringify({template:e}))}setStartNumber(e){if(""===e)return;const t=!!e.match(/^[A-Z]*?0+[0-9]+/);let a=null;if(e.match(/^[A-Z]+[0-9]+C?$/)){let t=e.match(/^[A-Z]+/);t&&(a=t[0])}const r=!!e.match(/C$/);this.setState({startNumber:e,isStartZero:t,checkDigit:r,univStartAlphabet:a},(()=>{this.renderBarCodes(),this.saveState()}))}setCountNumber(e){this.setState({countNumber:e},this.renderBarCodes.bind(this))}setLibName(e){this.setState({libName:e},this.saveState.bind(this))}saveState(){const e={templateName:this.state.templateName,libName:this.state.libName,startNumber:this.state.startNumber};localStorage.setItem("state",JSON.stringify(e))}addZero(e){let t="";if(this.state.isStartZero){const a=this.state.startNumber.replace(/[A-Z]/g,"").length-String(e).length;Array.from({length:a}).forEach((()=>t+="0"))}return t+String(e)}renderBarCodes(){const e=parseInt(this.state.startNumber.replace(/[A-Z]/g,"")),t=parseInt(this.state.countNumber)*this.state.perPage,a=[];let r=e;Array.from({length:t}).forEach((()=>{let e=this.addZero(r);a.push(e),r+=1}));const l=((e,t)=>{const a=[];for(let r=0;r<e.length;r+=t){const l=e.slice(r,r+t);a.push(l)}return a})(a,this.state.perPage);return this.setState({splitNumbers:l}),!0}render(){return e.createElement("div",{className:"App"},e.createElement("div",{className:"steps"},e.createElement(l,{nav:e.createElement(m,null),transitions:{enterRight:"",enterLeft:"",exitRight:"",exitLeft:""}},e.createElement(i,{templateName:this.state.templateName,onSelectTemplate:this.setTemplate.bind(this)}),e.createElement(o,{startNumber:this.state.startNumber,countNumber:this.state.countNumber,changeStartNumber:this.setStartNumber.bind(this),changeCountNumber:this.setCountNumber.bind(this),libName:this.state.libName,setLibName:this.setLibName.bind(this),renderBarCodes:this.renderBarCodes.bind(this)}),e.createElement(p,null))),e.createElement("div",{className:"sheets"},this.state.splitNumbers.map(((t,a)=>{const r=s[this.state.templateName];return e.createElement("section",{className:"sheet "+this.state.templateName,key:a,style:{paddingTop:r.marginTop,paddingLeft:r.marginLeft,display:"grid",gridTemplateColumns:`repeat(${r.labelCountX}, ${r.labelWidth})`,gridTemplateRows:`repeat(${r.labelCountY}, ${r.labelHeight})`,columnGap:r.gapX,rowGap:r.gapY}},e.createElement("p",{style:{position:"absolute",top:parseFloat(r.marginTop)-7>0?(parseFloat(r.marginTop)-7)/2+"mm":"0",right:"right"===r.headerPosition?parseInt(r.marginLeft)+parseInt(r.gapX)+"mm":"auto",left:"left"===r.headerPosition?parseInt(r.marginLeft)+parseInt(r.gapX)+"mm":"auto",fontSize:"3mm"}},this.addZero(parseInt(this.state.startNumber.replace(/[A-Z]/g,""))+this.state.perPage*a),"-",this.addZero(parseInt(this.state.startNumber.replace(/[A-Z]/g,""))-1+this.state.perPage*(a+1))," / ",null!==this.state.univStartAlphabet?"Code39":"NW-7",this.state.checkDigit?" (M10W21)":""," / ",a+1,"枚目"),t.map((t=>{let a=null;return this.state.checkDigit&&(a=(e=>{const t=e.split("").reverse().map(((e,t)=>{const a=parseInt(e);return t%2==0?(2*a).toString().split("").reduce(((e,t)=>e+parseInt(t)),0):a})).reduce(((e,t)=>e+t),0);return t%10==0?0:10-t%10})(t.replace(/[A-Z]/g,""))),e.createElement(u,{number:t,checkDigit:a,univStartAlphabet:this.state.univStartAlphabet,libName:this.state.libName,template:r,key:t})})),e.createElement("img",{src:"/assets/calil.svg",alt:"カーリル",className:"logo",style:{position:"absolute",bottom:parseFloat(r.marginTop)-7>0?parseFloat(r.marginTop)-7+"mm":"0",left:parseInt(r.marginLeft)+parseInt(r.gapX)+"mm",fontSize:"3mm"}}))}))),e.createElement("footer",null,e.createElement("span",{className:"poweredby"})))}}n.render(e.createElement(e.StrictMode,null,e.createElement(c,null)),document.getElementById("root"));
