import { lazy } from "react";
import lazyLoad from "../utils/lazyLoad";
import { LayoutIndex } from "../constant";

// Home  示例模块
const LandingRouter = [
    {
        element: <LayoutIndex />,
        meta: {
            title: "layout",
        },
        children: [
            {
                path: "amap",
                element: lazyLoad(lazy(() => import("@/pages/Amap/index"))),
                meta: {
                    requiresAuth: true,
                    title: "高德地图",
                    key: "amap",
                },
            },
        ],
    },
];

export default LandingRouter;
