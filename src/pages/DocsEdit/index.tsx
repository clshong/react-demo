import { useRef, useEffect } from 'react'

import "@univerjs/design/lib/index.css";
import "@univerjs/ui/lib/index.css";
import "@univerjs/docs-ui/lib/index.css";

import { LocaleType, Tools, UniverInstanceType, Univer } from "@univerjs/core";
import { defaultTheme } from "@univerjs/design";

import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";


import { UniverUIPlugin } from "@univerjs/ui";

import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";

import DesignZhCN from '@univerjs/design/locale/zh-CN';
import DocsUIZhCN from '@univerjs/docs-ui/locale/zh-CN';
import UIZhCN from '@univerjs/ui/locale/zh-CN';

export default function DocsEdit() {
    const univerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const univer = new Univer({
            theme: defaultTheme,
            locale: LocaleType.ZH_CN,
            locales: {
                [LocaleType.ZH_CN]: Tools.deepMerge(
                    DesignZhCN,
                    DocsUIZhCN,
                    UIZhCN,
                ),
            },
        });

        univer.registerPlugin(UniverRenderEnginePlugin);
        univer.registerPlugin(UniverFormulaEnginePlugin);

        univer.registerPlugin(UniverUIPlugin, {
            container: univerRef.current!,
            footer: false,
        });

        univer.registerPlugin(UniverDocsPlugin);
        univer.registerPlugin(UniverDocsUIPlugin, {
            container: 'univerdoc',
            layout: {
                docContainerConfig: {
                    innerLeft: false,
                },
            },
        });

        univer.createUnit(UniverInstanceType.UNIVER_DOC, {});

    }, []);

    return (
        <div ref={univerRef} style={{ width: '100vw', height: 'calc(100vh - 68px)' }} />
    )
}


