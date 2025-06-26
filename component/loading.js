let loading = (isLoading, message, id) => {
    const parent = document.getElementById(id);
    if (!parent) {
        console.error("Error: Parent element not found");
        return;
    }

    let existing = document.getElementById("loading-message");

    if (isLoading) {
        if (!existing) {
            const loader = document.createElement("div");
            loader.id = "loading-message";
            loader.innerHTML = `<h1>${message}</h1>`;
            parent.appendChild(loader);
        }
    } else {
        if (existing) {
            existing.remove();
        }
    }
}