const localModules = import.meta.glob('./listening.local.js', { eager: true });
const local = Object.values(localModules)[0];

export const listeningTests = local?.listeningTests || [];
