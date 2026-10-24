

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



// TripWise main script. Beginner-friendly: plain JavaScript, no libraries.

const $ = id => document.getElementById(id);

const rupee = n => "₹" + Math.round(n).toLocaleString("en-IN");

const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

const find = id => DESTINATIONS.find(d => d.id === id);

const KEY = "tripwise_trips", THEME_KEY = "tripwise_theme";



let itinerary = {};      // { 1:[{name,desc}], 2:[...] }

let activeDay = 1;

let editingTripId = null; // id of the saved trip being edited (or null)

let editingAct = null;    // index of the activity being edited (or null)

let lastResult = null;    // last valid calculation



// ---------- helpers ----------

function toast(msg){ const t=$("toast"); t.textContent=msg; t.classList.remove("hidden"); clearTimeout(toast.t); toast.t=setTimeout(()=>t.classList.add("hidden"),2500); }

function loadTrips(){ try{ const d=JSON.parse(localStorage.getItem(KEY)); return Array.isArray(d)?d:[]; }catch(e){ return []; } } // safe if data is missing or corrupted

function storeTrips(t){ try{ localStorage.setItem(KEY, JSON.stringify(t)); return true; }catch(e){ toast("Could not save: browser storage unavailable."); return false; } }

function dayCost(d){ return d.hotel + d.food; }



// ---------- destinations ----------

function destCard(d){

  return `<div class="card dest" role="button" tabindex="0" aria-label="View ${d.name} details" data-id="${d.id}"><div class="pic" style="background:linear-gradient(135deg,${d.colors[0]},${d.colors[1]})">${d.emoji}</div>

  <div class="in"><h3>${d.name}</h3><span class="tag">${d.category}</span> <span class="muted">${d.state}</span>

  <p class="muted">${d.desc}</p><b>~${rupee(dayCost(d))}/day</b> <span class="muted">(stay + food)</span></div></div>`;

}

function renderDestinations(){

  const q=$("search").value.trim().toLowerCase(), cat=$("catFilter").value, sort=$("sort").value;

  let list = DESTINATIONS.filter(d => d.name.toLowerCase().includes(q) && (cat==="All"||d.category===cat));

  list.sort((a,b)=> sort==="cost" ? dayCost(a)-dayCost(b) : a.name.localeCompare(b.name));

  $("destGrid").innerHTML = list.length ? list.map(destCard).join("") : `<div class="empty">No destinations match your search.</div>`;

  document.querySelectorAll("#cats .chip").forEach(c=>c.classList.toggle("on", c.textContent===cat));

}

function openDestination(id){

  const d=find(id);

  $("mBody").innerHTML = `<div class="pic" style="background:linear-gradient(135deg,${d.colors[0]},${d.colors[1]});border-radius:10px">${d.emoji}</div>

   <h3 id="modalTitle">${d.name}, ${d.state}</h3><span class="tag">${d.category}</span><p>${d.desc}</p>

   <p><b>Stay:</b> ~${rupee(d.hotel)}/night (standard room) · <b>Food:</b> ~${rupee(d.food)}/day · <b>Suggested:</b> ${d.days} days</p>

   <b>Activities</b><ul>${d.activities.map(a=>`<li>${a[0]} — ${a[1]}</li>`).join("")}</ul>

   <p class="note">Sample estimates only.</p><button class="btn" id="selDest" data-id="${d.id}">Select for trip planning</button>`;

  $("modal").classList.remove("hidden");

}



// ---------- budget ----------

function daysBetween(a,b){ return Math.round((new Date(b)-new Date(a))/86400000); }

// Reads and validates the form. Returns {ok, data}. Shows messages under each field.

