package main

import (
	"log"
	"net/http"
	"strings"
)

func main() {
	reader := strings.NewReader("テキスト")
	resp, _ := http.Post("http://192.168.50.10:18888", "text/plain", reader)
	log.Println("Status:", resp.Status)
}
