package hello.hello;

import java.util.Optional;
import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import hello.hello.model.Stuff;
// import hello.hello.repository.StuffRepository;

@SpringBootApplication
@RestController
public class HelloApplication {
  // @Autowired StuffRepository repository;
  @RequestMapping("/")
  public String home() {
      return "Hello World from Docker";
  }
  @RequestMapping("/stuff")
  public String stuff() {
      // Optional<Stuff> optional =  repository.findByEmpId(1);
      // Stuff stuff = optional.orElse(null);
      String name = "";
      // if(stuff != null){
      //   name = stuff.stuff_name;
      // }
      return "Hello" + name;
  }
	public static void main(String[] args) {
		SpringApplication.run(HelloApplication.class, args);
	}
}