function readForm(showErrors){

  const f = {dest:$("dest").value, from:$("from").value.trim(), dep:$("dep").value, ret:$("ret").value,

    days:parseInt($("days").value), trav:parseInt($("trav").value), mode:$("mode").value, stay:$("stay").value,

    food:parseFloat($("food").value), act:parseFloat($("act").value)};

  const e = {};

  if(!f.dest) e.dest="Please select a destination.";

  if(!f.from) e.from="Starting city is required.";

  if(!(f.trav>=1)) e.trav="At least 1 traveler is required.";

  if(f.dep && f.ret){

    if(f.ret < f.dep) e.date="Return date cannot be earlier than departure date.";

    else f.days = daysBetween(f.dep,f.ret)+1; // inclusive: dep 1st, return 3rd = 3 days, 2 nights

  }

  if(!(f.days>=1) || f.days>60) e.days="Trip days must be between 1 and 60.";

  if(isNaN(f.food)||f.food<0) e.food="Food budget cannot be negative.";

  if(isNaN(f.act)||f.act<0) e.act="Activities budget cannot be negative.";

  if(showErrors){

    ["dest","from","date","days","trav","food","act"].forEach(k=>$("e-"+k).textContent=e[k]||"");

    ["dest","from","days","trav","food","act"].forEach(k=>$(k).classList.toggle("bad",!!e[k]));

  }

  return {ok:Object.keys(e).length===0, data:f};

}

function calculate(f){

  const d=find(f.dest), nights=Math.max(f.days-1,0), rooms=Math.ceil(f.trav/2); // 2 travelers per room

  const transport = d.transport*TRANSPORT_MULT[f.mode]*f.trav;

  const stay = d.hotel*HOTEL_MULT[f.stay]*rooms*nights;

  const food = f.food*f.trav*f.days, act = f.act*f.trav*f.days;

  const total = transport+stay+food+act;

  return {d, nights, rooms, transport, stay, food, act, total, perPerson: total/f.trav};

}

function renderResult(showErrors){

  const {ok,data}=readForm(showErrors);

  if(!ok){ lastResult=null; $("result").innerHTML=`<div class="empty">Fill in the form correctly to see your estimated budget.</div>`; return; }

  const r=calculate(data); lastResult={data,r};

  const row=(n,v)=>`<div>${n}: <b>${rupee(v)}</b> <span class="muted">(${Math.round(v/r.total*100||0)}%)</span></div><div class="bar"><i style="width:${v/r.total*100||0}%"></i></div>`;

  $("result").innerHTML = `<div class="muted">Estimated total for ${r.d.name}</div><div class="big-total">${rupee(r.total)}</div>

   <div>Per traveler: <b>${rupee(r.perPerson)}</b></div><hr>

   ${row("Transport",r.transport)}${row("Accommodation",r.stay)}${row("Food",r.food)}${row("Activities",r.act)}

   <p class="note">${data.days} days / ${r.nights} nights · ${r.rooms} room(s) (2 travelers per room, rounded up). Transport and hotel prices come from sample data × mode/stay multipliers. Illustrative estimates only.</p>`;

}



// ---------- itinerary ----------

function numDays(){ const n=parseInt($("days").value); return n>=1&&n<=60?n:1; }

function renderItinerary(){

  const n=numDays(); if(activeDay>n) activeDay=n;

  $("dayTabs").innerHTML = Array.from({length:n},(_,i)=>`<button class="chip ${i+1===activeDay?"on":""}" data-day="${i+1}">Day ${i+1}</button>`).join("");

  const list=itinerary[activeDay]||[];

  $("dayList").innerHTML = list.length ? list.map((a,i)=>`<div class="item"><div><b>${esc(a.name)}</b><br><span class="muted">${esc(a.desc||"")}</span></div>

    <div><button data-edit="${i}">✏️</button><button data-del="${i}">🗑</button></div></div>`).join("")

    : `<div class="empty">No activities for Day ${activeDay} yet. Add one below or generate a suggested itinerary.</div>`;

  $("aBtn").textContent = editingAct===null ? "Add activity" : "Update activity";

}

function suggestItinerary(){

  if(!$("dest").value){ toast("Select a destination first."); return; }

  const d=find($("dest").value), n=numDays(); itinerary={};

  for(let i=1;i<=n;i++){ itinerary[i]=[]; for(let k=0;k<2;k++){ const a=d.activities[((i-1)*2+k)%d.activities.length]; itinerary[i].push({name:a[0],desc:a[1]}); } }

  activeDay=1; renderItinerary(); toast("Suggested itinerary created.");

}



// ---------- saved trips ----------

function currentTrip(){

  const {ok,data}=readForm(true);

  if(!ok){ toast("Please fix the form errors first."); return null; }

  const r=calculate(data);

  return {id:editingTripId||Date.now(), form:data, total:r.total, itinerary:JSON.parse(JSON.stringify(itinerary))};

}

