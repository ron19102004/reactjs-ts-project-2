import axios from "axios";
import { URL } from "../helpers/constant";

class CompController {
  async getBranches() {
    try {
      const branches = await axios.get(`${URL}/branches`);
      return branches.data;
    } catch (error) {
      console.log(error);
    }
  }
}
export const CompControllerModule: CompController = new CompController();
