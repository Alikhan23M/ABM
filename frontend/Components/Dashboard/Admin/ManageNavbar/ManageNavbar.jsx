// ManageNavbar.jsx
import React, { useEffect, useState } from "react";
import {
  Navbar as MTNavbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
  IconButton,
  Collapse,
  Card,
} from "@material-tailwind/react";
import { ChevronDownIcon, XMarkIcon, Bars3Icon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";

import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectToken } from "../../../State/Reducers/tokenSlice";
import logoDefault from "../../../../assets/ABM.png"; // adjust path if needed
import AxiosRequest from "../../../AxiosRequest/AxiosRequest";

const API = "/api/navbar";

// normalize server payload to expected shape
const normalizeServerNavbar = (data = {}) => {
  const linksRaw = Array.isArray(data.links) ? data.links : [];
  const links = linksRaw.map((l = {}, idx) => {
    const dropdownRaw = l.dropdownItems || l.subLinks || [];
    const dropdownItems = (Array.isArray(dropdownRaw) ? dropdownRaw : []).map((d = {}, j) => ({
      label: d.label || d.title || `Item ${j + 1}`,
      url: d.url || d.path || "/",
      order: typeof d.order === "number" ? d.order : j,
      isVisible: d.isVisible !== undefined ? d.isVisible : true,
      _id: d._id,
    }));
    return {
      label: l.label || l.title || `Link ${idx + 1}`,
      url: l.url || l.path || (dropdownItems.length ? "#" : "/"),
      type: l.type || (dropdownItems.length ? "dropdown" : "direct"),
      order: typeof l.order === "number" ? l.order : idx,
      isVisible: l.isVisible !== undefined ? l.isVisible : true,
      dropdownItems,
      _id: l._id,
    };
  });

  const defaultStyling = {
    navbar: { backgroundColor: "#ffffff", textColor: "#0f766e" },
    links: { color: "#0f766e", hoverColor: "#f59e0b", activeColor: "#2563eb", fontWeight: "font-medium" },
    dropdown: { backgroundColor: "#ffffff", textColor: "#000000", hoverBackgroundColor: "#f3f4f6", hoverTextColor: "#1d4ed8" },
    input: { backgroundColor: "#ffffff", borderColor: "#d1d5db", textColor: "#000000", placeholderColor: "#9ca3af" },
    button: { backgroundColor: "#0f766e", textColor: "#ffffff", hoverBackgroundColor: "#0d9488", hoverTextColor: "#ffffff" },
  };

  const styling = { ...defaultStyling, ...(data.styling || {}) };
  // deep-merge for nested keys (simple)
  styling.navbar = { ...defaultStyling.navbar, ...(data.styling?.navbar || {}) };
  styling.links = { ...defaultStyling.links, ...(data.styling?.links || {}) };
  styling.dropdown = { ...defaultStyling.dropdown, ...(data.styling?.dropdown || {}) };
  styling.input = { ...defaultStyling.input, ...(data.styling?.input || {}) };
  styling.button = { ...defaultStyling.button, ...(data.styling?.button || {}) };

  return {
    links,
    styling,
    isActive: data.isActive !== undefined ? data.isActive : true,
    _id: data._id || data.id,
  };
};

