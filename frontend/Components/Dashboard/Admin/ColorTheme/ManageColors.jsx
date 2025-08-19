import React, { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AxiosRequest from "../../../AxiosRequest/AxiosRequest";
import { useSelector } from "react-redux";
import { selectToken } from "../../../State/Reducers/tokenSlice";

const API_BASE_URL = "/api";

// ---- Default structures to seed new configs (match your Mongoose defaults) ----
const defaultButton = () => ({
  bgColor: "#f59e0b",
  textColor: "#000000",
  hoverBgColor: "#fbbf24",
  hoverTextColor: "#000000",
  buttonBorderColor:"#ffffff"
});

const defaultCard = () => ({
  bgColor: "#ffffff",
  headingColor: "#0f766e",
  descriptionColor: "#374151",
  borderColor: "#f59e0b",
  iconColor: "#0f766e",
  specialLineColor: "#f59e0b",
  button: defaultButton(),
  link: {
    textColor: "#3b82f6",
    hoverColor: "#2563eb",
  },
});

const defaultInputField = () => ({
  bgColor: "#ffffff",
  textColor: "#000000",
  borderColor: "#d1d5db",
});

const defaultThemeFor = (position) => ({
  position,
  content: {
    title: "Section Title",
    description: "Section description...",
  },
  background: {
    sectionBgColor: "#f6f1ee",
    containerBgColor: "#ffffff",
  },
  text: {
    headingColor: "#0f766e",
    highlightedTextColor: "#f59e0b",
    paragraphColor: "#374151",
  },
  buttons: [defaultButton()],
  cards: [defaultCard()],
  inputFields: [defaultInputField()],
  extras: {}, // free-form
});

// ---- Small utilities ----
const structuredCloneSafe = (obj) => JSON.parse(JSON.stringify(obj));

const setByPath = (obj, path, value) => {
  const next = structuredCloneSafe(obj);
  let ref = next;
  for (let i = 0; i < path.length - 1; i++) {
    if (ref[path[i]] === undefined) ref[path[i]] = {};
    ref = ref[path[i]];
  }
  ref[path[path.length - 1]] = value;
  return next;
};

const getSafe = (obj, path, fallback) => {
  try {
    return path.reduce((acc, k) => (acc == null ? acc : acc[k]), obj) ?? fallback;
  } catch {
    return fallback;
  }
};

// ---- Preview helpers (hover simulation via CSS variables) ----
const HoverableButton = ({ label = "Button", button }) => {
  const [hover, setHover] = useState(false);
  const style = {
    "--btn-bg": hover ? button.hoverBgColor : button.bgColor,
    "--btn-text": hover ? button.hoverTextColor : button.textColor,
  };
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="px-4 py-2 rounded-md font-semibold shadow transition-colors bg-[var(--btn-bg)] text-[var(--btn-text)]"
      style={style}
      type="button"
    >
      {label}
    </button>
  );
};

const HoverableLink = ({ label = "Learn more", link }) => {
  const [hover, setHover] = useState(false);
  const style = {
    "--lnk-color": hover ? link.hoverColor : link.textColor,
  };
  return (
    <a
      href="#"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="underline transition-colors text-[var(--lnk-color)]"
      style={style}
    >
      {label}
    </a>
  );
};

