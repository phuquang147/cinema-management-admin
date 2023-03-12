import Axios from "axios";
import Cookies from "js-cookie";
import { URL_POST_IMAGE } from "./apiUrls";

const token = Cookies.get("token");

const ImageServices = {
  postImage: (image: FormData) => {
    return Axios({
      method: "POST",
      url: URL_POST_IMAGE,
      data: image,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default ImageServices;