export default function ManageNavbar() {
  const [logo,setLogo] = useState(logoDefault);

  const reduxToken = useSelector(selectToken);
  const token = reduxToken || localStorage.getItem("token") || "";

  const [navbar, setNavbar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  // hover simulation states for preview
  const [hoverMain, setHoverMain] = useState(null);
  const [hoverDropdown, setHoverDropdown] = useState({ linkIndex: null, itemIndex: null });

const fetchLogo = async () => {
  try {
    const res = await AxiosRequest.get("/api/siteinfo");
    setLogo(res?.data?.logo || logoDefault);
  } catch (err) {
    console.error("Fetch logo error:", err);
    setLogo(logoDefault);
  }
};

  useEffect(() => {
    const fetchNavbar = async () => {
      setLoading(true);
      try {
        const res = await AxiosRequest.get(API);
        const normalized = normalizeServerNavbar(res?.data || {});
        setNavbar(normalized);
      } catch (err) {
        console.error("Fetch navbar error:", err);
        toast.error("Failed to load navbar — showing fallback");
        setNavbar(
          normalizeServerNavbar({
            links: [
              { label: "About Us", subLinks: [{ title: "Vision & Mission", url: "/vision-&-mission" }, { title: "Partner Org", url: "/partner-org" }] },
              { label: "Projects", url: "/projects" },
              { label: "Contact Us", url: "/contact-us" },
            ],
            styling: {},
            isActive: true,
          })
        );
      } finally {
        setLoading(false);
      }
    };
    fetchNavbar();
    fetchLogo();
  }, []);

  const updateNavbar = (updater) => {
    setNavbar((prev) => {
      const copy = JSON.parse(JSON.stringify(prev || { links: [], styling: {} }));
      updater(copy);
      return copy;
    });
  };

  // LINK CRUD
  const addLink = () => updateNavbar((n) => n.links.push({ label: "New Link", url: "/", type: "direct", order: n.links.length, isVisible: true, dropdownItems: [] }));
  const deleteLink = (i) => updateNavbar((n) => { n.links.splice(i, 1); n.links.forEach((l, idx) => (l.order = idx)); });
  const moveLink = (i, dir) => updateNavbar((n) => { const to = i + dir; if (to < 0 || to >= n.links.length) return; [n.links[i], n.links[to]] = [n.links[to], n.links[i]]; n.links.forEach((l, idx) => (l.order = idx)); });
  const toggleLinkVisibility = (i) => updateNavbar((n) => { n.links[i].isVisible = !n.links[i].isVisible; });
  const changeLinkField = (i, field, value) => updateNavbar((n) => { n.links[i][field] = value; });

  // DROPDOWN CRUD
  const addDropdownItem = (linkIdx) => updateNavbar((n) => { const list = n.links[linkIdx].dropdownItems || []; list.push({ label: "New Item", url: "/", order: list.length, isVisible: true }); n.links[linkIdx].dropdownItems = list; n.links[linkIdx].type = "dropdown"; });
  const deleteDropdownItem = (linkIdx, itemIdx) => updateNavbar((n) => { const list = n.links[linkIdx].dropdownItems || []; list.splice(itemIdx, 1); list.forEach((d, j) => (d.order = j)); n.links[linkIdx].dropdownItems = list; if (!list.length) n.links[linkIdx].type = "direct"; });
  const moveDropdownItem = (linkIdx, itemIdx, dir) => updateNavbar((n) => { const list = n.links[linkIdx].dropdownItems || []; const to = itemIdx + dir; if (to < 0 || to >= list.length) return; [list[itemIdx], list[to]] = [list[to], list[itemIdx]]; list.forEach((d, j) => (d.order = j)); });
  const changeDropdownField = (linkIdx, itemIdx, field, value) => updateNavbar((n) => { n.links[linkIdx].dropdownItems[itemIdx][field] = value; });

  // styling
  const changeStyling = (path, value) => updateNavbar((n) => { const keys = path.split("."); let cur = n.styling; for (let i = 0; i < keys.length - 1; i++) { if (!cur[keys[i]]) cur[keys[i]] = {}; cur = cur[keys[i]]; } cur[keys[keys.length - 1]] = value; });

  // save
  const handleSave = async () => {
    if (!navbar) return;
    setSaving(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const payload = { links: navbar.links, styling: navbar.styling, isActive: navbar.isActive };
      const res = await AxiosRequest.put(API, payload, { headers });
      toast.success("Navbar saved");
      // update id if returned
      updateNavbar((n) => { n._id = res?.data?._id || n._id; });
    } catch (err) {
      console.error("Save error:", err);
      toast.error(err?.response?.data?.message || "Failed to save navbar");
    } finally {
      setSaving(false);
    }
  };

  // Preview — mirrors your user Header exactly and uses hover simulation
  const Preview = ({ cfg }) => {
  if (!cfg) return null;

  // Extract all styling variables from the cfg prop
  const {
    navbar: { backgroundColor: navBg, textColor: navText } = {},
    links: { color: linkColor, hoverColor: linkHoverColor } = {},
    dropdown: {
      backgroundColor: dropdownBg,
      textColor: dropdownText,
      hoverBackgroundColor: dropdownHoverBg,
      hoverTextColor: dropdownHoverText,
    } = {},
    input: { backgroundColor: inputBg, borderColor: inputBorder, textColor: inputText } = {},
    button: { backgroundColor: buttonBg, textColor: buttonText } = {},
  } = cfg.styling || {};

  // States for hover simulation and mobile preview
  const [hoverMain, setHoverMain] = useState(null);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  return (
    <div className="overflow-x-auto">
      <MTNavbar className="min-w-[900px] bg-transparent p-2 rounded-sm lg:pl-6" style={{ background: navBg }}>
        <div className="relative mx-auto flex items-center justify-between">
          <a href="/home">
            <img src={logo} alt="logo" className="h-[8vh] object-contain" />
          </a>
          <div className="hidden lg:block">
            <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
              {cfg.links.map((link, i) => (
                <li key={i} className="relative">
                  {link.type === "dropdown" && (link.dropdownItems || []).length > 0 ? (
                    <Menu allowHover>
                      <MenuHandler>
                        <div
                          className="lg:flex hidden items-center space-x-2 p-[1vw] rounded-xl cursor-pointer"
                          onMouseEnter={() => setHoverMain(i)}
                          onMouseLeave={() => setHoverMain(null)}
                        >
                          <a href={link.url || `/${link.label.replace(/\s+/g, '-').toLowerCase()}`}>
                            <Typography variant="small" className="font-semibold" style={{ color: hoverMain === i ? linkHoverColor : linkColor }}>
                              {link.label}
                            </Typography>
                          </a>
                          <ChevronDownIcon strokeWidth={3} className={`h-3 w-3 transition-transform`} style={{ color: hoverMain === i ? linkHoverColor : linkColor }} />
                        </div>
                      </MenuHandler>
                      <MenuList className="w-[12rem] p-1 rounded-md shadow-lg" style={{ backgroundColor: dropdownBg }}>
                        {(link.dropdownItems || []).map((d, j) => (
                          <a href={d.url || "#"} key={j}>
                            <MenuItem
                              className="text-sm rounded hover:!bg-opacity-80 transition-colors"
                              style={{ color: dropdownText }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = dropdownHoverBg;
                                e.currentTarget.style.color = dropdownHoverText;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = dropdownBg;
                                e.currentTarget.style.color = dropdownText;
                              }}
                            >
                              <Typography variant="small" className="font-medium">
                                {d.label}
                              </Typography>
                            </MenuItem>
                          </a>
                        ))}
                      </MenuList>
                    </Menu>
                  ) : (
                    <a href={link.url || "#"}
                      className="lg:flex hidden items-center space-x-2 p-[1vw] rounded-xl cursor-pointer"
                      onMouseEnter={() => setHoverMain(i)}
                      onMouseLeave={() => setHoverMain(null)}
                      style={{ color: hoverMain === i ? linkHoverColor : linkColor }}>
                      <Typography variant="small" className="font-bold">{link.label}</Typography>
                    </a>
                  )}
                  {/* mobile fallback */}
                  <div className="lg:hidden">
                    <a href={link.url || "#"} className="block px-3 py-2">{link.label}</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <form className="relative hidden lg:flex w-full gap-2 md:w-max">
              <Input type="search" label="Search..." containerProps={{ className: "min-w-[240px]" }} style={{ background: inputBg, borderColor: inputBorder }} />
            </form>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="text" className="!bg-white text-black shadow-none">Log In</Button>
              <Button size="sm" style={{ background: buttonBg, color: buttonText }} className="shadow-none">Admin</Button>
            </div>
          </div>
          <IconButton size="sm" color="white" variant="text" onClick={() => setMobilePreviewOpen((s) => !s)} className="ml-auto mr-2 lg:hidden text-black">
            {mobilePreviewOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </IconButton>
        </div>

        <Collapse open={mobilePreviewOpen}>
          <div className="relative mt-[2vh] items-center flex flex-col w-full gap-2 md:w-max lg:hidden pb-4">
            <div className="relative w-full md:w-[80vw]">
              <Input type="search" label="Search..." className="focus:!ring-0 pl-10" />
              <IconButton type="submit" size="sm" disabled className="!absolute top-1 right-3 bg-black rounded-3xl">
                <ArrowRightIcon className="h-5 w-5 text-white" />
              </IconButton>
            </div>
          </div>
        </Collapse>
      </MTNavbar>
    </div>
  );
};

  if (loading) return <div className="p-4">Loading...</div>;
  if (!navbar) return <div className="p-4">No navbar data</div>;

  return (
    <div className="p-3 space-y-3">
      <Toaster />
      <Card className="p-2 flex items-center justify-between">
        <Typography variant="h6">Manage Navbar</Typography>
        <div className="flex gap-2">
          <Button size="sm" color="blue" onClick={addLink} className="flex items-center gap-2"><FaPlus /> Add Link</Button>
          <Button size="sm" color="green" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </div>
      </Card>

      {/* Preview */}
      <Card className="p-2 overflow-x-auto">
        <Preview cfg={navbar} />
      </Card>

      {/* compact two-column controls */}
      <div className="grid grid-cols-1  gap-3">
        <Card className="p-3">
          <Typography className="mb-2">Styling</Typography>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm mb-1">Navbar background</label>
              <input type="color" value={navbar.styling?.navbar?.backgroundColor || "#ffffff"} onChange={(e) => changeStyling("navbar.backgroundColor", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Navbar text</label>
              <input type="color" value={navbar.styling?.navbar?.textColor || "#0f766e"} onChange={(e) => changeStyling("navbar.textColor", e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Link color</label>
              <input type="color" value={navbar.styling?.links?.color || "#0f766e"} onChange={(e) => changeStyling("links.color", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Link hover color</label>
              <input type="color" value={navbar.styling?.links?.hoverColor || "#f59e0b"} onChange={(e) => changeStyling("links.hoverColor", e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Dropdown background</label>
              <input type="color" value={navbar.styling?.dropdown?.backgroundColor || "#ffffff"} onChange={(e) => changeStyling("dropdown.backgroundColor", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Dropdown hover bg</label>
              <input type="color" value={navbar.styling?.dropdown?.hoverBackgroundColor || "#f3f4f6"} onChange={(e) => changeStyling("dropdown.hoverBackgroundColor", e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Dropdown text</label>
              <input type="color" value={navbar.styling?.dropdown?.textColor || "#000000"} onChange={(e) => changeStyling("dropdown.textColor", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Dropdown hover text</label>
              <input type="color" value={navbar.styling?.dropdown?.hoverTextColor || "#1d4ed8"} onChange={(e) => changeStyling("dropdown.hoverTextColor", e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Input bg</label>
              <input type="color" value={navbar.styling?.input?.backgroundColor || "#ffffff"} onChange={(e) => changeStyling("input.backgroundColor", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Input border</label>
              <input type="color" value={navbar.styling?.input?.borderColor || "#d1d5db"} onChange={(e) => changeStyling("input.borderColor", e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Button bg</label>
              <input type="color" value={navbar.styling?.button?.backgroundColor || "#0f766e"} onChange={(e) => changeStyling("button.backgroundColor", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Button text</label>
              <input type="color" value={navbar.styling?.button?.textColor || "#ffffff"} onChange={(e) => changeStyling("button.textColor", e.target.value)} />
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <Typography className="mb-2">Links</Typography>
          <div className="space-y-2">
            {navbar.links.map((link, i) => (
              <div key={i} className="border rounded p-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input label="Label" value={link.label} onChange={(e) => changeLinkField(i, "label", e.target.value)} />
                    <Input label="URL" value={link.url} onChange={(e) => changeLinkField(i, "url", e.target.value)} containerProps={{ className: "mt-2" }} />
                    <div className="mt-2 flex items-center gap-2">
                      <label className="text-sm">Type:</label>
                      <select value={link.type} onChange={(e) => changeLinkField(i, "type", e.target.value)} className="border p-1 rounded text-sm">
                        <option value="direct">Direct</option>
                        <option value="dropdown">Dropdown</option>
                      </select>

                      <label className="flex items-center gap-1 ml-3">
                        <input type="checkbox" checked={!!link.isVisible} onChange={() => toggleLinkVisibility(i)} />
                        <span className="text-sm">Visible</span>
                      </label>

                      <div className="ml-auto flex gap-1">
                        <IconButton size="sm" onClick={() => moveLink(i, -1)}><FaArrowUp /></IconButton>
                        <IconButton size="sm" onClick={() => moveLink(i, 1)}><FaArrowDown /></IconButton>
                        <IconButton size="sm" onClick={() => deleteLink(i)} color="red"><FaTrash /></IconButton>
                      </div>
                    </div>
                  </div>

                  <div style={{ minWidth: 240 }} className="pl-2 border-l">
                    <div className="flex items-center justify-between mb-2">
                      <Typography variant="small">Dropdown Items</Typography>
                      <Button size="sm" onClick={() => addDropdownItem(i)} className="flex items-center gap-2"><FaPlus /> Add</Button>
                    </div>

                    {(!link.dropdownItems || link.dropdownItems.length === 0) ? (
                      <div className="text-sm text-gray-500">No items</div>
                    ) : (
                      <div className="space-y-2">
                        {link.dropdownItems.map((d, j) => (
                          <div key={j} className="p-2 bg-gray-50 rounded flex gap-2 items-center">
                            <input value={d.label} onChange={(e) => changeDropdownField(i, j, "label", e.target.value)} className="border px-2 py-1 flex-1 rounded" placeholder="Label" />
                            <input value={d.url} onChange={(e) => changeDropdownField(i, j, "url", e.target.value)} className="border px-2 py-1 flex-1 rounded" placeholder="URL" />
                            <div className="flex gap-1 ml-2">
                              <IconButton size="sm" onClick={() => moveDropdownItem(i, j, -1)}><FaArrowUp /></IconButton>
                              <IconButton size="sm" onClick={() => moveDropdownItem(i, j, 1)}><FaArrowDown /></IconButton>
                              <IconButton size="sm" onClick={() => deleteDropdownItem(i, j)} color="red"><FaTrash /></IconButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
