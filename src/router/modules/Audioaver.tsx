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
                path: "Auditive",
                element: lazyLoad(lazy(() => import("@/pages/Audioaver"))),
                meta: {
                    requiresAuth: true,
                    title: "音频处理",
                    key: "Auditive",
                },
            },
        ],
    },
];

export default LandingRouter;
