const urlCache = {};

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

async function fetchBase64(url) {
    if (urlCache[url] !== undefined) return urlCache[url];
    // Store the promise itself so concurrent callers await the same fetch
    urlCache[url] = (async () => {
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            return await blobToBase64(blob);
        } catch {
            return null;
        }
    })();
    return urlCache[url];
}

export async function loadImagesAsBase64(entries) {
    const pairs = await Promise.all(
        entries.map(async ({ id, url }) => [id, await fetchBase64(url)])
    );
    return Object.fromEntries(pairs);
}
