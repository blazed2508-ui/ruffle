// Patch createUnityInstance to capture Module.FS before Unity hides it
(function() {
  const _orig = window.createUnityInstance;
  window.createUnityInstance = function(canvas, config, onProgress) {
    // Intercept the Module config to grab FS after mount
    const origPreRun = config.preRun || [];
    config.preRun = [
      ...origPreRun,
      function() {
        window.__unityModule = this;
      }
    ];
    config.postRun = [
      ...(config.postRun || []),
      function() {
        window.__unityModule = this;
        window.__unityFS = this.FS;
        console.log("[SavePatch] FS captured:", Object.keys(this.FS || {}).slice(0,5));
      }
    ];
    return _orig(canvas, config, onProgress);
  };
})();
