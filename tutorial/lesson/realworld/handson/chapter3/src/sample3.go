package main

import (
	"log"
	"net/http"
)

func main() {
	resp, _ := http.Head("http://192.168.50.10:18888")
	defer resp.Body.Close()
	log.Println("Status:", resp.Status)
	log.Println("Headers:", resp.Header)
}
