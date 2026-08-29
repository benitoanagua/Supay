import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("strata-pagination")
export class StrataPagination extends LitElement {
  static styles=css`:host{display:flex;gap:4px;align-items:center}.strata-pagination__page{min-width:32px;height:32px;padding:0 8px;border:0;border-radius:var(--strata-radius-small);background:transparent;color:var(--strata-color-text-primary);font:500 13px var(--strata-font-sans);cursor:pointer}.strata-pagination__page[aria-current=page]{background:var(--strata-color-gray-200);font-weight:700}`;
  @property({type:Number}) page=1;
  @property({type:Number}) pages=1;

  private selectPage(page:number){
    if(page===this.page || page<1 || page>this.pages)return;
    this.page=page;
    this.dispatchEvent(new CustomEvent("pagination-change",{bubbles:true,composed:true,detail:{page:this.page,pages:this.pages}}));
  }

  render(){return html`${Array.from({length:Math.min(this.pages,7)},(_,i)=>i+1).map(n=>html`<button class="strata-pagination__page" type="button" aria-current=${n===this.page?'page':'false'} @click=${()=>this.selectPage(n)}>${n}</button>`)}`;}
}
