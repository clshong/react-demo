import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";

/** 登录 */
import Login from "@/pages/Login/index";

// * 导入所有router
const metaRouters: any = import.meta.glob("./modules/*.tsx", { eager: true });

let routeModuleList: RouteObject[] = []

Object.values(metaRouters).forEach((module: any) => {
    // 检查 module 是否包含 default 属性，并确保 default 是 RouteObject 或 RouteObject[]
    if (module && module.default) {
        if (Array.isArray(module.default)) {
            routeModuleList.push(...module.default);
        } else {
            routeModuleList.push(module.default);
        }
    }
});




const routes: RouteObject[] = [
    {
        path: "/",
        element: <Navigate to="/Landing" />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    ...routeModuleList,
    {
        path: "*",
        element: <Navigate to="/404" />,
    },

];

export const router = createBrowserRouter(routes, {
    basename: import.meta.env.VITE_APP_BASE_URL,
});
