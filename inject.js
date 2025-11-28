(() => {
    const version =
        window.next?.version ??
        null;

    window.postMessage(
        { type: "__NEXT_VERSION__", version },
        "*"
    );
})();
