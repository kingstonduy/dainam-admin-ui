import { useLanguage } from "../context/LanguageProvider.jsx";
import { ROOMS, HOTEL } from "../data/rooms.js";

function formatVND(val) {
    if (!val) return "-";
    return Number(val).toLocaleString("vi-VN") + " VND";
}

// images prop is optional – if provided uses base64 (for export), otherwise falls back
export default function PricingCard({ prices, images, cardRef }) {
    const { t } = useLanguage();

    function imgSrc(room) {
        return images?.[room.id] || room.thumbnail;
    }

    function coverSrc() {
        return images?.cover || HOTEL.cover;
    }

    return (
        <div
            ref={cardRef}
            style={{
                width: "min(480px, 100%)",
                backgroundColor: "#ffffff",
                fontFamily: '"Segoe UI", Roboto, Arial, sans-serif',
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            }}
        >
            {/* Header with cover image */}
            <div
                style={{
                    position: "relative",
                    height: "140px",
                    overflow: "hidden",
                }}
            >
                <img
                    src={coverSrc()}
                    alt="Dainam Boutique"
                    crossOrigin="anonymous"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.65))",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        padding: "20px 16px 16px",
                    }}
                >
                    <p
                        style={{
                            color: "#f5d060",
                            fontSize: "10px",
                            letterSpacing: "3px",
                            textTransform: "uppercase",
                            margin: 0,
                        }}
                    >
                        {t.luxuryTag}
                    </p>
                    <p
                        style={{
                            color: "#ffffff",
                            fontSize: "22px",
                            fontWeight: "700",
                            margin: "4px 0 0",
                            letterSpacing: "1px",
                        }}
                    >
                        {t.hotelName}
                    </p>
                    <p
                        style={{
                            color: "rgba(255,255,255,0.85)",
                            fontSize: "11px",
                            margin: "6px 0 0",
                            letterSpacing: "3px",
                        }}
                    >
                        {t.priceListHeading}
                    </p>
                </div>
            </div>

            {/* Room rows */}
            <div style={{ backgroundColor: "#ffffff" }}>
                {ROOMS.map((room, i) => (
                    <div
                        key={room.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "11px 16px",
                            backgroundColor:
                                i % 2 === 0 ? "#ffffff" : "#f8faf8",
                            borderBottom: "1px solid #f0f0f0",
                        }}
                    >
                        <div
                            style={{
                                width: "72px",
                                height: "54px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                flexShrink: 0,
                            }}
                        >
                            <img
                                src={imgSrc(room)}
                                alt={room.name}
                                crossOrigin="anonymous"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p
                                style={{
                                    margin: 0,
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    color: "#1a1a1a",
                                }}
                            >
                                {room.name}
                            </p>
                            <p
                                style={{
                                    margin: "2px 0 0",
                                    fontSize: "11px",
                                    color: "#6b7280",
                                }}
                            >
                                {room.size} • {room.bed}
                            </p>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <p
                                style={{
                                    margin: 0,
                                    fontWeight: "700",
                                    fontSize: "15px",
                                    color: "#1e6220",
                                }}
                            >
                                {formatVND(prices[room.id])}
                            </p>
                            <p
                                style={{
                                    margin: "1px 0 0",
                                    fontSize: "10px",
                                    color: "#9ca3af",
                                }}
                            >
                                {t.perNight}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div style={{ backgroundColor: "#1e6220", padding: "14px 16px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "16px",
                        marginBottom: "8px",
                        flexWrap: "wrap",
                    }}
                >
                    {t.amenities.map((a) => (
                        <span
                            key={a}
                            style={{
                                color: "rgba(255,255,255,0.9)",
                                fontSize: "11px",
                            }}
                        >
                            {a}
                        </span>
                    ))}
                </div>
                <p
                    style={{
                        margin: 0,
                        textAlign: "center",
                        color: "rgba(255,255,255,0.65)",
                        fontSize: "10px",
                    }}
                >
                    Check-in: {HOTEL.checkin} | Check-out: {HOTEL.checkout} |{" "}
                    {HOTEL.website}
                </p>
            </div>
        </div>
    );
}
