const mongoose = require("mongoose");

// Schema

const permissionSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  roleAlias: { type: String, required: true },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: "Resource" },
  resourceAlias: { type: String, required: true },
  isAllowed: { type: Boolean, required: true },
  isDisabled: { type: Boolean, required: true },
});

// reference model

const Permission = mongoose.model("Permission", permissionSchema);

Permission.createNew = async (permission) => {
  const model = new Permission(permission);
  return model;
};

module.exports = Permission;
