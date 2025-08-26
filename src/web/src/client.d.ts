// This file contains TypeScript definitions for the client-side code.

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.jsx' {
    import { ComponentType } from 'react';
    const component: ComponentType<any>;
    export default component;
}

declare module '*.tsx' {
    import { ComponentType } from 'react';
    const component: ComponentType<any>;
    export default component;
}

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}