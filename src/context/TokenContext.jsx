import { createContext, useContext, useEffect, useState } from "react";

const TokenContext = createContext();


export const TokenProvider = ({ children }) => {
  const accessExpiry = 20;
  const refreshExpiry = 120;

  const [accessSeconds, setAccessSeconds] = useState(accessExpiry);
  const [refreshSeconds, setRefreshSeconds] = useState(refreshExpiry);
  const [status, setStatus] = useState("🟢 Access Token Active");
  const [lastActivity, setLastActivity] = useState("User Logged In");
  const [nextAction, setNextAction] = useState("Waiting for Protected API...");

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setAccessSeconds((prev) => Math.max(prev - 1, 0));
      setRefreshSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Status Updates
  useEffect(() => {
    if (accessSeconds > 5) {
      setStatus("🟢 Access Token Active");
    } else if (accessSeconds > 2) {
      setStatus("🟡 Access Token Expiring Soon");
    } else if (accessSeconds > 0) {
      setStatus("🟠 Access Token Almost Expired");
    } else {
      setStatus("🔴 Access Token Expired");
      setNextAction("Click a Protected API");
    }
  }, [accessSeconds]);

  // Reset Access Token (simulate refresh)
  const refreshAccessToken = () => {
    setAccessSeconds(accessExpiry);

    setStatus("🟢 New Access Token Generated");

    setLastActivity("POST /refresh-token");

    setNextAction("Waiting for Next Protected API...");
  };

  // Reset Everything (simulate login)
  const resetTokens = () => {
    setAccessSeconds(accessExpiry);
    setRefreshSeconds(refreshExpiry);

    setStatus("🟢 Access Token Active");

    setLastActivity("Login Successful");

    setNextAction("Waiting for Protected API...");
  };
  //-----------------
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const beforeProtectedRequest = async (apiName) => {
    setLastActivity(apiName);

    if (accessSeconds > 0) {
      setStatus("🟢 Access Token Valid");
      setNextAction("Calling Protected API...");
      return;
    }

    // Access Token Expired
    setStatus("🔴 Access Token Expired");
    setNextAction("Sending Refresh Token...");

    await sleep(1000);

    setLastActivity("POST /refresh-token");
    setStatus("🔄 Refreshing Access Token...");
    setNextAction("Verifying Refresh Token...");

    await sleep(1000);

    refreshAccessToken();

    setStatus("🟢 New Access Token Generated");
    setNextAction("Retrying Original Request...");

    await sleep(1000);

    setStatus("🟢 Request Successful");
    setNextAction("Waiting for Next Protected API...");
  };
  //-----------------

  return (
    <TokenContext.Provider
      value={{
        accessSeconds,
        refreshSeconds,

        accessExpiry,
        refreshExpiry,

        status,
        lastActivity,
        nextAction,

        refreshAccessToken,
        resetTokens,
        beforeProtectedRequest,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
