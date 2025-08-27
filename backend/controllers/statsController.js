import Stats from "../models/statsModel.js";
import mongoose from "mongoose";



// Get all collection availble 
export const getAvailableCollections = async (req, res) => {
  try {
    // Use the current DB connection to list collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    res.status(200).json(collectionNames);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ message: "Error fetching collections", error });
  }
};

// Utility to dynamically get model count
const getCollectionCount = async (collectionName) => {
  try {
    const count = await mongoose.connection.db
      .collection(collectionName) // use native collection
      .countDocuments({isArchived:false});
    return count;
  } catch (err) {
    console.error(`Error counting documents in ${collectionName}:`, err);
    return 0;
  }
};



// Add a new stat
export const createStat = async (req, res) => {
    try {
        const { title, icon, sourceType, collectionName, targetValue, redirectLink } = req.body;

        if (sourceType === "collection" && !collectionName) {
            return res.status(400).json({ message: "Collection name is required for 'collection' type." });
        }
        if (sourceType === "custom" && (targetValue === null || targetValue === undefined)) {
            return res.status(400).json({ message: "Target value is required for 'custom' type." });
        }

        const newStat = new Stats({
            title,
            icon,
            sourceType,
            collectionName: sourceType === "collection" ? collectionName : null,
            targetValue: sourceType === "custom" ? targetValue : null,
            redirectLink
        });

        await newStat.save();
        res.status(201).json(newStat);
    } catch (error) {
        res.status(500).json({ message: "Error creating stat", error });
    }
};

// Get all stats (with computed values)
export const getAllStats = async (req, res) => {
  try {
    const stats = await Stats.find({isArchived:false});

    const updatedStats = await Promise.all(
      stats.map(async (stat) => {
        let value;

        if (stat.sourceType === "collection" && stat.collectionName) {
          // Get actual number of documents in the collection
          value = await mongoose.connection.db
            .collection(stat.collectionName)
            .countDocuments({isArchived:false});
        } else {
          // Use targetValue for custom stats
          value = stat.targetValue || 0;
        }

        return {
          ...stat._doc,
          computedValue: value, // frontend should use this for counting animation
        };
      })
    );

    res.status(200).json(updatedStats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Error fetching stats", error });
  }
};
// Get aggregated stats for all collections
export const getCollectionStats = async (req, res) => {
    try {
        const stats = await Stats.find({ sourceType: "collection" });

        const collectionData = await Promise.all(
            stats.map(async (stat) => ({
                collectionName: stat.collectionName,
                count: await getCollectionCount(stat.collectionName)
            }))
        );

        res.status(200).json(collectionData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching collection stats", error });
    }
};

// Update a stat
export const updateStat = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, icon, sourceType, collectionName, targetValue, redirectLink } = req.body;

        if (sourceType === "collection" && !collectionName) {
            return res.status(400).json({ message: "Collection name is required for 'collection' type." });
        }
        if (sourceType === "custom" && (targetValue === null || targetValue === undefined)) {
            return res.status(400).json({ message: "Target value is required for 'custom' type." });
        }

        const updatedStat = await Stats.findByIdAndUpdate(
            id,
            {
                title,
                icon,
                sourceType,
                collectionName: sourceType === "collection" ? collectionName : null,
                targetValue: sourceType === "custom" ? targetValue : null,
                redirectLink
            },
            { new: true }
        );

        if (!updatedStat) {
            return res.status(404).json({ message: "Stat not found" });
        }

        res.status(200).json(updatedStat);
    } catch (error) {
        res.status(500).json({ message: "Error updating stat", error });
    }
};

// Delete a stat
export const deleteStat = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Stats.findOneAndUpdate({_id:id},{isArchived:true});
        if (!deleted) {
            return res.status(404).json({ message: "Stat not found" });
        }
        res.status(200).json({ message: "Stat deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting stat", error });
    }
};

