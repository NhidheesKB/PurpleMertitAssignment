import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().trim(),
  })
)

export const createProjectValidator=vine.compile(
    vine.object({
        // organization_id:vine.number(),
        name:vine.string().maxLength(100).trim(),
        description:vine.string()
    })
)

export const updateProjectValidator=vine.compile(
    vine.object({
        project_id:vine.number(),
        updateData:vine.object({
            name:vine.string().optional(),
            description:vine.string().optional()
        })
    })
)
export const DeleteProjectValidator=vine.compile(
    vine.object({
        project_id:vine.number(),
    })
)
