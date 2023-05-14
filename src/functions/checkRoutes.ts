import APP_ROUTES from "../constants/routes";

export const checkRoutes = (asPath: string) => {
  const appPublicRoutes = Object.values(APP_ROUTES.public);

  return appPublicRoutes.includes(asPath)
}