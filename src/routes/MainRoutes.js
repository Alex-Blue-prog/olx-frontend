import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import {NotFound} from "../pages/NotFound";
import {Home} from "../pages/Home";
import {About} from "../pages/About";
import {SignIn} from "../pages/SignIn";
import {SignUp} from "../pages/SignUp";
import { AdPage } from "../pages/AdPage";
import { AddAd } from "../pages/AddAd";
import { Ads } from "../pages/Ads";
import { MyAccount } from "../pages/MyAccount/";

const MainRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/ad/:id" element={<AdPage />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/post-an-ad" element={<RequireAuth> <AddAd /> </RequireAuth>} />
            <Route path="/my-account" element={<RequireAuth> <MyAccount /> </RequireAuth>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default MainRoutes;