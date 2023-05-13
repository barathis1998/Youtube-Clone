import userRouter from "./user-route.js";
import videoRouter from "./video-route.js";

import commentRouter from "./comment-route.js";
import searchRouter from "./search-route.js";
import subscriptionRouter from "./subscription-router.js";
import historyRouter from "./history-route.js";
import feelingRouter from "./feeling-route.js";
import express from "express";
import path from "path";

const route = (app) => {
  app.use("/users", userRouter);
  //app.use("/users/login", userRouter);
};

const videoRoute = (app) => {
  app.use("/videos", videoRouter);
  app.use(
    "/public",
    express.static(
      path.join(path.dirname(new URL(import.meta.url).pathname), "public")
    )
  );
  // app.use("/public", express.static(path.join(__dirname, "public")));
};

const commentRoute = (app) => {
  app.use("/comments", commentRouter);
  // app.use("/public", express.static(path.join(__dirname, "public")));
};

const searchRoute = (app) => {
  app.use("/search", searchRouter);
};

const subscriptionRoute = (app) => {
  app.use("/subscriptions", subscriptionRouter);
};

const historyRoute = (app) => {
  app.use("/histories", historyRouter);
};

const feelingRoute = (app) => {
  app.use("/feelings", feelingRouter);
};
export default {
  route,
  videoRoute,
  searchRoute,
  subscriptionRoute,
  historyRoute,
  feelingRoute,
  commentRoute,
};
