import { useEffect } from 'react';

/**
 * useVisitorTracker
 * Silently captures visitor metadata (location, network, device, referrer, time)
 * and delivers an instant alert to your private Telegram Bot.
 * 
 * Configured via .env or Vercel Environment Variables:
 * - VITE_TELEGRAM_BOT_TOKEN
 * - VITE_TELEGRAM_CHAT_ID
 */
export function useVisitorTracker() {
  useEffect(() => {
    // Only track once per browser session to prevent spamming on page refreshes
    if (sessionStorage.getItem('portfolio_visited')) {
      return;
    }

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    // If bot credentials are not configured yet, skip quietly
    if (!botToken || !chatId) {
      return;
    }

    const trackVisitor = async () => {
      try {
        sessionStorage.setItem('portfolio_visited', 'true');

        // 1. Determine referrer & device information
        const referrer = document.referrer ? new URL(document.referrer).hostname : 'Direct / Private Link';
        const userAgent = navigator.userAgent;
        const screenRes = `${window.screen.width}x${window.screen.height}`;
        
        let os = 'Unknown OS';
        if (userAgent.indexOf('Win') !== -1) os = 'Windows';
        else if (userAgent.indexOf('Mac') !== -1) os = 'macOS';
        else if (userAgent.indexOf('iPhone') !== -1) os = 'iOS (iPhone)';
        else if (userAgent.indexOf('Android') !== -1) os = 'Android';
        else if (userAgent.indexOf('Linux') !== -1) os = 'Linux';

        let browser = 'Unknown Browser';
        if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Edg') === -1) browser = 'Chrome';
        else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) browser = 'Safari';
        else if (userAgent.indexOf('Firefox') !== -1) browser = 'Firefox';
        else if (userAgent.indexOf('Edg') !== -1) browser = 'Edge';

        // 2. Local IST Timestamp
        const now = new Date();
        const timeIST = now.toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'medium',
          timeStyle: 'medium',
        });

        // 3. Geolocation & Network (silent background lookup)
        let geoData = {
          city: 'Unknown City',
          region: 'Unknown Region',
          country_name: 'Unknown Country',
          org: 'Unknown ISP / Network',
          ip: 'Anonymous',
        };

        try {
          const res = await fetch('https://ipapi.co/json/');
          if (res.ok) {
            const data = await res.json();
            geoData = {
              city: data.city || 'Unknown',
              region: data.region || 'Unknown',
              country_name: data.country_name || 'Unknown',
              org: data.org || 'Unknown Org',
              ip: data.ip || 'Anonymous',
            };
          }
        } catch {
          // If geolocation provider is blocked by ad-blocker, proceed with device info
        }

        // 4. Construct Telegram Alert Message
        const message = `
🚀 <b>New Portfolio Visitor!</b>
━━━━━━━━━━━━━━━━━━━━
📍 <b>Location:</b> ${geoData.city}, ${geoData.region}, ${geoData.country_name}
🏢 <b>ISP / Org:</b> ${geoData.org}
🔗 <b>Referrer:</b> ${referrer}
📱 <b>Device:</b> ${os} · ${browser}
🖥️ <b>Screen:</b> ${screenRes}
⏰ <b>Time (IST):</b> ${timeIST}
━━━━━━━━━━━━━━━━━━━━
`.trim();

        // 5. Send to Telegram Bot API
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
          }),
        });
      } catch {
        // Fail silently so visitor experience is never affected
      }
    };

    trackVisitor();
  }, []);
}
