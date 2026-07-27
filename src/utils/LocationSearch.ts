type SearchResult = {
  id: string;
  displayName: {
    text: string;
  };
  timeZone?: {
    id: string;
  };
};

export async function LocationSearch(
  placeName: string,
): Promise<SearchResult[]> {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY!;
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.types,places.timeZone",
      },
      body: JSON.stringify({
        strictTypeFiltering: true,
        includedType: "locality",
        textQuery: placeName,
      }),
    },
  );
  const data = await response.json();
  return data?.places ?? [];
}
