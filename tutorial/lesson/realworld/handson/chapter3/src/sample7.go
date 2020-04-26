package main

import (
	"bytes"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"
)

func main() {
	var buffer bytes.Buffer
	writer := multipart.NewWriter(&buffer)
	writer.WriteField("name", "Michael Jackson")
	fileWriter, _ := writer.CreateFormFile("thumbnail", "sample.png")
	readFile, _ := os.Open("/app/handson/chapter3/data/sample.png")
	defer readFile.Close()
	io.Copy(fileWriter, readFile)
	writer.Close()
	resp, _ := http.Post("http://192.168.50.10:18888", writer.FormDataContentType(), &buffer)
	log.Println("Status:", resp.Status)
}
