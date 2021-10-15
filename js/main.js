import {createAnnouncement} from './data.js';
import {ANNOUNCEMENT_COUNT} from '.constants.js';

const announcementArray = Array.from({length:ANNOUNCEMENT_COUNT}, createAnnouncement);
announcementArray;

