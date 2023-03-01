import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import {Home} from "../pages/Home";
import {About} from "../pages/About";
import {SignIn} from "../pages/SignIn";
import {SignUp} from "../pages/SignUp";
import { AdPage } from "../pages/AdPage";
import {NotFound} from "../pages/NotFound";
import { AddAd } from "../pages/AddAd";

const MainRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/ad/:id" element={<AdPage />} />
            <Route path="/post-an-ad" element={<RequireAuth> <AddAd /> </RequireAuth>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default MainRoutes;