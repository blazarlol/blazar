// import { apiTreaty } from "@blazar/elysia";
// import { CustomError, getAuthSessionCookie } from "@blazar/helpers";
// import { ParseRoute, ParsedLocation, redirect } from "@tanstack/react-router";
// import { routeTree } from "../routeTree.gen";

// type ValidRoutes = ParseRoute<typeof routeTree>["fullPath"];

// export const validateSessionCookie = async (
//   location: ParsedLocation,
//   path: ValidRoutes
// ) => {
//   try {
//     const authSessionCookie = getAuthSessionCookie("auth_session");

//     if (!authSessionCookie) {
//       throw new Error("No auth session cookie found");
//     }

//     const { error } = await apiTreaty.api.auth["validate-session"].post({
//       sessionId: authSessionCookie,
//     });

//     if (error) {
//       throw new CustomError(String(error.value), Number(error.status));
//     }

//     return true;
//   } catch (error) {
//     // TODO: Display the error somehow in the UI
//     throw redirect({
//       to: path,
//       search: {
//         redirect: location.href,
//       },
//     });
//   }
// };
