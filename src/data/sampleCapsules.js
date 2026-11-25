/**
 * Seed capsules so TIMEFOLD feels inhabited from the very first visit.
 * Includes both released public letters (unlock date <= current date)
 * and sealed future capsules (unlock date > current date).
 */

export const SAMPLE_CAPSULES = [
  {
    id: "sample-train-2019",
    author: "Elena Vance",
    title: "To Whoever Finds the Window Seat on the 6:15 Train",
    recipient: "A commuter on a rainy Tuesday",
    createdAt: "2019-10-14",
    releaseDate: "2024-10-14",
    visibility: "public",
    photoUrl: "/assets/sample-photo-autumn.jpg",
    photoCaption: "Platform four after the rain, October 2019",
    content: `If you are reading this years from now, I hope trains still rattle softly enough to make people drowsy when it rains.

Tonight I missed the earlier connection and stood under the awning watching yellow station lamps pool across wet cobblestones. An older man beside me shared half of his bag of roasted chestnuts without saying a word, just a nod because both our hands were freezing.

In my bag I have a paperback with a dried leaf marking chapter seven, two unmatched woollen mittens, and a list of errands I keep putting off until Saturday. Life right now feels smaller and gentler than the news makes it sound.

I hope, wherever you are going tonight, there is a warm window waiting for you at the end of the line.`,
  },
  {
    id: "sample-kitchen-2021",
    author: "Aarav Kulkarni",
    title: "Notes from My Grandmother's Kitchen, Before the Move",
    recipient: "My future nieces and nephews",
    createdAt: "2021-04-08",
    releaseDate: "2026-04-08",
    visibility: "public",
    photoUrl: null,
    photoCaption: "",
    content: `We spent this afternoon packing thirty years of brass spice tins into cardboard boxes, and every room smells faintly of roasted cumin and old newspaper.

Before the tape goes over the last carton, I want someone in our family to remember how this house sounded at four in the afternoon: the slow click of the ceiling fan, tea simmering with crushed cardamom, and my grandmother humming half a song while looking out toward the mango tree.

She never measured anything with spoons. She always said your palm remembers what a recipe forgets.

Years from now, when you visit a kitchen that feels unfamiliar, try making tea the slow way and waiting by the stove until the rain stops.`,
  },
  {
    id: "sample-bicycles-2018",
    author: "Clara & Theo Moreau",
    title: "The Summer We Learned to Fix Bicycles",
    recipient: "Anyone who misses long afternoons with nowhere to be",
    createdAt: "2018-07-22",
    releaseDate: "2025-07-22",
    visibility: "public",
    photoUrl: null,
    photoCaption: "",
    content: `Our hands are still stained grey with chain grease as we write this on the porch steps.

Neither of us actually knew how to true a crooked wheel, so we spent four hours arguing over a wrench, drinking warm lemonade, and listening to an old cassette stuck in the radio that only played folk songs from the nineties.

Nothing grand happened this July. We did not travel across oceans or solve anything important. We just fixed two battered bicycles and rode down to the canal before dusk while swifts circled overhead.

If the future moves faster than our years did, please save at least one afternoon for something mildly broken and entirely unhurried.`,
  },
  {
    id: "sample-inventory-2022",
    author: "Jun-Ho Park",
    title: "A Small Inventory of Ordinary Joys in 2022",
    recipient: "Historians of small things",
    createdAt: "2022-11-03",
    releaseDate: "2026-11-01",
    visibility: "public",
    photoUrl: null,
    photoCaption: "",
    content: `Future reader, textbooks will probably summarize our decade with headlines, graphs, and dates. Here is what they will leave out:

1. Using train tickets and faded bookstore receipts as bookmarks, then forgetting which story they belonged to.
2. The smell of wet asphalt five minutes after a sudden October downpour.
3. Calling an old friend at midnight just to say you heard a song you both loved at nineteen.
4. Watching the light turn amber inside an upstairs window while walking home with groceries.

We were often anxious about tomorrow, as I suppose every generation is. Yet somehow, between all the noise, we still found reasons to laugh until our ribs ached.`,
  },
  {
    id: "sample-locked-2035",
    author: "Maya Lin",
    title: "What I Hope 2035 Looks Like from My Dorm Desk",
    recipient: "Myself at thirty, and anyone listening",
    createdAt: "2026-02-14",
    releaseDate: "2035-02-14",
    visibility: "public",
    photoUrl: null,
    photoCaption: "",
    content: `Dear 2035, I am writing from a cramped desk beside a radiator that clicks every twenty minutes. I hope we kept our curiosity intact and never stopped buying handwritten birthday cards.`,
  },
  {
    id: "sample-locked-2036",
    author: "Samuel & Priya",
    title: "For Our Tenth Anniversary, If We Still Dance in the Kitchen",
    recipient: "Future us, ten autumns from now",
    createdAt: "2026-06-19",
    releaseDate: "2036-06-19",
    visibility: "public",
    photoUrl: null,
    photoCaption: "",
    content: `Ten years from today, open the cedar box on the top shelf and put on the slow jazz record we found at the Sunday market.`,
  },
  {
    id: "sample-locked-2050",
    author: "Henrik Lindqvist",
    title: "To the Class Entering Architecture School in 2050",
    recipient: "Students sketching in wooden studios in 2050",
    createdAt: "2026-09-05",
    releaseDate: "2050-09-05",
    visibility: "public",
    photoUrl: null,
    photoCaption: "",
    content: `Do not build only for speed or spectacle. Leave room for sunlit benches, quiet courtyards, and corners where people actually want to linger.`,
  },
];