function saveTrip(){

  const t=currentTrip(); if(!t) return;

  let trips=loadTrips(); const i=trips.findIndex(x=>x.id===t.id);

  if(i>=0) trips[i]=t; else trips.push(t);

  if(storeTrips(trips)){ editingTripId=null; renderTrips(); toast(i>=0?"Trip updated!":"Trip saved!"); }

}

function renderTrips(){

  const trips=loadTrips();

  $("tripGrid").innerHTML = trips.length ? trips.map(t=>{ const d=find(t.form.dest); if(!d) return "";

    return `<div class="card pad"><h3>${d.emoji} ${d.name}</h3><p class="muted">${t.form.dep||"Dates flexible"} · ${t.form.days} days · ${t.form.trav} traveler(s)</p>

    <b>${rupee(t.total)}</b><div class="row" style="margin-top:10px"><button class="btn" data-view="${t.id}">View</button><button class="btn ghost" data-editt="${t.id}">Edit</button><button class="btn danger" data-deltrip="${t.id}">Delete</button></div></div>`; }).join("")

    : `<div class="empty">No saved trips yet. Plan a trip and click “Save current trip”.</div>`;

}

function summaryText(t){

  const d=find(t.form.dest), r=calculate(t.form);

  let s=`TRIPWISE TRIP SUMMARY\n=====================\nDestination: ${d.name}, ${d.state}\nFrom: ${t.form.from}\nDates: ${t.form.dep||"-"} to ${t.form.ret||"-"} (${t.form.days} days)\nTravelers: ${t.form.trav}\nTransport: ${t.form.mode} | Stay: ${t.form.stay}\n\n`+

  `Transport: ${rupee(r.transport)}\nAccommodation: ${rupee(r.stay)}\nFood: ${rupee(r.food)}\nActivities: ${rupee(r.act)}\nTOTAL: ${rupee(r.total)} (${rupee(r.perPerson)} per traveler)\n\nITINERARY\n`;

  Object.keys(t.itinerary).forEach(day=>{ s+=`Day ${day}:\n`; t.itinerary[day].forEach(a=>s+=`  - ${a.name}: ${a.desc||""}\n`); });

  return s+"\nNote: prices are illustrative sample estimates, not real-time prices.\n";

}

function loadIntoForm(t){

  const f=t.form; $("dest").value=f.dest; $("from").value=f.from; $("dep").value=f.dep||""; $("ret").value=f.ret||"";

  $("days").value=f.days; $("trav").value=f.trav; $("mode").value=f.mode; $("stay").value=f.stay; $("food").value=f.food; $("act").value=f.act;

  itinerary=JSON.parse(JSON.stringify(t.itinerary||{})); activeDay=1; renderResult(false); renderItinerary();

}



// ---------- setup ----------

function init(){

  const cats=["All",...new Set(DESTINATIONS.map(d=>d.category))];

  $("catFilter").innerHTML=cats.map(c=>`<option>${c}</option>`).join("");

  $("cats").innerHTML=cats.map(c=>`<button class="chip">${c}</button>`).join("");

  $("dest").innerHTML=`<option value="">— Select destination —</option>`+DESTINATIONS.map(d=>`<option value="${d.id}">${d.name}</option>`).join("");

  $("featured").innerHTML=DESTINATIONS.slice(0,4).map(destCard).join("");

  const saved=localStorage.getItem(THEME_KEY); if(saved) setTheme(saved);

  renderDestinations(); renderResult(false); renderItinerary(); renderTrips();

}

function setTheme(t){ document.documentElement.dataset.theme=t; $("themeBtn").textContent=t==="dark"?"☀️":"🌙"; try{localStorage.setItem(THEME_KEY,t);}catch(e){} }



