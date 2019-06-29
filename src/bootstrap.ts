import { ControlsView } from "./View/ControlsView";
import { ViewService } from "./Services/ViewService";
import { BottomInfoView } from "./View/BottomInfoView";

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var viewService = ViewService.getInstance();

var mainContainer = document.getElementById('main-container');
var bottomContainer = document.getElementById('bot-container');

var controlsView = new ControlsView();
var bottomInfoView = new BottomInfoView();

viewService.load(controlsView, mainContainer);
viewService.load(bottomInfoView, bottomContainer);