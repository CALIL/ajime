import{R as e,r as t,J as a,q as r,S as l,a as n}from"./vendor.ec8061c3.js";const s={"aone-28368":{id:"aone-28368",name:"エーワン [28368]  44面  NW-7",barcode:"codabar",marginTop:"8.8mm",marginLeft:"8.2mm",labelWidth:"48.3mm",labelHeight:"25.4mm",labelPadding:"4mm",gapX:"0",gapY:"0",labelCountX:4,labelCountY:11,borderRadius:"0",url:"https://www.askul.co.jp/p/334079/",linkText:"ASKULで購入"},"kihara-606906":{id:"kihara-606906",name:"キハラ [606906] 36面  NW-7",barcode:"codabar",marginTop:"8.8mm",marginLeft:"8.2mm",labelWidth:"45.3mm",labelHeight:"27.7mm",labelPadding:"4mm",gapX:"4mm",gapY:"4mm",labelCountX:4,labelCountY:9,borderRadius:"3mm",url:"https://www.monotaro.com/g/04604493/",linkText:"モノタロウで購入"},"askul-56249":{id:"askul-56249",name:"アスクル [56249]  65面 再剥離 NW-37",barcode:"codabar",marginTop:"10.92mm",marginLeft:"4.75mm",labelWidth:"38.1mm",labelHeight:"21.2mm",labelPadding:"4mm",gapX:"2.5mm",gapY:"0",labelCountX:5,labelCountY:13,borderRadius:"2mm",url:"https://www.askul.co.jp/p/1979677/",linkText:"ASKULで購入"},"aone-72295":{id:"aone-72295",name:"エーワン [72295]  95面  CODE39",barcode:"codabar",marginTop:"16.5mm",marginLeft:"13.5mm",labelWidth:"35mm",labelHeight:"12mm",labelPadding:"2mm",gapX:"2mm",gapY:"2mm",labelCountX:5,labelCountY:19,borderRadius:"2mm",url:"https://www.askul.co.jp/p/3575890/",linkText:"ASKULで購入"}},m=t=>e.createElement("ol",{className:"steps"},e.createElement("li",{className:1===t.currentStep?"current":""},"Step 1"),e.createElement("li",{className:2===t.currentStep?"current":""},"Step 2"),e.createElement("li",{className:3===t.currentStep?"current":""},"Step 3")),i=t=>e.createElement("div",{className:"step step1"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"印刷に使うラベルシールを選んでください"),e.createElement("ul",null,Object.values(s).map((a=>e.createElement("li",{key:a.id},e.createElement("input",{type:"radio",name:"template",id:a.id,value:a.id,checked:a.id===t.templateName,onChange:e=>t.onSelectTemplate(e.target.value)}),e.createElement("label",{htmlFor:a.id},a.name," (",e.createElement("a",{href:a.url,target:"_blank"},a.linkText),")"))))),e.createElement("nav",null,e.createElement("button",{onClick:t.nextStep,className:"active"},"次へ"))),o=t=>e.createElement("div",{className:"step step2"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"印刷するバーコードラベルを設定しましょう"),e.createElement("div",null,e.createElement("input",{type:"number",style:{width:"6rem"},defaultValue:t.startNumber,min:"1",max:"99999",required:!0,onChange:e=>t.changeStartNumber(e.target.value)}),"からスタートで",e.createElement("input",{type:"number",style:{width:"4rem"},defaultValue:t.countNumber,min:"1",max:"100",required:!0,onChange:e=>t.changeCountNumber(e.target.value)}),"ページ"),e.createElement("input",{type:"text",name:"libName",id:"libName",placeholder:"図書館名",defaultValue:t.libName,onChange:e=>t.setLibName(e.target.value)}),e.createElement("nav",null,e.createElement("button",{onClick:t.previousStep},"戻る"),e.createElement("button",{onClick:()=>{t.renderBarCodes()&&t.nextStep()},className:"active"},"次へ"))),c=t=>e.createElement("div",{className:"step step3"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"さあ、印刷しましょう！"),e.createElement("nav",null,e.createElement("button",{onClick:t.previousStep},"戻る"),e.createElement("button",{onClick:print,className:"active"},"印刷"))),u=r=>{const{number:l,libName:n,preset:s,checkDigit:m}=r,i=t.exports.useRef(null);t.exports.useEffect((()=>{a(i.current,null===m?l:l+m,{format:s.barcode,width:2.25,height:parseInt(s.labelHeight)>20?52:26,text:null===m?l:l+"-"+m.toString(),textMargin:2,fontSize:parseInt(s.labelHeight)>20?20:15,font:'"Conv_OCRB",Sans-Serif',margin:0})}));const o=""!==n&&parseInt(s.labelHeight)>20;return e.createElement("div",{className:"barcode",style:{display:"inline-flex",flexDirection:o?"column":"row",boxSizing:"border-box",justifyContent:"center",alignItems:"center",width:s.labelWidth,height:s.labelHeight,borderRadius:s.borderRadius,padding:o?parseInt(s.labelPadding)/2+"mm":s.labelPadding,paddingTop:o?parseInt(s.labelPadding)/3+"mm":s.labelPadding,border:"1px solid #CCCCCC"}},o?e.createElement("div",{className:"libName",style:{fontFamily:'"Noto Sans JP"',fontSize:n.length<10?"3mm":"1.5mm",marginBottom:"1mm"}},n):null,e.createElement("svg",{ref:i,xmlns:"http://www.w3.org/2000/svg",version:"1.1"}))};class p extends t.exports.Component{constructor(e){super(e);const t=localStorage.getItem("state"),a=JSON.parse(t);this.state={templateName:t?a.templateName:"",libName:t?a.libName:"",perPage:0,startNumber:t?a.startNumber:"10000",isStartZero:!!t&&a.isStartZero,countNumber:"1",splitNumbers:[],checkDigit:!1}}componentDidMount(){if(""===location.hash)this.setTemplate("aone-28368",!1);else{const e=r.parse(location.hash);let t=e.template;t&&s[t]&&this.setTemplate(t),"true"===e.checkDigit&&this.setState({checkDigit:!0})}}setTemplate(e,t=!0){let a=s[e].labelCountX*s[e].labelCountY;if(this.setState({perPage:a,templateName:e},(()=>{this.renderBarCodes(),this.saveState()})),t){const t={template:e,checkDigit:!1};"true"===r.parse(location.hash).checkDigit&&(t.checkDigit=!0),location.hash=r.stringify(t)}}setStartNumber(e){if(""===e)return;const t=!!e.match(/0+[0-9]+/);this.setState({startNumber:e,isStartZero:t},(()=>{this.renderBarCodes(),this.saveState()}))}setCountNumber(e){this.setState({countNumber:e},this.renderBarCodes.bind(this))}setLibName(e){this.setState({libName:e},this.saveState.bind(this))}saveState(){const e={templateName:this.state.templateName,libName:this.state.libName,startNumber:this.state.startNumber,isStartZero:this.state.isStartZero};localStorage.setItem("state",JSON.stringify(e))}addZero(e){let t="";if(this.state.isStartZero){const a=this.state.startNumber.length-String(e).length;Array.from({length:a}).forEach((()=>t+="0"))}return t+String(e)}renderBarCodes(){const e=parseInt(this.state.startNumber),t=parseInt(this.state.countNumber)*this.state.perPage,a=[];let r=e;Array.from({length:t}).forEach((()=>{a.push(this.addZero(r)),r+=1}));const l=((e,t)=>{const a=[];for(let r=0;r<e.length;r+=t){const l=e.slice(r,r+t);a.push(l)}return a})(a,this.state.perPage);return this.setState({splitNumbers:l}),!0}render(){return e.createElement("div",{className:"App"},e.createElement("div",{className:"steps"},e.createElement(l,{nav:e.createElement(m,null),transitions:{enterRight:"",enterLeft:"",exitRight:"",exitLeft:""}},e.createElement(i,{templateName:this.state.templateName,onSelectTemplate:this.setTemplate.bind(this)}),e.createElement(o,{startNumber:this.state.startNumber,countNumber:this.state.countNumber,changeStartNumber:this.setStartNumber.bind(this),changeCountNumber:this.setCountNumber.bind(this),libName:this.state.libName,setLibName:this.setLibName.bind(this),renderBarCodes:this.renderBarCodes.bind(this)}),e.createElement(c,null))),e.createElement("div",{className:"sheets"},this.state.splitNumbers.map(((t,a)=>{const r=s[this.state.templateName];return e.createElement("section",{className:"sheet "+this.state.templateName,key:a,style:{paddingTop:r.marginTop,paddingLeft:r.marginLeft,display:"grid",gridTemplateColumns:`repeat(${r.labelCountX}, ${r.labelWidth})`,gridTemplateRows:`repeat(${r.labelCountY}, ${r.labelHeight})`,columnGap:r.gapX,rowGap:r.gapY}},e.createElement("p",{style:{position:"absolute",top:parseFloat(r.marginTop)-7>0?(parseFloat(r.marginTop)-7)/2+"mm":"0",right:parseInt(r.marginLeft)+parseInt(r.gapX)+"mm",fontSize:"3mm"}},this.addZero(parseInt(this.state.startNumber)+this.state.perPage*a),"-",this.addZero(parseInt(this.state.startNumber)-1+this.state.perPage*(a+1))," / ",a+1,"枚目"),t.map((t=>{let a=null;return this.state.checkDigit&&(a=(e=>{const t=e.toString().split("").reverse().map(((e,t)=>{const a=parseInt(e);return t%2==0?(2*a).toString().split("").reduce(((e,t)=>e+parseInt(t)),0):a})).reduce(((e,t)=>e+t),0);return t%10==0?0:10-t%10})(t)),e.createElement(u,{number:String(t),checkDigit:a,libName:this.state.libName,preset:r,key:t})})))}))),e.createElement("footer",null,e.createElement("span",{className:"poweredby"})))}}n.render(e.createElement(e.StrictMode,null,e.createElement(p,null)),document.getElementById("root"));
