import { ViewService } from "./Services/ViewService";
import { BottomInfoView } from "./View/BottomInfoView";
import { DirectoryView } from "./View/DirectoryView";
import { MusicPlayerService } from "./Services/MusicPlayerService";
import { Directory } from "./Model/Directory";
import { NotificationService } from "./Services/NotificationService";

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var viewService = ViewService.getInstance();
var playerService = MusicPlayerService.getInstance();
var notificationService = NotificationService.getInstance();

notificationService.bootstrap();

var mainContainer = document.getElementById('main-container');
var bottomContainer = document.getElementById('bot-container');

var directoryView = new DirectoryView(Directory.root);
var bottomInfoView = new BottomInfoView();

viewService.load(directoryView, mainContainer);
viewService.load(bottomInfoView, bottomContainer);