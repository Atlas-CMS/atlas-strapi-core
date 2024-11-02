import AtlasConfig from '@atlas/design-system/utils/AtlasConfig';

// Extend window object with custom properties
declare global {
  interface Window {
    electron: any;
    bridge: {
      on: (event: string, callback: (...args: any[]) => void) => void;
      emit: (event: string, ...args: any[]) => void;
    };
    atlasConfig: AtlasConfig;
  }
}

export {};
