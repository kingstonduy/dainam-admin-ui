const BASE =
    "https://raw.githubusercontent.com/kingstonduy/dainam-boutique/master";

export const ROOMS = [
    {
        id: "deluxe",
        name: "Deluxe Room",
        size: "22-24 m²",
        bed: "Double/Twin Bed",
        thumbnail: `${BASE}/images/rooms/deluxe/thumbnail.jpg`,
    },
    {
        id: "deluxeTriple",
        name: "Deluxe Triple Room",
        size: "25-27 m²",
        bed: "Double/Twin Bed",
        thumbnail: `${BASE}/images/rooms/deluxeTriple/thumbnail.jpg`,
    },
    {
        id: "executive",
        name: "Executive Room",
        size: "25-27 m²",
        bed: "Double/Twin Bed",
        thumbnail: `${BASE}/images/rooms/executive/thumbnail.jpg`,
    },
    {
        id: "signature",
        name: "Signature Room",
        size: "28-30 m²",
        bed: "Double/Twin Bed",
        thumbnail: `${BASE}/images/rooms/signature/thumbnail.jpg`,
    },
    {
        id: "suite",
        name: "Suite Room",
        size: "30-35 m²",
        bed: "King Bed",
        thumbnail: `${BASE}/images/rooms/suite/thumbnail.jpg`,
    },
];

export const HOTEL = {
    name: "Dainam Boutique Hotel",
    cover: `${BASE}/images/cover.jpg`,
    checkin: "14:00",
    checkout: "12:00",
    amenities: ["WiFi miễn phí", "Bữa sáng", "Bãi đậu xe máy", "Điện thoại"],
    website: "www.dainamhotels.com.vn",
};
