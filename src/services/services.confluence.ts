import {
  fetchConfluencePage,
  fetchConfluenceSearch,
} from "../apis/confluence/api";

export const ConfluenceService = {
  getSearchResults: fetchConfluenceSearch,
  getPageContent: fetchConfluencePage,
};
