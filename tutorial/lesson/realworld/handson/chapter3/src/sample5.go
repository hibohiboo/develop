package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	file, _ := os.Open("/app/handson/chapter3/data/test.txt")
	resp, _ := http.Post("http://192.168.50.10:18888", "text/plain", file)
	log.Println("Status:", resp.Status)
}
