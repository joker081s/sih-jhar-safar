export const JharkhandTemples = {
  type: "FeatureCollection",
  features: [
    // 1. Baba Baidyanath Dham (Deoghar) — Jyotirlinga
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.700053, 24.492565] },
      properties: {
        name: "Baba Baidyanath Dham (Baidyanath Temple)",
        district: "Deoghar",
        description:
          "One of the twelve Jyotirlingas (Shiva). Major pilgrimage site, especially during Shravan.",
        source: "FindLatitudeAndLongitude / Wikipedia",
        src: "/attractions/image1.jpeg",
      },
    },

    // 2. Basukinath Dham (Basukinath)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [87.056706, 24.392816] },
      properties: {
        name: "Basukinath Dham",
        district: "Dumka/Deoghar region",
        description:
          "Important Shiva temple visited together with Baidyanath by many pilgrims.",
        source: "Basukinath entries (Wikipedia / mapping pages)",
        src: "/attractions/image2.jpeg",
      },
    },

    // 3. Parasnath / Shikharji (Jain Tirtha) — Parasnath Hill (Giridih)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.132013, 23.961203] },
      properties: {
        name: "Parasnath / Shikharji (Parasnath Hill)",
        district: "Giridih",
        description:
          "Highest hill in Jharkhand; Shikharji is a major Jain tirtha where many Tirthankaras attained moksha.",
        source: "Parasnath / Shikharji (Wikipedia / mapping)",
        src: "/attractions/image3.jpeg",
      },
    },

    // 4. Chhinnamastika Temple, Rajrappa (Ramgarh)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [85.71111, 23.63194] },
      properties: {
        name: "Chhinnamastika Temple (Rajrappa)",
        district: "Ramgarh",
        description:
          "Famous Shakti temple at the confluence of Damodar & Bhera rivers near Rajrappa Falls.",
        source: "Chhinnamasta Temple / Rajrappa (Wikipedia)",
        src: "/attractions/image4.jpeg",
      },
    },

    // 5. Jagannath Temple, Ranchi
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [85.281562, 23.316807] },
      properties: {
        name: "Jagannath Temple, Ranchi",
        district: "Ranchi",
        description:
          "17th-century temple in Ranchi, modeled after Puri's Jagannath Temple; famous Rath Yatra.",
        source: "Jagannath Temple Ranchi (mapping / Wikipedia)",
        src: "/attractions/image5.jpeg",
      },
    },

    // 6. Pahari Mandir (Ranchi hill-top Shiva temple)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [85.310686, 23.375384] },
      properties: {
        name: "Pahari Mandir (Hill Temple), Ranchi",
        district: "Ranchi",
        description:
          "Hill-top Shiva temple offering city views; important for Shivratri celebrations.",
        source: "Pahari Mandir (Ranchi district / Wikipedia)",
        src: "/attractions/image6.jpeg",
      },
    },

    // 7. Maa Dewri (Dewri / Deori Mandir) — Tamar / Ranchi region (approx)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [85.2200, 23.02] },
      properties: {
        name: "Maa Dewri Mandir (Deori / Dewri)",
        district: "Ranchi (Tamar)",
        description:
          "Ancient temple dedicated to Maa Dewri (16-armed form), popular local pilgrimage spot (site lists coordinates as village Diuri/Tamar).",
        approximate: true,
        source: "Maa Dewri Mandir (official/about pages, mapping references)",
        src: "/attractions/image7.jpeg",
      },
    },

    // 8. Sun Temple, Bundu (Surya Mandir)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [85.709542, 23.632650] },
      properties: {
        name: "Surya (Sun) Temple, Bundu",
        district: "Ranchi / Bundu area",
        description:
          "Sun Temple near Bundu (Ranchi–Tata Road) built in chariot style — local tourist/spiritual spot.",
        approximate: true,
        source: "Local mapping references / tourism pages",
        src: "/attractions/image7.jpeg",
      },
    },

    // 9. Harihar Dham, Bagodar (Giridih region)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.3000, 24.1333] },
      properties: {
        name: "Harihar Dham (Bagodar)",
        district: "Giridih / Bagodar area",
        description:
          "Large Shiva linga and temple complex at Bagodar; important regional shrine.",
        approximate: true,
        source: "Tourism / local references",
        src: "/attractions/image1.jpeg",  
      },
    },

    // 10. Bindudham (Binduwasni Mandir), Sahibganj (approx)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [87.6500, 25.2667] },
      properties: {
        name: "Bindudham (Binduwasni Mandir), Sahibganj",
        district: "Sahibganj",
        description:
          "Shakti temple atop Binduwasni Hill, local pilgrimage site with scenic views.",
        approximate: true,
        source: "Bindudham / local wiki references",
        src: "/attractions/image1.jpeg",
      },
    },

    // 11. Maluti Temples (Maluti village, Dumka) — terracotta complex
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [87.5100, 24.2300] },
      properties: {
        name: "Maluti Temples (terracotta temple complex)",
        district: "Dumka (Maluti)",
        description:
          "Cluster of terracotta temples (17th–19th century) in Maluti village — heritage site.",
        approximate: true,
        source: "Maluti Temples (Wikipedia / tourism)",
        src: "/attractions/image1.jpeg",
      },
    },

    // 12. Naulakha Temple, Deoghar (Deoghar area)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.6950, 24.4920] },
      properties: {
        name: "Naulakha Temple (Deoghar)",
        district: "Deoghar",
        description: "Ancient/important temple in Deoghar town area (near main Baidyanath complex).",
        approximate: true,
        source: "Local heritage references / Wikimedia commons",
        src: "/attractions/image1.jpeg",
      },
    },

    // 13. Laxminarayan (Birla) Temple, Jamshedpur
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.1836, 22.8046] },
      properties: {
        name: "Laxminarayan (Birla) Temple, Jamshedpur",
        district: "East Singhbhum (Jamshedpur)",
        description:
          "Birla-style temple in Jamshedpur, often called Laxminarayan or Birla Mandir; popular city attraction.",
        source: "Jamshedpur temple references / local mapping",
        src: "/attractions/image1.jpeg",
      },
    },

    // 14. Amreshwar Dham (Amreshwar Dham is in Jharkhand category)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [84.9395, 24.0590] },
      properties: {
        name: "Amreshwar Dham",
        district: "Palamu / nearby (listed in Jharkhand temples category)",
        description:
          "Notable Shiva temple (listed in regional temple catalogs). Verify exact placement for production use.",
        approximate: true,
        source: "Category pages / district tourism (Wikipedia category of temples)",
        src: "/attractions/image1.jpeg",
      },
    },

    // 15. Trikuta Parvata / local hill temples (popular pilgrimage area)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.1500, 23.9500] },
      properties: {
        name: "Trikuta Parvata / local temple area",
        district: "Region: East / central Jharkhand",
        description:
          "General entry for notable hill-temple clusters — coordinate is illustrative, replace with specific temple if needed.",
        approximate: true,
        source: "TripAdvisor / regional tourism lists",
        src: "/attractions/image1.jpeg",
      },
    },

    // 16. Hariharnath / local large Shiva temples (example)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.4304, 23.7957] },
      properties: {
        name: "Dhanbad area notable Shiva temple (representative)",
        district: "Dhanbad",
        description:
          "Dhanbad region has several large Shiva temples — use this as anchor if you want cluster of Dhanbad temples.",
        approximate: true,
        source: "Local tourism pages (Dhanbad)",
        src: "/attractions/image1.jpeg",
      },
    },

    // 17. Surajkund / Sun-temple style entries near tourist spots (representative)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [85.5600, 23.1800] },
      properties: {
        name: "Sun/Special local temple (Bundu region / Ranchi)",
        district: "Ranchi / Bundu",
        description:
          "Representative Sun Temple / Surya Mandir site near Bundu — verify precise coordinates for production.",
        approximate: true,
        source: "Regional tourism pages",
        src: "/attractions/image1.jpeg",
      },
    },

    // 18. Harihar Kshetra / local iconic temple in Giridih
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.3006, 24.1842] },
      properties: {
        name: "Harihar Dham (Giridih / Bagodar approximate)",
        district: "Giridih",
        description:
          "Notable temple complex with large linga and pilgrimage facilities. (verify exact coordinate in local sources)",
        approximate: true,
        source: "Local tourism / articles",
        src: "/attractions/image1.jpeg",
      },
    },

    // 19. Bindeshwari / local temples in Sahibganj / Godda area (representative)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [87.2094, 24.8333] },
      properties: {
        name: "Bindeshwari / regional temple (Godda / Sahibganj area)",
        district: "Godda / Sahibganj",
        description:
          "Representative point for several regional temples — replace with exact temple entry if you require.",
        approximate: true,
        source: "District tourism pages",
        src: "/attractions/image1.jpeg",
      },
    },

    // 20. Nareshwar / regional shrine (Koderma region representative)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [85.5167, 24.4667] },
      properties: {
        name: "Koderma area temple (representative)",
        district: "Koderma",
        description:
          "Koderma is famous for mica and has temples/shrines around — coordinate is representative.",
        approximate: true,
        source: "Tourism/region references",
        src: "/attractions/image1.jpeg",
      },
    },

    // 21. Trimbakeshwar / local temple (Bokaro / Bokaro Steel Region example)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.1511, 23.6693] },
      properties: {
        name: "Bokaro region notable temple (representative)",
        district: "Bokaro",
        description:
          "Bokaro Steel City area has several important temples; this is a representative anchor point.",
        approximate: true,
        source: "Bokaro tourism / local pages",
        src: "/attractions/image1.jpeg",
    },
    },

    // 22. Radha Krishna Temple (Giridih town / Deogarh area)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.3000, 24.1833] },
      properties: {
        name: "Radha Krishna / local temple (Giridih area)",
        district: "Giridih",
        description:
          "Representative entry for important Giridih temples; use exact coordinates if desired.",
        approximate: true,
        source: "General mapping / tourism",
        src: "/attractions/image1.jpeg",
      },
    },

    // 23. Maa Kaali / regional temples (Latehar / Palamu region)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [84.0897, 24.0790] },
      properties: {
        name: "Palamu / Latehar region shrine (representative)",
        district: "Palamu / Latehar",
        description:
          "Palamu has historic forts and temples like Amreshwar — coordinate is district anchor.",
        approximate: true,
        source: "Palamu tourism",
        src: "/attractions/image1.jpeg",
      },
    },

    // 24. Raghunathji / Deoghar peripheral temples
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.7020, 24.4890] },
      properties: {
        name: "Deoghar regional temple (peripheral)",
        district: "Deoghar",
        description:
          "Peripheral temple point near the Baidyanath complex (use precise placemarks for production).",
        approximate: true,
        source: "Deoghar mapping references",
        src: "/attractions/image1.jpeg",
      },
    },

    // 25. Triveni / temples near Sahibganj / Pakur (representative)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [87.8470, 24.6390] },
      properties: {
        name: "Pakur / Sahibganj area temple (representative)",
        district: "Pakur / Sahibganj",
        description:
          "Representative anchor for temples in Pakur/Sahibganj area (e.g., Bindudham nearby).",
        approximate: true,
        source: "Regional pages",
        src: "/attractions/image1.jpeg",
      },
    },

    // 26. Nareshwar / small temple cluster (Jamtara area)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.8000, 23.9500] },
      properties: {
        name: "Jamtara area temple (representative)",
        district: "Jamtara",
        description:
          "Regional temple anchor for Jamtara district (approx coordinate).",
        approximate: true,
        source: "District tourism / mapping",
        src: "/attractions/image1.jpeg",
      },
    },

    // 27. Rajrappa Hill / Rajdhanwar (another Rajrappa approximate)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [85.71111, 23.63194] },
      properties: {
        name: "Rajrappa (falls & Chhinnamastika Temple) — duplicate anchor",
        district: "Ramgarh",
        description:
          "Rajrappa is a major pilgrimage & picnic spot (Chhinnamasta temple near Damodar).",
        source: "Rajrappa / Chhinnamastika (Wikipedia)",
        src: "/attractions/image1.jpeg",
      },
    },

    // 28. Maa Kaali temple — Ramgarh / Bokaro area
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [85.5167, 23.6333] },
      properties: {
        name: "Ramgarh / local Kaali temple (representative)",
        district: "Ramgarh",
        description:
          "Ramgarh district has Chhinnamasta and other notable shrines; this is a representative point.",
        approximate: true,
        source: "Regional tourism pages",
        src: "/attractions/image1.jpeg",
      },
    },

    // 29. Maa Kali / Deoghar satellite (representative)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.6950, 24.4950] },
      properties: {
        name: "Deoghar satellite temple (representative)",
        district: "Deoghar",
        description:
          "Peripheral Deoghar temple point — replace with specific temple coords when required.",
        approximate: true,
        source: "Wikimedia / local maps",
        src: "/attractions/image1.jpeg",
      },
    },

    // 30. Trimbakeshwar / specialty temple (representative)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [85.5953, 22.5700] },
      properties: {
        name: "West Singhbhum area temple (representative)",
        district: "West Singhbhum",
        description:
          "Representative anchor for Shrines in West Singhbhum (iron-ore forest area, Saranda region).",
        approximate: true,
        source: "Regional tourism references",
        src: "/attractions/image1.jpeg",
      },
    },

    // 31. Maa Kali / Godda region (representative)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [87.2094, 24.8333] },
      properties: {
        name: "Godda / regional temple (representative)",
        district: "Godda",
        description:
          "Temple anchor for Godda district (coal / power projects region has pilgrimage spots).",
        approximate: true,
        source: "District pages",
        src: "/attractions/image1.jpeg",
      },
    },

    // 32. Jagannath temple (aux) / other city temple in Hazaribagh
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [85.3720, 23.9966] },
      properties: {
        name: "Hazaribagh temple (local notable)",
        district: "Hazaribagh",
        description:
          "Hazaribagh Wildlife Sanctuary & temples nearby; anchor point used for clustering.",
        approximate: true,
        source: "Hazaribagh tourism pages",
        src: "/attractions/image1.jpeg",
      },
    },

    // 33. Parasnath base / Madhuban (approach to Shikharji) — useful for pilgrim mapping
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [86.1167, 23.9500] },
      properties: {
        name: "Madhuban (Parasnath base / Shikharji approach)",
        district: "Giridih",
        description:
          "Madhuban is the pilgrim base for Shikharji (many dharamshalas and trekking start points).",
        source: "Shikharji / Parasnath info pages",
        src: "/attractions/image1.jpeg",    
    },
    },

    // 34. Additional notable temple: Trikuta / region cluster near Dumka (representative)
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [87.2680, 24.2686] },
      properties: {
        name: "Dumka region temple (representative / Maluti cluster nearby)",
        district: "Dumka",
        description:
          "Dumka region includes Maluti and other Hindu temples and shrines; use for clustering.",
        source: "Dumka tourism / Maluti",
        src: "/attractions/image1.jpeg",

      },
    }
  ],
};
