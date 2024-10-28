import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from "antd";
import { useTheme } from "@/components/theme-provider";
import { useSettingsStore } from "@/stores/index";



// 递归函数，找到匹配的菜单项
const findSelectedKeys = (items: MenuProps["items"], pathname: string, path: string[] = []) => {
    const selectedKeys: string[] = [];
    let openKeys: string[] = [];

    const travel = (items: MenuProps["items"], pathname: string, path: string[]) => {
        for (const item of items!) {
            if (item!.key === pathname) {
                selectedKeys.push(item!.key);
                openKeys = [...path];
                return;
            }
            if ((item as any).children) {
                path.push(item!.key as string);
                travel((item as any).children, pathname, path);
                path.pop();
            }
        }
    };

    travel(items, pathname, path);
    return { selectedKeys, openKeys };
};

const items: MenuProps["items"] = [
    {
        icon: <HomeOutlined />,
        label: <Link to="/landing">首页</Link>,
        key: "/landing",
    },
    {
        icon: <HomeOutlined />,
        label: <Link to="/docsEdit">文档编辑</Link>,
        key: "/docsEdit",
    },
    {
        icon: <HomeOutlined />,
        label: <Link to="/Auditive">音频波纹</Link>,
        key: "/Auditive",
    },
    {
        icon: <HomeOutlined />,
        label: <Link to="/amap">高德地图</Link>,
        key: "/amap",
    },
    {
        icon: <VideoCameraOutlined />,
        label: "树使用",
        key: "/three",
        children: [
            {
                key: "/three/base",
                label: <Link to="/three/base">基础使用</Link>,
            },
            {
                key: "/three/Spherescubes",
                label: <Link to="/three/Spherescubes">球和立方体</Link>,
            },
        ],
    },
];

export default function Sider() {
    const location = useLocation();

    const firstRenderRef = useRef(true);

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const collapsed = useSettingsStore((state) => state.collapsed);

    const { isDark } = useTheme();

    useEffect(() => {
        if (location.pathname === "/") return;

        // 首次渲染时，设置默认值
        if (firstRenderRef.current) {
            const { selectedKeys, openKeys } = findSelectedKeys(items, location.pathname);
            setSelectedKeys(selectedKeys);
            setOpenKeys(openKeys);
        }
        // 将首次渲染标记设置为false
        firstRenderRef.current = false;
    }, [location.pathname]);

    return (
        <Layout.Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="h-screen overflow-auto fixed top-0 left-0 bottom-0 dark:text-white"
        >
            <Link
                className="font-bold text-2xl hover:text-current h-[var(--layout-header-height)] flex justify-center items-center gap-2"
                to="/"
            >

                {collapsed ? null : "React Admin"}
            </Link>
            <Menu
                theme={isDark ? "dark" : "light"}
                mode="inline"
                items={items}
                selectedKeys={selectedKeys}
                onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
                openKeys={openKeys}
                onOpenChange={(openKeys) => setOpenKeys(openKeys)}
                className="!border-e-0"
            />
        </Layout.Sider>
    );
}
