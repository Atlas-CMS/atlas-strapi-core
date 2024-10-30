function initializeElectron() {
  console.log(`[Iliad] Electron connection ${window.electron ? '' : 'not '}found!`);

  if (window.electron) {
    window.bridge.emit('log', 'connected');

    window.addEventListener('DOMContentLoaded', () => {
      console.log('Renderer is fully loaded, signaling to main process');
      window.bridge.emit('rendererReady');
    });

    window.bridge.on('registerClickListener', (id) => {
      console.log('registerClickListener', { id });
      const el = document.getElementById(id);
      if (!el) {
        console.error(`Element with id ${id} not found`);
        return;
      }
      el.addEventListener('click', () => {
        window.bridge.emit('domElementClicked', id);
        console.log('click');
      });
    });

    window.bridge.on('updateBodyAttribute', ({ key, value }) => {
      console.log('updateBodyAttribute', { key, value });
      document.body.setAttribute(key, value);
    });

    window.bridge.on('triggerVersionInjection', () => {
      console.log('triggerVersionInjection');
      let vNo = window?.atlasConfig?.version;
      console.log({ vNo });

      if (vNo) {
        const dropzoneEl = document.getElementById('atlas-version-dropzone');
        if (!dropzoneEl) {
          console.error('Element with id atlas-version-dropzone not found');
          return;
        }
        dropzoneEl.innerText = `${vNo}`;
      }

      // As a side-effect, fix the theme
      localStorage.setItem('theme', 'light');
    });

    window.bridge.on('injectHTML', (payload) => {
      console.log('injectHTML', { payload });
      const { querySelector, html } = payload;

      let el = document.documentElement;
      console.log({ el });

      if (querySelector) {
        el = document?.querySelector(querySelector) || el;
      }

      console.log({ el });

      el.insertAdjacentHTML('beforeend', html);
    });
  }
}

export default initializeElectron;
export { initializeElectron };
