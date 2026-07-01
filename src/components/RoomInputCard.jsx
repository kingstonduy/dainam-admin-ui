import { useLanguage } from "../context/LanguageProvider.jsx";

export default function RoomInputCard({
    room,
    price,
    isBase,
    isAuto,
    onChange,
}) {
    const { t } = useLanguage();

    function handleChange(e) {
        const raw = e.target.value.replace(/\D/g, "");
        onChange(room.id, raw);
    }

    function formatDisplay(val) {
        if (!val) return "";
        return Number(val).toLocaleString("vi-VN");
    }

    return (
        <div
            className="bg-white rounded-xl border p-4 flex gap-4 items-center shadow-sm"
            style={{
                borderColor: isBase ? "#1e6220" : "#e5e7eb",
                borderWidth: isBase ? "2px" : "1px",
            }}
        >
            <img
                src={room.thumbnail}
                alt={room.name}
                className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                crossOrigin="anonymous"
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-gray-900 text-sm truncate">
                        {room.name}
                    </p>
                    {isBase && (
                        <span
                            className="text-xs px-1.5 py-0.5 rounded-md font-semibold flex-shrink-0"
                            style={{
                                backgroundColor: "#1e6220",
                                color: "#fff",
                            }}
                        >
                            Base
                        </span>
                    )}
                    {isAuto && !isBase && (
                        <span className="text-xs px-1.5 py-0.5 rounded-md font-semibold flex-shrink-0 bg-amber-100 text-amber-700">
                            Auto
                        </span>
                    )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                    {room.size} • {room.bed}
                </p>
                <div className="mt-2 flex items-center gap-1">
                    <input
                        type="text"
                        inputMode="numeric"
                        value={formatDisplay(price)}
                        onChange={handleChange}
                        placeholder={isBase ? t.pricePlaceholder : "—"}
                        className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                        style={{ fontWeight: isBase ? "600" : "400" }}
                    />
                    <span className="text-xs text-gray-500 flex-shrink-0">
                        VND
                    </span>
                </div>
            </div>
        </div>
    );
}
