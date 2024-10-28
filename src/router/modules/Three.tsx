import { lazy } from "react";
import lazyLoad from "../utils/lazyLoad";
import { LayoutIndex } from "../constant";

const AmapRouter = [
    {
        element: <LayoutIndex />,
        meta: {
            title: "layout",
        },
        children: [
            {
                path: "/three/base",
                element: lazyLoad(lazy(() => import("@/pages/Three/base"))),
                meta: {
                    requiresAuth: true,
                    title: "树基础使用",
                    key: "base",
                },
            },
            {
                path: "/three/Spherescubes",
                element: lazyLoad(lazy(() => import("@/pages/Three/Spherescubes"))),
                meta: {
                    requiresAuth: true,
                    title: "球体和立方体",
                    key: "base",
                },
            },
        ],
    },
];

export default AmapRouter;
