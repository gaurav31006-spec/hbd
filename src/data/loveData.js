// src/data/loveData.js
// ------------------------------------------------------------------
// CONFIGURATION & CUSTOMIZABLE DATA FOR YOUR BEST FRIEND'S BIRTHDAY WEBSITE
// Modify any text, dates, photos, chat lines, timeline, or song references here.
// ------------------------------------------------------------------

export const loveData = {
  // Their name used across personalized screens
  girlfriendName: "khammiiiiiiii",   // ← Best friend's name

  // The secret date format MUST be "YYYY-MM-DD"
  // DD=02, MM=01, YYYY=2024 → January 2nd, 2024
  secretDate: "2024-01-02",

  // The secret word they need to type in Section 3
  secretWord: "vandro",

  // If true: requires entering the secret date on every visit.
  // If false: remembers the unlock in LocalStorage.
  REQUIRE_UNLOCK_EVERY_TIME: true,

  // Chapter 01 - First Meeting details (kept for data reference)
  firstMeeting: {
    date: "January 02, 2024",
    location: "Our Favorite Hangout Spot",
    story: "It started as a completely ordinary day. But somehow this friendship turned into one of the best things in my life.",
    image: "https://img.sanishtech.com/u/939e1fbffcad6bf66d4d59144580a1ab.jpg"
  },

  // Relationship Timeline items
  timeline: [],

  // Interactive Photo Gallery memories
  photos: [
    {
      id: 1,
      image: "https://img.sanishtech.com/u/939e1fbffcad6bf66d4d59144580a1ab.jpg",
      caption: "One of my favorite days with you ❤️",
    },
    {
      id: 2,
      image: "https://img.sanishtech.com/u/92b011491ae4137d30540e2e6a5ef74f.jpg",
      caption: "That smile gets me every single time.",
    },
    {
      id: 3,
      image: "https://img.sanishtech.com/u/b8aeb71bae6f2817a9e7041da00b8c44.jpg",
      caption: "Us being completely ridiculous 🤪",
    },
    {
      id: 4,
      image: "https://img.sanishtech.com/u/8222eedf942e509cc296d4b576fd10c0.jpg",
      caption: "Another memory worth keeping forever.",
    },
    {
      id: 5,
      image: "https://img.sanishtech.com/u/bf6077a913c60529caa23707e61911c3.jpg",
      caption: "The best company I could ever ask for.",
    },
    {
      id: 6,
      image: "https://img.sanishtech.com/u/17d0cc5eeb8772331888beef77a2f497.jpg",
      caption: "Here's to a thousand more memories.",
    }
  ],

  // Real-time Chat Conversation simulation
  chat: [
    { sender: "me", message: "Hello madam 👀" },
    { sender: "me", message: "Again ignoring me? 😭" },
    { sender: "her", message: "I'm busy 😂" },
    { sender: "me", message: "Busy ignoring me, I see 💀" },
    { sender: "her", message: "Shut up 😂" },
    { sender: "me", message: "Wow, suddenly you have time to reply 😭" },
    { sender: "her", message: "You're so annoying 😂" },
    { sender: "me", message: "And still you talk to me 😌" },
    { sender: "her", message: "Unfortunately 😭" },
    { sender: "me", message: "Don't worry, you're stuck with me ❤️" },
    { sender: "her", message: "Ughhh 😂❤️" }
  ],

  // Playlist configuration for the Music Player
  // Add your own MP3 files to public/music/
  songs: [
    {
      id: "song-1",
      title: "I Think They Call This Love",
      artist: "Elliot James Reay",
      file: "/music/call-this-love.mp3",
      cover: "https://img.sanishtech.com/u/939e1fbffcad6bf66d4d59144580a1ab.jpg"
    },
    {
      id: "song-2",
      title: "Golden Hour",
      artist: "JVKE",
      file: "/music/golden-hour.mp3",
      cover: "https://img.sanishtech.com/u/92b011491ae4137d30540e2e6a5ef74f.jpg"
    },
    {
      id: "song-3",
      title: "Happier Than Ever",
      artist: "Billie Eilish",
      file: "/music/happier-than-ever.mp3",
      cover: "https://img.sanishtech.com/u/b8aeb71bae6f2817a9e7041da00b8c44.jpg"
    }
  ],

  // The Special Birthday Message displayed inside the animated envelope
  loveLetter: `Dear [BESTIE_NAME],

Today is your birthday, and I couldn't let it pass without making something special for you.

I don't think words will ever fully explain how much your friendship means to me, but I'll try anyway.

You're the person I can annoy, roast, and still somehow talk to every day. 😂

Even when you ignore my messages for half a century... somehow you're still one of my favorite people. 😭❤️

Thank you for all the laughs, stupid conversations, random memories, and all the little moments that became special without us even realizing it.

You're not just my best friend.

You're genuinely one of the best people I've had in my life.

So today, I hope you smile a lot, eat something amazing, enjoy every moment, and remember how loved and appreciated you are.

Happy Birthday, bestie! 🎂❤️

Here's to another year of annoying each other, roasting each other, and making more memories.

Your best friend, always. ❤️`
};
