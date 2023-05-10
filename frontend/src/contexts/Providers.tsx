import CinemaProvider from "./CinemaProvider";
import UserProvider from "./UserProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CinemaProvider>
    <UserProvider>
      {children}
    </UserProvider>
    </CinemaProvider>
  )
}

export default Providers;