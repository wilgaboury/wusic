import { Error } from "../protos/api";
import { hostname, restPort } from "./Host";
import { Writer } from "protobufjs";

function interpUrlPart(urPart: string): string {
  return `${hostname}:${restPort}/${urPart}`;
}

export async function fetchGpb<R, B>(
  urlPart: string,
  decode: (arg: Uint8Array) => R,
  encode?: (arg: B) => Writer,
  body?: B
): Promise<R | Error> {
  const url = interpUrlPart(urlPart);
  let resp: Response;
  if (encode == undefined || body === undefined) {
    resp = await fetch(url, {
      method: "GET",
    });
  } else {
    resp = await fetch(url, {
      method: "POST",
      body: encode(body).finish(),
    });
  }
  const respBody = await resp.arrayBuffer();
  try {
    return decode(new Uint8Array(respBody));
  } catch (e) {
    return {
      title: "could not decode",
      details: "",
    };
  }
}
