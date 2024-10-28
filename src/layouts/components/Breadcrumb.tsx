import { useMatches } from "react-router-dom";
import { Breadcrumb as AntdBreadcrumb } from "antd";

export default function Breadcrumb() {
    const matches = useMatches();
    console.log(matches, ',l')
    const items = matches
        .filter((match) => Boolean((match.handle as any)?.crumb))
        .map((match) => ({
            title: (match.handle as any)?.crumb?.(),
        }));
    console.log(items, '098');

    return <AntdBreadcrumb items={items} />;
}