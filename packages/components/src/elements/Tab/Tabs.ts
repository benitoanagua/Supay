import { LitElement, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  state,
  queryAssignedElements,
} from "lit/decorators.js";
import baseCSS from "../../component-base.css?inline";
import componentCSS from "./Tab.css?inline";
import type { TabsProps, TabChangeEvent } from "../../types/tabs.js";
import type { StrataTab } from "./Tab.js";
import type { StrataTabPanel } from "./TabPanel.js";

@customElement("strata-tabs")
export class StrataTabs extends LitElement implements TabsProps {
  static styles = [unsafeCSS(baseCSS), unsafeCSS(componentCSS)];

  @property({ type: Number, attribute: "active-tab" }) activeTab = 0;
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private selected = 0;

  @queryAssignedElements({ slot: "tabs", selector: "strata-tab" })
  private tabElements!: StrataTab[];

  @queryAssignedElements({ slot: "panels", selector: "strata-tab-panel" })
  private panelElements!: StrataTabPanel[];

  connectedCallback() {
    super.connectedCallback();
    this.selected = Math.max(0, this.activeTab);
  }

  protected firstUpdated() {
    this.updateTabs();
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("activeTab")) {
      this.selected = Math.max(0, this.activeTab);
      this.updateTabs();
    }
  }

  private onSelect(index: number) {
    if (this.disabled || index === this.selected) return;

    const previousTab = this.selected;
    this.selected = index;
    this.updateTabs();

    this.dispatchEvent(
      new CustomEvent("tab-change", {
        detail: { activeTab: this.selected, previousTab },
        bubbles: true,
        composed: true,
      }) as TabChangeEvent,
    );
  }

  private updateTabs() {
    // Update tabs - ahora usamos la propiedad 'active'
    this.tabElements.forEach((tab, index) => {
      const isActive = index === this.selected;

      // Actualizar la propiedad 'active' del tab
      tab.active = isActive;
      tab.panelId = `strata-tab-panel-${index}`;

      if (this.disabled) {
        tab.disabled = true;
      } else {
        tab.disabled = false;
      }
    });

    // Update panels
    this.panelElements.forEach((panel, index) => {
      panel.active = index === this.selected;
      panel.panelId = `strata-tab-panel-${index}`;
    });
  }

  private handleTabClick(e: Event) {
    const target = e.target as Element;
    const tab = target.closest("strata-tab");

    if (tab && !this.disabled) {
      const index = this.tabElements.indexOf(tab);
      if (index > -1) {
        this.onSelect(index);
      }
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    const key = e.key;
    let newIndex = this.selected;

    switch (key) {
      case "ArrowLeft":
        e.preventDefault();
        newIndex =
          this.selected > 0 ? this.selected - 1 : this.tabElements.length - 1;
        break;
      case "ArrowRight":
        e.preventDefault();
        newIndex =
          this.selected < this.tabElements.length - 1 ? this.selected + 1 : 0;
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = this.tabElements.length - 1;
        break;
      default:
        return;
    }

    if (newIndex !== this.selected) {
      this.onSelect(newIndex);
      (this.tabElements[newIndex] as HTMLElement)?.focus();
    }
  }

  render() {
    return html`
      <div class="strata-tabs">
        <div
          class="strata-tabs__header"
          role="tablist"
          @click="${this.handleTabClick}"
          @keydown="${this.handleKeyDown}"
        >
          <slot name="tabs"></slot>
        </div>

        <div class="strata-tabs__content">
          <slot name="panels"></slot>
        </div>
      </div>
    `;
  }
}
