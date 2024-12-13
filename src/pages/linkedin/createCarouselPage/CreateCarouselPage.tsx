import React, { useState } from "react";
import CanvasComponent from "./_components/CanvasComponent";

const data =
  "data:image/svg+xml;utf8,%3Csvg%20width%3D%22448%22%20height%3D%22568%22%20viewBox%3D%220%200%20448%20568%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_248_413)%22%3E%0A%20%20%3Cpath%20d%3D%22M450.463%20499.823C480.282%20469.949%20480.282%20421.515%20450.463%20391.642C420.643%20361.769%20372.296%20361.769%20342.477%20391.642C312.657%20421.515%20312.657%20469.949%20342.477%20499.823C372.296%20529.696%20420.643%20529.696%20450.463%20499.823Z%22%20fill%3D%22%234A4FC7%22%20fill-opacity%3D%220.04%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M369.152%2086.5067C374.147%2065.3157%20361.048%2044.0805%20339.895%2039.0767C318.742%2034.0729%20297.545%2047.1953%20292.55%2068.3863C287.555%2089.5774%20300.654%20110.812%20321.807%20115.816C342.96%20120.82%20364.157%20107.698%20369.152%2086.5067Z%22%20fill%3D%22%234A4FC7%22%20fill-opacity%3D%220.04%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M219.163%20165.639C246.863%20157.237%20262.519%20127.93%20254.131%20100.18C245.744%2072.4309%20216.49%2056.7469%20188.79%2065.1491C161.091%2073.5514%20145.435%20102.858%20153.822%20130.608C162.209%20158.357%20191.463%20174.041%20219.163%20165.639Z%22%20fill%3D%22%234A4FC7%22%20fill-opacity%3D%220.04%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M297.736%20414.79C302.372%20386.17%20282.972%20359.205%20254.404%20354.56C225.836%20349.915%20198.918%20369.35%20194.282%20397.97C189.646%20426.589%20209.046%20453.555%20237.614%20458.2C266.182%20462.844%20293.099%20443.409%20297.736%20414.79Z%22%20fill%3D%22%234A4FC7%22%20fill-opacity%3D%220.04%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M239.25%2031.8523C285.911%2031.8523%20323.736%20-6.04147%20323.736%20-52.7859C323.736%20-99.5303%20285.911%20-137.424%20239.25%20-137.424C192.59%20-137.424%20154.764%20-99.5303%20154.764%20-52.7859C154.764%20-6.04147%20192.59%2031.8523%20239.25%2031.8523Z%22%20fill%3D%22%234A4FC7%22%20fill-opacity%3D%220.04%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M110.495%20107.76C143.489%2074.7068%20143.489%2021.1174%20110.495%20-11.9356C77.5019%20-44.9885%2024.0087%20-44.9885%20-8.98491%20-11.9356C-41.9785%2021.1174%20-41.9785%2074.7068%20-8.98491%20107.76C24.0087%20140.813%2077.5019%20140.813%20110.495%20107.76Z%22%20fill%3D%22%234A4FC7%22%20fill-opacity%3D%220.04%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M144.995%20553.169C177.988%20520.116%20177.988%20466.527%20144.995%20433.474C112.001%20400.421%2058.508%20400.421%2025.5144%20433.474C-7.47924%20466.527%20-7.47924%20520.116%2025.5144%20553.169C58.508%20586.222%20112.001%20586.222%20144.995%20553.169Z%22%20fill%3D%22%234A4FC7%22%20fill-opacity%3D%220.04%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M207.051%20294.427C213.444%20248.122%20181.156%20205.393%20134.934%20198.989C88.7119%20192.585%2046.0596%20224.931%2039.6671%20271.236C33.2747%20317.541%2065.5627%20360.27%20111.785%20366.674C158.006%20373.078%20200.659%20340.732%20207.051%20294.427Z%22%20fill%3D%22%234A4FC7%22%20fill-opacity%3D%220.04%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M390.724%20313.271C423.718%20280.218%20423.718%20226.629%20390.724%20193.576C357.731%20160.523%20304.238%20160.523%20271.244%20193.576C238.25%20226.629%20238.25%20280.218%20271.244%20313.271C304.238%20346.324%20357.731%20346.324%20390.724%20313.271Z%22%20fill%3D%22%234A4FC7%22%20fill-opacity%3D%220.04%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22398.361%22%20cy%3D%22255.361%22%20r%3D%222.36126%22%20fill%3D%22%23797B96%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22303.361%22%20cy%3D%22448.361%22%20r%3D%222.36126%22%20fill%3D%22%23797B96%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22333.503%22%20cy%3D%22104.605%22%20r%3D%222.36126%22%20fill%3D%22%23797B96%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22224.885%22%20cy%3D%2240.8508%22%20r%3D%222.36126%22%20fill%3D%22%23797B96%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%2221.8173%22%20cy%3D%2226.6833%22%20r%3D%222.36126%22%20fill%3D%22%23797B96%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22419.633%22%20cy%3D%22390.361%22%20r%3D%222.36126%22%20fill%3D%22%23797B96%22%2F%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip1_248_413)%22%3E%0A%20%20%3Cpath%20d%3D%22M376.388%2068.0051C372.24%2068.0051%20368.922%2064.2718%20368.922%2060.1237C368.922%2055.9755%20372.24%2052.657%20376.388%2052.657C380.536%2052.657%20383.855%2055.9755%20383.855%2060.1237C384.27%2064.2718%20380.536%2068.0051%20376.388%2068.0051ZM376.388%2055.5607C373.899%2055.5607%20371.825%2057.6348%20371.825%2060.1237C371.825%2062.6125%20373.899%2064.6866%20376.388%2064.6866C378.877%2064.6866%20380.951%2062.6125%20380.951%2060.1237C380.951%2057.6348%20378.877%2055.5607%20376.388%2055.5607Z%22%20fill%3D%22%234A4FC7%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip2_248_413)%22%3E%0A%20%20%3Cpath%20d%3D%22M98.9408%2075.0889C94.7926%2075.0889%2091.4741%2071.3555%2091.4741%2067.2074C91.4741%2063.0592%2094.7926%2059.7407%2098.9408%2059.7407C103.089%2059.7407%20106.407%2063.0592%20106.407%2067.2074C106.822%2071.3555%20103.089%2075.0889%2098.9408%2075.0889ZM98.9408%2062.6444C96.4519%2062.6444%2094.3778%2064.7185%2094.3778%2067.2074C94.3778%2069.6963%2096.4519%2071.7704%2098.9408%2071.7704C101.43%2071.7704%20103.504%2069.6963%20103.504%2067.2074C103.504%2064.7185%20101.43%2062.6444%2098.9408%2062.6444Z%22%20fill%3D%22%234A4FC7%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cpath%20d%3D%22M369.467%20513.348C365.319%20513.348%20362%20509.615%20362%20505.467C362%20501.319%20365.319%20498%20369.467%20498C373.615%20498%20376.933%20501.319%20376.933%20505.467C377.348%20509.615%20373.615%20513.348%20369.467%20513.348ZM369.467%20500.904C366.978%20500.904%20364.904%20502.978%20364.904%20505.467C364.904%20507.956%20366.978%20510.03%20369.467%20510.03C371.956%20510.03%20374.03%20507.956%20374.03%20505.467C374.03%20502.978%20371.956%20500.904%20369.467%20500.904Z%22%20fill%3D%22%234A4FC7%22%2F%3E%0A%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%3CclipPath%20id%3D%22clip0_248_413%22%3E%0A%20%20%3Crect%20width%3D%22448%22%20height%3D%22568%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2FclipPath%3E%0A%20%20%3CclipPath%20id%3D%22clip1_248_413%22%3E%0A%20%20%3Crect%20width%3D%2215.3482%22%20height%3D%2215.3482%22%20fill%3D%22white%22%20transform%3D%22translate(368.922%2052.657)%22%2F%3E%0A%20%20%3C%2FclipPath%3E%0A%20%20%3CclipPath%20id%3D%22clip2_248_413%22%3E%0A%20%20%3Crect%20width%3D%2215.3482%22%20height%3D%2215.3482%22%20fill%3D%22white%22%20transform%3D%22translate(91.4741%2059.7407)%22%2F%3E%0A%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3C%2Fsvg%3E%20%20%0A";
