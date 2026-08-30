/**
 * STRATA icon policy: use Iconify directly and Carbon is the only collection.
 * The local collection is registered at startup; no icon API request is made.
 */
import { addCollection } from "iconify-icon";
import carbon from "@iconify-json/carbon/icons.json";

addCollection(carbon);
