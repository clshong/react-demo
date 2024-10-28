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
                path: "docsEdit",
                element: lazyLoad(lazy(() => import("@/pages/DocsEdit"))),
                meta: {
                    requiresAuth: true,
                    title: "文档编辑",
                    key: "docsEdit",
                },
            },
        ],
    },
];

export default LandingRouter;
