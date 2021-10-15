import {createAnnouncement, ANNOUNCEMENT_COUNT} from './data.js';

const announcementArray = Array.from({length:ANNOUNCEMENT_COUNT}, createAnnouncement);
console.log(announcementArray);

