import { treaty } from "@elysiajs/eden";
import type { Api } from "api";

export const apiTreaty = treaty<Api>("http://localhost:8080");
