"use client";

import React from "react";
import Script from "next/script";

interface TrackingScriptsProps {
  settings?: {
    gtmContainerId?: string | null;
    ga4MeasurementId?: string | null;
    fbPixelId?: string | null;
    tiktokPixelId?: string | null;
    customHeadScripts?: string | null;
    customBodyStartScripts?: string | null;
    customBodyEndScripts?: string | null;
  } | null;
}

export const TrackingScripts: React.FC<TrackingScriptsProps> = ({ settings }) => {
  if (!settings) return null;

  const {
    gtmContainerId,
    ga4MeasurementId,
    fbPixelId,
    tiktokPixelId,
    customHeadScripts,
    customBodyStartScripts,
    customBodyEndScripts,
  } = settings;

  return (
    <>
      {/* 1. Google Tag Manager (GTM) */}
      {gtmContainerId && gtmContainerId.trim() && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmContainerId.trim()}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmContainerId.trim()}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* 2. Google Analytics 4 (GA4) */}
      {ga4MeasurementId && ga4MeasurementId.trim() && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId.trim()}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4MeasurementId.trim()}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* 3. Meta / Facebook Pixel */}
      {fbPixelId && fbPixelId.trim() && (
        <>
          <Script
            id="fb-pixel-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${fbPixelId.trim()}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${fbPixelId.trim()}&ev=PageView&noscript=1`}
              alt="fb-pixel"
            />
          </noscript>
        </>
      )}

      {/* 4. TikTok Pixel */}
      {tiktokPixelId && tiktokPixelId.trim() && (
        <Script
          id="tiktok-pixel-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('${tiktokPixelId.trim()}');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
      )}

      {/* 5. Custom Header Scripts */}
      {customHeadScripts && customHeadScripts.trim() && (
        <div
          id="custom-head-scripts"
          dangerouslySetInnerHTML={{ __html: customHeadScripts }}
        />
      )}

      {/* 6. Custom Body Start Scripts */}
      {customBodyStartScripts && customBodyStartScripts.trim() && (
        <div
          id="custom-body-start-scripts"
          dangerouslySetInnerHTML={{ __html: customBodyStartScripts }}
        />
      )}

      {/* 7. Custom Body End Scripts */}
      {customBodyEndScripts && customBodyEndScripts.trim() && (
        <div
          id="custom-body-end-scripts"
          dangerouslySetInnerHTML={{ __html: customBodyEndScripts }}
        />
      )}
    </>
  );
};
