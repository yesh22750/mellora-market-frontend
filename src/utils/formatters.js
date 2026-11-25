import {FALLBACK_IMAGE} from "./constants";

export const money = value => `₹${Number(value || 0).toLocaleString("en-IN")}`;
export const imageFor = product => product?.image || FALLBACK_IMAGE;
