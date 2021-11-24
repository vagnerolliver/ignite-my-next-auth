import { ReactNode } from "react";

import { UseCan } from "../hooks/UseCan";

type CanProps = { 
  children: ReactNode
  permissions?: string[]
  roles?: string[] 
}

export function Can({ roles, permissions, children }: CanProps) {

  const userCanSeeComponent = UseCan({ permissions, roles })

  if (!userCanSeeComponent) {
    return null
  }

  return (
    <>
     {children}
    </>
  )
}