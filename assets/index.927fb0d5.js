import{r as e,J as t,R as r,a as n}from"./vendor.1953aa31.js";class a extends e.exports.Component{constructor(e){super(e),this.state={},this.canvasDiv=null,this.startNumber=null,this.endNumber=null}componentDidMount(){this.renderBarCodes()}renderBarCodes(){if(this.canvasDiv&&(this.canvasDiv.innerHTML=""),this.startNumber&&this.endNumber){const e=parseInt(this.startNumber.value),t=parseInt(this.endNumber.value);if(e>=t)return console.log("数字の指定が間違っています");if(t-e>=1e3&&!confirm("バーコードの数が多いとブラウザの動作が遅くなる可能性があります。実行しますか？"))return;let r=e;for(;r<=t;)this.renderBarcode(r),r+=1}}renderBarcode(e){const r=document.createElement("canvas");t(r,String(e),{format:"codabar",width:2,height:75}),this.canvasDiv&&this.canvasDiv.appendChild(r)}render(){return r.createElement("div",{className:"App"},r.createElement("header",null,r.createElement("div",null,r.createElement("label",{htmlFor:""}),r.createElement("input",{type:"number",defaultValue:"10000",ref:e=>this.startNumber=e}),"-",r.createElement("label",{htmlFor:""}),r.createElement("input",{type:"number",defaultValue:"10100",ref:e=>this.endNumber=e}),r.createElement("button",{onClick:this.renderBarCodes.bind(this)},"バーコード作成")),r.createElement("button",{onClick:print},"印刷")),r.createElement("div",{ref:e=>this.canvasDiv=e}))}}n.render(r.createElement(r.StrictMode,null,r.createElement(a,null)),document.getElementById("root"));
