import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Game from "../views/Game";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />   
    },
    {
        path: "/game",
        element: <Game />,
    },
]);