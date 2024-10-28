import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";

/** 登录 */
import Login from "@/pages/Login/index";

// * 导入所有router
const metaRouters: RouteObject = import.meta.glob("./modules/*.tsx");

// * 处理路由
const routerArray: RouteObject[] = [];

async function loadRouters(): Promise<void> {
    try {
        // 确保类型正确，metaRouters 是一个包含 Promise 的对象
        const routeModules = await Promise.all(
            Object.values(metaRouters).map((importFn) => importFn())
        );

        routeModules.forEach((module) => {
            // 检查 module 是否包含 default 属性，并确保 default 是 RouteObject 或 RouteObject[]
            if (module && module.default) {
                if (Array.isArray(module.default)) {
                    routerArray.push(...module.default);
                } else {
                    routerArray.push(module.default);
                }
            }
        });
    } catch (error) {
        console.error("Failed to load route modules:", error);
    }
}


// * 加载路由
await loadRouters();

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Navigate to="/Landing" />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    ...routerArray,
    {
        path: "*",
        element: <Navigate to="/404" />,
    },

];

export const router = createBrowserRouter(routes, {
    basename: import.meta.env.VITE_APP_BASE_URL,
});
