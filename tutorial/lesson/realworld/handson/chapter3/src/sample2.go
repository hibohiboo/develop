package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

func main() {
	values := url.Values{
		"query": {"hello world"},
	}
	resp, _ := http.Get("http://192.168.50.10:18888" + "?" + values.Encode()) // EncodeはRFC1866
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	log.Println(string(body))
}

// GET /?query=hello+world HTTP/1.1
// Host: 192.168.50.10:18888
// Accept-Encoding: gzip
// User-Agent: Go-http-client/1.1
