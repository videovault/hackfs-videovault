declare module "3box" {
  function create(provider: unknown): Promise<Box>;

  interface Box {
    auth: (arr, opts) => Promise<unknown>;
    openSpace: (spacename) => Promise<Space>;
    syncDone: unknown;
  }

  interface Space {
    private: {
      get: (key) => Promise<string | null>;
      set: (key, value) => Promise<unknown>;
    };
  }
}
