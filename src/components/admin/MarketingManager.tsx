"use client";

import React, { useState } from "react";
import {
  Target,
  Share2,
  Code,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Zap,
  Save,
  Info,
  ExternalLink,
  Flame,
} from "lucide-react";
import {
  updateMarketingSettingsAction,
  testMetaCapiAction,
  MarketingSettingsFormData,
} from "@/actions/marketingActions";

interface MarketingManagerProps {
  initialSettings: any;
}

export const MarketingManager: React.FC<MarketingManagerProps> = ({
  initialSettings,
}) => {
  const [activeTab, setActiveTab] = useState<"meta" | "google" | "tiktok" | "scripts">("meta");

  // Form States
  const [gtmContainerId, setGtmContainerId] = useState(initialSettings?.gtmContainerId || "");
  const [ga4MeasurementId, setGa4MeasurementId] = useState(initialSettings?.ga4MeasurementId || "");
  const [fbPixelId, setFbPixelId] = useState(initialSettings?.fbPixelId || "");
  const [metaCapiAccessToken, setMetaCapiAccessToken] = useState(initialSettings?.metaCapiAccessToken || "");
  const [metaTestEventCode, setMetaTestEventCode] = useState(initialSettings?.metaTestEventCode || "");
  const [tiktokPixelId, setTiktokPixelId] = useState(initialSettings?.tiktokPixelId || "");
  const [customHeadScripts, setCustomHeadScripts] = useState(initialSettings?.customHeadScripts || "");
  const [customBodyStartScripts, setCustomBodyStartScripts] = useState(initialSettings?.customBodyStartScripts || "");
  const [customBodyEndScripts, setCustomBodyEndScripts] = useState(initialSettings?.customBodyEndScripts || "");

  const [isSaving, setIsSaving] = useState(false);
  const [isTestingCapi, setIsTestingCapi] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [capiTestResult, setCapiTestResult] = useState<any | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const res = await updateMarketingSettingsAction({
      gtmContainerId,
      ga4MeasurementId,
      fbPixelId,
      metaCapiAccessToken,
      metaTestEventCode,
      tiktokPixelId,
      customHeadScripts,
      customBodyStartScripts,
      customBodyEndScripts,
    });

    if (res.success) {
      setFeedback({
        type: "success",
        text: "সকল মার্কেটিং ও ট্র্যাকিং সেটিংস সফলভাবে সংরক্ষিত হয়েছে!",
      });
      setTimeout(() => setFeedback(null), 4000);
    } else {
      setFeedback({
        type: "error",
        text: res.error || "সংরক্ষণে ত্রুটি হয়েছে।",
      });
    }

    setIsSaving(false);
  };

  const handleTestCapi = async () => {
    if (!fbPixelId || !metaCapiAccessToken) {
      alert("অনুগ্রহ করে প্রথমে Meta Pixel ID এবং Conversions API Access Token ইনপুট করুন ও সেভ করুন।");
      return;
    }

    setIsTestingCapi(true);
    setCapiTestResult(null);

    const res = await testMetaCapiAction();
    if (res.success) {
      setCapiTestResult({
        status: "success",
        message: "Meta CAPI সার্ভার ইভেন্ট সফলভাবে পাঠানো হয়েছে! ফেসবুক ইভেন্টস ম্যানেজারের Test Events ট্যাবে চেক করুন।",
        data: res.result,
      });
    } else {
      setCapiTestResult({
        status: "error",
        message: res.error?.error?.message || res.error || "CAPI টেস্ট ইভেন্ট পাঠাতে ব্যর্থ হয়েছে।",
      });
    }

    setIsTestingCapi(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 ${
            feedback.type === "success"
              ? "bg-emerald-50 border border-emerald-300 text-emerald-800"
              : "bg-red-50 border border-red-300 text-red-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Tabs Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("meta")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "meta"
              ? "bg-[#1877F2] text-white shadow-md shadow-[#1877F2]/20"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Meta / Facebook Pixel & CAPI</span>
        </button>

        <button
          onClick={() => setActiveTab("google")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "google"
              ? "bg-[#EA4335] text-white shadow-md shadow-[#EA4335]/20"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Google Tag Manager & GA4</span>
        </button>

        <button
          onClick={() => setActiveTab("tiktok")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "tiktok"
              ? "bg-[#1C1917] text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <Flame className="w-4 h-4 text-rose-500" />
          <span>TikTok Pixel</span>
        </button>

        <button
          onClick={() => setActiveTab("scripts")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "scripts"
              ? "bg-[#059669] text-white shadow-md shadow-[#059669]/20"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <Code className="w-4 h-4" />
          <span>কাস্টম স্ক্রিপ্ট ইনজেকশন (Custom HTML/JS)</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Tab 1: Meta / Facebook Pixel & CAPI */}
        {activeTab === "meta" && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#1877F2]" />
                    Meta Pixel ও Conversions API (CAPI) ট্র্যাকিং
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    ব্রাউজার পিক্সেল এবং সার্ভার-সাইড CAPI ইভেন্ট ডুপ্লিকেশন ও অ্যাড ট্র্যাকিং
                  </p>
                </div>

                <a
                  href="https://business.facebook.com/events_manager2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#1877F2] hover:underline flex items-center gap-1"
                >
                  <span>Events Manager</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Meta Pixel ID (ফেসবুক পিক্সেল আইডি)
                  </label>
                  <input
                    type="text"
                    value={fbPixelId}
                    onChange={(e) => setFbPixelId(e.target.value)}
                    placeholder="যেমন: 123456789012345"
                    className="w-full px-4 py-3 bg-[#FAFAF9] border border-gray-300 rounded-xl font-mono text-xs sm:text-sm text-gray-900 focus:ring-2 focus:ring-[#1877F2]"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Meta Events Manager &gt; Data Sources &gt; Settings &gt; Pixel ID
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Test Event Code (টেস্টিং কোড - ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={metaTestEventCode}
                    onChange={(e) => setMetaTestEventCode(e.target.value)}
                    placeholder="যেমন: TEST72910"
                    className="w-full px-4 py-3 bg-[#FAFAF9] border border-gray-300 rounded-xl font-mono text-xs sm:text-sm text-gray-900 focus:ring-2 focus:ring-[#1877F2]"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Events Manager &gt; Test Events ট্যাবের কোড (লাইভ অ্যাড চালানোর সময় খালি রাখবেন)
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Conversions API Access Token (সার্ভার টোকেন)
                </label>
                <textarea
                  rows={3}
                  value={metaCapiAccessToken}
                  onChange={(e) => setMetaCapiAccessToken(e.target.value)}
                  placeholder="EAA..."
                  className="w-full px-4 py-3 bg-[#FAFAF9] border border-gray-300 rounded-xl font-mono text-xs text-gray-900 focus:ring-2 focus:ring-[#1877F2]"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Events Manager &gt; Settings &gt; Conversions API &gt; Generate Access Token
                </p>
              </div>

              {/* CAPI Test Action Box */}
              <div className="bg-blue-50/70 border border-blue-200 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-blue-950 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#1877F2]" />
                    <span>সার্ভার-সাইড CAPI কানেকশন টেস্ট</span>
                  </h4>
                  <p className="text-xs text-blue-800">
                    একটি টেস্ট Purchase ইভেন্ট পাঠিয়ে যাচাই করুন মেটা সার্ভার ইভেন্ট রিসিভ করছে কিনা।
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isTestingCapi}
                  onClick={handleTestCapi}
                  className="bg-[#1877F2] hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer disabled:opacity-75"
                >
                  {isTestingCapi ? "টেস্ট হচ্ছে..." : "🧪 টেস্ট ইভেন্ট ফায়ার করুন"}
                </button>
              </div>

              {/* Test Result Box */}
              {capiTestResult && (
                <div
                  className={`p-4 rounded-2xl text-xs font-mono border ${
                    capiTestResult.status === "success"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                      : "bg-red-50 border-red-200 text-red-900"
                  }`}
                >
                  <p className="font-bold mb-1">{capiTestResult.message}</p>
                  {capiTestResult.data && (
                    <pre className="text-[11px] overflow-x-auto p-2 bg-white/80 rounded-lg">
                      {JSON.stringify(capiTestResult.data, null, 2)}
                    </pre>
                  )}
                </div>
              )}

              {/* Features Pill */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Deduplication (event_id)</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Advanced Matching (SHA-256)</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>iOS 14+ Ad Optimization</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Google Tag Manager & GA4 */}
        {activeTab === "google" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EA4335]" />
                  Google Tag Manager (GTM) ও GA4 ই-কমার্স ট্র্যাকিং
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Enhanced Ecommerce DataLayer ইভেন্ট এবং অ্যানালিটিক্স ইন্টিগ্রেশন
                </p>
              </div>

              <a
                href="https://tagmanager.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#EA4335] hover:underline flex items-center gap-1"
              >
                <span>GTM Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Google Tag Manager Container ID
                </label>
                <input
                  type="text"
                  value={gtmContainerId}
                  onChange={(e) => setGtmContainerId(e.target.value)}
                  placeholder="যেমন: GTM-XXXXXXX"
                  className="w-full px-4 py-3 bg-[#FAFAF9] border border-gray-300 rounded-xl font-mono text-xs sm:text-sm text-gray-900 focus:ring-2 focus:ring-[#EA4335]"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  GTM স্ক্রিপ্ট স্বয়ংক্রিয়ভাবে &lt;head&gt; ও &lt;body&gt; তে ইনজেক্ট হবে
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Google Analytics 4 Measurement ID
                </label>
                <input
                  type="text"
                  value={ga4MeasurementId}
                  onChange={(e) => setGa4MeasurementId(e.target.value)}
                  placeholder="যেমন: G-XXXXXXXXXX"
                  className="w-full px-4 py-3 bg-[#FAFAF9] border border-gray-300 rounded-xl font-mono text-xs sm:text-sm text-gray-900 focus:ring-2 focus:ring-[#EA4335]"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Google Analytics 4 প্রোপার্টি মেজারমেন্ট আইডি
                </p>
              </div>
            </div>

            {/* Standard DataLayer Events List */}
            <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-2">
              <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#D97706]" />
                <span>স্বয়ংক্রিয়ভাবে প্রেরিত GA4 &amp; GTM DataLayer ইভেন্টসমূহ:</span>
              </h4>
              <ul className="text-xs text-amber-900 space-y-1 pl-5 list-disc">
                <li><code>page_view</code>: প্রতিটি পেজ ভিজিটে স্বয়ংক্রিয় ফায়ার</li>
                <li><code>view_item</code>: প্যাকেজ নির্বাচন করলে আইটেম আইডি ও মূল্যের ডাটা</li>
                <li><code>begin_checkout</code>: চেকআউট ফর্মে পৌঁছালে ইভেন্ট ডাটা</li>
                <li><code>purchase</code>: সফল অর্ডারের পর Transaction ID, Currency (BDT) ও মোট মূল্য</li>
                <li><code>contact</code>: হোয়াটসঅ্যাপ বা হেল্পলাইনে ক্লিক করলে যোগাযোগ ট্র্যাকিং</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: TikTok Pixel */}
        {activeTab === "tiktok" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-black" />
                  TikTok Pixel ট্র্যাকিং
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  টিকটক অ্যাড ম্যানেজার ও কনভার্সন অপটিমাইজেশন পিক্সেল
                </p>
              </div>

              <a
                href="https://ads.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-gray-900 hover:underline flex items-center gap-1"
              >
                <span>TikTok Ads</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                TikTok Pixel ID
              </label>
              <input
                type="text"
                value={tiktokPixelId}
                onChange={(e) => setTiktokPixelId(e.target.value)}
                placeholder="যেমন: CXXXXXXXXXXXX"
                className="w-full max-w-md px-4 py-3 bg-[#FAFAF9] border border-gray-300 rounded-xl font-mono text-xs sm:text-sm text-gray-900 focus:ring-2 focus:ring-black"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                TikTok Ads Manager &gt; Assets &gt; Events &gt; Web Events &gt; Pixel ID
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Custom Script Injection */}
        {activeTab === "scripts" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
            <div className="pb-4 border-b border-gray-100">
              <h3 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#059669]" />
                কাস্টম স্ক্রিপ্ট ও ট্র্যাকিং কোড ইনজেকশন
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Hotjar, Clarity, Pinterest, বা অন্য কোনো কাস্টম এইচটিএমএল/জেএস কোড পেজে সরাসরি যুক্ত করুন
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  1. Header Scripts (Injected inside &lt;head&gt;...&lt;/head&gt;)
                </label>
                <textarea
                  rows={4}
                  value={customHeadScripts}
                  onChange={(e) => setCustomHeadScripts(e.target.value)}
                  placeholder="<script>/* আপনার কাস্টম হেডার কোড */</script>"
                  className="w-full px-4 py-3 bg-[#1C1917] text-amber-300 font-mono text-xs rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#059669]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  2. Body Start Scripts (Injected right after opening &lt;body&gt;)
                </label>
                <textarea
                  rows={3}
                  value={customBodyStartScripts}
                  onChange={(e) => setCustomBodyStartScripts(e.target.value)}
                  placeholder="<noscript>...</noscript>"
                  className="w-full px-4 py-3 bg-[#1C1917] text-amber-300 font-mono text-xs rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#059669]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  3. Body End Scripts (Injected right before closing &lt;/body&gt;)
                </label>
                <textarea
                  rows={4}
                  value={customBodyEndScripts}
                  onChange={(e) => setCustomBodyEndScripts(e.target.value)}
                  placeholder="<script>/* লাইভ চ্যাট উইজেট বা অন্যান্য ফুটার স্ক্রিপ্ট */</script>"
                  className="w-full px-4 py-3 bg-[#1C1917] text-amber-300 font-mono text-xs rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#059669]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-3 rounded-2xl text-xs sm:text-sm font-black shadow-lg shadow-[#D97706]/20 transition-all active:scale-95 cursor-pointer disabled:opacity-75"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "সংরক্ষণ হচ্ছে..." : "সকল ট্র্যাকিং সেটিংস সংরক্ষণ করুন"}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
