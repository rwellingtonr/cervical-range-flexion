interface ImportMetaEnv {
    readonly VITE_BACK_END: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
