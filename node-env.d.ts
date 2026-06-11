interface ImportMetaEnv {
  readonly GITHUB_REPOSITORY?: string
  readonly GITHUB_PAGES?: string
}

declare const process: {
  env: {
    GITHUB_REPOSITORY?: string
    GITHUB_PAGES?: string
  }
}
