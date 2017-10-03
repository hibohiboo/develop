import * as m from 'mithril';

const cache = {};

export async function get(url) {
  if (url in cache) {
      return cache[url];
  }

  cache[url] = [];
  return await m.request({
    method: "GET",
    url: url,
  });
}