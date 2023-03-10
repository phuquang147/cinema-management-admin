export const DOMAIN_NAME = process.env.REACT_APP_BASE_URL;
export const DOMAIN_NAME_FILE_SERVICE =
  process.env.REACT_APP_BASE_URL_FILE_SERVICE;

//AUTH
export const URL_LOGIN = `${DOMAIN_NAME}/auth/login`;
export const URL_FORGOT_PASSWORD = `${DOMAIN_NAME}/auth/reset-password`;
export const URL_RESET_PASSWORD = `${DOMAIN_NAME}/auth/reset-password/change-password`;

//IMAGES
export const URL_POST_IMAGE = `${DOMAIN_NAME}/upload-image`;

//GENRES
export const URL_GET_GENRES = `${DOMAIN_NAME}/genres`;
export const URL_ADD_GENRE = `${DOMAIN_NAME}/genres`;
export const URL_UPDATE_GENRE = (id: string) => `${DOMAIN_NAME}/genres/${id}`;
export const URL_DELETE_GENRE = (id: string) => `${DOMAIN_NAME}/genres/${id}`;

//MOVIES
export const URL_GET_MOVIES = `${DOMAIN_NAME}/movies`;
export const URL_GET_MOVIE_BY_SLUG = (slug: string) =>
  `${DOMAIN_NAME}/movies/${slug}`;
export const URL_ADD_MOVIE = `${DOMAIN_NAME}/movies`;
export const URL_UPDATE_MOVIE = (id: string) => `${DOMAIN_NAME}/movies/${id}`;
export const URL_DELETE_MOVIE = (id: string) => `${DOMAIN_NAME}/movies/${id}`;

//SNACKS
export const URL_GET_SNACKS = `${DOMAIN_NAME}/items`;
export const URL_ADD_SNACK = `${DOMAIN_NAME}/items`;
export const URL_UPDATE_SNACK = (id: string) => `${DOMAIN_NAME}/items/${id}`;
export const URL_DELETE_SNACK = (id: string) => `${DOMAIN_NAME}/items/${id}`;

//ACTORS
export const URL_GET_ACTORS = `${DOMAIN_NAME}/actors`;
export const URL_ADD_ACTOR = `${DOMAIN_NAME}/actors`;
export const URL_UPDATE_ACTOR = (id: string) => `${DOMAIN_NAME}/actors/${id}`;
export const URL_DELETE_ACTOR = (id: string) => `${DOMAIN_NAME}/actors/${id}`;

//ACTORS
export const URL_GET_ROOM_TYPES = `${DOMAIN_NAME}/room-types`;
export const URL_ADD_ROOM_TYPE = `${DOMAIN_NAME}/room-types`;
export const URL_UPDATE_ROOM_TYPE = (id: string) =>
  `${DOMAIN_NAME}/room-types/${id}`;
export const URL_DELETE_ROOM_TYPE = (id: string) =>
  `${DOMAIN_NAME}/room-types/${id}`;
