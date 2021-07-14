import{R as e,r as t,J as a,j as r,S as n,a as l}from"./vendor.65fe3e86.js";const s=t=>e.createElement("ol",{className:"steps"},e.createElement("li",{className:1===t.currentStep?"current":""},"Step 1"),e.createElement("li",{className:2===t.currentStep?"current":""},"Step 2"),e.createElement("li",{className:3===t.currentStep?"current":""},"Step 3")),m=t=>e.createElement("div",{className:"step step1"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"印刷に使うラベルシールを選んでください"),e.createElement("ul",null,e.createElement("li",null,e.createElement("input",{type:"radio",name:"template",id:"AONE",value:"AONE",defaultChecked:!0,onChange:e=>t.onSelectTemplate(e.target.value)}),e.createElement("label",{htmlFor:"AONE"},"A-One・ラベルシール (",e.createElement("a",{href:"https://www.askul.co.jp/p/334079/",target:"_blank"},"ASKULで購入"),")")),e.createElement("li",null,e.createElement("input",{type:"radio",name:"template",id:"KIHARA",value:"KIHARA",onChange:e=>t.onSelectTemplate(e.target.value)}),e.createElement("label",{htmlFor:"KIHARA"},"キハラ・ラベルシール (",e.createElement("a",{href:"https://www.monotaro.com/g/04604493/",target:"_blank"},"モノタロウで購入"),")")),t.fromHash?e.createElement("li",null,e.createElement("input",{type:"radio",name:"template",id:"fromHash",value:"fromHash",defaultChecked:!0,onChange:e=>t.onSelectTemplate(e.target.value)}),e.createElement("label",{htmlFor:"fromHash"},"URLで共有されたラベルシール")):null),e.createElement("nav",null,e.createElement("button",{onClick:t.nextStep,className:"active"},"次へ"))),i=t=>e.createElement("div",{className:"step step2"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"印刷するバーコードラベルを設定しましょう"),e.createElement("div",null,e.createElement("input",{type:"number",style:{width:"6rem"},defaultValue:"10000",min:"1",max:"99999",required:!0,onChange:e=>t.changeStartNumber(e.target.value)}),"からスタートで",e.createElement("input",{type:"number",style:{width:"4rem"},defaultValue:"1",min:"1",max:"100",required:!0,onChange:e=>t.changeCountNumber(e.target.value)}),"ページ"),e.createElement("nav",null,e.createElement("button",{onClick:t.previousStep},"戻る"),e.createElement("button",{onClick:()=>{t.renderBarCodes()&&t.nextStep()},className:"active"},"次へ"))),o=t=>e.createElement("div",{className:"step step3"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"さあ、印刷しましょう！"),e.createElement("nav",null,e.createElement("button",{onClick:t.previousStep},"戻る"),e.createElement("button",{onClick:print,className:"active"},"印刷"))),c=r=>{const{number:n,libName:l,preset:s}=r,m=t.exports.useRef(null);return t.exports.useEffect((()=>{a(m.current,n,{format:"codabar",width:2.25,height:52,textMargin:2,fontSize:20,margin:0})})),e.createElement("div",{className:"barcode"+(""!==l?" libName":""),style:{display:"inline-flex",boxSizing:"border-box",justifyContent:"center",alignItems:"center",width:s.labelWidth,height:s.labelHeight,borderRadius:s.borderRadius,marginTop:s.gapY,marginRight:s.gapX,marginBottom:s.gapX,marginLeft:s.gapX,padding:s.labelPadding,boxShadow:"2px 0 0 0 #CCCCCC, 0 2px 0 0 #CCCCCC, 2px 2px 0 0 #CCCCCC, 2px 0 0 0 #CCCCCC inset, 0 2px 0 0 #CCCCCC inset"}},""!==l?e.createElement("div",{className:"name"},l):null,e.createElement("svg",{ref:m,xmlns:"http://www.w3.org/2000/svg",version:"1.1"}))};const p={AONE:{marginTop:"8.8mm",marginLeft:"8.2mm",labelWidth:"48.3mm",labelHeight:"25.4mm",labelPadding:"4mm",gapX:"0",gapY:"0",labelCountX:4,labelCountY:11,borderRadius:"0px",libName:"",printNow:!1},KIHARA:{marginTop:"8.8mm",marginLeft:"8.2mm",labelWidth:"44.3mm",labelHeight:"27.4mm",labelPadding:"4mm",gapX:"2mm",gapY:"2mm",labelCountX:4,labelCountY:9,borderRadius:"10px",libName:"",printNow:!1}};class u extends t.exports.Component{constructor(e){super(e),this.state={templateName:"",libName:"",perPage:0,startNumber:"10000",countNumber:1,splitNumbers:[]}}componentDidMount(){""===location.hash?this.setTemplate("AONE"):(p.fromHash=r.parse(location.hash.substr(1)),this.setTemplate("fromHash"))}setTemplate(e){let t=p[e].labelCountX*p[e].labelCountY;this.setState({perPage:t,templateName:e},this.renderBarCodes.bind(this)),location.hash=r.stringify(p[e])}setStartNumber(e){this.setState({startNumber:e},this.renderBarCodes.bind(this))}setCountNumber(e){this.setState({countNumber:parseInt(e)},this.renderBarCodes.bind(this))}setLibName(e){this.setState({libName:e})}renderBarCodes(){const e=parseInt(this.state.startNumber),t=this.state.countNumber*this.state.perPage,a=[];let r=e;Array.from({length:t}).forEach((()=>{a.push(r),r+=1}));const n=((e,t)=>{const a=e.length;for(var r=[],n=0;n<Math.ceil(a/t);n++){const a=e.slice(n*t,n*t+t);r.push(a)}return r})(a,this.state.perPage);return this.setState({splitNumbers:n}),!0}render(){return e.createElement("div",{className:"App"},e.createElement("div",{className:"steps"},e.createElement(n,{nav:e.createElement(s,null),transitions:{enterRight:"",enterLeft:"",exitRight:"",exitLeft:""}},e.createElement(m,{onSelectTemplate:this.setTemplate.bind(this),fromHash:void 0!==p.fromHash}),e.createElement(i,{changeStartNumber:this.setStartNumber.bind(this),changeCountNumber:this.setCountNumber.bind(this),setLibName:this.setLibName.bind(this),renderBarCodes:this.renderBarCodes.bind(this)}),e.createElement(o,null))),e.createElement("div",{className:"sheets"},this.state.splitNumbers.map(((t,a)=>e.createElement("section",{className:"sheet "+this.state.templateName,key:a,style:{paddingTop:p[this.state.templateName].marginTop,paddingLeft:p[this.state.templateName].marginLeft}},e.createElement("p",{style:{position:"absolute",top:"-"+parseFloat(p[this.state.templateName].marginTop)/3+"mm",right:p[this.state.templateName].marginLeft}},parseInt(this.state.startNumber)+this.state.perPage*a,"-",parseInt(this.state.startNumber)-1+this.state.perPage*(a+1)," / ",a+1,"枚目"),t.map((t=>e.createElement(c,{number:String(t),libName:this.state.libName,preset:p[this.state.templateName],key:t}))))))))}}l.render(e.createElement(e.StrictMode,null,e.createElement(u,null)),document.getElementById("root"));
