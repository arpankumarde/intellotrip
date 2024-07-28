const con = require("../config/db.config");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

exports.state = async (req, res) => {
  const { place } = req.body;

  // Validate request
  if (!place) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Check if place is in west bengal
  const genAI = new GoogleGenerativeAI(process.env.GCP_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(
    `You are an expert travel guide. You're work is to Answer in true or false whther the ${place} is in West Bengal or not. Your answer should not contain any disclainmer or pretext and should strictly maintain JSON format {wb: true/false, lat: value, lon:value, nearestRailStn: '', nearestRailStnCode: '', nearestAirport: '', nearestAirportCode: ''}.`
  );
  const response = await result?.response;
  const data = response.text();

  return res.json({ data });
};

exports.hotspot = async (req, res) => {
  const { lat, lon } = req.body;

  // Validate request
  if (!lat || !lon) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // fetch all the hotspot locations from the database
  con.query(`SELECT * FROM hotspots`, async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Error fetching hotspots",
      });
    }

    // find the distance between the user's location and the hotspot
    const hotspots = results.map((hotspot) => {
      const distance = Math.sqrt(
        Math.pow(hotspot.latitude - lat, 2) +
          Math.pow(hotspot.longitude - lon, 2)
      );

      return { ...hotspot, distance };
    });

    hotspots.forEach((hotspot) => {
      hotspot.distance = parseFloat(hotspot.distance.toFixed(2));
    });

    hotspots.sort((a, b) => a.distance - b.distance);

    return res.json({ hotspots });
  });
};

