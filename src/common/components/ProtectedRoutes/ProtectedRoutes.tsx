import { Navigate, Outlet } from "react-router"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  redirectPath: string
  isAllowed: boolean
}

export const ProtectedRoutes = ({ children, redirectPath, isAllowed }: Props) => {
  if (isAllowed) {
    return <Navigate to={redirectPath} />
  }
  return children ? children : <Outlet />
}
