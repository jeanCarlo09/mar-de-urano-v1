import { useEffect, useState } from "react";


export const WebpIsSupported = async (bitmap, setSupportedWebp) => {

    if (bitmap) {
        return;
    }

    // Base64 representation of a white point image
    const webpData =
        "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=";

    // Retrieve the Image in Blob Format
    const blob = await fetch(webpData).then(r => r.blob());

    // createImageBitmap method succeeds, return true, otherwise false
    return createImageBitmap(blob).then(() => setSupportedWebp(true), () => setSupportedWebp(false));
}