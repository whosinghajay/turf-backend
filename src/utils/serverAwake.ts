import https from "https";

const keepAwake = () => {
  https.get("https://turf-backend-x3y6.onrender.com/api/v1/turf/all", (res) => {
    console.log(`Request sent to keep the server awake: ${res.statusCode}`);
  });
};

// Send a request every 28 minutes
setInterval(keepAwake, 14 * 60 * 1000);
