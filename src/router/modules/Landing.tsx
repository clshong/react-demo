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
                path: "landing",
                element: lazyLoad(lazy(() => import("@/pages/Landing"))),
                meta: {
                    requiresAuth: true,
                    title: "主页",
                    key: "Landing",
                },
            },
        ],
    },
];

export default LandingRouter;
