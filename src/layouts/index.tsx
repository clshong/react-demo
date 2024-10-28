import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Flex, Layout } from "antd";
import { ThemeSwitch } from "@/components/theme-switch"
import Avatar from "./components/Avatar";
import Breadcrumb from "./components/Breadcrumb";
import Content from "./components/Content";
import Sider from "./components/Sider";
import { useSettingsStore } from "@/stores/index";

export default function MainLayout() {
    const collapsed = useSettingsStore((state) => state.collapsed);
    const setCollapsed = useSettingsStore((state) => state.setCollapsed);

    return (
        <Layout hasSider style={{ height: "100vh" }} className="w-screen h-screen overflow-hidden">
            {/* 侧边栏 */}
            <Sider />
            <Layout>
                <Layout.Header className="flex justify-between items-center">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-inherit hover:text-inherit mr-2"
                    />
                    <Breadcrumb />
                    <Flex gap={8} className="ml-auto items-center">
                        <ThemeSwitch />
                        <Avatar />
                    </Flex>
                </Layout.Header>
                <Content />
            </Layout>
        </Layout>
    );
}