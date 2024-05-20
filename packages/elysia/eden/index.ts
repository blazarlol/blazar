import { edenTreaty } from "@elysiajs/eden";
import type { Api } from "api";

export const apiTreaty = edenTreaty<Api>("http://localhost:8080");