export default function CreateCarouselPage() {
  const [topic, setTopic] = useState("");
  const [titleEnabled, setTitleEnabled] = useState(true);
  const [subtitleEnabled, setSubtitleEnabled] = useState(true);
  const [titleText, setTitleText] = useState("Mastering Buffer");
  const [subtitleText, setSubtitleText] = useState(
    "Unlock the Power of Buffer Without Overwhelm dfsgf dsfgfjhj sdfgfhjdsgfhj k sdgfhjkl"
  );
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("https://via.placeholder.com/40");
  const [avatarName, setAvatarName] = useState("Test User");
  const [avatarUserName, setAvatarUserName] = useState("test");

  const tabs = ["Content", "Settings", "Theme", "Preview", "Download"];
  const [activeTab, setActiveTab] = useState("Content");

  const slides = [];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Top bar */}
      <div className="flex items-center space-x-4 mb-8">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic for your carousel..."
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-3 rounded-md transition">
          Generate Carousel
        </button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Preview Area */}
        <div className="lg:col-span-2 flex justify-center">
          {/* <CanvasComponent
            backgroundImageUrl={
              "https://i.pinimg.com/736x/65/21/c4/6521c4eecdbe234ed8d11202086f9f27.jpg"
            }
            title={titleText}
            subtitle={subtitleText}
          /> */}
          <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow relative">
            <div
              className="border flex flex-col justify-between border-gray-200 rounded-md p-6 relative"
              style={{
                backgroundImage: backgroundImageUrl
                  ? `url(${backgroundImageUrl})`
                  : `url(https://i.pinimg.com/736x/65/21/c4/6521c4eecdbe234ed8d11202086f9f27.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",

                aspectRatio: "1 / 1.25",
              }}
            >
              <div className="absolute inset-0 bg-white bg-opacity-60 pointer-events-none rounded-md"></div>

              <div className="relative space-y-2">
                {titleEnabled && (
                  <h1 className="text-2xl font-bold text-indigo-900 leading-tight">
                    {titleText}
                  </h1>
                )}
                {subtitleEnabled && (
                  <p className="text-gray-600">{subtitleText}</p>
                )}
              </div>

              <div className="flex items-center mt-6 space-x-2 relative">
                <img
                  src={avatarUrl}
                  alt={avatarName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{avatarName}</div>
                  <div className="text-gray-500">@{avatarUserName}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Tabs */}
          <div className="flex space-x-4 border-b border-gray-200 pb-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-1 text-sm font-medium ${
                  activeTab === tab
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content for Active Tab */}
          {activeTab === "Content" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Content Edit
              </h3>

              {/* Title Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Title</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={titleEnabled}
                    onChange={(e) => setTitleEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:bg-indigo-600 transition" />
                </label>
              </div>
              {titleEnabled && (
                <input
                  type="text"
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              )}

              {/* Subtitle Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Subtitle
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subtitleEnabled}
                    onChange={(e) => setSubtitleEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:bg-indigo-600 transition" />
                </label>
              </div>
              {subtitleEnabled && (
                <input
                  type="text"
                  value={subtitleText}
                  onChange={(e) => setSubtitleText(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              )}

              {/* Background Image URL */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Background Image URL
                </span>
                <input
                  type="text"
                  value={backgroundImageUrl}
                  onChange={(e) => setBackgroundImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Avatar */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Avatar</h3>
                <div className="flex items-center flex-col gap-2 ">
                  <input
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://via.placeholder.com/40"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    value={avatarName}
                    onChange={(e) => setAvatarName(e.target.value)}
                    placeholder="Test User"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    value={avatarUserName}
                    onChange={(e) => setAvatarUserName(e.target.value)}
                    placeholder="test"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab !== "Content" && (
            <div className="text-gray-500">
              {/* Placeholder content for other tabs */}
              <p className="text-sm">No content for this tab yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Carousel Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto py-2">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-[100px] border border-gray-300 rounded-md p-2 flex-shrink-0 bg-white text-sm flex flex-col justify-between"
          >
            <div className="flex-1 text-gray-800 font-medium">
              {slide.title}
            </div>
            <div className="text-gray-400 text-xs mt-2 flex justify-end">
              <svg
                className="w-4 h-4 cursor-pointer hover:text-red-500 transition"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        ))}

        {/* Add new slide placeholder */}
        <div className="min-w-[100px] border-2 border-dashed border-gray-300 rounded-md p-2 flex-shrink-0 flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer">
          +
        </div>
      </div>
    </div>
  );
}
