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

//ROOM TYPES
export const URL_GET_ROOM_TYPES = `${DOMAIN_NAME}/room-types`;
export const URL_ADD_ROOM_TYPE = `${DOMAIN_NAME}/room-types`;
export const URL_UPDATE_ROOM_TYPE = (id: string) =>
  `${DOMAIN_NAME}/room-types/${id}`;
export const URL_DELETE_ROOM_TYPE = (id: string) =>
  `${DOMAIN_NAME}/room-types/${id}`;

//STAFFS
export const URL_GET_STAFFS = `${DOMAIN_NAME}/users`;
export const URL_ADD_STAFF = `${DOMAIN_NAME}/users`;
export const URL_UPDATE_STAFF = (id: string) => `${DOMAIN_NAME}/users/${id}`;
export const URL_DELETE_STAFF = (id: string) => `${DOMAIN_NAME}/users/${id}`;

//POSTS
export const URL_GET_ALL_POSTS = `${DOMAIN_NAME}/posts`;
export const URL_GET_MY_POSTS = `${DOMAIN_NAME}/my-posts`;
export const URL_ADD_POST = `${DOMAIN_NAME}/my-posts`;
export const URL_UPDATE_POST = (id: string) => `${DOMAIN_NAME}/my-posts/${id}`;
export const URL_DELETE_POST = (id: string) => `${DOMAIN_NAME}/my-posts/${id}`;

//ROOMS
export const URL_GET_ROOMS = `${DOMAIN_NAME}/rooms`;
export const URL_GET_ROOM_BY_ID = (id: string) => `${DOMAIN_NAME}/rooms/${id}`;
export const URL_ADD_ROOM = `${DOMAIN_NAME}/rooms`;
export const URL_UPDATE_ROOM = (id: string) => `${DOMAIN_NAME}/rooms/${id}`;
export const URL_DELETE_ROOM = (id: string) => `${DOMAIN_NAME}/rooms/${id}`;

//SHOW TIME
export const URL_GET_SHOW_TIMES_BY_DATE = (date: string) =>
  `${DOMAIN_NAME}/show-times?date=${date}`;
export const URL_GET_SHOW_TIME_BY_ID = (id: string) =>
  `${DOMAIN_NAME}/show-times/${id}`;
export const URL_ADD_SHOW_TIME = `${DOMAIN_NAME}/show-times`;
export const URL_UPDATE_SHOW_TIME = (id: string) =>
  `${DOMAIN_NAME}/show-times/${id}`;
export const URL_DELETE_SHOW_TIME = (id: string) =>
  `${DOMAIN_NAME}/show-times/${id}`;

// TRANSACTIONS
export const URL_GET_TRANSACTIONS = `${DOMAIN_NAME}/transactions`;
export const URL_ADD_TRANSACTION = `${DOMAIN_NAME}/transactions`;
