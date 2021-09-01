/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppWord {
        "weight": number;
    }
    interface StencilHeader {
        /**
          * The header name
         */
        "header": string;
    }
    interface WordCloud {
        "words": string[];
    }
}
declare global {
    interface HTMLAppWordElement extends Components.AppWord, HTMLStencilElement {
    }
    var HTMLAppWordElement: {
        prototype: HTMLAppWordElement;
        new (): HTMLAppWordElement;
    };
    interface HTMLStencilHeaderElement extends Components.StencilHeader, HTMLStencilElement {
    }
    var HTMLStencilHeaderElement: {
        prototype: HTMLStencilHeaderElement;
        new (): HTMLStencilHeaderElement;
    };
    interface HTMLWordCloudElement extends Components.WordCloud, HTMLStencilElement {
    }
    var HTMLWordCloudElement: {
        prototype: HTMLWordCloudElement;
        new (): HTMLWordCloudElement;
    };
    interface HTMLElementTagNameMap {
        "app-word": HTMLAppWordElement;
        "stencil-header": HTMLStencilHeaderElement;
        "word-cloud": HTMLWordCloudElement;
    }
}
declare namespace LocalJSX {
    interface AppWord {
        "weight"?: number;
    }
    interface StencilHeader {
        /**
          * The header name
         */
        "header"?: string;
    }
    interface WordCloud {
        "words"?: string[];
    }
    interface IntrinsicElements {
        "app-word": AppWord;
        "stencil-header": StencilHeader;
        "word-cloud": WordCloud;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-word": LocalJSX.AppWord & JSXBase.HTMLAttributes<HTMLAppWordElement>;
            "stencil-header": LocalJSX.StencilHeader & JSXBase.HTMLAttributes<HTMLStencilHeaderElement>;
            "word-cloud": LocalJSX.WordCloud & JSXBase.HTMLAttributes<HTMLWordCloudElement>;
        }
    }
}
