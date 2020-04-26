package main

import (
	"bytes"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"net/textproto"
)

func main() {
	var buffer bytes.Buffer
	writer := multipart.NewWriter(&buffer)
	writer.WriteField("name", "Michael Jackson")
	part := make(textproto.MIMEHeader)
	part.Set("Content-Type", "image/png")
	part.Set("Content-Disposition", `form-data; name="thumbnail"; filename="photo.png"`)
	fileWriter, _ := writer.CreatePart(part)
	readFile, _ := os.Open("/app/handson/chapter3/data/sample.png")
	defer readFile.Close()
	io.Copy(fileWriter, readFile)
	resp, _ := http.Post("http://192.168.50.10:18888", writer.FormDataContentType(), &buffer)
	log.Println("Status:", resp.Status)
}