document.addEventListener("click", e=>{

  const t=e.target, card=t.closest(".dest");

  if(card) openDestination(card.dataset.id);

  if(t.id==="selDest"){ $("dest").value=t.dataset.id; $("days").value=find(t.dataset.id).days; $("modal").classList.add("hidden"); location.hash="#planner"; renderResult(false); renderItinerary(); toast("Destination selected."); }

  if(t.id==="mClose"||t.id==="modal") $("modal").classList.add("hidden");

  if(t.closest("#cats")&&t.classList.contains("chip")){ $("catFilter").value=t.textContent; renderDestinations(); location.hash="#explore"; }

  if(t.dataset.day){ activeDay=+t.dataset.day; editingAct=null; renderItinerary(); }

  if(t.dataset.del!==undefined){ itinerary[activeDay].splice(+t.dataset.del,1); editingAct=null; renderItinerary(); toast("Activity removed."); }

  if(t.dataset.edit!==undefined){ editingAct=+t.dataset.edit; const a=itinerary[activeDay][editingAct]; $("aName").value=a.name; $("aDesc").value=a.desc||""; renderItinerary(); }

  if(t.dataset.view){ const tr=loadTrips().find(x=>x.id==t.dataset.view), d=find(tr.form.dest);

    $("mBody").innerHTML=`<h3 id="modalTitle">Trip summary</h3><pre style="white-space:pre-wrap;font-family:inherit">${esc(summaryText(tr))}</pre>`; $("modal").classList.remove("hidden"); }

  if(t.dataset.editt){ const tr=loadTrips().find(x=>x.id==t.dataset.editt); editingTripId=tr.id; loadIntoForm(tr); location.hash="#planner"; toast("Editing saved trip — click Save to update it."); }

  if(t.dataset.deltrip){ if(confirm("Delete this saved trip?")){ storeTrips(loadTrips().filter(x=>x.id!=t.dataset.deltrip)); renderTrips(); toast("Trip deleted."); } }

  if(t.closest("#menu")&&t.tagName==="A") $("menu").classList.remove("open");

});

["search","catFilter","sort"].forEach(id=>$(id).addEventListener("input",renderDestinations));

["dest","from","dep","ret","days","trav","mode","stay","food","act"].forEach(id=>$(id).addEventListener("input",()=>{ renderResult(true); if(id==="days"||id==="dep"||id==="ret"){ if(readForm(false).ok) $("days").value=readForm(false).data.days; renderItinerary(); } }));

$("form").addEventListener("submit",e=>{ e.preventDefault(); renderResult(true); if(lastResult) toast("Budget calculated."); });

$("reset").addEventListener("click",()=>{ $("form").reset(); $("days").value=3; $("trav").value=2; $("food").value=600; $("act").value=300; itinerary={}; editingTripId=null; renderResult(false); renderItinerary(); ["dest","from","date","days","trav","food","act"].forEach(k=>$("e-"+k).textContent=""); toast("Form reset."); });

$("suggest").addEventListener("click",suggestItinerary);

$("clearIt").addEventListener("click",()=>{ itinerary={}; renderItinerary(); });

$("actForm").addEventListener("submit",e=>{ e.preventDefault(); const name=$("aName").value.trim(); if(!name){ toast("Enter an activity name."); return; }

  itinerary[activeDay]=itinerary[activeDay]||[]; const a={name,desc:$("aDesc").value.trim()};

  if(editingAct===null) itinerary[activeDay].push(a); else itinerary[activeDay][editingAct]=a;

  toast(editingAct===null?"Activity added.":"Activity updated."); editingAct=null; $("actForm").reset(); renderItinerary(); });

$("saveBtn").addEventListener("click",saveTrip);

$("printBtn").addEventListener("click",()=>{ if(currentTrip()) window.print(); });

$("dlBtn").addEventListener("click",()=>{ const t=currentTrip(); if(!t) return; const a=document.createElement("a");

  a.href=URL.createObjectURL(new Blob([summaryText(t)],{type:"text/plain"})); a.download="tripwise-summary.txt"; a.click(); toast("Summary downloaded."); });

$("themeBtn").addEventListener("click",()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark"));

$("menuBtn").addEventListener("click",()=>$("menu").classList.toggle("open"));

init();




// Accessible card and dialog keyboard support.
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { $("modal").classList.add("hidden"); $("menu").classList.remove("open"); }
  if ((e.key === "Enter" || e.key === " ") && e.target.matches(".dest[tabindex='0']")) { e.preventDefault(); openDestination(e.target.dataset.id); }
});



