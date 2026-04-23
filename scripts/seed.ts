/**
 * Seed script — imports all hardcoded data from programs.ts into Sanity.
 *
 * Usage:
 *   1. Add your SANITY_API_TOKEN to .env.local
 *   2. Run: npx tsx scripts/seed.ts
 */
import { createClient } from "next-sanity";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-04-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

const stock = (id: string, q = "") =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80${q}`;

// ── Programs ──
const programs = [
  { id:"watercolor-wonders",title:"Watercolor Wonders",category:"arts",categoryLabel:"Arts & Crafts",categoryEmoji:"🎨",ageGroup:"ages-6-9",ageLabel:"Ages 6–9",duration:"6 weeks · 90 min",price:"$180",spotsLeft:3,totalSpots:12,dates:"Sat, Apr 26 — May 31",time:"10:00 AM",location:"Hack House Studio · Room A",image:stock("1499951360447-b19be8fe80f5"),gallery:[stock("1513364776144-60967b0f800f"),stock("1452860606245-08befc0ff44b"),stock("1503454537195-1dcabb73ffb9"),stock("1499951360447-b19be8fe80f5"),stock("1551845728-6820a30c64e1"),stock("1602734846297-9299fc2d4703")],shortDescription:"Splash, swirl, and discover the magic of color through playful painting.",longDescription:"A joyful introduction to watercolor for young creators. Across six relaxed sessions, kids explore color mixing, brush techniques, and the wild beauty of letting paint do its own thing. They'll finish with a portfolio of original paintings to take home.",whatKidsWillDo:["Mix vibrant colors and learn the color wheel","Paint a landscape, an animal portrait, and an abstract piece","Experiment with salt, wax-resist, and wet-on-wet techniques","Build confidence sharing artwork with their group"],instructor:{name:"Maya Okafor",role:"Lead Arts Instructor",bio:"Illustrator and former school art teacher. Believes every child is already an artist.",photo:stock("1544005313-94ddf0286df2")},type:"workshop",featured:true,order:1 },
  { id:"tiny-chefs",title:"Tiny Chefs Kitchen",category:"cooking",categoryLabel:"Cooking",categoryEmoji:"🍳",ageGroup:"ages-6-9",ageLabel:"Ages 6–9",duration:"4 weeks · 2 hr",price:"$220",spotsLeft:2,totalSpots:10,dates:"Sun, Apr 27 — May 18",time:"11:00 AM",location:"Hack House Teaching Kitchen",image:stock("1556909114-f6e7ad7d3136"),gallery:[stock("1556909114-f6e7ad7d3136"),stock("1490645935967-10de6ba17061"),stock("1551218808-94e220e084d2"),stock("1414235077428-338989a2e8c0")],shortDescription:"From dough to plate — kids cook real recipes in a real kitchen.",longDescription:"A hands-on kitchen adventure where kids measure, mix, and taste their way through four weekend cook-alongs. Every session ends with a shared meal and a recipe card to take home.",whatKidsWillDo:["Knead and bake their own pizza from scratch","Roll fresh pasta and toss it in homemade pesto","Decorate cupcakes with piping bags and sprinkles","Plate and serve a brunch for their grown-ups"],instructor:{name:"Chef Luca Romano",role:"Chief Cookie Officer",bio:"Trained chef and dad of three. Specialty: getting picky eaters to ask for seconds.",photo:stock("1438761681033-6461ffad8d80")},type:"workshop",featured:true,order:2 },
  { id:"backyard-scientists",title:"Backyard Scientists",category:"science",categoryLabel:"Science",categoryEmoji:"🔬",ageGroup:"ages-6-9",ageLabel:"Ages 7–10",duration:"5 weeks · 75 min",price:"$160",spotsLeft:6,totalSpots:14,dates:"Wed, May 1 — May 29",time:"4:30 PM",location:"Hack House Lab",image:stock("1532094349884-543bc11b234d"),gallery:[stock("1532094349884-543bc11b234d"),stock("1607988795691-3d0147b43231"),stock("1576086213369-97a306d36557"),stock("1530026405186-ed1f139313f8")],shortDescription:"Bubbling potions, bouncing eggs, and the wonder of why things work.",longDescription:"Five weeks of joyful experiments using everyday objects. Kids ask big questions, make predictions, and discover the science hiding in their kitchen, garden, and bathtub.",whatKidsWillDo:["Build a working volcano and a rainbow in a glass","Grow crystals and take them home in a jar","Construct a paper bridge that holds real weight","Keep a real scientist's notebook of discoveries"],instructor:{name:"Dr. Nadia Siddiqui",role:"Curiosity Captain",bio:"Marine biologist turned educator. Has a whole drawer of safety goggles.",photo:stock("1573496359142-b8d87734a5a2")},type:"workshop",featured:true,order:3 },
  { id:"mini-mvp-soccer",title:"All-Stars Soccer Skills",category:"sports",categoryLabel:"Sports",categoryEmoji:"⚽",ageGroup:"ages-10-13",ageLabel:"Ages 10–13",duration:"8 weeks · 60 min",price:"$200",spotsLeft:9,totalSpots:20,dates:"Sat, Apr 26 — Jun 14",time:"9:00 AM",location:"Riverside Park Field 3",image:stock("1551958219-acbc608c6377"),gallery:[stock("1551958219-acbc608c6377"),stock("1517649763962-0c623066013b"),stock("1486286701208-1d58e9338013"),stock("1526232761682-d26e03ac148e")],shortDescription:"Footwork, teamwork, and good sportsmanship — every Saturday morning.",longDescription:"Eight weeks of skill-building drills, mini-games, and friendly tournaments led by coaches who care more about confidence than scoreboards.",whatKidsWillDo:["Master dribbling, passing, and shooting fundamentals","Play 4v4 mini-matches every session","Learn positions and basic game strategy","Earn a real Hack House All-Stars jersey"],instructor:{name:"Coach Diego Martinez",role:"Head of Sports",bio:"Former semi-pro player. Believes the best coach is the one who cheers loudest.",photo:stock("1500648767791-00dcc994a43e")},type:"workshop",order:4 },
  { id:"stage-stars",title:"Stage Stars Drama Club",category:"drama",categoryLabel:"Drama",categoryEmoji:"🎭",ageGroup:"ages-10-13",ageLabel:"Ages 9–12",duration:"10 weeks · 2 hr",price:"$280",spotsLeft:1,totalSpots:16,dates:"Fri, Apr 25 — Jun 27",time:"5:00 PM",location:"Hack House Black Box Theatre",image:stock("1503095396549-807759245b35"),gallery:[stock("1503095396549-807759245b35"),stock("1514306191717-452ec28c7814"),stock("1485846234645-a62644f84728"),stock("1571260899304-425eee4c7efc")],shortDescription:"Improv, scripts, and a real end-of-term show in front of a real audience.",longDescription:"A full term of theatre games, scene work, and a final performance. Kids leave bolder, louder, and prouder of their voices.",whatKidsWillDo:["Play improv games that build confidence fast","Memorise and perform a scene from a real play","Help design simple costumes and props","Take the stage for a Friday-night family show"],instructor:{name:"Priya Devereux",role:"Director of Drama",bio:"Theatre director and storyteller. Has never met a shy kid who stayed shy.",photo:stock("1494790108377-be9c29b29330")},type:"workshop",order:5 },
  { id:"ukulele-jam",title:"Ukulele Jam Sessions",category:"music",categoryLabel:"Music",categoryEmoji:"🎵",ageGroup:"ages-10-13",ageLabel:"Ages 10–13",duration:"6 weeks · 60 min",price:"$170",spotsLeft:4,totalSpots:12,dates:"Tue, Apr 29 — Jun 3",time:"5:30 PM",location:"Hack House Music Room",image:stock("1510915361894-db8b7855a8a4"),gallery:[stock("1510915361894-db8b7855a8a4"),stock("1471478331149-c72f17e33c73"),stock("1493225457124-a3eb161ffa5f"),stock("1520523839897-bd0b52f945a0")],shortDescription:"Strum your first chord on Tuesday — play a song with friends by Friday.",longDescription:"From a single chord to a full sing-along set in six weeks. Ukuleles provided. No experience needed.",whatKidsWillDo:["Learn 5 essential chords and how to switch between them","Play three full songs solo and in a group","Write the lyrics to an original Hack House anthem","Perform a mini-concert for parents on the final day"],instructor:{name:"Sam Whitlock",role:"Music Maker-in-Chief",bio:"Singer-songwriter and music teacher. Travels with at least three ukuleles.",photo:stock("1463453091185-61582044d556")},type:"workshop",order:6 },
  { id:"teen-makers-clay",title:"Pottery Studio for Teens",category:"arts",categoryLabel:"Arts & Crafts",categoryEmoji:"🎨",ageGroup:"ages-14-plus",ageLabel:"Ages 14+",duration:"8 weeks · 2 hr",price:"$320",spotsLeft:5,totalSpots:10,dates:"Thu, May 1 — Jun 19",time:"6:00 PM",location:"Hack House Ceramics Studio",image:stock("1565193566173-7a0ee3dbe261"),gallery:[stock("1565193566173-7a0ee3dbe261"),stock("1493106641515-6b5631de4bb9"),stock("1605714196241-00bf7a8fa7a0"),stock("1504208434309-cb69f4fe52b0")],shortDescription:"Throw, trim, glaze, and fire — eight weeks at a real potter's wheel.",longDescription:"A serious teen studio experience. Eight weeks of guided practice on the wheel and hand-building, ending with a glazed collection of pieces fired in our kiln.",whatKidsWillDo:["Learn to centre clay and throw mugs and bowls","Hand-build a sculptural piece of their own design","Glaze and fire their work in a real kiln","Curate a mini exhibition of their best pieces"],instructor:{name:"Renata Voss",role:"Master Potter",bio:"Studio ceramicist with 15 years on the wheel. Patient. Endlessly patient.",photo:stock("1487412720507-e7ab37603c6f")},type:"workshop",order:7 },
  { id:"teen-songwriting",title:"Songwriting Lab",category:"music",categoryLabel:"Music",categoryEmoji:"🎵",ageGroup:"ages-14-plus",ageLabel:"Ages 14+",duration:"6 weeks · 90 min",price:"$240",spotsLeft:7,totalSpots:12,dates:"Mon, Apr 28 — Jun 2",time:"6:30 PM",location:"Hack House Music Room",image:stock("1511671782779-c97d3d27a1d4"),gallery:[stock("1511671782779-c97d3d27a1d4"),stock("1485579149621-3123dd979885"),stock("1493676304819-0d7a8d026dcf")],shortDescription:"Write, record, and release your first original track.",longDescription:"A six-week songwriting intensive. Teens learn melody, lyric, and structure, then record their finished song in our studio.",whatKidsWillDo:["Develop a song from a single lyric idea to a finished demo","Learn basic melody, harmony, and song structure","Record vocals and instruments in our studio","Release a private Hack House EP with all the class tracks"],instructor:{name:"Sam Whitlock",role:"Music Maker-in-Chief",bio:"Singer-songwriter and music teacher. Travels with at least three ukuleles.",photo:stock("1463453091185-61582044d556")},type:"workshop",order:8 },
  { id:"teen-improv",title:"Improv & Stand-Up",category:"drama",categoryLabel:"Drama",categoryEmoji:"🎭",ageGroup:"ages-14-plus",ageLabel:"Ages 14+",duration:"6 weeks · 90 min",price:"$210",spotsLeft:8,totalSpots:14,dates:"Wed, Apr 30 — Jun 4",time:"7:00 PM",location:"Hack House Black Box Theatre",image:stock("1527224538127-2104bb71c51b"),gallery:[stock("1527224538127-2104bb71c51b"),stock("1503095396549-807759245b35"),stock("1485846234645-a62644f84728")],shortDescription:"Find your funny — six weeks of improv games and stand-up coaching.",longDescription:"A safe, hilarious space for teens to find their voice on stage. Ends with a low-key open-mic night for friends and family.",whatKidsWillDo:["Learn the rules of long-form improv","Write and refine a 3-minute stand-up set","Perform at our end-of-term open mic","Build the kind of confidence that lasts long after class"],instructor:{name:"Priya Devereux",role:"Director of Drama",bio:"Theatre director and storyteller. Has never met a shy kid who stayed shy.",photo:stock("1494790108377-be9c29b29330")},type:"workshop",order:9 },
  { id:"camp-mini-adventurers",title:"Mini Adventurers Day Camp",category:"arts",categoryLabel:"Mixed Activities",categoryEmoji:"🌟",ageGroup:"ages-6-9",ageLabel:"Ages 5–8",duration:"1 week · 9am–3pm",price:"$420",spotsLeft:4,totalSpots:18,dates:"Mon, Jul 7 — Fri, Jul 11",time:"9:00 AM",location:"Hack House Main Campus",image:stock("1502086223501-7ea6ecd79368"),gallery:[stock("1502086223501-7ea6ecd79368"),stock("1503454537195-1dcabb73ffb9"),stock("1542810634-71277d95dcbb"),stock("1514315384763-ba401779410f")],shortDescription:"Five days of crafting, cooking, splashing, and giggling.",longDescription:"A full week of nonstop fun for our youngest explorers. Each day mixes art, outdoor play, a kitchen project, and storytime.",whatKidsWillDo:["Make a new craft to take home every day","Cook a snack from scratch with a real chef","Run, splash, and play outdoor games each afternoon","End the week with a Friday family showcase"],instructor:{name:"Maya Okafor",role:"Camp Director",bio:"Illustrator and former school art teacher. Believes every child is already an artist.",photo:stock("1544005313-94ddf0286df2")},type:"camp",campType:"Day Camp",order:10 },
  { id:"camp-creators",title:"Camp Creators",category:"science",categoryLabel:"Mixed Activities",categoryEmoji:"🚀",ageGroup:"ages-10-13",ageLabel:"Ages 9–12",duration:"2 weeks · 9am–4pm",price:"$780",spotsLeft:6,totalSpots:24,dates:"Mon, Jul 14 — Fri, Jul 25",time:"9:00 AM",location:"Hack House Main Campus",image:stock("1532094349884-543bc11b234d"),gallery:[stock("1532094349884-543bc11b234d"),stock("1532094349884-543bc11b234d"),stock("1551958219-acbc608c6377"),stock("1503095396549-807759245b35")],shortDescription:"Two weeks rotating through arts, science, sports, and stagecraft.",longDescription:"Our flagship camp. Kids cycle through every Hack House discipline, find their favourites, and finish with a giant family showcase.",whatKidsWillDo:["Try every activity Hack House offers","Build a team project across the two weeks","Take part in daily outdoor challenges","Star in our end-of-camp showcase"],instructor:{name:"Coach Diego Martinez",role:"Camp Director",bio:"Former semi-pro player. Believes the best coach is the one who cheers loudest.",photo:stock("1500648767791-00dcc994a43e")},type:"camp",campType:"Day Camp",order:11 },
  { id:"camp-explorer-teens",title:"Explorer Teens Residential",category:"sports",categoryLabel:"Mixed Activities",categoryEmoji:"🏕️",ageGroup:"ages-14-plus",ageLabel:"Ages 13+",duration:"1 week residential",price:"$1,180",spotsLeft:3,totalSpots:16,dates:"Mon, Aug 4 — Sun, Aug 10",time:"Drop-off Mon 10am",location:"Pinegrove Outdoor Centre",image:stock("1469854523086-cc02fe5d8800"),gallery:[stock("1469854523086-cc02fe5d8800"),stock("1504280390367-361c6d9f38f4"),stock("1486915309851-b0cc1f8a0084"),stock("1517649763962-0c623066013b")],shortDescription:"A week off-grid with new friends, big skies, and bigger memories.",longDescription:"An away-from-home camp for older kids. Kayaking, campfires, pottery under the stars, and the kind of friendships that last for years.",whatKidsWillDo:["Kayak, hike, and learn outdoor first aid","Cook around the fire and sleep under the stars","Lead a creative project of their own choosing","Build friendships that outlast the summer"],instructor:{name:"Renata Voss",role:"Lead Counselor",bio:"Studio ceramicist with 15 years on the wheel. Patient. Endlessly patient.",photo:stock("1487412720507-e7ab37603c6f")},type:"camp",campType:"Residential",order:12 },
];

const ageGroups = [
  { key:"ages-6-9",name:"Little Explorers",range:"Ages 6–9",tagline:"Big imaginations, endless fun",campName:"Mini Adventurers",campRange:"Ages 5–8" },
  { key:"ages-10-13",name:"Junior Creators",range:"Ages 10–13",tagline:"Build, experiment, express",campName:"Camp Creators",campRange:"Ages 9–12" },
  { key:"ages-14-plus",name:"Teen Makers",range:"Ages 14+",tagline:"Level up your skills and confidence",campName:"Explorer Teens",campRange:"Ages 13+" },
];

const testimonials = [
  { quote:"My daughter ran out of class beaming every single Saturday. She's already asking when she can sign up for the next one.",parent:"Sarah Chen",childAge:"Mom of Lily, 8",program:"Watercolor Wonders",rating:5,order:1 },
  { quote:"Liam was so shy he barely spoke. Six weeks later he was on stage delivering his lines like a pro. We're floored.",parent:"James O'Brien",childAge:"Dad of Liam, 10",program:"Stage Stars Drama Club",rating:5,order:2 },
  { quote:"Hands down the best summer camp we've sent our kids to. The team genuinely cares — and it shows in everything.",parent:"Priya Patel",childAge:"Mom of Rohan & Anika, 7 and 11",program:"Camp Creators",rating:5,order:3 },
  { quote:"He came home with a real ceramic mug he made himself. Drinks his orange juice from it every morning now.",parent:"Marcus Hall",childAge:"Dad of Eli, 14",program:"Pottery Studio for Teens",rating:5,order:4 },
  { quote:"Booking was easy, the WhatsApp follow-up was lovely, and the experience exceeded every expectation.",parent:"Aisha Rahman",childAge:"Mom of Zara, 9",program:"Tiny Chefs Kitchen",rating:5,order:5 },
];

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  title: "The Hack House",
  description: "Workshops & summer camps packed with creativity, adventure, and fun — for kids aged 5 to 14.",
  stats: [
    { _key:"s1",value:500,suffix:"+",label:"Happy Kids",icon:"😄" },
    { _key:"s2",value:20,suffix:"+",label:"Programs",icon:"🎯" },
    { _key:"s3",value:3,suffix:"",label:"Years Running",icon:"🎂" },
    { _key:"s4",value:98,suffix:"%",label:"Parent Smiles",icon:"❤️" },
  ],
  team: [
    { _key:"t1",name:"Maya Okafor",role:"Chief Imagination Officer",bio:"Started Hack House to give kids the studio she wished she had as a kid.",photo:stock("1544005313-94ddf0286df2") },
    { _key:"t2",name:"Chef Luca Romano",role:"Chief Cookie Officer",bio:"Trained chef and dad of three. Specialty: getting picky eaters to ask for seconds.",photo:stock("1438761681033-6461ffad8d80") },
    { _key:"t3",name:"Dr. Nadia Siddiqui",role:"Curiosity Captain",bio:"Marine biologist turned educator. Has a whole drawer of safety goggles.",photo:stock("1573496359142-b8d87734a5a2") },
    { _key:"t4",name:"Coach Diego Martinez",role:"Head of Movement",bio:"Former semi-pro player. Believes the best coach is the one who cheers loudest.",photo:stock("1500648767791-00dcc994a43e") },
    { _key:"t5",name:"Priya Devereux",role:"Director of Drama",bio:"Theatre director and storyteller. Has never met a shy kid who stayed shy.",photo:stock("1494790108377-be9c29b29330") },
    { _key:"t6",name:"Sam Whitlock",role:"Music Maker-in-Chief",bio:"Singer-songwriter. Travels with at least three ukuleles.",photo:stock("1463453091185-61582044d556") },
  ],
  categories: [
    { _key:"c1",id:"arts",label:"Arts & Crafts",emoji:"🎨" },
    { _key:"c2",id:"cooking",label:"Cooking",emoji:"🍳" },
    { _key:"c3",id:"science",label:"Science",emoji:"🔬" },
    { _key:"c4",id:"sports",label:"Sports",emoji:"⚽" },
    { _key:"c5",id:"drama",label:"Drama",emoji:"🎭" },
    { _key:"c6",id:"music",label:"Music",emoji:"🎵" },
  ],
  heroSlides: [
    { _key:"h1",image:stock("1503454537195-1dcabb73ffb9","&w=900"),title:"Watercolor Wonders",subtitle:"Saturdays · Ages 6–9",badge:"🎨 Arts" },
    { _key:"h2",image:stock("1556909114-f6e7ad7d3136","&w=900"),title:"Tiny Chefs Kitchen",subtitle:"Sundays · Ages 6–9",badge:"🍳 Cooking" },
    { _key:"h3",image:stock("1503095396549-807759245b35","&w=900"),title:"Stage Stars Drama",subtitle:"Fridays · Ages 9–12",badge:"🎭 Drama" },
  ],
  whatsappNumber: "15555555555",
};

async function seed() {
  console.log("🌱 Seeding Sanity...\n");
  const tx = client.transaction();

  // Programs
  for (const p of programs) {
    const { id, featured, order, ...rest } = p;
    tx.createOrReplace({
      _id: `program-${id}`,
      _type: "program",
      slug: { _type: "slug", current: id },
      featured: featured ?? false,
      order: order ?? 99,
      ...rest,
    } as any);
    console.log(`  ✅ program: ${p.title}`);
  }

  // Age groups
  for (const ag of ageGroups) {
    tx.createOrReplace({ _id: `ageGroup-${ag.key}`, _type: "ageGroup", ...ag });
    console.log(`  ✅ ageGroup: ${ag.name}`);
  }

  // Testimonials
  for (let i = 0; i < testimonials.length; i++) {
    tx.createOrReplace({ _id: `testimonial-${i + 1}`, _type: "testimonial", ...testimonials[i] });
    console.log(`  ✅ testimonial: ${testimonials[i].parent}`);
  }

  // Site settings
  tx.createOrReplace(siteSettings);
  console.log("  ✅ siteSettings");

  console.log("\n📡 Committing transaction...");
  await tx.commit();
  console.log("🎉 Done! All data seeded to Sanity.\n");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
