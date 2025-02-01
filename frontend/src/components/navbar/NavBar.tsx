import useScreenWidth from "../hooks/useScreenWidth";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

const NavBar = () => {
    const screenWidth = useScreenWidth()    

    return (
      <>
        {screenWidth > 1024 ?
          <DesktopNavBar/>
          :
          <MobileNavBar/>
        } 
      </>
    )
  }
  
  export default NavBar;