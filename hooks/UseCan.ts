import { useContext } from "react"

import { validationUserPermissions } from "../utils/validationUserPermissions"
import { AuthContext } from "../contexts/AuthContext"

type UseCanParams = {
  permissions?: string[];
  roles?: string[]
}

export function UseCan({ permissions, roles }: UseCanParams): boolean {
  const { user,  isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return false
  }

  return validationUserPermissions({ user, permissions, roles })
}