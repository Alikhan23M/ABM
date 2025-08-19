// const Navbar = require('../models/navbarModel');

// // Get all navigation items
// const getAllNavItems = async (req, res) => {
//   try {
//     const navItems = await Navbar.find({ isActive: true })
//       .sort({ order: 1, createdAt: 1 });
    
//     res.status(200).json(navItems);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching navigation items', error: error.message });
//   }
// };

// // Get navigation item by ID
// const getNavItemById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const navItem = await Navbar.findById(id);
    
//     if (!navItem) {
//       return res.status(404).json({ message: 'Navigation item not found' });
//     }
    
//     res.status(200).json(navItem);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching navigation item', error: error.message });
//   }
// };

// // Create new navigation item
// const createNavItem = async (req, res) => {
//   try {
//     const navData = req.body;
    
//     // If no order is specified, set it to the next available order
//     if (navData.order === undefined) {
//       const maxOrder = await Navbar.findOne().sort({ order: -1 });
//       navData.order = maxOrder ? maxOrder.order + 1 : 0;
//     }
    
//     const newNavItem = new Navbar(navData);
//     const savedNavItem = await newNavItem.save();
    
//     res.status(201).json({
//       message: 'Navigation item created successfully',
//       navItem: savedNavItem
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating navigation item', error: error.message });
//   }
// };

// // Update navigation item
// const updateNavItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;
    
//     const updatedNavItem = await Navbar.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     );
    
//     if (!updatedNavItem) {
//       return res.status(404).json({ message: 'Navigation item not found' });
//     }
    
//     res.status(200).json({
//       message: 'Navigation item updated successfully',
//       navItem: updatedNavItem
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating navigation item', error: error.message });
//   }
// };

// // Delete navigation item
// const deleteNavItem = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Check if this item has children
//     const hasChildren = await Navbar.findOne({ parentId: id });
//     if (hasChildren) {
//       return res.status(400).json({ 
//         message: 'Cannot delete navigation item with children. Please delete children first.' 
//       });
//     }
    
//     const deletedNavItem = await Navbar.findByIdAndDelete(id);
    
//     if (!deletedNavItem) {
//       return res.status(404).json({ message: 'Navigation item not found' });
//     }
    
//     res.status(200).json({
//       message: 'Navigation item deleted successfully',
//       navItem: deletedNavItem
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting navigation item', error: error.message });
//   }
// };

// // Toggle navigation item visibility
// const toggleNavItemVisibility = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const navItem = await Navbar.findById(id);
//     if (!navItem) {
//       return res.status(404).json({ message: 'Navigation item not found' });
//     }
    
//     navItem.isVisible = !navItem.isVisible;
//     const updatedNavItem = await navItem.save();
    
//     res.status(200).json({
//       message: `Navigation item ${updatedNavItem.isVisible ? 'made visible' : 'hidden'} successfully`,
//       navItem: updatedNavItem
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error toggling navigation item visibility', error: error.message });
//   }
// };

// // Reorder navigation items
// const reorderNavItems = async (req, res) => {
//   try {
//     const { items } = req.body;
    
//     if (!Array.isArray(items)) {
//       return res.status(400).json({ message: 'Items must be an array' });
//     }
    
//     const updatePromises = items.map(async (item, index) => {
//       return Navbar.findByIdAndUpdate(
//         item._id,
//         { order: index },
//         { new: true }
//       );
//     });
    
//     const updatedItems = await Promise.all(updatePromises);
    
//     res.status(200).json({
//       message: 'Navigation items reordered successfully',
//       items: updatedItems
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error reordering navigation items', error: error.message });
//   }
// };

// // Get navigation tree structure
// const getNavTree = async (req, res) => {
//   try {
//     const allItems = await Navbar.find({ isActive: true })
//       .sort({ order: 1, createdAt: 1 });
    
//     // Build tree structure
//     const buildTree = (items, parentId = null) => {
//       return items
//         .filter(item => item.parentId?.toString() === parentId?.toString())
//         .map(item => ({
//           ...item.toObject(),
//           children: buildTree(items, item._id)
//         }));
//     };
    
//     const navTree = buildTree(allItems);
    
//     res.status(200).json(navTree);
//   } catch (error) {
//     res.status(500).json({ message: 'Error building navigation tree', error: error.message });
//   }
// };

// // Bulk update navigation items
// const bulkUpdateNavItems = async (req, res) => {
//   try {
//     const { items } = req.body;
    
//     if (!Array.isArray(items)) {
//       return res.status(400).json({ message: 'Items must be an array' });
//     }
    
//     const updatePromises = items.map(async (itemData) => {
//       const { _id, ...updateData } = itemData;
//       return Navbar.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
//     });
    
//     const updatedItems = await Promise.all(updatePromises);
    
//     res.status(200).json({
//       message: 'Navigation items updated successfully',
//       items: updatedItems
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error bulk updating navigation items', error: error.message });
//   }
// };

// module.exports = {
//   getAllNavItems,
//   getNavItemById,
//   createNavItem,
//   updateNavItem,
//   deleteNavItem,
//   toggleNavItemVisibility,
//   reorderNavItems,
//   getNavTree,
//   bulkUpdateNavItems
// };
const Navbar = require('../models/navbarModel');

