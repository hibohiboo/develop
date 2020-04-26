package main

import (
	"log"
	"net/http"
	"net/url"
)

func main() {
	values := url.Values{
		"test": {"value"},
	}
	resp, _ := http.PostForm("http://192.168.50.10:18888", values) // EncodeはRFC3986
	log.Println("Status:", resp.Status)
}
