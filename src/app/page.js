"use client";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    
    // The 'navigator' object is a built-in browser object that provides information about the application running the script.
    console.log(navigator);
    if ("serviceWorker" in navigator) {

      const handleServiceWorker = async () => {

        const register = await navigator.serviceWorker.register("/sw.js");

        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: "YOUR_PUBLIC_KEY",
        });

      };
      handleServiceWorker();
    }
  }, []);

  const triggerNotification = async () => {
    // The 'navigator' object is a built-in browser object that provides information about the application running the script.
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        fetch("/api/send-notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscription }),
        })
        .then(response => response.json())
        .then(data => console.log("Notification sent:", data))
        .catch(error => console.error("Error sending notification:", error));
      } else {
        console.error("No subscription found.");
      }
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={triggerNotification}
          >
            Trigger Notification
          </button>
          
        </div>
      </main>

    </div>
  );
}