// ---- Main Component ----
const ManageColors = () => {
  const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const token = useSelector(selectToken) || storedToken;

  const [sections, setSections] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [colorTheme, setColorTheme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch sections (for dropdown)
  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      try {
        const response = await AxiosRequest.get(`${API_BASE_URL}/section-info`);
        const arr = Array.isArray(response.data) ? response.data : [];
        setSections(arr);
        if (arr.length > 0) setSelectedPosition(arr[0].position);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load sections.");
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, []);

  // Fetch colors for selected section
  useEffect(() => {
    const fetchColorTheme = async () => {
      if (!selectedPosition) return;
      setLoading(true);
      try {
        const response = await AxiosRequest.get(`${API_BASE_URL}/colors/${selectedPosition}`);
        // API returns { config: {<theme>} }
        setColorTheme(response.data?.config);
        setMessage("");
      } catch (error) {
        console.error("Error fetching color theme:", error);
        if (error?.response?.status === 404) {
          setMessage(`No color theme found for "${selectedPosition}". Creating defaults…`);
          setColorTheme(defaultThemeFor(selectedPosition));
        } else {
          toast.error("Failed to load color theme.");
          setColorTheme(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchColorTheme();
  }, [selectedPosition]);

  // Generic update handlers
  const changeField = (path) => (e) => {
    setColorTheme((prev) => setByPath(prev, path, e.target.value));
  };

  const changeArrayField = (arrayName, idx, key) => (e) => {
    setColorTheme((prev) => {
      const next = structuredCloneSafe(prev);
      next[arrayName][idx][key] = e.target.value;
      return next;
    });
  };

  const changeNestedArrayField = (arrayName, idx, group, key) => (e) => {
    setColorTheme((prev) => {
      const next = structuredCloneSafe(prev);
      next[arrayName][idx][group][key] = e.target.value;
      return next;
    });
  };

  // Add/Remove array items
  const addArrayItem = (arrayName) => {
    setColorTheme((prev) => {
      const next = structuredCloneSafe(prev);
      if (!Array.isArray(next[arrayName])) next[arrayName] = [];
      if (arrayName === "buttons") next.buttons.push(defaultButton());
      if (arrayName === "cards") next.cards.push(defaultCard());
      if (arrayName === "inputFields") next.inputFields.push(defaultInputField());
      return next;
    });
  };

  const removeArrayItem = (arrayName, idx) => {
    setColorTheme((prev) => {
      const next = structuredCloneSafe(prev);
      if (Array.isArray(next[arrayName]) && next[arrayName].length > 1) {
        next[arrayName].splice(idx, 1);
      } else {
        toast.error(`At least 1 ${arrayName.slice(0, -1)} is required.`);
      }
      return next;
    });
  };

  // Extras JSON editor (free-form)
  const [extrasText, setExtrasText] = useState("");
  useEffect(() => {
    setExtrasText(JSON.stringify(colorTheme?.extras ?? {}, null, 2));
  }, [colorTheme?.extras]);

  const applyExtrasJSON = () => {
    try {
      const parsed = JSON.parse(extrasText || "{}");
      setColorTheme((prev) => setByPath(prev, ["extras"], parsed));
      toast.success("Extras updated.");
    } catch (e) {
      toast.error("Invalid JSON in extras.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPosition || !colorTheme) return;
    setLoading(true);
    try {
      await AxiosRequest.put(`${API_BASE_URL}/colors/${selectedPosition}`, colorTheme, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Color theme saved successfully!");
      setMessage("");
    } catch (error) {
      console.error("Error saving color theme:", error);
      toast.error("Failed to save color theme.");
    } finally {
      setLoading(false);
    }
  };

  // Preview CSS variables (section level)
  const previewVars = useMemo(() => {
    if (!colorTheme) return {};
    return {
      "--section-bg": getSafe(colorTheme, ["background", "sectionBgColor"], "#f6f1ee"),
      "--container-bg": getSafe(colorTheme, ["background", "containerBgColor"], "#ffffff"),
      "--heading-color": getSafe(colorTheme, ["text", "headingColor"], "#0f766e"),
      "--paragraph-color": getSafe(colorTheme, ["text", "paragraphColor"], "#374151"),
      "--highlighted-color": getSafe(colorTheme, ["text", "highlightedTextColor"], "#f59e0b"),
    };
  }, [colorTheme]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-5">
      <Toaster />
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Section Colors</h1>
          <p className="text-gray-600">Edit and preview the complete theme per section.</p>
        </div>

        {/* Panel */}
        <div className="bg-white shadow-sm rounded-2xl p-5">
          {/* Section Select */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Select Section</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              disabled={loading}
            >
              {loading && <option>Loading…</option>}
              {!loading && sections.length === 0 && <option>No sections found</option>}
              {sections.map((section) => (
                <option key={section.position} value={section.position}>
                  {section.title || section.position}
                </option>
              ))}
            </select>
            {message && <p className="text-amber-600 mt-2">{message}</p>}
          </div>

          {/* Form */}
          {colorTheme && (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Content */}
              <section>
                <h2 className="text-xl font-semibold mb-3">Content</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="text-gray-700 font-medium">Title</span>
                    <input
                      type="text"
                      className="mt-2 p-3 border rounded-lg"
                      value={colorTheme.content?.title || ""}
                      onChange={changeField(["content", "title"])}
                    />
                  </label>
                  <label className="flex flex-col md:col-span-2">
                    <span className="text-gray-700 font-medium">Description</span>
                    <textarea
                      rows={3}
                      className="mt-2 p-3 border rounded-lg"
                      value={colorTheme.content?.description || ""}
                      onChange={changeField(["content", "description"])}
                    />
                  </label>
                </div>
              </section>

              {/* Background */}
              <section>
                <h2 className="text-xl font-semibold mb-3">Background</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="text-gray-700 font-medium">Section Background</span>
                    <input
                      type="color"
                      className="h-12 w-full mt-2"
                      value={colorTheme.background.sectionBgColor}
                      onChange={changeField(["background", "sectionBgColor"])}
                    />
                    <span className="text-sm text-gray-500">{colorTheme.background.sectionBgColor}</span>
                  </label>
                  <label className="flex flex-col">
                    <span className="text-gray-700 font-medium">Container Background</span>
                    <input
                      type="color"
                      className="h-12 w-full mt-2"
                      value={colorTheme.background.containerBgColor}
                      onChange={changeField(["background", "containerBgColor"])}
                    />
                    <span className="text-sm text-gray-500">{colorTheme.background.containerBgColor}</span>
                  </label>
                </div>
              </section>

              {/* Text */}
              <section>
                <h2 className="text-xl font-semibold mb-3">Text</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex flex-col">
                    <span className="text-gray-700 font-medium">Heading</span>
                    <input
                      type="color"
                      className="h-12 w-full mt-2"
                      value={colorTheme.text.headingColor}
                      onChange={changeField(["text", "headingColor"])}
                    />
                    <span className="text-sm text-gray-500">{colorTheme.text.headingColor}</span>
                  </label>
                  <label className="flex flex-col">
                    <span className="text-gray-700 font-medium">Paragraph</span>
                    <input
                      type="color"
                      className="h-12 w-full mt-2"
                      value={colorTheme.text.paragraphColor}
                      onChange={changeField(["text", "paragraphColor"])}
                    />
                    <span className="text-sm text-gray-500">{colorTheme.text.paragraphColor}</span>
                  </label>
                  <label className="flex flex-col">
                    <span className="text-gray-700 font-medium">Highlighted Text</span>
                    <input
                      type="color"
                      className="h-12 w-full mt-2"
                      value={colorTheme.text.highlightedTextColor}
                      onChange={changeField(["text", "highlightedTextColor"])}
                    />
                    <span className="text-sm text-gray-500">{colorTheme.text.highlightedTextColor}</span>
                  </label>
                </div>
              </section>

              {/* Buttons */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold">Buttons</h2>
                  <div className="space-x-2">
                    <button
                      type="button"
                      onClick={() => addArrayItem("buttons")}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      + Add Button
                    </button>
                  </div>
                </div>

                {colorTheme.buttons.map((btn, i) => (
                  <div key={`btn-${i}`} className="border rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Button #{i + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeArrayItem("buttons", i)}
                        className="px-2.5 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {["bgColor", "textColor", "hoverBgColor", "hoverTextColor"].map((key) => (
                        <label key={key} className="flex flex-col">
                          <span className="text-gray-700 font-medium capitalize">{key}</span>
                          <input
                            type="color"
                            className="h-12 w-full mt-2"
                            value={btn[key]}
                            onChange={changeArrayField("buttons", i, key)}
                          />
                          <span className="text-sm text-gray-500">{btn[key]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              {/* Cards */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold">Cards</h2>
                  <div className="space-x-2">
                    <button
                      type="button"
                      onClick={() => addArrayItem("cards")}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      + Add Card
                    </button>
                  </div>
                </div>

                {colorTheme.cards.map((card, i) => (
                  <div key={`card-${i}`} className="border rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Card #{i + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeArrayItem("cards", i)}
                        className="px-2.5 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Top-level card fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                      {[
                        "bgColor",
                        "headingColor",
                        "descriptionColor",
                        "borderColor",
                        "iconColor",
                        "specialLineColor",
                      ].map((key) => (
                        <label key={key} className="flex flex-col">
                          <span className="text-gray-700 font-medium capitalize">{key}</span>
                          <input
                            type="color"
                            className="h-12 w-full mt-2"
                            value={card[key]}
                            onChange={changeArrayField("cards", i, key)}
                          />
                          <span className="text-sm text-gray-500">{card[key]}</span>
                        </label>
                      ))}
                    </div>

                    {/* Card Button */}
                    <h4 className="font-medium mb-2">Card Button</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">

                      {["bgColor", "textColor", "hoverBgColor", "hoverTextColor","buttonBorderColor"].map((key) => (
                        <label key={`cbtn-${key}`} className="flex flex-col">
                          <span className="text-gray-700 font-medium capitalize">{key}</span>
                          <input
                            type="color"
                            className="h-12 w-full mt-2"
                            value={card.button[key]}
                            onChange={changeNestedArrayField("cards", i, "button", key)}
                          />
                          <span className="text-sm text-gray-500">{card.button[key]}</span>
                        </label>
                      ))}
                    </div>

                    {/* Card Link */}
                    <h4 className="font-medium mb-2">Card Link</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["textColor", "hoverColor"].map((key) => (
                        <label key={`clnk-${key}`} className="flex flex-col">
                          <span className="text-gray-700 font-medium capitalize">{key}</span>
                          <input
                            type="color"
                            className="h-12 w-full mt-2"
                            value={card.link[key]}
                            onChange={changeNestedArrayField("cards", i, "link", key)}
                          />
                          <span className="text-sm text-gray-500">{card.link[key]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              {/* Input Fields */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold">Input Fields</h2>
                  <div className="space-x-2">
                    <button
                      type="button"
                      onClick={() => addArrayItem("inputFields")}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      + Add Input
                    </button>
                  </div>
                </div>

                {colorTheme.inputFields.map((inp, i) => (
                  <div key={`inp-${i}`} className="border rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Input #{i + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeArrayItem("inputFields", i)}
                        className="px-2.5 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["bgColor", "textColor", "borderColor"].map((key) => (
                        <label key={key} className="flex flex-col">
                          <span className="text-gray-700 font-medium capitalize">{key}</span>
                          <input
                            type="color"
                            className="h-12 w-full mt-2"
                            value={inp[key]}
                            onChange={changeArrayField("inputFields", i, key)}
                          />
                          <span className="text-sm text-gray-500">{inp[key]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              {/* Extras (JSON) */}
              <section>
                <h2 className="text-xl font-semibold mb-3">Extras (JSON)</h2>
                <div className="grid grid-cols-1 gap-3">
                  <textarea
                    className="w-full p-3 border rounded-lg font-mono text-sm"
                    rows={6}
                    value={extrasText}
                    onChange={(e) => setExtrasText(e.target.value)}
                    placeholder='{"heroBanner":{"overlay":"#00000080"}}'
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="px-3 py-2 rounded bg-slate-700 text-white hover:bg-slate-800"
                      onClick={applyExtrasJSON}
                    >
                      Apply JSON
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 rounded bg-slate-200 hover:bg-slate-300"
                      onClick={() => setExtrasText(JSON.stringify(colorTheme.extras ?? {}, null, 2))}
                    >
                      Reset to Current
                    </button>
                  </div>
                </div>
              </section>

              {/* Save */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Theme"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* -------- Live Preview (BELOW) -------- */}
        {colorTheme && (
          <div
            className="mt-6 rounded-2xl shadow-md p-5 bg-[var(--section-bg)] transition-colors"
            style={previewVars}
          >
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-[var(--heading-color)]">Live Preview</h2>

              <div className="rounded-xl p-6 shadow-inner bg-[var(--container-bg)]">
                {/* Heading + paragraph */}
                <h3 className="text-xl font-semibold mb-1 text-[var(--heading-color)]">
                  {colorTheme.content?.title || "Section Title"}
                </h3>
                <p className="mb-4 text-[var(--paragraph-color)]">
                  {colorTheme.content?.description || "Section description..."}{" "}
                  <span className="font-semibold text-[var(--highlighted-color)]">highlighted</span>
                </p>

                {/* Buttons preview */}
                {Array.isArray(colorTheme.buttons) && colorTheme.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {colorTheme.buttons.map((b, i) => (
                      <HoverableButton key={`pv-btn-${i}`} label={`Button ${i + 1}`} button={b} />
                    ))}
                  </div>
                )}

                {/* Cards preview */}
                {Array.isArray(colorTheme.cards) && colorTheme.cards.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    {colorTheme.cards.map((c, i) => {
                      const cardVars = {
                        "--card-bg": c.bgColor,
                        "--card-border": c.borderColor,
                        "--card-head": c.headingColor,
                        "--card-desc": c.descriptionColor,
                        "--card-icon": c.iconColor,
                        "--card-line": c.specialLineColor,
                      };
                      return (
                        <div
                          key={`pv-card-${i}`}
                          className="rounded-xl border-2 p-5 bg-[var(--card-bg)] border-[var(--card-border)]"
                          style={cardVars}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            {/* Icon placeholder */}
                            <svg
                              width="28"
                              height="28"
                              viewBox="0 0 24 24"
                              className="shrink-0"
                              style={{ color: c.iconColor }}
                            >
                              <circle cx="12" cy="12" r="10" fill="currentColor" />
                            </svg>
                            <h4 className="text-lg font-bold" style={{ color: c.headingColor }}>
                              Card #{i + 1} Title
                            </h4>
                          </div>

                          <p className="text-sm mb-3" style={{ color: c.descriptionColor }}>
                            This is a sample card to preview your card colors for headings,
                            descriptions, borders, icons, lines, and its inner controls.
                          </p>

                          {/* special line */}
                          <div
                            className="h-1 w-24 rounded-full mb-4"
                            style={{ backgroundColor: c.specialLineColor }}
                          />

                          {/* Card controls */}
                          <div className="flex flex-wrap items-center gap-3">
                            <HoverableButton label="Card Button" button={c.button} />
                            <HoverableLink label="Card Link" link={c.link} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Inputs preview */}
                {Array.isArray(colorTheme.inputFields) && colorTheme.inputFields.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {colorTheme.inputFields.map((f, i) => (
                      <input
                        key={`pv-inp-${i}`}
                        type="text"
                        placeholder={`Input ${i + 1}…`}
                        className="w-full p-3 rounded-lg outline-none transition-all focus:ring-2 focus:ring-offset-0"
                        style={{
                          backgroundColor: f.bgColor,
                          color: f.textColor,
                          border: `1px solid ${f.borderColor}`,
                        }}
                        onFocus={(e) => (e.currentTarget.style.border = `2px solid ${f.borderColor}`)}
                        onBlur={(e) => (e.currentTarget.style.border = `1px solid ${f.borderColor}`)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageColors;
