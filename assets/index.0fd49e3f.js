import{R as e,r as t,J as r,S as n,a}from"./vendor.73f11a35.js";const l=t=>e.createElement("ol",null,e.createElement("li",{className:1===t.currentStep?"current":""},"Step 1"),e.createElement("li",{className:2===t.currentStep?"current":""},"Step 2"),e.createElement("li",{className:3===t.currentStep?"current":""},"Step 3")),s=t=>e.createElement("div",{className:"step step1"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"テンプレートの選択"),e.createElement("nav",null,e.createElement("button",{onClick:t.nextStep,className:"active"},"次へ"))),c=t=>e.createElement("div",{className:"step step2"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"印刷するバーコードラベルの設定"),e.createElement("div",null,e.createElement("input",{type:"number",style:{width:"6rem"},defaultValue:"10000",ref:e=>t.this.startNumber=e}),"からスタートで",e.createElement("input",{type:"number",style:{width:"4rem"},defaultValue:"1",ref:e=>t.this.countNumber=e}),"ページ"),e.createElement("nav",null,e.createElement("button",{onClick:t.previousStep},"戻る"),e.createElement("button",{onClick:()=>{t.this.renderBarCodes()&&t.nextStep()},className:"active"},"次へ"))),m=t=>e.createElement("div",{className:"step step3"},e.createElement("h2",null,"Step ",t.currentStep),e.createElement("p",null,"さあ、印刷しましょう！"),e.createElement("nav",null,e.createElement("button",{onClick:t.previousStep},"戻る"),e.createElement("button",{onClick:print,className:"active"},"印刷"))),u=n=>{const a=t.exports.useRef(null);return t.exports.useEffect((()=>{r(a.current,n.number,{format:"codabar",width:2.25,height:52,textMargin:2,fontSize:20,margin:0})})),e.createElement("div",{className:"barcode"},e.createElement("svg",{ref:a,xmlns:"http://www.w3.org/2000/svg",version:"1.1"}))};class i extends t.exports.Component{constructor(e){super(e),this.state={templateName:"AONE",perPage:44,splitNumbers:[]},this.startNumber=null,this.countNumber=null}renderBarCodes(){if(this.startNumber&&this.countNumber){const e=parseInt(this.startNumber.value),t=parseInt(this.countNumber.value)*this.state.perPage;if(t>=5e3&&!confirm("バーコードの数が多いとブラウザの動作が遅くなる可能性があります。実行しますか？"))return!1;const r=[];let n=e;Array.from({length:t}).forEach((()=>{r.push(n),n+=1}));const a=((e,t)=>{const r=e.length;for(var n=[],a=0;a<Math.ceil(r/t);a++){const r=e.slice(a*t,a*t+t);n.push(r)}return n})(r,this.state.perPage);return this.setState({splitNumbers:a}),!0}return!1}render(){return e.createElement("div",{className:"App"},e.createElement("div",{className:"steps"},e.createElement(n,{nav:e.createElement(l,null),transitions:{enterRight:"",enterLeft:"",exitRight:"",exitLeft:""}},e.createElement(s,null),e.createElement(c,{this:this}),e.createElement(m,null))),e.createElement("div",{className:"canvas"},this.state.splitNumbers.map(((t,r)=>e.createElement("section",{className:"sheet "+this.state.templateName,key:r},t.map((t=>e.createElement(u,{number:String(t),key:t}))))))))}}a.render(e.createElement(e.StrictMode,null,e.createElement(i,null)),document.getElementById("root"));
