import{R as e,r as t,J as a,j as r,S as n,a as l}from"./vendor.65fe3e86.js";const m={"aone-28368":{id:"aone-28368",name:"エーワン [28368]  44面  NW-7",barcode:"codabar",marginTop:"8.8mm",marginLeft:"8.2mm",labelWidth:"48.3mm",labelHeight:"25.4mm",labelPadding:"4mm",gapX:"0",gapY:"0",labelCountX:4,labelCountY:11,barcodeHeight:52,enableLibName:!0,borderRadius:"0",url:"https://www.askul.co.jp/p/334079/",linkText:"ASKULで購入"},"kihara-606906":{id:"kihara-606906",name:"キハラ [606906] 36面  NW-7",barcode:"codabar",marginTop:"8.8mm",marginLeft:"8.2mm",labelWidth:"44.3mm",labelHeight:"27.4mm",labelPadding:"4mm",gapX:"4mm",gapY:"2mm",labelCountX:4,labelCountY:9,barcodeHeight:52,enableLibName:!0,borderRadius:"3mm",url:"https://www.monotaro.com/g/04604493/",linkText:"モノタロウで購入"},"askul-56249":{id:"askul-56249",name:"アスクル [56249]  65面 再剥離 NW-37",barcode:"codabar",marginTop:"10.92mm",marginLeft:"4.75mm",labelWidth:"38.1mm",labelHeight:"21.2mm",labelPadding:"4mm",gapX:"2.5mm",gapY:"0",labelCountX:5,labelCountY:13,barcodeHeight:52,enableLibName:!0,borderRadius:"2mm",url:"https://www.askul.co.jp/p/1979677/",linkText:"ASKULで購入"},"aone-72295":{id:"aone-72295",name:"エーワン [72295]  95面  CODE39",barcode:"codabar",marginTop:"16.5mm",marginLeft:"13.5mm",labelWidth:"35mm",labelHeight:"12mm",labelPadding:"2mm",gapX:"2mm",gapY:"2mm",labelCountX:5,labelCountY:19,barcodeHeight:26,enableLibName:!1,borderRadius:"2mm",url:"https://www.askul.co.jp/p/3575890/",linkText:"ASKULで購入"}},s=t=>e.createElement("ol",{className:"steps"},e.createElement("li",{className:1===t.currentStep?"current":""},"Step 1"),e.createElement("li",{className:2===t.currentStep?"current":""},"Step 2"),e.createElement("li",{className:3===t.currentStep?"current":""},"Step 3")),i=t=>e.createElement("div",{className:"step step1"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"印刷に使うラベルシールを選んでください"),e.createElement("ul",null,Object.values(m).map(((a,r)=>e.createElement("li",{key:a.id},e.createElement("input",{type:"radio",name:"template",id:a.id,value:a.id,defaultChecked:r===t.templateIndex,onChange:e=>t.onSelectTemplate(e.target.value)}),e.createElement("label",{htmlFor:a.id},a.name," (",e.createElement("a",{href:a.url,target:"_blank"},a.linkText),")")))),t.fromHash?e.createElement("li",null,e.createElement("input",{type:"radio",name:"template",id:"fromHash",value:"fromHash",defaultChecked:!0,onChange:e=>t.onSelectTemplate(e.target.value)}),e.createElement("label",{htmlFor:"fromHash"},"URLで共有されたラベルシール")):null),e.createElement("nav",null,e.createElement("button",{onClick:t.nextStep,className:"active"},"次へ"))),o=t=>e.createElement("div",{className:"step step2"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"印刷するバーコードラベルを設定しましょう"),e.createElement("div",null,e.createElement("input",{type:"number",style:{width:"6rem"},defaultValue:t.startNumber,min:"1",max:"99999",required:!0,onChange:e=>t.changeStartNumber(e.target.value)}),"からスタートで",e.createElement("input",{type:"number",style:{width:"4rem"},defaultValue:t.countNumber,min:"1",max:"100",required:!0,onChange:e=>t.changeCountNumber(e.target.value)}),"ページ"),e.createElement("input",{type:"text",name:"libName",id:"libName",placeholder:"図書館名",onChange:e=>t.setLibName(e.target.value)}),e.createElement("select",null,e.createElement("option",{value:""},"チェックデジットなし"),e.createElement("option",{value:""},"モジュラス10 ウェイト2・1一括（M10W21）")),e.createElement("nav",null,e.createElement("button",{onClick:t.previousStep},"戻る"),e.createElement("button",{onClick:()=>{t.renderBarCodes()&&t.nextStep()},className:"active"},"次へ"))),c=t=>e.createElement("div",{className:"step step3"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"さあ、印刷しましょう！"),e.createElement("nav",null,e.createElement("button",{onClick:t.previousStep},"戻る"),e.createElement("button",{onClick:print,className:"active"},"印刷"))),u=r=>{const{number:n,libName:l,preset:m}=r,s=t.exports.useRef(null);t.exports.useEffect((()=>{a(s.current,n,{format:m.barcode,width:2.25,height:m.barcodeHeight,textMargin:2,fontSize:20,font:'"Conv_OCRB",Sans-Serif',margin:0})}));const i=""!==l&&m.enableLibName;return e.createElement("div",{className:"barcode",style:{display:"inline-flex",flexDirection:i?"column":"row",boxSizing:"border-box",justifyContent:"center",alignItems:"center",width:m.labelWidth,height:m.labelHeight,borderRadius:m.borderRadius,padding:i?parseInt(m.labelPadding)/2+"mm":m.labelPadding,boxShadow:"2px 0 0 0 #CCCCCC, 0 2px 0 0 #CCCCCC, 2px 2px 0 0 #CCCCCC, 2px 0 0 0 #CCCCCC inset, 0 2px 0 0 #CCCCCC inset"}},i?e.createElement("div",{className:"libName",style:{fontFamily:'"Noto Sans JP"',fontSize:l.length<10?"3mm":"1.5mm",marginBottom:"1mm"}},l):null,e.createElement("svg",{ref:s,xmlns:"http://www.w3.org/2000/svg",version:"1.1"}))};class p extends t.exports.Component{constructor(e){super(e),this.state={templateName:"",libName:"",perPage:0,startNumber:"10000",isStartZero:!0,countNumber:"1",splitNumbers:[]}}componentDidMount(){if(""===location.hash)this.setTemplate("aone-28368");else{const e=r.parse(location.hash.substr(1));m.fromHash=e,this.setTemplate("fromHash"),e.printNow&&print()}}setTemplate(e){let t=m[e].labelCountX*m[e].labelCountY;this.setState({perPage:t,templateName:e},this.renderBarCodes.bind(this))}setStartNumber(e){if(""===e)return;const t=!!e.match(/0+[0-9]+/);this.setState({startNumber:e,isStartZero:t},this.renderBarCodes.bind(this))}setCountNumber(e){this.setState({countNumber:e},this.renderBarCodes.bind(this))}setLibName(e){this.setState({libName:e})}addZero(e){let t="";if(this.state.isStartZero){const a=this.state.startNumber.length-String(e).length;Array.from({length:a}).forEach((()=>t+="0"))}return t+String(e)}renderBarCodes(){this.state.startNumber.match(/0+[0-9]+/);const e=parseInt(this.state.startNumber),t=parseInt(this.state.countNumber)*this.state.perPage,a=[];let r=e;Array.from({length:t}).forEach((()=>{a.push(this.addZero(r)),r+=1}));const n=((e,t)=>{const a=[];for(let r=0;r<e.length;r+=t){const n=e.slice(r,r+t);a.push(n)}return a})(a,this.state.perPage);return this.setState({splitNumbers:n}),!0}render(){return e.createElement("div",{className:"App"},e.createElement("div",{className:"steps"},e.createElement(n,{nav:e.createElement(s,null),transitions:{enterRight:"",enterLeft:"",exitRight:"",exitLeft:""}},e.createElement(i,{templateIndex:0,onSelectTemplate:this.setTemplate.bind(this),fromHash:void 0!==m.fromHash}),e.createElement(o,{startNumber:this.state.startNumber,countNumber:this.state.countNumber,changeStartNumber:this.setStartNumber.bind(this),changeCountNumber:this.setCountNumber.bind(this),setLibName:this.setLibName.bind(this),renderBarCodes:this.renderBarCodes.bind(this)}),e.createElement(c,null))),e.createElement("div",{className:"sheets"},this.state.splitNumbers.map(((t,a)=>{const r=m[this.state.templateName];return e.createElement("section",{className:"sheet "+this.state.templateName,key:a,style:{paddingTop:r.marginTop,paddingLeft:r.marginLeft,display:"grid",gridTemplateColumns:`repeat(${r.labelCountX}, ${r.labelWidth})`,gridTemplateRows:`repeat(${r.labelCountY}, ${r.labelHeight})`,columnGap:r.gapX,rowGap:r.gapY}},e.createElement("p",{style:{position:"absolute",top:parseFloat(r.marginTop)-7>0?(parseFloat(r.marginTop)-7)/2+"mm":"0",right:parseInt(r.marginLeft)+parseInt(r.gapX)+"mm",fontSize:"3mm"}},this.addZero(parseInt(this.state.startNumber)+this.state.perPage*a),"-",this.addZero(parseInt(this.state.startNumber)-1+this.state.perPage*(a+1))," / ",a+1,"枚目"),t.map((t=>e.createElement(u,{number:String(t),libName:this.state.libName,preset:r,key:t}))))}))))}}l.render(e.createElement(e.StrictMode,null,e.createElement(p,null)),document.getElementById("root"));
