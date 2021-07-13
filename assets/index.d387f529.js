import{R as e,r as t,J as a,S as r,a as n}from"./vendor.73f11a35.js";const l=t=>e.createElement("ol",{className:"steps"},e.createElement("li",{className:1===t.currentStep?"current":""},"Step 1"),e.createElement("li",{className:2===t.currentStep?"current":""},"Step 2"),e.createElement("li",{className:3===t.currentStep?"current":""},"Step 3")),s=t=>e.createElement("div",{className:"step step1"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"印刷に使うラベルシールを選んでください"),e.createElement("ul",null,e.createElement("li",null,e.createElement("input",{type:"radio",name:"template",id:"AONE",value:"AONE",defaultChecked:!0,onChange:e=>t.onSelectTemplate(e.target.value)}),e.createElement("label",{htmlFor:"AONE"},"A-One・ラベルシール (",e.createElement("a",{href:"https://www.askul.co.jp/p/334079/",target:"_blank"},"ASKULで購入"),")")),e.createElement("li",null,e.createElement("input",{type:"radio",name:"template",id:"KIHARA",value:"KIHARA",onChange:e=>t.onSelectTemplate(e.target.value)}),e.createElement("label",{htmlFor:"KIHARA"},"キハラ・ラベルシール (",e.createElement("a",{href:"https://www.monotaro.com/g/04604493/",target:"_blank"},"モノタロウで購入"),")"))),e.createElement("nav",null,e.createElement("button",{onClick:t.nextStep,className:"active"},"次へ"))),m=t=>e.createElement("div",{className:"step step2"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"印刷するバーコードラベルを設定しましょう"),e.createElement("div",null,e.createElement("input",{type:"number",style:{width:"6rem"},defaultValue:"10000",min:"1",onChange:e=>t.changeStartNumber(e.target.value)}),"からスタートで",e.createElement("input",{type:"number",style:{width:"4rem"},defaultValue:"1",min:"1",max:"100",onChange:e=>t.changeCountNumber(e.target.value)}),"ページ"),e.createElement("nav",null,e.createElement("button",{onClick:t.previousStep},"戻る"),e.createElement("button",{onClick:()=>{t.renderBarCodes()&&t.nextStep()},className:"active"},"次へ"))),c=t=>e.createElement("div",{className:"step step3"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"さあ、印刷しましょう！"),e.createElement("nav",null,e.createElement("button",{onClick:t.previousStep},"戻る"),e.createElement("button",{onClick:print,className:"active"},"印刷"))),i=r=>{const n=t.exports.useRef(null);return t.exports.useEffect((()=>{a(n.current,r.number,{format:"codabar",width:2.25,height:52,textMargin:2,fontSize:20,margin:0})})),e.createElement("div",{className:"barcode"+(""!==r.libName?" libName":"")},""!==r.libName?e.createElement("div",{className:"name"},r.libName):null,e.createElement("svg",{ref:n,xmlns:"http://www.w3.org/2000/svg",version:"1.1"}))};class u extends t.exports.Component{constructor(e){super(e),this.state={templateName:"AONE",libName:"",perPage:44,startNumber:"10000",countNumber:1,splitNumbers:[]}}componentDidMount(){this.renderBarCodes()}setTemplate(e){let t=44;"AONE"===e&&(t=44),"KIHARA"===e&&(t=36),this.setState({perPage:t,templateName:e})}setStartNumber(e){this.setState({startNumber:e})}setCountNumber(e){this.setState({countNumber:parseInt(e)})}setLibName(e){this.setState({libName:e})}renderBarCodes(){const e=parseInt(this.state.startNumber),t=this.state.countNumber*this.state.perPage,a=[];let r=e;Array.from({length:t}).forEach((()=>{a.push(r),r+=1}));const n=((e,t)=>{const a=e.length;for(var r=[],n=0;n<Math.ceil(a/t);n++){const a=e.slice(n*t,n*t+t);r.push(a)}return r})(a,this.state.perPage);return this.setState({splitNumbers:n}),!0}render(){return e.createElement("div",{className:"App"},e.createElement("div",{className:"steps"},e.createElement(r,{nav:e.createElement(l,null),transitions:{enterRight:"",enterLeft:"",exitRight:"",exitLeft:""}},e.createElement(s,{onSelectTemplate:this.setTemplate.bind(this)}),e.createElement(m,{changeStartNumber:this.setStartNumber.bind(this),changeCountNumber:this.setCountNumber.bind(this),setLibName:this.setLibName.bind(this),renderBarCodes:this.renderBarCodes.bind(this)}),e.createElement(c,null))),e.createElement("div",{className:"sheets"},this.state.splitNumbers.map(((t,a)=>e.createElement("section",{className:"sheet "+this.state.templateName,key:a},e.createElement("p",null,parseInt(this.state.startNumber)+this.state.perPage*a,"-",parseInt(this.state.startNumber)-1+this.state.perPage*(a+1)," / ",a+1,"枚目"),t.map((t=>e.createElement(i,{number:String(t),libName:this.state.libName,key:t}))))))))}}n.render(e.createElement(e.StrictMode,null,e.createElement(u,null)),document.getElementById("root"));
