import * as moment from "moment";

export function dateTime() {
  return moment().format("dddd MMMM  DD YYYY h:mm a");
}
