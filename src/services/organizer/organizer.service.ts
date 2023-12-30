import axios, { AxiosResponse } from "axios";
import { OrganizerResponseType } from "@/types/organizer/organizerType";

const fetchOrganizerApi = async (): Promise<
  AxiosResponse<OrganizerResponseType, any>
> => {
  return await axios.get("/organizer");
};



export {fetchOrganizerApi};