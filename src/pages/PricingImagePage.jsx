import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import html2canvas from "html2canvas";
import { loadImagesAsBase64 } from "../utils/imageLoader.js";
import RoomInputCard from "../components/RoomInputCard.jsx";
import PricingCard from "../components/PricingCard.jsx";
import { useLanguage } from "../context/LanguageProvider.jsx";
import { ROOMS, HOTEL } from "../data/rooms.js";
import VN from "country-flag-icons/react/3x2/VN";
import US from "country-flag-icons/react/3x2/US";

const BASE_ID = "deluxe";
/* Offsets per room over Deluxe base price (in VND) */
const PRICE_OFFSETS = {
    executive: 200000,
    signature: 400000,
    suite: 600000,
    deluxeTriple: 600000,
};

const NON_BASE_IDS = Object.keys(PRICE_OFFSETS);
const INITIAL_PRICES = Object.fromEntries(ROOMS.map((r) => [r.id, ""]));

export default function PricingImagePage() {
    const { lang, toggleLang, t } = useLanguage();
    const [prices, setPrices] = useState(INITIAL_PRICES);
    // tracks which non-base rooms are still auto-calculated (not manually overridden)
    const [autoIds, setAutoIds] = useState(new Set(NON_BASE_IDS));
    const [exporting, setExporting] = useState(false);
    const [copying, setCopying] = useState(false);
    const [copied, setCopied] = useState(false);
    const [exportImages, setExportImages] = useState(null);
    const exportCardRef = useRef(null);

    useEffect(() => {
        const entries = [
            { id: "cover", url: HOTEL.cover },
            ...ROOMS.map((r) => ({ id: r.id, url: r.thumbnail })),
        ];
        loadImagesAsBase64(entries);
    }, []);

    function handlePriceChange(id, value) {
        if (id === BASE_ID) {
            const base = parseInt(value) || 0;
            const newPrices = { [BASE_ID]: value };
            Object.entries(PRICE_OFFSETS).forEach(([rid, offset]) => {
                newPrices[rid] = base > 0 ? String(base + offset) : "";
            });
            setPrices(newPrices);
            // restore all non-base rooms to auto when deluxe changes
            setAutoIds(new Set(NON_BASE_IDS));
        } else {
            setPrices((prev) => ({ ...prev, [id]: value }));
            // mark this room as manually overridden
            setAutoIds((prev) => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        }
    }

    async function exportImage(mode) {
        setExporting(true);

        const entries = [
            { id: "cover", url: HOTEL.cover },
            ...ROOMS.map((r) => ({ id: r.id, url: r.thumbnail })),
        ];

        if (mode === "copy") {
            setCopying(true);
            // Register ClipboardItem with a deferred Promise immediately so the
            // browser preserves user-gesture activation while blob generates.
            const blobPromise = (async () => {
                try {
                    const base64 = await loadImagesAsBase64(entries);
                    flushSync(() => setExportImages(base64));
                    const canvas = await html2canvas(exportCardRef.current, {
                        scale: 2,
                        useCORS: true,
                        backgroundColor: "#ffffff",
                        logging: false,
                    });
                    return await new Promise((resolve, reject) =>
                        canvas.toBlob(
                            (b) =>
                                b
                                    ? resolve(b)
                                    : reject(new Error("toBlob returned null")),
                            "image/png"
                        )
                    );
                } finally {
                    setExportImages(null);
                }
            })();

            try {
                await navigator.clipboard.write([
                    new ClipboardItem({ "image/png": blobPromise }),
                ]);
                await blobPromise;
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
            } catch (err) {
                console.error("Copy failed:", err);
                // Fallback: download instead
                try {
                    const blob = await blobPromise;
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.download = "dainam-pricing.png";
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);
                } catch {
                    // blobPromise already failed, nothing to do
                }
            } finally {
                setCopying(false);
                setExporting(false);
            }
        } else {
            try {
                const base64 = await loadImagesAsBase64(entries);
                flushSync(() => setExportImages(base64));
                const canvas = await html2canvas(exportCardRef.current, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff",
                    logging: false,
                });
                const link = document.createElement("a");
                link.download = "dainam-pricing.jpg";
                link.href = canvas.toDataURL("image/jpeg", 0.95);
                link.click();
            } finally {
                setExportImages(null);
                setExporting(false);
            }
        }
    }

    function clearPrices() {
        setPrices(INITIAL_PRICES);
        setAutoIds(new Set(NON_BASE_IDS));
    }

    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-0">
                {t.pageTitle}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{t.pageDesc}</p>

            <div className="flex flex-col md:flex-row gap-6 items-start mt-6">
                {/* Left panel - inputs */}
                <div className="w-full md:w-80 md:shrink-0 space-y-3">
                    {/* Section header: label + language toggle + clear */}
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex-1">
                            {t.roomPrices}
                        </p>
                        {/* Language toggle - right next to prices so admin never forgets */}
                        <button
                            onClick={toggleLang}
                            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors border"
                            style={{
                                borderColor: "#1e6220",
                                color: "#1e6220",
                                backgroundColor: "rgba(30,98,32,0.06)",
                            }}
                            title={
                                lang === "vi"
                                    ? "Switch to English"
                                    : "Chuyển sang Tiếng Việt"
                            }
                        >
                            {lang === "vi" ? (
                                <VN className="w-5 h-auto rounded-sm" />
                            ) : (
                                <US className="w-5 h-auto rounded-sm" />
                            )}
                            <span>{lang === "vi" ? "VI" : "EN"}</span>
                        </button>
                        <button
                            onClick={clearPrices}
                            className="text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer ml-3"
                        >
                            {t.clearAll}
                        </button>
                    </div>

                    {ROOMS.map((room) => (
                        <RoomInputCard
                            key={room.id}
                            room={room}
                            price={prices[room.id]}
                            isBase={room.id === BASE_ID}
                            isAuto={autoIds.has(room.id)}
                            onChange={handlePriceChange}
                        />
                    ))}
                </div>

                {/* Right panel - live preview + export */}
                <div className="flex-1 flex flex-col items-center gap-4 min-w-0 w-full h-[1000px]">
                    <div className="w-full flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                            {t.preview}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => exportImage("copy")}
                                disabled={exporting}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-300 cursor-pointer disabled:cursor-not-allowed
                                    ${
                                        copied
                                            ? "border-green-400 bg-green-50 text-green-700 scale-105"
                                            : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-50"
                                    }`}
                            >
                                {copying && !copied ? (
                                    <>
                                        <svg
                                            className="animate-spin h-4 w-4 flex-shrink-0"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        <span>{t.copying}</span>
                                    </>
                                ) : copied ? (
                                    <>
                                        <svg
                                            className="h-4 w-4 flex-shrink-0"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>{t.copied}</span>
                                    </>
                                ) : (
                                    <span>{t.copyBtn}</span>
                                )}
                            </button>
                            <button
                                onClick={() => exportImage("download")}
                                disabled={exporting}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-50 cursor-pointer"
                                style={{
                                    backgroundColor: exporting
                                        ? "#4a9650"
                                        : "#1e6220",
                                }}
                            >
                                {exporting ? t.exporting : t.downloadBtn}
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-4 md:p-6 w-full h-200 flex justify-center overflow-auto">
                        <PricingCard prices={prices} />
                    </div>

                    <p className="text-xs text-gray-400 text-center">
                        {t.exportNote}
                    </p>
                </div>
            </div>

            {exportImages && (
                <div
                    style={{
                        position: "absolute",
                        top: -9999,
                        left: -9999,
                        pointerEvents: "none",
                    }}
                >
                    <PricingCard
                        prices={prices}
                        images={exportImages}
                        cardRef={exportCardRef}
                    />
                </div>
            )}
        </div>
    );
}
