const Role = require("../models/roles.model.js")
const response = require("../../utils/responseUtil.js")
exports.create = async (req, res) => {
    const { name, permissions } = req.body;
    if (!name || !permissions) {
        return response.badRequest(res, {}, "Name and permissions are required", 400)
    }
    if (!Array.isArray(permissions)) {
        return response.badRequest(res, {}, "Permissions should be an array", 400)
    }
    if (permissions.length === 0) {
        return response.badRequest(res, {}, "Permissions should not be empty", 400)
    }

    try {
        const role = await Role.findOne({ name })
        console.log(role)
        if (role) {
            return response.badRequest(res, {}, "Role already exists", 400)
        }
        const newRole = new Role({
            name,
            permissions: permissions
        })
        await newRole.save()
        response.created(res, newRole, "Role created successfully", 201)

    } catch (error) {
        // console.log(error)
        response.error(res, {}, "Error creating role", 500)
    }
}
exports.getAll = async (req, res) => {
    try {
        const roles = await Role.find()
        response.success(res, roles, "Roles fetched successfully", 200)
    } catch (error) {
        response.error(res, {}, "Error fetching roles", 500)
    }
}
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, permissions } = req.body;
        if (!id || !name || !permissions) {
            return response.badRequest(res, {}, "Id, name and permissions are required", 400)
        }
        if (!Array.isArray(permissions)) {
            return response.badRequest(res, {}, "Permissions should be an array", 400)
        }
        if (permissions.length === 0) {
            return response.badRequest(res, {}, "Permissions should not be empty", 400)
        }
        const role = await Role.findById(id)
        if (!role) {
            return response.notFound(res, "Role not found", 404)
        }
        role.name = name;
        role.permissions = permissions;
        await role.save();
        response.success(res, role, "Role updated successfully", 200)
    } catch (error) {
        response.error(res, {}, "Error while updating role", 500)
    }
}
exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByIdAndDelete(id);
        response.success(res, role, "Role deleted successfully", 200)
    } catch (error) {
        response.error(res, {}, "Error while deleting role", 500)
    }
}

