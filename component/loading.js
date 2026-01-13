function loading(isLoading, text = '', containerId = 'message') {
    const container = document.getElementById(containerId);
    const loadingId = 'loading-indicator';

    if (isLoading) {
        let loader = document.getElementById(loadingId);
        if (!loader) {
            loader = document.createElement('div');
            loader.id = loadingId;
            loader.textContent = text;
            container.appendChild(loader);
        }
    } 
    else {
        const loader = document.getElementById(loadingId);
        if (loader) {
            loader.remove();
        }
    }
}
