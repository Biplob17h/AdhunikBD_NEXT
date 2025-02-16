import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  home: {
    new: Boolean,
    ongoing: Boolean,
    served: Boolean,
    finished: Boolean,
    cancel: Boolean,
    total: Boolean,
    today: Boolean,
    servedAmount: Boolean,
    totalReport: Boolean,
    newReport: Boolean,
    ongoingReport: Boolean,
    totalSale: Boolean,
  },
});

const Settings =
  mongoose.models.settings || mongoose.model("settings", settingsSchema);

export default Settings;