/**
 * Default navbar shaped to match the schema EXACTLY (use dropdownItems.label + url)
 */
  const defaultNavbar = {
  links: [
    {
      label: "About Us",
      url: "/about-us",
      type: "dropdown",
      order: 0,
      isVisible: true,
      dropdownItems: [
        { label: "Vision & Mission", url: "/vision-&-mission", order: 0, isVisible: true },
        { label: "Partner Org", url: "/partner-org", order: 1, isVisible: true },
      ],
    },
    {
      label: "ABM Team",
      url: "brm-team",
      type: "dropdown",
      order: 1,
      isVisible: true,
      dropdownItems: [
        { label: "Management Team", url: "/management-team", order: 0, isVisible: true },
        { label: "BRM Team", url: "/brm-team", order: 1, isVisible: true },
      ],
    },
    { label: "Projects", url: "/projects", type: "direct", order: 2, isVisible: true, dropdownItems: [] },
    { label: "Events", url: "/events", type: "direct", order: 3, isVisible: true, dropdownItems: [] },
    {
      label: "Gallery",
      url: "/gallery",
      type: "dropdown",
      order: 4,
      isVisible: true,
      dropdownItems: [
        { label: "Project Activity Pictures", url: "/project-activity-pictures", order: 0, isVisible: true },
        { label: "Videos", url: "/videos", order: 1, isVisible: true },
      ],
    },
    {
      label: "Announcement",
      url: "#",
      type: "dropdown",
      order: 5,
      isVisible: true,
      dropdownItems: [
        { label: "News", url: "/news", order: 0, isVisible: true },
        { label: "Career", url: "/career", order: 1, isVisible: true },
        { label: "Tenders", url: "/tenders", order: 2, isVisible: true },
      ],
    },
    { label: "Contact Us", url: "/contact-us", type: "direct", order: 6, isVisible: true, dropdownItems: [] },
    { label: "Archives", url: "/archives", type: "direct", order: 7, isVisible: true, dropdownItems: [] },
  ],
  styling: {
    navbar: { backgroundColor: "#ffffff", textColor: "#0f766e" },
    links: { color: "#0f766e", hoverColor: "#f59e0b", activeColor: "#2563eb", fontWeight: "font-medium" },
    dropdown: { backgroundColor: "#ffffff", textColor: "#000000", hoverBackgroundColor: "#f3f4f6", hoverTextColor: "#0f766e" },
    input: { backgroundColor: "#ffffff", borderColor: "#0f766e", textColor: "#000000", placeholderColor: "#9ca3af" },
    button: { backgroundColor: "#0f766e", textColor: "#ffffff", hoverBackgroundColor: "#1d4ed8", hoverTextColor: "#f3f4f6" },
  },
  isActive: true,
};

/**
 * Normalize incoming links array to model shape.
 * - convert old subLinks/title shapes
 * - ensure dropdownItems exist (array)
 * - ensure order/isVisible defaults
 */
function normalizeLinks(links) {
  if (!Array.isArray(links)) return [];

  return links.map((l, idx) => {
    const dropdownRaw = l.dropdownItems || l.subLinks || [];
    const dropdownItems = Array.isArray(dropdownRaw)
      ? dropdownRaw.map((d, j) => ({
          label: d.label || d.title || `Item ${j + 1}`,
          url: d.url || d.path || "/",
          order: typeof d.order === "number" ? d.order : j,
          isVisible: d.isVisible !== undefined ? d.isVisible : true,
        }))
      : [];

    const type = l.type || (dropdownItems.length ? "dropdown" : "direct");

    return {
      label: l.label || l.title || `Link ${idx + 1}`,
      url: l.url || l.path || (type === "direct" ? "/" : "#"),
      type,
      order: typeof l.order === "number" ? l.order : idx,
      isVisible: l.isVisible !== undefined ? l.isVisible : true,
      dropdownItems,
    };
  });
}

// GET - return current navbar (DB doc) or default normalized
exports.getNavbar = async (req, res) => {
  try {
    const navbar = await Navbar.findOne().sort({ createdAt: -1 });
    if (!navbar) return res.status(200).json(defaultNavbar);
    res.status(200).json(navbar);
  } catch (error) {
    res.status(500).json({ message: "Error fetching navbar configuration", error });
  }
};

// PUT - update (create if missing) — validates/normalizes incoming payload
exports.updateNavbar = async (req, res) => {
  try {
    const incoming = req.body || {};
    // normalize incoming values
    const normalizedLinks = normalizeLinks(incoming.links || incoming.menuItems || []);
    const normalizedStyling = { ...(incoming.styling || {}) }; // you can add further checks per-field if needed

    let navbar = await Navbar.findOne().sort({ createdAt: -1 });
    if (!navbar) {
      navbar = new Navbar({
        links: normalizedLinks.length ? normalizedLinks : defaultNavbar.links,
        styling: Object.keys(normalizedStyling).length ? normalizedStyling : defaultNavbar.styling,
        isActive: incoming.isActive !== undefined ? incoming.isActive : true,
      });
    } else {
      navbar.links = normalizedLinks.length ? normalizedLinks : navbar.links;
      navbar.styling = Object.keys(normalizedStyling).length ? normalizedStyling : navbar.styling;
      if (incoming.isActive !== undefined) navbar.isActive = incoming.isActive;
    }

    await navbar.save();
    res.status(200).json(navbar);
  } catch (error) {
    res.status(400).json({ message: "Error updating navbar configuration", error });
  }
};
