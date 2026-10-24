// Predefined sample data (illustrative prices in Indian Rupees, NOT real-time).
// hotel = standard room per night, food = per person per day, transport = round trip per person by bus.
const DESTINATIONS = [
  { id:"ooty", name:"Ooty", state:"Tamil Nadu", category:"Hill Station", emoji:"🌄", colors:["#2f855a","#9ae6b4"], hotel:2200, food:600, transport:1400, days:3,
    desc:"The 'Queen of Hill Stations' with tea gardens, lakes and misty views.",
    activities:[["Botanical Garden","Stroll through terraced gardens."],["Ooty Lake boating","Relaxed boat ride."],["Nilgiri Mountain Railway","Scenic toy train ride."],["Doddabetta Peak","Highest viewpoint in the Nilgiris."],["Tea Factory visit","See how tea is made."],["Pykara Falls","Short nature trip."]] },
  { id:"kodaikanal", name:"Kodaikanal", state:"Tamil Nadu", category:"Hill Station", emoji:"🌲", colors:["#2b6cb0","#90cdf4"], hotel:2000, food:550, transport:1300, days:3,
    desc:"A calm star-shaped lake town surrounded by pine forests.",
    activities:[["Kodai Lake","Cycle or boat around the lake."],["Coaker's Walk","Cliffside valley views."],["Pillar Rocks","Giant granite pillars."],["Guna Caves","Famous forest caves."],["Bryant Park","Flower garden walk."],["Pine Forest","Peaceful photo spot."]] },
  { id:"goa", name:"Goa", state:"Goa", category:"Beach", emoji:"🏖️", colors:["#dd6b20","#fbd38d"], hotel:3200, food:900, transport:2600, days:4,
    desc:"Sun, sand, seafood and lively nightlife on the west coast.",
    activities:[["Baga Beach","Relax and try water sports."],["Fort Aguada","Old Portuguese fort."],["Old Goa churches","Heritage walk."],["Dudhsagar Falls","Day trip to a big waterfall."],["Sunset at Chapora","Quiet sunset viewpoint."],["Flea market","Shopping and street food."]] },
  { id:"kochi", name:"Kochi", state:"Kerala", category:"City", emoji:"⛵", colors:["#319795","#81e6d9"], hotel:2600, food:700, transport:1800, days:3,
    desc:"A historic port city known for Chinese fishing nets and backwaters.",
    activities:[["Fort Kochi walk","Colonial streets and cafes."],["Chinese fishing nets","Iconic seafront."],["Mattancherry Palace","Murals and history."],["Kathakali show","Traditional dance."],["Backwater cruise","Slow boat ride."],["Local seafood dinner","Try Kerala cuisine."]] },
  { id:"munnar", name:"Munnar", state:"Kerala", category:"Nature", emoji:"🍃", colors:["#38a169","#c6f6d5"], hotel:2400, food:600, transport:1700, days:3,
    desc:"Rolling tea estates, waterfalls and cool mountain air.",
    activities:[["Tea plantation walk","Walk between tea bushes."],["Eravikulam National Park","See Nilgiri tahr."],["Mattupetty Dam","Boating and views."],["Top Station","Panoramic viewpoint."],["Attukal Waterfalls","Easy waterfall visit."],["Spice garden","Learn about spices."]] },
  { id:"jaipur", name:"Jaipur", state:"Rajasthan", category:"City", emoji:"🏰", colors:["#c05621","#feb2b2"], hotel:2800, food:700, transport:2400, days:3,
    desc:"The Pink City of palaces, forts and colourful bazaars.",
    activities:[["Amber Fort","Hilltop fort and palace."],["City Palace","Royal museum."],["Hawa Mahal","The palace of winds."],["Jantar Mantar","Ancient observatory."],["Johari Bazaar","Jewellery and crafts."],["Nahargarh sunset","City view at dusk."]] },
  { id:"manali", name:"Manali", state:"Himachal Pradesh", category:"Hill Station", emoji:"🏔️", colors:["#4a5568","#bee3f8"], hotel:2500, food:650, transport:3200, days:4,
    desc:"Snowy mountains, adventure sports and the Beas river valley.",
    activities:[["Solang Valley","Paragliding and snow fun."],["Hadimba Temple","Wooden temple in the forest."],["Old Manali cafes","Relaxed cafe hopping."],["Jogini Falls","Trek to a waterfall."],["Mall Road","Shopping and snacks."],["Rohtang Pass","Snow point (seasonal)."]] },
  { id:"bengaluru", name:"Bengaluru", state:"Karnataka", category:"City", emoji:"🌆", colors:["#6b46c1","#d6bcfa"], hotel:3000, food:800, transport:900, days:2,
    desc:"India's garden city and tech hub with great food and parks.",
    activities:[["Lalbagh Garden","Famous botanical garden."],["Cubbon Park","Green city escape."],["Bangalore Palace","Tudor-style palace."],["VV Puram food street","Local street food."],["Nandi Hills sunrise","Early morning day trip."],["Brewery or cafe visit","Relax in the evening."]] }
];

// Multipliers used by the budget calculator (clearly shown to the user)
const TRANSPORT_MULT = { bus:1, train:1.3, car:2, flight:4 };
const HOTEL_MULT = { budget:0.6, standard:1, premium:2 };
