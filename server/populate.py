import math


# Haversine formula to calculate the distance between two points on the Earth's surface
def haversine(lat1, lon1, lat2, lon2):
    R = 6371.0  # Radius of the Earth in kilometers
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return distance


# Hotspots data
hotspots = [
    (1, "Siliguri", 26.7271, 88.3953),
    (2, "Darjeeling", 27.0360, 88.2627),
    (3, "Kalimpong", 27.0683, 88.4652),
    (4, "Mirik", 26.8900, 88.1900),
    (5, "Jalpaiguri", 26.5435, 88.7201),
    (6, "Cooch Behar", 26.3220, 89.4511),
    (7, "Dooars", 26.8500, 89.5000),
    (8, "Kurseong", 26.8825, 88.2767),
]

# Tourist spots data
tourist_spots = [
    (1, "Tiger Hill", 26.9949, 88.2783),
    (2, "Batasia Loop", 27.0167, 88.2426),
    (3, "Padmaja Naidu Himalayan Zoological Park", 27.0466, 88.2633),
    (4, "Peace Pagoda", 27.0609, 88.2543),
    (5, "Sandakphu", 27.1194, 87.9855),
    (6, "Mirik Lake", 26.8898, 88.1873),
    (7, "Mahananda Wildlife Sanctuary", 26.7284, 88.4640),
    (8, "Gorumara National Park", 26.7081, 88.7695),
    (9, "Cooch Behar Palace", 26.3245, 89.4457),
    (10, "Neora Valley National Park", 27.0417, 88.6556),
    (11, "Ravangla", 27.3106, 88.3546),
    (12, "Lava", 27.0848, 88.6555),
    (13, "Lolegaon", 27.0098, 88.6813),
    (14, "Jaldapara National Park", 26.6940, 89.3068),
    (15, "Buxa Fort", 26.6993, 89.5668),
]

# Generating SQL insert statements for the distances table
insert_statements = []

for hotspot in hotspots:
    for tourist_spot in tourist_spots:
        distance = haversine(hotspot[2], hotspot[3], tourist_spot[2], tourist_spot[3])
        insert_statements.append(
            f"INSERT INTO distances (hotspot_id, tourist_spot_id, distance) VALUES ({hotspot[0]}, {tourist_spot[0]}, {distance:.2f});"
        )

# Output the insert statements
for statement in insert_statements:
    print(statement)
