import { Button, ColorPicker, DatePicker, Flex, Typography } from "antd";
import { useSettingsStore } from "@/stores";

const { RangePicker } = DatePicker;

export default function LandingPage() {
    const colorPrimary = useSettingsStore((state) => state.colorPrimary);
    const setColorPrimary = useSettingsStore((state) => state.setColorPrimary);

    return (
        <div>
            <Typography.Title level={3}>Landing Page</Typography.Title>
            <Flex gap={16}>
                <Button type="primary">primary</Button>
                <Button>default</Button>
                <RangePicker />
                <ColorPicker
                    showText
                    value={colorPrimary}
                    onChange={(color) => {
                        setColorPrimary(color.toHex());
                    }}
                />
            </Flex>
        </div>
    );
}
