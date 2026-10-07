// src/data/loveData.template.js
// Template configuration - replace placeholders with your custom text and photo links

export const loveData = {
  girlfriendName: "[BESTIE_NAME]",
  secretDate: "YYYY-MM-DD",
  secretWord: "vandro",
  REQUIRE_UNLOCK_EVERY_TIME: true,
  firstMeeting: {
    date: "Date Here",
    location: "Location Here",
    story: "Story line here...",
    image: "https://your-image-link-here.jpg"
  },
  timeline: [],
  photos: [
    { id: 1, image: "https://your-image-link-1.jpg", caption: "Caption 1" },
    { id: 2, image: "https://your-image-link-2.jpg", caption: "Caption 2" }
  ],
  chat: [
    { sender: "me", message: "Hello madam 👀" },
    { sender: "her", message: "Shut up 😂" }
  ],
  songs: [
    {
      id: "song-1",
      title: "I Think They Call This Love",
      artist: "Elliot James Reay",
      file: "/music/call-this-love.mp3",
      cover: "https://your-image-link-1.jpg"
    }
  ],
  loveLetter: `Dear [BESTIE_NAME], ...`
};