// find the distances between hotspot and the tourist locations
exports.distance = async (req, res) => {
  const { hotspot_id } = req.body;

  // Validate request
  if (!hotspot_id) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  query = `SELECT b.name, b.latitude, b.longitude, c.name as hotspot, a.distance FROM distances a, tourist_spots b, hotspots c WHERE a.hotspot_id = c.id AND c.id = ${hotspot_id} AND a.tourist_spot_id = b.id`;
  con.query(query, async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Error fetching distances",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GCP_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(
      `You are a tour itinerary planner. Your task is to generate a detailed daily itinerary for a tour in JSON format without any pretext or disclaimer. The itinerary should be based on the provided starting location, which is ${results[0]?.hotspot}, and an array of available tourist spots with their distances from the starting location (hotspot). The JSON format should strictly follow the structure provided below. Each day, tourists should check into a new hotel and visit 2 to 3 tourist spots. Ensure that the schedule is realistic and enjoyable. Make sure the farthest place of the route is scheduled to be be visited first and then on the way back to hotel, other nearby spots can be covered. Input Data: Starting Location (Hotspot) and Tourist Spots allowed & distance from hotspots: ${results} Output: {"itinerary":[{"day":1,"title":"Arrival&CulturalImmersion","description":"ExploretheheartofKolkata,startingwithitsiconiclandmarksandvibrantculture.","tourist_spots":[{"name":"VictoriaMemorial","description":"Admirethemajesticarchitectureandlearnaboutcolonialhistory.","price":"INR20","time":"2hours"},{"name":"St.Paul'sCathedral","description":"Visitthishistoricchurchandappreciateitsgothicdesign.","price":"Free","time":"1hour"},{"name":"IndianMuseum","description":"ExploreavastcollectionofartifactsshowcasingIndia'srichculturalheritage.","price":"INR10","time":"3hours"}],"food":[{"name":"ParkStreet","description":"ExperienceKolkata'svibrantnightlifewithawiderangeofrestaurantsandbars.","price":"INR500-1000","time":"Dinner"}],"hotels":[{"name":"TheOberoiGrand","checkInTime":"","checkOutTime":"","price":"INR8000-10000pernight","rating":"5stars","description":"Aluxuriousheritagehotelknownforitsimpeccableserviceandelegantambience."}]},{"day":2,"title":"Calcutta'sSoul:Temples&Markets","description":"DiveintothespiritualityandbustlingmarketplacesthatdefineKolkata.","tourist_spots":[{"name":"KalighatKaliTemple","description":"ExperiencethepowerfulenergyofthissacredtemplededicatedtothegoddessKali.","price":"Free","time":"1hour"},{"name":"DakshineswarKaliTemple","description":"VisitthispicturesquetempleonthebanksoftheGanges.","price":"Free","time":"2hours"},{"name":"CollegeStreetBookMarket","description":"Exploreavibrantmarketplaceofferingawidearrayofbooksandstationery.","price":"Free","time":"2hours"}],"food":[{"name":"Oh!Calcutta","description":"EnjoyauthenticBengalicuisineatthispopularrestaurant.","price":"INR500-1000","time":"Lunch"}],"hotels":[{"name":"TheOberoiGrand","checkInTime":"","checkOutTime":"","price":"INR8000-10000pernight","rating":"5stars","description":"Aluxuriousheritagehotelknownforitsimpeccableserviceandelegantambience."}]},{"day":3,"title":"AGlimpseofColonialHistory","description":"Journeybackintimethrougharchitecturalmarvelsandcolonialremnants.","tourist_spots":[{"name":"FortWilliam","description":"ExplorethehistoricfortandlearnaboutitsroleincolonialIndia.","price":"INR10","time":"2hours"},{"name":"Writers'Building","description":"AdmirethecolonialarchitectureanditsassociationwiththeBritishEastIndiaCompany.","price":"Free","time":"1hour"},{"name":"HowrahBridge","description":"Walkortakeaferryacrossthisiconicbridgeforstunningviewsofthecity.","price":"Free(Ferry:INR5-10)","time":"1hour"}],"food":[{"name":"6BallygungePlace","description":"IndulgeinfinediningwithamoderntwistontraditionalBengalicuisine.","price":"INR1000-1500","time":"Dinner"}],"hotels":[{"name":"TheOberoiGrand","checkInTime":"","checkOutTime":"","price":"INR8000-10000pernight","rating":"5stars","description":"Aluxuriousheritagehotelknownforitsimpeccableserviceandelegantambience."}]},{"day":4,"title":"Art&Culture","description":"ImmerseyourselfinKolkata'sthrivingartisticsceneandculturalheritage.","tourist_spots":[{"name":"AcademyofFineArts","description":"ExplorethelargestartgalleryinEasternIndia.","price":"INR10","time":"2hours"},{"name":"BirlaPlanetarium","description":"Experienceimmersiveshowsaboutspaceandastronomy.","price":"INR60-100","time":"1hour"},{"name":"NationalLibraryofIndia","description":"Exploreavastcollectionofbooksanddocuments.","price":"Free","time":"2hours"}],"food":[{"name":"Arsalan","description":"Enjoydeliciousstreetfoodlikebiryaniandkebabs.","price":"INR200-500","time":"Lunch"}],"hotels":[{"name":"TheOberoiGrand","checkInTime":"","checkOutTime":"","price":"INR8000-10000pernight","rating":"5stars","description":"Aluxuriousheritagehotelknownforitsimpeccableserviceandelegantambience."}]},{"day":5,"title":"Farewell&Departure","description":"ExperiencethetranquilityofaserenegardenandsavorthelastmomentsinKolkata.","tourist_spots":[{"name":"BotanicalGarden","description":"Enjoyapeacefulwalkamidstbeautifulfloraandfauna.","price":"INR20","time":"2hours"},{"name":"ShoppingatNewMarket","description":"Finduniquesouvenirsandlocalcraftsatthisbustlingmarket.","price":"Varies","time":"2hours"}],"food":[{"name":"Flurys","description":"Enjoyaclassicafternoonteaexperienceatthisiconiccafe.","price":"INR500-1000","time":"AfternoonTea"}],"hotels":[{"name":"TheOberoiGrand","checkInTime":"","checkOutTime":"","price":"INR8000-10000pernight","rating":"5stars","description":"Aluxuriousheritagehotelknownforitsimpeccableserviceandelegantambience."}]}],"budget":"INR7000-8000(estimated)"}`
    );
    const response = await result?.response;
    const data = response.text();

    return res.json({ data });
    // axios
    //   .post(
    //     "https://api.groq.com/openai/v1/chat/completions",
    //     {
    //       messages: [
    //         {
    //           role: "system",
    //           content: `You are a tour itinerary planner. Your task is to generate a detailed daily itinerary for a tour in JSON format. The itinerary should be based on the provided starting location, and an array of available tourist spots with their distances from the starting location (hotspot). The JSON format should strictly follow the structure provided below. Each day, tourists should check into a new hotel and visit 2 to 3 tourist spots. Ensure that the schedule is realistic and enjoyable. Make sure the farthest place of the route is scheduled to be be visited first and then on the way back to hotel, other nearby spots can be covered. Input Data: Start Date, End Date, Starting Location (Hotspot) and Tourist Spots. {'itinerary':[{'day':1,'title':'Arrival & Cultural Immersion','description':'Explore the heart of Kolkata, starting with its iconic landmarks and vibrant culture.','tourist_spots':[{'name':'Victoria Memorial','description':'Admire the majestic architecture and learn about colonial history.','price':'INR 20','time':'2 hours'},{'name':'St. Paul's Cathedral','description':'Visit this historic church and appreciate its gothic design.','price':'Free','time':'1 hour'},{'name':'Indian Museum','description':'Explore a vast collection of artifacts showcasing India's rich cultural heritage.','price':'INR 10','time':'3 hours'}],'food':[{'name':'Park Street','description':'Experience Kolkata's vibrant nightlife with a wide range of restaurants and bars.','price':'INR 500-1000','time':'Dinner'}],'hotels':[{'name':'The Oberoi Grand','checkInTime':'','checkOutTime':'','price':'INR 8000-10000 per night','rating':'5 stars','description':'A luxurious heritage hotel known for its impeccable service and elegant ambience.'}]},{'day':2,'title':'Calcutta's Soul: Temples & Markets','description':'Dive into the spirituality and bustling marketplaces that define Kolkata.','tourist_spots':[{'name':'Kalighat Kali Temple','description':'Experience the powerful energy of this sacred temple dedicated to the goddess Kali.','price':'Free','time':'1 hour'},{'name':'Dakshineswar Kali Temple','description':'Visit this picturesque temple on the banks of the Ganges.','price':'Free','time':'2 hours'},{'name':'College Street Book Market','description':'Explore a vibrant marketplace offering a wide array of books and stationery.','price':'Free','time':'2 hours'}],'food':[{'name':'Oh! Calcutta','description':'Enjoy authentic Bengali cuisine at this popular restaurant.','price':'INR 500-1000','time':'Lunch'}],'hotels':[{'name':'The Oberoi Grand','checkInTime':'','checkOutTime':'','price':'INR 8000-10000 per night','rating':'5 stars','description':'A luxurious heritage hotel known for its impeccable service and elegant ambience.'}]},{'day':3,'title':'A Glimpse of Colonial History','description':'Journey back in time through architectural marvels and colonial remnants.','tourist_spots':[{'name':'Fort William','description':'Explore the historic fort and learn about its role in colonial India.','price':'INR 10','time':'2 hours'},{'name':'Writers' Building','description':'Admire the colonial architecture and its association with the British East India Company.','price':'Free','time':'1 hour'},{'name':'Howrah Bridge','description':'Walk or take a ferry across this iconic bridge for stunning views of the city.','price':'Free (Ferry: INR 5-10)','time':'1 hour'}],'food':[{'name':'6 Ballygunge Place','description':'Indulge in fine dining with a modern twist on traditional Bengali cuisine.','price':'INR 1000-1500','time':'Dinner'}],'hotels':[{'name':'The Oberoi Grand','checkInTime':'','checkOutTime':'','price':'INR 8000-10000 per night','rating':'5 stars','description':'A luxurious heritage hotel known for its impeccable service and elegant ambience.'}]},{'day':4,'title':'Art & Culture','description':'Immerse yourself in Kolkata's thriving artistic scene and cultural heritage.','tourist_spots':[{'name':'Academy of Fine Arts','description':'Explore the largest art gallery in Eastern India.','price':'INR 10','time':'2 hours'},{'name':'Birla Planetarium','description':'Experience immersive shows about space and astronomy.','price':'INR 60-100','time':'1 hour'},{'name':'National Library of India','description':'Explore a vast collection of books and documents.','price':'Free','time':'2 hours'}],'food':[{'name':'Arsalan','description':'Enjoy delicious street food like biryani and kebabs.','price':'INR 200-500','time':'Lunch'}],'hotels':[{'name':'The Oberoi Grand','checkInTime':'','checkOutTime':'','price':'INR 8000-10000 per night','rating':'5 stars','description':'A luxurious heritage hotel known for its impeccable service and elegant ambience.'}]},{'day':5,'title':'Farewell & Departure','description':'Experience the tranquility of a serene garden and savor the last moments in Kolkata.','tourist_spots':[{'name':'Botanical Garden','description':'Enjoy a peaceful walk amidst beautiful flora and fauna.','price':'INR 20','time':'2 hours'},{'name':'Shopping at New Market','description':'Find unique souvenirs and local crafts at this bustling market.','price':'Varies','time':'2 hours'}],'food':[{'name':'Flurys','description':'Enjoy a classic afternoon tea experience at this iconic cafe.','price':'INR 500-1000','time':'Afternoon Tea'}],'hotels':[{'name':'The Oberoi Grand','checkInTime':'','checkOutTime':'','price':'INR 8000-10000 per night','rating':'5 stars','description':'A luxurious heritage hotel known for its impeccable service and elegant ambience.'}]}],'budget':'INR 7000-8000 (estimated)'}`,
    //         },
    //         {
    //           role: "user",
    //           content: `Generate a detailed daily itinerary for a tour. Starting location: ${results[0]?.hotspot}. The allowed tourist spots are: ${results}.`,
    //         },
    //       ],
    //       model: "llama3-8b-8192",
    //       response_format: { type: "json_object" },
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     const data = res?.data?.choices[0]?.message?.content;
    //     return res.json({ data });
    //   })
    //   .catch((err) => {
    //     console.log(err?.response);
    //     return res.status(500).send({
    //       message: "Error fetching data",
    //     });
    //   });

    // return res.json({ results });
  });
};

exports.save = async (req, res) => {
  const { itinerary } = req.body;

  // Validate request
  if (!itinerary) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  con.query(
    "INSERT INTO itineraries SET ?",
    { itinerary: JSON.stringify(itinerary) },
    async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Error saving itinerary",
        });
      }

      return res.json({ results });
    }
  );
};

exports.fetch = async (req, res) => {
  const { id } = req.body;

  // Validate request
  if (!id) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  con.query(
    `SELECT * FROM itineraries WHERE id = ${id}`,
    async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Error fetching itinerary",
        });
      }

      return res.json({ results });
    }
  );
};
