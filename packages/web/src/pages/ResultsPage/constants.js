import axios from "axios";

export const fetchDataForPreference = async (type, city) => {
  const radius = 48280.3;
  let query;
  switch (type) {
    case "nationalParks":
      query = `
          [out:json][timeout:25];
          (
            node["boundary"="national_park"](around:${radius},${city.latitude},${city.longitude});
            way["boundary"="national_park"](around:${radius},${city.latitude},${city.longitude});
            relation["boundary"="national_park"](around:${radius},${city.latitude},${city.longitude});
          );
          out center;`;
      break;
    case "botanicalGardens":
      query = `
          [out:json][timeout:25];
          (
            node["leisure"="garden"]["garden:type"="botanical"](around:${radius},${city.latitude},${city.longitude});
            way["leisure"="garden"]["garden:type"="botanical"](around:${radius},${city.latitude},${city.longitude});
            relation["leisure"="garden"]["garden:type"="botanical"](around:${radius},${city.latitude},${city.longitude});
          );
          out center;`;
      break;
    case "rivers":
      query = `
          [out:json][timeout:25];
          (
            node["waterway"="river"](around:${radius},${city.latitude},${city.longitude});
            way["waterway"="river"](around:${radius},${city.latitude},${city.longitude});
            relation["waterway"="river"](around:${radius},${city.latitude},${city.longitude});
          );
          out center;`;
      break;
    case "restaurants":
      query = `
        [out:json][timeout:25];
        (
            node["amenity"="restaurant"](around:${radius},${city.latitude},${city.longitude});
            way["amenity"="restaurant"](around:${radius},${city.latitude},${city.longitude});
            relation["amenity"="restaurant"](around:${radius},${city.latitude},${city.longitude});
        );
        out center;`;
      break;
    case "bars":
      query = `
        [out:json][timeout:25];
        (
            node["amenity"="bar"](around:${radius},${city.latitude},${city.longitude});
            way["amenity"="bar"](around:${radius},${city.latitude},${city.longitude});
            relation["amenity"="bar"](around:${radius},${city.latitude},${city.longitude});
        );
        out center;`;
      break;
    case "mountains":
      query = `
        [out:json][timeout:25];
        (
            node["natural"="peak"](around:${radius},${city.latitude},${city.longitude});
            way["natural"="peak"](around:${radius},${city.latitude},${city.longitude});
            relation["natural"="peak"](around:${radius},${city.latitude},${city.longitude});
        );
        out center;`;
      break;
    case "hikingTrails":
      query = `
        [out:json][timeout:25];
        (
            way["highway"="path"]["sac_scale"](around:${radius},${city.latitude},${city.longitude});
            relation["route"="hiking"](around:${radius},${city.latitude},${city.longitude});
        );
        out center;`;
      break;
    case "caves":
      query = `
      [out:json][timeout:25];
      (
            node["natural"="cave_entrance"](around:${radius},${city.latitude},${city.longitude});
            way["natural"="cave_entrance"](around:${radius},${city.latitude},${city.longitude});
            relation["natural"="cave_entrance"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "monuments":
      query = `
      [out:json][timeout:25];
      (
        node["historic"="monument"](around:${radius},${city.latitude},${city.longitude});
        way["historic"="monument"](around:${radius},${city.latitude},${city.longitude});
        relation["historic"="monument"](around:${radius},${city.latitude},${city.longitude});
        node["tourism"="attraction"](around:${radius},${city.latitude},${city.longitude});
        way["tourism"="attraction"](around:${radius},${city.latitude},${city.longitude});
        relation["tourism"="attraction"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "archaeologicalSites":
      query = `
      [out:json][timeout:25];
      (
        node["historic"="archaeological_site"](around:${radius},${city.latitude},${city.longitude});
        way["historic"="archaeological_site"](around:${radius},${city.latitude},${city.longitude});
        relation["historic"="archaeological_site"](around:${radius},${city.latitude},${city.longitude});
        node["historic"="yes"](around:${radius},${city.latitude},${city.longitude});
        way["historic"="yes"](around:${radius},${city.latitude},${city.longitude});
        relation["historic"="yes"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "museums":
      query = `
      [out:json][timeout:25];
      (
        node["tourism"="museum"](around:${radius},${city.latitude},${city.longitude});
        way["tourism"="museum"](around:${radius},${city.latitude},${city.longitude});
        relation["tourism"="museum"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "waterfalls":
      query = `
      [out:json][timeout:25];
      (
        node["waterway"="waterfall"](around:${radius},${city.latitude},${city.longitude});
        way["waterway"="waterfall"](around:${radius},${city.latitude},${city.longitude});
        relation["waterway"="waterfall"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "beaches":
      query = `
    [out:json][timeout:25];
    (
      node["natural"="beach"](around:${radius},${city.latitude},${city.longitude});
      way["natural"="beach"](around:${radius},${city.latitude},${city.longitude});
      relation["natural"="beach"](around:${radius},${city.latitude},${city.longitude});
    );
    out center;`;
      break;
    case "lakes":
      query = `
    [out:json][timeout:25];
    (
      node["natural"="water"]["water"="lake"](around:${radius},${city.latitude},${city.longitude});
      way["natural"="water"]["water"="lake"](around:${radius},${city.latitude},${city.longitude});
      relation["natural"="water"]["water"="lake"](around:${radius},${city.latitude},${city.longitude});
    );
    out center;`;
      break;
    case "forests":
      query = `
      [out:json][timeout:25];
      (
        node["landuse"="forest"](around:${radius},${city.latitude},${city.longitude});
        way["landuse"="forest"](around:${radius},${city.latitude},${city.longitude});
        relation["landuse"="forest"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "nightClubs":
      query = `
    [out:json][timeout:25];
    (
      node["amenity"="nightclub"](around:${radius},${city.latitude},${city.longitude});
      way["amenity"="nightclub"](around:${radius},${city.latitude},${city.longitude});
      relation["amenity"="nightclub"](around:${radius},${city.latitude},${city.longitude});
    );
    out center;`;
      break;
    case "skiResorts":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="sports_centre"]["sport"="skiing"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="sports_centre"]["sport"="skiing"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="sports_centre"]["sport"="skiing"](around:${radius},${city.latitude},${city.longitude});

        node["landuse"="winter_sports"](around:${radius},${city.latitude},${city.longitude});
        way["landuse"="winter_sports"](around:${radius},${city.latitude},${city.longitude});
        relation["landuse"="winter_sports"](around:${radius},${city.latitude},${city.longitude});

        way["piste:type"="downhill"](around:${radius},${city.latitude},${city.longitude});
        relation["piste:type"="downhill"](around:${radius},${city.latitude},${city.longitude});
        
      );
      out center;`;
      break;
    case "snowshoeTrails":
      query = `
      [out:json][timeout:25];
      (
        way["piste:type"="hike"]["piste:grooming"="backcountry"](around:${radius},${city.latitude},${city.longitude});
        relation["piste:type"="hike"]["piste:grooming"="backcountry"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "indoorSportsCentres":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="sports_centre"]["sport"="multi"]["building"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="sports_centre"]["sport"="multi"]["building"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="sports_centre"]["sport"="multi"]["building"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "indoorSwimmingFacilities":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="sports_centre"]["sport"="swimming"]["building"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="sports_centre"]["sport"="swimming"]["building"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="sports_centre"]["sport"="swimming"]["building"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "indoorTennisCentres":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="sports_centre"]["sport"="tennis"]["building"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="sports_centre"]["sport"="tennis"]["building"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="sports_centre"]["sport"="tennis"]["building"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "outdoorTennisCentres":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="sports_centre"]["sport"="tennis"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="sports_centre"]["sport"="tennis"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="sports_centre"]["sport"="tennis"](around:${radius},${city.latitude},${city.longitude});
        node["leisure"="pitch"]["sport"="tennis"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="pitch"]["sport"="tennis"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="pitch"]["sport"="tennis"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "indoorClimbingCentres":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="sports_centre"]["sport"="climbing"]["building"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="sports_centre"]["sport"="climbing"]["building"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="sports_centre"]["sport"="climbing"]["building"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "indoorSoccerCentres":
      query = `
          [out:json][timeout:25];
          (
            node["leisure"="sports_centre"]["sport"="soccer"](around:${radius},${city.latitude},${city.longitude});
            way["leisure"="sports_centre"]["sport"="soccer"](around:${radius},${city.latitude},${city.longitude});
            relation["leisure"="sports_centre"]["sport"="soccer"](around:${radius},${city.latitude},${city.longitude});
            node["leisure"="pitch"]["sport"="soccer"](around:${radius},${city.latitude},${city.longitude});
            way["leisure"="pitch"]["sport"="soccer"](around:${radius},${city.latitude},${city.longitude});
            relation["leisure"="pitch"]["sport"="soccer"](around:${radius},${city.latitude},${city.longitude});
          );
          out center;`;
      break;
    case "crossCountrySkiAreas":
      query = `
      [out:json][timeout:25];
      (
        way["piste:type"="nordic"](around:${radius},${city.latitude},${city.longitude});
        relation["piste:type"="nordic"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "outdoorRockClimbing":
      query = `
      [out:json][timeout:25];
      (
        node["sport"="climbing"](around:${radius},${city.latitude},${city.longitude});
        way["sport"="climbing"](around:${radius},${city.latitude},${city.longitude});
        relation["sport"="climbing"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "zoos":
      query = `
      [out:json][timeout:25];
      (
        node["tourism"="zoo"](around:${radius},${city.latitude},${city.longitude});
        way["tourism"="zoo"](around:${radius},${city.latitude},${city.longitude});
        relation["tourism"="zoo"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "wildlifeReserves":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="nature_reserve"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="nature_reserve"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="nature_reserve"](around:${radius},${city.latitude},${city.longitude});
        node["boundary"="protected_area"](around:${radius},${city.latitude},${city.longitude});
        way["boundary"="protected_area"](around:${radius},${city.latitude},${city.longitude});
        relation["boundary"="protected_area"](around:${radius},${city.latitude},${city.longitude});
        node["landuse"="conservation"](around:${radius},${city.latitude},${city.longitude});
        way["landuse"="conservation"](around:${radius},${city.latitude},${city.longitude});
        relation["landuse"="conservation"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "artGalleries":
      query = `
      [out:json][timeout:25];
      (
        node["tourism"="art_gallery"](around:${radius},${city.latitude},${city.longitude});
        way["tourism"="art_gallery"](around:${radius},${city.latitude},${city.longitude});
        relation["tourism"="art_gallery"](around:${radius},${city.latitude},${city.longitude});
        node["shop"="art"](around:${radius},${city.latitude},${city.longitude});
        way["shop"="art"](around:${radius},${city.latitude},${city.longitude});
        relation["shop"="art"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "aquariums":
      query = `
      [out:json][timeout:25];
      (
        node["tourism"="aquarium"](around:${radius},${city.latitude},${city.longitude});
        way["tourism"="aquarium"](around:${radius},${city.latitude},${city.longitude});
        relation["tourism"="aquarium"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "parks":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="park"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="park"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="park"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "bicycleTrails":
      query = `
      [out:json][timeout:25];
      (
        way["highway"="cycleway"](around:${radius},${city.latitude},${city.longitude});
        relation["route"="bicycle"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "musicVenues":
      query = `
      [out:json][timeout:25];
      (
        node["amenity"="music_venue"](around:${radius},${city.latitude},${city.longitude});
        way["amenity"="music_venue"](around:${radius},${city.latitude},${city.longitude});
        relation["amenity"="music_venue"](around:${radius},${city.latitude},${city.longitude});
        node["tourism"="festival_grounds"](around:${radius},${city.latitude},${city.longitude});
        way["tourism"="festival_grounds"](around:${radius},${city.latitude},${city.longitude});
        relation["tourism"="festival_grounds"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "farmersMarkets":
      query = `
      [out:json][timeout:25];
      (
        node["amenity"="marketplace"]["market:type"="farmers"](around:${radius},${city.latitude},${city.longitude});
        way["amenity"="marketplace"]["market:type"="farmers"](around:${radius},${city.latitude},${city.longitude});
        relation["amenity"="marketplace"]["market:type"="farmers"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "golfCourses":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="golf_course"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="golf_course"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="golf_course"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "spasAndWellnessCenters":
      query = `
      [out:json][timeout:25];
      (
        node["amenity"="spa"](around:${radius},${city.latitude},${city.longitude});
        way["amenity"="spa"](around:${radius},${city.latitude},${city.longitude});
        relation["amenity"="spa"](around:${radius},${city.latitude},${city.longitude});
        node["leisure"="spa"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="spa"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="spa"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "vineyards":
      query = `
      [out:json][timeout:25];
      (
        node["landuse"="vineyard"](around:${radius},${city.latitude},${city.longitude});
        way["landuse"="vineyard"](around:${radius},${city.latitude},${city.longitude});
        relation["landuse"="vineyard"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "escapeRooms":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="escape_game"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="escape_game"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="escape_game"](around:${radius},${city.latitude},${city.longitude});
        node["amenity"="escape_room"](around:${radius},${city.latitude},${city.longitude});
        way["amenity"="escape_room"](around:${radius},${city.latitude},${city.longitude});
        relation["amenity"="escape_room"](around:${radius},${city.latitude},${city.longitude});
        node["tourism"="attraction"](around:${radius},${city.latitude},${city.longitude});
        way["tourism"="attraction"](around:${radius},${city.latitude},${city.longitude});
        relation["tourism"="attraction"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "hotAirBalloonRides":
      query = `
      [out:json][timeout:25];
      (
        node["sport"="hot_air_balloon"](around:${radius},${city.latitude},${city.longitude});
        way["sport"="hot_air_balloon"](around:${radius},${city.latitude},${city.longitude});
        relation["sport"="hot_air_balloon"](around:${radius},${city.latitude},${city.longitude});
        node["tourism"="attraction"]["attraction"="hot_air_balloon"](around:${radius},${city.latitude},${city.longitude});
        way["tourism"="attraction"]["attraction"="hot_air_balloon"](around:${radius},${city.latitude},${city.longitude});
        relation["tourism"="attraction"]["attraction"="hot_air_balloon"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "birdWatching":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="bird_hide"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="bird_hide"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="bird_hide"](around:${radius},${city.latitude},${city.longitude});
        node["natural"="wetland"](around:${radius},${city.latitude},${city.longitude});
        way["natural"="wetland"](around:${radius},${city.latitude},${city.longitude});
        relation["natural"="wetland"](around:${radius},${city.latitude},${city.longitude});
        node["landuse"="conservation"](around:${radius},${city.latitude},${city.longitude});
        way["landuse"="conservation"](around:${radius},${city.latitude},${city.longitude});
        relation["landuse"="conservation"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "artStudios":
      query = `
      [out:json][timeout:25];
      (
        node["amenity"="studio"]["studio"="art"](around:${radius},${city.latitude},${city.longitude});
        way["amenity"="studio"]["studio"="art"](around:${radius},${city.latitude},${city.longitude});
        relation["amenity"="studio"]["studio"="art"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "yogaStudios":
      query = `
      [out:json][timeout:25];
      (
        node["amenity"="studio"]["studio"="yoga"](around:${radius},${city.latitude},${city.longitude});
        way["amenity"="studio"]["studio"="yoga"](around:${radius},${city.latitude},${city.longitude});
        relation["amenity"="studio"]["studio"="yoga"](around:${radius},${city.latitude},${city.longitude});
        node["leisure"="fitness_centre"]["sport"="yoga"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="fitness_centre"]["sport"="yoga"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="fitness_centre"]["sport"="yoga"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "fitnessGyms":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="fitness_centre"]["sport"="fitness"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="fitness_centre"]["sport"="fitness"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="fitness_centre"]["sport"="fitness"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "danceStudios":
      query = `
      [out:json][timeout:25];
      (
        node["amenity"="studio"]["studio"="dance"](around:${radius},${city.latitude},${city.longitude});
        way["amenity"="studio"]["studio"="dance"](around:${radius},${city.latitude},${city.longitude});
        relation["amenity"="studio"]["studio"="dance"](around:${radius},${city.latitude},${city.longitude});
        node["leisure"="dance"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="dance"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="dance"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "raceCourses":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="sports_centre"]["sport"="horse_racing"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="sports_centre"]["sport"="horse_racing"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="sports_centre"]["sport"="horse_racing"](around:${radius},${city.latitude},${city.longitude});
        node["leisure"="track"]["sport"="horse_racing"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="track"]["sport"="horse_racing"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="track"]["sport"="horse_racing"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "indoorSwimmingPoolFacilities":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="sports_centre"]["sport"="swimming"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="sports_centre"]["sport"="swimming"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="sports_centre"]["sport"="swimming"](around:${radius},${city.latitude},${city.longitude});
        node["leisure"="swimming_pool"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="swimming_pool"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="swimming_pool"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "shoppingCenters":
      query = `
      [out:json][timeout:25];
      (
        node["shop"="mall"](around:${radius},${city.latitude},${city.longitude});
        way["shop"="mall"](around:${radius},${city.latitude},${city.longitude});
        relation["shop"="mall"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "amusementParks":
      query = `
      [out:json][timeout:25];
      (
        node["leisure"="amusement_park"](around:${radius},${city.latitude},${city.longitude});
        way["leisure"="amusement_park"](around:${radius},${city.latitude},${city.longitude});
        relation["leisure"="amusement_park"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "telescopeObservatories":
      query = `
      [out:json][timeout:25];
      (
        node["man_made"="observatory"](around:${radius},${city.latitude},${city.longitude});
        way["man_made"="observatory"](around:${radius},${city.latitude},${city.longitude});
        relation["man_made"="observatory"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    case "planetariums":
      query = `
      [out:json][timeout:25];
      (
        node["amenity"="planetarium"](around:${radius},${city.latitude},${city.longitude});
        way["amenity"="planetarium"](around:${radius},${city.latitude},${city.longitude});
        relation["amenity"="planetarium"](around:${radius},${city.latitude},${city.longitude});
      );
      out center;`;
      break;
    default:
      query = "";
  }

  try {
    const response = await axios.post(
      "http://overpass-api.de/api/interpreter",
      query
    );
    return response.data.elements;
  } catch (error) {
    console.error(`Error fetching data for ${type}:`, error);
    return [];
  }
};
