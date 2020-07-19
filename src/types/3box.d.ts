declare module "3box" {
  function create(provider: unknown): Promise<Box>;

  interface Box {
    auth: (spaceNames, opts) => Promise<unknown>;
    openSpace: (spacename) => Promise<Space>;
    syncDone: unknown;
    public: {
      get: (key) => Promise<string>;
      set: (key, value) => Promise<unknown>;
      all: () => T;
    };
  }

  interface Space {
    private: {
      get: (key) => Promise<string | null>;
      set: (key, value) => Promise<unknown>;
    };
  }
}
